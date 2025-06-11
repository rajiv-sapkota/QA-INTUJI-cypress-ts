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

  assertUserIsInCheckoutPage(): void {
    cy.get(this.assertTextLocatorCheckout).should(
      "have.text",
      "Checkout: Your Information"
    );
  }

  assertUserInCheckoutOverview(): void {
    cy.get(this.assertTextLocatorCheckoutOverview).should(
      "have.text",
      "Checkout: Overview"
    );
  }
  assertSuccessText(): void {
    cy.get(this.successfulOrderMessageLocator)
      .should("be.visible")
      .should("have.text", "Thank you for your order!");
  }
  asserErrorMessage(): void {
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "All fields are Required");
  }

  assertErrorMessageEmptyFirstName(): void {
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: First Name is required");
  }

  assertErrorMessageEmptyLastName(): void {
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: Last Name is required");
  }
  assertErrorMessageEmptyZipCode(): void {
    cy.get(this.errorMessageLocator)
      .should("be.visible")
      .and("have.text", "Error: Postal Code is required");
  }
}