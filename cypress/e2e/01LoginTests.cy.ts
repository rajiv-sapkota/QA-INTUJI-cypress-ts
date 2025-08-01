import { LoginPage } from "../support/pages/LoginPage";
import { generateFakeuser } from "../fakerData/data";

const user = generateFakeuser();
const loginPage = new LoginPage();
const username = Cypress.env("USER_NAME");
const password = Cypress.env("PASSWORD");
const url = Cypress.env("BASEURL");
const invalidUsername = "test";
const locked_out_user = "locked_out_user";

describe("Test cases for login", () => {
  beforeEach(function () {
    cy.fixture("loginData").as("user");
    loginPage.visitLoginPage();
  });
  it("TC-LOGIN-101:should login successfully with valid credentials", () => {
    loginPage.typeUsername(username);
    loginPage.typePassword(password);
    loginPage.clickLogin();
    loginPage.assertLoginSuccessful();
  });

  it("TC-LOGIN-102: test login with incorrect password", function () {
    loginPage.typeUsername(username);
    loginPage.typePassword(this.user.password);
    loginPage.clickLogin();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertPageUrl(url);
  });

  it("TC-LOGIN-103: login with empty username and password", () => {
    loginPage.typeUsername("");
    loginPage.typePassword("");
    loginPage.clickLogin();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username is required"
    );
  });

  it("TC-LOGIN-104: login with invalid username and valid password", function () {
    cy.log("typing invalid username");
    loginPage.typeUsername(this.user.username);
    loginPage.typePassword(password);
    loginPage.clickLogin();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertPageUrl(url);
  });

  it("TC-LOGIN-105: password field is masked", () => {
    loginPage.typePassword(password).assertPasswordMasked();
  });

  it.skip("TC-LOGIN-106:Test hide password button is available and working", () => {
    loginPage.clickHidePasswordButton();
  });

  it("TC-LOGIN-107: restricted users are denied access", () => {
    loginPage.typeUsername(locked_out_user);
    loginPage.typePassword(password);
    loginPage.clickLogin();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
