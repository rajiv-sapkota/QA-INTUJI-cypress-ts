export class GeneralHelper {
 
  // others
  waitForVisible(selector: string) {
    return cy.get(selector).should("be.visible");
  }

 

  scrollIntoView(selector: string) {
    return cy.get(selector).scrollIntoView();
  }
}
