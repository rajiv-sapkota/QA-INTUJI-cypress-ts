 
export class ClickHelpers {
  // Clicking
  clickButton(label: string) {
    return cy.get(label).click()
  }

  clickLink(selector: string) {
    return cy.get(selector).should("be.visible").click();
  }

  clickByText(text: string) {
    return cy.contains(text).click();
  }

  clickLoginButton() {
    cy.contains("Login").click()
  }

  clickFirstElement(locator: string) {
    cy.get(locator).eq(1).click()
  }
}
