///<reference types="cypress" />
import { LoginPage } from "../pages/LoginPage";

const loginPage = new LoginPage();
Cypress.Commands.add("login", (username,password) => {
  loginPage.visitLoginPage();
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.clickLoginButton();
  loginPage.assertLoginSuccessful();
});
