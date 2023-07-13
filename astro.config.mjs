import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [tailwind(), solidJs(), react()],
  output: "server"
});
