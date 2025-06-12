
import { CheckoutPage } from "../pages/CheckoutPage";
const checkout=new CheckoutPage()

describe("Checkout Tests", () => {
    beforeEach(() => {
        cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"))
        cy.get(".btn_inventory").eq(1).click()
        cy.get(".btn_inventory").eq(2).click();
        checkout.clickCartButton()
    })

    it("TC-CHECKOUT-101:Tests Successful Checkout With Valid Creds", () => {
        checkout.clickCheckOutButton()
        checkout.typeFirstName("Rajiv")
        checkout.typeLastName("Sapkota")
        checkout.typePostalCode("12345")
        checkout.clickContinueButton();
        checkout.assertUserInCheckoutOverview();
        checkout.clickFinishButton();
        checkout.assertSuccessText()
    })

    it("TC-CHECKOUT-102:Tests Checkout With All Empty Fields", () => {
      checkout.clickCheckOutButton();
      checkout.typeFirstName();
      checkout.typeLastName();
      checkout.typePostalCode();
        checkout.clickContinueButton();
        checkout.asserErrorMessage()
    });

    it("TC-CHECKOUT-103:Tests Checkout With only First Name Empty", () => {
      checkout.clickCheckOutButton();
      checkout.typeFirstName();
      checkout.typeLastName("sfkjhas");
      checkout.typePostalCode("12345");
      checkout.clickContinueButton();
      checkout.assertErrorMessageEmptyFirstName();
    });

    it("TC-CHECKOUT-104:Tests Checkout With only Last Name Empty", () => {
      checkout.clickCheckOutButton();
      checkout.typeFirstName("Rajiv");
      checkout.typeLastName();
      checkout.typePostalCode("12345");
      checkout.clickContinueButton();
      checkout.assertErrorMessageEmptyLastName();
    });

    it("TC-CHECKOUT-105:Tests Checkout With only Postal Code Empty", () => {
      checkout.clickCheckOutButton();
      checkout.typeFirstName("Rajiv");
      checkout.typeLastName("Sapkota");
      checkout.typePostalCode();
      checkout.clickContinueButton();
      checkout.assertErrorMessageEmptyZipCode();
    });














})