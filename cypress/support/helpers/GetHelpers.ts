
export class GetHelpers {
  getText(selector: string) {
    return cy.get(selector).invoke("text");
  }

  getUrl() {
    return cy.url();
  }
 
 
    // Visit
  visitUrl(url: string) {
    return cy.visit(url);
  }
}