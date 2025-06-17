export class Helper {
  // Visit
  visitUrl(url: string) {
    return cy.visit(url);
  }

  // Typing
  typeText(selector: string, text: string, clearBeforeTyping = true) {
    const input = cy.get(selector);
    if (clearBeforeTyping) input.clear();
    return input.type(text);
  }

  // Clicking
  clickButton(selector: string) {
    return cy.get(selector).should("be.visible");
  }

  clickLink(selector: string) {
    return cy.get(selector).should("be.visible");
  }

  clickByText(text: string) {
    return cy.contains(text).click();
  }

  // Assertions
  assertUrl(expectedUrl: string) {
    return cy.url().should("eq", expectedUrl);
  }

  assertVisibleText(selector: string, expectedText: string) {
    return cy.get(selector).should("have.text", expectedText);
  }

  assertMaskedField(selector: string) {
    return cy.get(selector).should("have.attr", "type", "password");
  }

  // others
  waitForVisible(selector: string) {
    return cy.get(selector).should("be.visible");
  }

  getText(selector: string) {
    return cy.get(selector).invoke("text");
  }

  scrollIntoView(selector: string) {
    return cy.get(selector).scrollIntoView();
  }
}
