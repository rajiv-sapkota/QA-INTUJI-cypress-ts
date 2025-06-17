import { generateFakeuser } from "../../fakerData/data";
import {
  TypingHelpers,
  AssertHelpers,
  ClickHelpers,
  
} from "../helpers";

import { Faker } from "@faker-js/faker/.";

const user = generateFakeuser();

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

  private typingHelpers = new TypingHelpers();
  private assertHelpers = new AssertHelpers();
  private clickHelpers = new ClickHelpers();
  

  ///=== type methods ===

  typeLastName(lastName?: string): this {
    if (lastName) {
      this.typingHelpers.typeText(this.lastNameLocator, lastName);
    }
    return this;
  }
  typePostalCode(postalCode?: string): this {
    if (postalCode) {
      this.typingHelpers.typeText(this.zipCodeButtonLocator, postalCode);
    }
    return this;
  }

  typeFirstName(firstName?: string): this {
    if (firstName) {
      this.typingHelpers.typeText(this.firstNameLocator, firstName);
    }
    return this;
  }

  // === click methods====

  clickCheckOutButton(): void {
    this.clickHelpers.clickButton(this.checkoutButtonLocator);
  }
  clickContinueButton(): void {
    this.clickHelpers.clickButton(this.continueButtonLocator);
  }
  clickCartButton(): void {
    this.clickHelpers.clickButton(this.cartButtonLocator);
  }
  clickFinishButton(): void {
    this.clickHelpers.clickButton(this.finishButtonLocator);
  }

  // === Assertions ===

  assertUserIsInCheckoutPage(): void {
    //assert that user is in checkout page
    this.assertHelpers.assertVisibleText(
      this.assertTextLocatorCheckout,
      "Checkout: Your Information"
    );
  }

  assertUserInCheckoutOverview(): void {
    //assert use is in checkout overview
    this.assertHelpers.assertVisibleText(
      this.assertTextLocatorCheckoutOverview,
      "Checkout: Overview"
    );
  }

  assertSuccessText(): void {
    // assert success text for successful order
    this.assertHelpers.assertVisibleText(
      this.successfulOrderMessageLocator,
      "Thank you for your order!"
    );
  }
  asserErrorMessage(): void {
    //assert error message
    this.assertHelpers.assertVisibleText(
      this.errorMessageLocator,
      "All fields are Required"
    );
  }

  assertErrorMessageEmptyFirstName(): void {
    // assert error message for empty firstname field
    this.assertHelpers.assertVisibleText(
      this.errorMessageLocator,
      "Error: First Name is required"
    );
  }

  assertErrorMessageEmptyLastName(): void {
    // assert error message for empty last name
    this.assertHelpers.assertVisibleText(
      this.errorMessageLocator,
      "Error: Last Name is required"
    );
      
  }
  assertErrorMessageEmptyZipCode(): void {
    //assert error message for empty zip code
    this.assertHelpers
      .assertVisibleText(
        this.errorMessageLocator,
        "Error: Postal Code is required"
      )
      
  }
}
