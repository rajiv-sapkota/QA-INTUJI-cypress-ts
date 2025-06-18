export class GeneralHelper {
 
  // to wait for an element to be visible
  waitForVisible(selector: string) {
    return cy.get(selector).should("be.visible");
  }

 
  // to scroll an element to the view
  scrollIntoView(selector: string) {
    return cy.get(selector).scrollIntoView();
  }
  
}
