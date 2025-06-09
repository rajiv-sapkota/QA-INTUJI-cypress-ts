import { text } from "stream/consumers";
import { Products } from "../pages/Products";

const products = new Products();
const filterButtonSelector = '[data-test="active-option"]';



describe("Tests for Products Page", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });

  it("TC-PRODUCTS-101:Products page is accessible", () => {
    products.assertUrl("https://www.saucedemo.com/inventory.html");
  });

  it("TC-PRODUCTS:Products Page Title is Visible", () => {
    products.assertPageTitle("Products");
  });

  it("TC:PRODUCTS:Tests for Default Filter value", () => {
    products.assertLoadedFilterValue(filterButtonSelector, "Name (A to Z)");
  });

  it("TC-PRODUCTS-009:Tests for all Product Details", () => {
    products.assertAllProductDetails();
  });

  it("TC-PRODUCTS-007:Tests if products can be accessed through Product Label", () => {
    products.clickProductName();
    products.assertNavigateProduct();
  });

  it("TC-PRODUCTS-008:Tests if products can be accessed through Product Image", () => {
    products.clickProductImage();
    products.assertNavigateProduct();
  });

  it("TC-PRODUCTS-005:Test Price low to high filter works", () => {
      products.selectFilterOption("Price (low to high)");
      products.assertLoadedFilterValue(
        filterButtonSelector,
        "Price (low to high)"
      );
    products.getPrices().then(($el) => {
      const innerText = (el) => el.innerText;
      const firstWord = (text) => text.split(" ")[0];
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const prices = Cypress._.map($el, (el) =>
        parseFloat(justDigits(firstWord(innerText(el))))
      );
      // confirm the "prices" array is already sorted
      const sorted = Cypress._.sortBy(prices);
      expect(sorted).to.deep.equal(prices);
      return prices;
    });
  });
  
    it.only("TC-PRODUCTS-006:Test Price high to low filter works", () => {
    products.selectFilterOption("Price (high to low)");
    products.assertLoadedFilterValue(filterButtonSelector,"Price (high to low)")
    
    products.getPrices().then(($el) => {
      const innerText = (el) => el.innerText;
      const firstWord = (text) => text.split(" ")[0];
      const justDigits = (str) => str.replace(/[^0-9.]/g, "");
      const prices = Cypress._.map($el, (el) =>
        parseFloat(justDigits(firstWord(innerText(el))))
        );
        
      // confirm the "prices" array is already sorted
        const sorted = Cypress._.sortBy(prices);
        console.log(sorted)
        const sortedDesc=sorted.reverse()
      expect(sorted).to.deep.equal(prices);
      return prices;
    });
        
  });
});


