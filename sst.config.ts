import { Fn } from "aws-cdk-lib";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";
import { ApiGatewayV1Api } from "sst/constructs";
import { env } from "./src/env";
import type { IFunction } from "aws-cdk-lib/aws-lambda";

export default {
  config(
    options = {
      region: "eu-central-1",
      stage: "development",
      root: ".",
    } satisfies Parameters<SSTConfig["config"]>[0],
  ) {
    return {
      ...options,
      name: "astro_htmx",
      profile: options.stage === "production" ? "production" : "dev",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const api = new ApiGatewayV1Api(stack, "Api", {
        defaults: {
          function: {
            environment: {
              PLANETSCALE_TOKEN: env.PLANETSCALE_TOKEN,
              PLANETSCALE_TOKEN_NAME: env.PLANETSCALE_TOKEN_NAME,
              PLANETSCALE_ORG: env.PLANETSCALE_ORG,
              PLANETSCALE_DB: env.PLANETSCALE_DB,
            },
          },
        },
        routes: {
          "POST /": "packages/functions/src/lambda.handler",
        },
      });

      const site = new AstroSite(stack, "site", {
        cdk: {
          distribution: {
            defaultBehavior: {
              origin: new origins.HttpOrigin(Fn.parseDomainName(api.url)),
            },
          },
        },
      });

      api.addRoutes(stack, {
        "ANY /{proxy+}": {
          function: "packages/functions/src/lambda.handler",
          cdk: {
            function: (site.cdk as any).function as IFunction,
          },
        },
      });

      stack.addOutputs({
        url: site.url,
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
