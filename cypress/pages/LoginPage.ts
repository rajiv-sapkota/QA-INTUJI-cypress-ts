export class LoginPage {
  // === defining Selectors ===
  private readonly usernameInputSelector = '[data-test="username"]';
  private readonly passwordInputSelector = '[data-test="password"]';
  private readonly loginButtonSelector = '[data-test="login-button"]';

  // === methods for Navigation ===
  visitLoginPage(): void {
    cy.visit("/");
  }

  // === methods for Typing ===

  typeUsername(username: string): void {
    if (username) {
      cy.get(this.usernameInputSelector).type(username); // or add { log: false } if sensitive
    } else {
      cy.get(this.usernameInputSelector).clear(); // just clear if empty
    }
  }

  typePassword(password: string) {
    if (password) {
      return cy.get(this.passwordInputSelector).type(password); // or add { log: false } if sensitive
    } else {
      return cy.get(this.passwordInputSelector).clear(); // just clear if empty
    }
  }

  // === method for Clicking ===
  clickLoginButton(): void {
    cy.get(this.loginButtonSelector).click();
  }

  // ===methods for Assertions ===

  assertUrl(url: string): void {
    cy.url().should("eq", url);
  }

  assertDisplayedText(locator: string, text: string): void {
    cy.get(locator).should("have.text", text);
  }

  assertLoginSuccessful(): void {
    cy.url().should("include", "inventory.html");
  }
}

