///<reference types="cypress" />
import { LoginPage } from "../support/pages/LoginPage";

const loginPage = new LoginPage();
Cypress.Commands.add("login", (username, password) => {
  loginPage.visitLoginPage();
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.clickLogin();
  loginPage.assertLoginSuccessful();
});
