 
export class AssertHelpers {
    //assertions
    assertVisibleText(selector: string, expectedText: string) {
        return cy.get(selector).should("have.text", expectedText);
    }

    assertMaskedField(selector: string) {
        return cy.get(selector).should("have.attr", "type", "password");
    }

    assertUrl(url:string) {
        cy.url().should("eq",url)
    }
}