 
export class ClickHelpers {
  

  //to click a button
  clickButton(label: string) {
    return cy.get(label).click()
  }


  //to click a link
  clickLink(selector: string) {
    return cy.get(selector).should("be.visible").click();
  }

  // to click on an element by its text
  clickByText(text: string) {
    return cy.contains(text).click();
  }

  // to click on the login button
  clickLoginButton() {
    cy.contains("Login").click()
  }

  // to click the first child of a class
  clickFirstElement(locator: string) {
    cy.get(locator).eq(1).click()
  }
}
