/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [
    /**
     * Tailwind CSS plugin to add variant for "htmx-request"
     */
    plugin(function ({ addVariant, e }) {
      addVariant("htmx-request", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(
            `htmx-request${separator}${className}`,
            className,
          )}.htmx-request`;
        });
      });
    }),
  ],
};
