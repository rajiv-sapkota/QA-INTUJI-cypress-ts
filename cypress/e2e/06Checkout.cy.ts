import { generateFakeuser } from "../fakerData/data";
import { CheckoutPage } from "../support/pages/CheckoutPage";
const checkout = new CheckoutPage();
import { Faker } from "@faker-js/faker/.";

const user = generateFakeuser();

describe("Checkout Tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    cy.get(".btn_inventory").eq(1).click();
    cy.get(".btn_inventory").eq(2).click();
    checkout.clickCartButton();
  });

  it("TC-CHECKOUT-101:Tests Successful Checkout With Valid Creds", () => {
    checkout.clickCheckOutButton();
    checkout.typeFirstName(user.firstName);
    checkout.typeLastName(user.lastName);
    checkout.typePostalCode(user.zipCode);
    checkout.clickContinueButton();
    checkout.assertUserInCheckoutOverview();
    checkout.clickFinishButton();
    checkout.assertSuccessText();
  });

  it("TC-CHECKOUT-102:Tests Checkout With All Empty Fields", () => {
    checkout.clickCheckOutButton();
    checkout.typeFirstName();
    checkout.typeLastName();
    checkout.typePostalCode();
    checkout.clickContinueButton();
    checkout.assertErrorMessageEmptyFirstName();
  });

  it("TC-CHECKOUT-103:Tests Checkout With only First Name Empty", () => {
    checkout.clickCheckOutButton();
    checkout.typeFirstName();
    checkout.typeLastName(user.lastName);
    checkout.typePostalCode(user.zipCode);
    checkout.clickContinueButton();
    checkout.assertErrorMessageEmptyFirstName();
  });

  it("TC-CHECKOUT-104:Tests Checkout With only Last Name Empty", () => {
    checkout.clickCheckOutButton();
    checkout.typeFirstName(user.firstName);
    checkout.typeLastName();
    checkout.typePostalCode(user.zipCode);
    checkout.clickContinueButton();
    checkout.assertErrorMessageEmptyLastName();
  });

  it("TC-CHECKOUT-105:Tests Checkout With only Postal Code Empty", () => {
    checkout.clickCheckOutButton();
    checkout.typeFirstName(user.firstName);
    checkout.typeLastName(user.lastName);
    checkout.typePostalCode();
    checkout.clickContinueButton();
    checkout.assertErrorMessageEmptyZipCode();
  });
});
