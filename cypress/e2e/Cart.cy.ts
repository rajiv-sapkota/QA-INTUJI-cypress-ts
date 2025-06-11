import { CartPage } from "../pages/Cart";
import { Products } from "../pages/Products";

const cart = new CartPage();
const product = new Products();

describe("Tests for Cart Module", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });

  it("TC-CART-001:Tests if Users can add an Item to cart", () => {
    cart.clickAddToCart();
    cart.assertCartItemCount("1");
    cart.assertRemoveButton();
  });

  it("TC-CART-002:Tests Users can add multiple items to cart", () => {
    cart.addAllItemsToCart();
    cart.assertCartItemCount("6");
  });

  it("TC-CART-003:Tests if uesrs can view products in cart", () => {
    cart.clickAddToCart();
    cart.clickCartIcon();
    cart.assertYourCartDisplayed();
    cart.assertProductDetailsInCart(".cart_list", [
      ".cart_quantity_label",
      ".cart_desc_label",
      ".cart_quantity",
      ".cart_item_label",
      ".inventory_item_desc",
      ".inventory_item_price",
      ".btn_secondary",
    ]);
  });

  it("TC-CART-004:Test if users can remove items from cart in Products Page", () => {
    cart.clickAddToCart();
    cart.assertCartItemCount("1");
    cart.clickRemoveButton();
    cart.assertEmptyCart();
  });

  it("TC-CART-005:Tests if users can remove product from Cart Page", () => {
    cart.clickAddToCart();
    cart.clickCartIcon();
    cart.assertYourCartDisplayed();
    cart.assertCartItemCount("1");
    cart.clickRemoveButton();
    cart.assertEmptyCart();
    cy.go("back");
    cart.assertEmptyCart();
  });

  it("TC-CART-005:Tests if cart items persist while navigating", () => {
    cart.clickAddToCart();
    cart.assertCartItemCount("1");
    cy.go("back");
    cy.go("forward");
    cart.assertCartItemCount("1");
  });

  it("TC-CART-008:Tests if item count updates correctily ", () => {
    cart.clickAddToCart();
    cart.assertCartItemCount("1");
    cart.clickRemoveButton();
    cart.assertEmptyCart();
  });

  it("TC-CART-010:Tests if added items persisit when logged out", () => {
    cart.addAllItemsToCart();
    cart.clickBurgerIcon();
    cart.clickLogout();
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    cart.assertCartItemCount("6");
  });
 
});

describe("Cart Single", () => {
  it.only("TC-CART-011:Tests cart not accessible without login", () => {
    cy.visit("https://www.saucedemo.com/cart.html", {
      failOnStatusCode: false,
    });
    cart.assertNoAccessToCartWithoutLogin("Epic sadface: You can only access '/cart.html' when you are logged in.");
  });
});
