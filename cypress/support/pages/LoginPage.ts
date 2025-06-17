import { generateFakeuser } from "../../fakerData/data";
import {
  TypingHelpers,
  AssertHelpers,
  ClickHelpers,
  GetHelpers,
} from "../helpers";

const user = generateFakeuser();

export class LoginPage {
  private readonly usernameInputSelector = '[data-test="username"]';
  private readonly passwordInputSelector = '[data-test="password"]';
  private readonly loginButtonSelector = '[data-test="login-button"]';
  private readonly hidePasswordSelector = '[data-test="hide-password"]';

  private typingHelpers = new TypingHelpers();
  private assertHelpers = new AssertHelpers();
  private clickHelpers = new ClickHelpers();
  private getHelpers = new GetHelpers();

  visitLoginPage(): void {
    this.getHelpers.visitUrl("/");
  }

  typeUsername(username: string): this {
    if (username) {
      this.typingHelpers.typeText(this.usernameInputSelector, username);
    }
    return this;
  }

  typePassword(password: string): this {
    if (password) {
      this.typingHelpers.typeText(this.passwordInputSelector, password);
    }
    return this;
  }

  clickLogin(){
    this.clickHelpers.clickLoginButton()
  }

  clickHidePasswordButton(): void {
    this.clickHelpers.clickButton(this.hidePasswordSelector);
  }

  assertPageUrl(url: string): void {
    this.getHelpers.getUrl();
  }

  assertDisplayedText(selector: string, text: string): void {
    this.assertHelpers.assertVisibleText(selector, text);
  }

  assertLoginSuccessful(): void {
    const expectedUrl = `${Cypress.config("baseUrl")}`;
    this.getHelpers.getUrl();
  }

  assertPasswordMasked(): void {
    this.assertHelpers.assertMaskedField(this.passwordInputSelector);
  }
}
