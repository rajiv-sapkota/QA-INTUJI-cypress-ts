 
export class AssertHelpers {
    
    
    //====assertions====//

    // to assert visible text in a selector
    assertVisibleText(selector: string, expectedText: string) {
        return cy.get(selector).should("have.text", expectedText);
    }


    // to assert a text field is masked
    assertMaskedField(selector: string) {
        return cy.get(selector).should("have.attr", "type", "password");
    }

    //to assert current url
    assertUrl(url:string) {
        cy.url().should("eq",url)
    }
}