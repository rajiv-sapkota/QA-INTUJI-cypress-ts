import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();
const username = Cypress.env("USER_NAME");
const password = Cypress.env("PASSWORD");
const url = Cypress.env("BASEURL")
const invalidUsername = "test";
const locked_out_user="locked_out_user"

describe("Test cases for login", () => {
  beforeEach(() => {
    loginPage.visitLoginPage();
  });
  it("TC-LOGIN-101:should login successfully with valid credentials", () => {
    loginPage.typeUsername(username);
    loginPage.typePassword(password);
    loginPage.clickLoginButton();
    loginPage.assertLoginSuccessful();
  });

  it("TC-LOGIN-102: test login with incorrect password", () => {
    loginPage.typeUsername(username);
    loginPage.typePassword("dsfjfhksd");
    loginPage.clickLoginButton();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertUrl(url);
  });

  it("TC-LOGIN-103: login with empty username and password", () => {
    loginPage.typeUsername("");
    loginPage.typePassword("");
    loginPage.clickLoginButton();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username is required"
    );
  });
  it("TC-LOGIN-104: login with invalid username and valid password", () => {
    cy.log("typing invalid username");
    loginPage.typeUsername(invalidUsername);
    loginPage.typePassword(password);
    loginPage.clickLoginButton();
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Username and password do not match any user in this service"
    );
    loginPage.assertUrl(url);
  });
  
  it("TC-LOGIN-105: password field is masked", () => {
    loginPage.typePassword(password).should('have.attr', 'type', 'password')
  });

  it.only("TC-LOGIN-107: restricted users are denied access", () => {
    loginPage.typeUsername(locked_out_user)
    loginPage.typePassword(password)
    loginPage.clickLoginButton()
    loginPage.assertDisplayedText(
      '[data-test="error"]',
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

});
