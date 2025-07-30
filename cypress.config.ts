import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { json } from "stream/consumers";
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

dotenv.config({ path: "./.env" });
export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    charts: true,
    reportPageTitle: "Report for SauceDemo",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: true,
    json: true,
  },
  e2e: {
    //retries: {
    //runMode: 2,
    //openMode:2
    //},
    env: { ...process.env },
    baseUrl: process.env.BASE_URL,
    //viewportWidth: 1660,
    //viewportHeight: 880,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });

      // implement node event listeners here
    },
  },
});
