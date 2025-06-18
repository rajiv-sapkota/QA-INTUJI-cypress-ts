
export class GetHelpers {
  
  // to get the text of an element
  getText(selector: string) {
    return cy.get(selector).invoke("text");
  }

  // to return the current url
  getUrl() {
    return cy.url();
  }
 
 
    // to visit a specific url
  visitUrl(url: string) {
    return cy.visit(url);
  }
}