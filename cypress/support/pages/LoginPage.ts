import { generateFakeuser } from "../../fakerData/data";
import { Helper } from "../helpers/Helpers";

const user = generateFakeuser();

export class LoginPage extends Helper {
  private readonly usernameInputSelector = '[data-test="username"]';
  private readonly passwordInputSelector = '[data-test="password"]';
  private readonly loginButtonSelector = '[data-test="login-button"]';
  private readonly hidePasswordSelector = '[data-test="hide-password"]';

  visitLoginPage(): void {
    this.visitUrl("/");
  }

  typeUsername(username: string): this {
    if (username) {
      this.typeText(this.usernameInputSelector, username);
    }
    return this;
  }

  typePassword(password: string): this {
    if (password) {
      this.typeText(this.passwordInputSelector, password);
    }
    return this;
  }

  clickLoginButton(): void {
    this.clickButton(this.loginButtonSelector);
  }

  clickHidePasswordButton(): void {
    this.clickButton(this.hidePasswordSelector);
  }

  assertPageUrl(url: string): void {
    this.assertUrl(url);
  }

  assertDisplayedText(selector: string, text: string): void {
    this.assertVisibleText(selector, text);
  }

  assertLoginSuccessful(): void {
    const expectedUrl = `${Cypress.config("baseUrl")}`;
    this.assertUrl(expectedUrl);
  }

  assertPasswordMasked(): void {
    this.assertMaskedField(this.passwordInputSelector);
  }
}