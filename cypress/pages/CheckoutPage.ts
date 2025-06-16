export class CheckoutPage {
  private readonly checkoutButtonLocator = "#checkout";
  private readonly firstNameLocator = "#first-name";
  private readonly lastNameLocator = "#last-name";
  private readonly zipCodeButtonLocator = "#postal-code";
  private readonly continueButtonLocator = "#continue";
  private readonly assertTextLocatorCheckout = '[data-test="title"]';
  private readonly cartButtonLocator = '[data-test="shopping-cart-link"]';
  private readonly assertTextLocatorCheckoutOverview = '[data-test="title"]';
  private readonly finishButtonLocator = "#finish";
  private readonly successfulOrderMessageLocator =
    '[data-test="complete-header"]';
  private readonly errorMessageLocator = '[data-test="error"]';


  // === click methods====
  
  clickCheckOutButton(): void {
    cy.get(this.checkoutButtonLocator).click();
  }
  clickContinueButton(): void {
    cy.get(this.continueButtonLocator).click();
  }
  clickCartButton(): void {
    cy.get(this.cartButtonLocator).click();
  }
  clickFinishButton(): void {
    cy.get(this.finishButtonLocator).click();
  }
  typeFirstName(firstName?: string): void {
    if (firstName) {
      cy.get(this.firstNameLocator).type(firstName);
    } else {
      cy.get(this.firstNameLocator).clear();
    }
  }
  
  ///=== type methods ===
  
  typeLastName(lastName?: string): void {
    if (lastName) {
      cy.get(this.lastNameLocator).type(lastName);
    } else {
      cy.get(this.lastNameLocator).clear();
    }
  }
  typePostalCode(postalCode?: string): void {
    if (postalCode) {
      cy.get(this.zipCodeButtonLocator).type(postalCode);
    } else {
      cy.get(this.zipCodeButtonLocator).clear();
    }
  }

  // === Assertions ===
  
  assertUserIsInCheckoutPage(): void {   //assert that user is in checkout page
    cy.get(this.assertTextLocatorCheckout).should(
      "have.text",
      "Checkout: Your Information"
    );
  }

  assertUserInCheckoutOverview(): void {  //assert use is in checkout overview
    cy.get(this.assertTextLocatorCheckoutOverview).should(
      "have.text",
      "Checkout: Overview"
    );
  }
  
  assertSuccessText(): void {  // assert success text for successful order
    cy.get(this.successfulOrderMessageLocator)
      .should("be.visible")
      .should("have.text", "Thank you for your order!");
  }
  asserErrorMessage(): void { //assert error message
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "All fields are Required");
  }

  assertErrorMessageEmptyFirstName(): void {  // assert error message for empty firstname field
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: First Name is required");
  }

  assertErrorMessageEmptyLastName(): void {    // assert error message for empty last name
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: Last Name is required");
  }
  assertErrorMessageEmptyZipCode(): void {  //assert error message for empty zip code
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: Postal Code is required");
  }
}