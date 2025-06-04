import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
export default defineConfig({
  e2e: {
    env: { ...process.env },
    baseUrl: process.env.BASEURL,
    //viewportWidth: 1660,
    //viewportHeight: 880,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
