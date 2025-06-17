
import {
  
  ClickHelpers,
  GetHelpers,
} from "../helpers";

export class CartPage   {
  // === defining Selectors ===

  private readonly addToCartLocator = ".btn_primary ";
  private readonly removeButtonLocator = ".btn_secondary";
  private readonly cartIconLocator = '[data-test="shopping-cart-link"]';
  private readonly badgeInCartLocator = '[data-test="shopping-cart-badge"]';
  private readonly addToCartSingle = "#add-to-cart-sauce-labs-backpack";
  private readonly yourCartLocator = '[data-test="title"]';
  private readonly burgerIconLocator = "#react-burger-menu-btn";
  private readonly logoutLinkLocator = "#logout_sidebar_link";
  private readonly cartPageURL = "https://www.saucedemo.com/cart.html/";
  private readonly btn_inventorySelector = ".btn_inventory";
  private readonly cartBadgeSelector = ".shopping_cart_badge";



  private clickHelpers = new ClickHelpers();
  private getHelpers = new GetHelpers();

  // === methods for Navigation ===
  visitCartPage(): void {
    this.getHelpers.visitUrl(this.cartPageURL);
  }

  // === methods for Typing ===

  // === method for Clicking ===
  clickAddToCart(): void {
    this.clickHelpers.clickButton(this.addToCartSingle);
  }

  clickCartIcon(): void {
    this.clickHelpers.clickLink(this.cartIconLocator);
  }

  clickRemoveButton(): void {
    this.clickHelpers.clickByText("Remove");
  }

  clickBurgerIcon(): void {
    this.clickHelpers.clickButton(this.burgerIconLocator);
  }

  clickLogout(): void {
    this.clickHelpers.clickButton(this.logoutLinkLocator);
  }

  addAllItemsToCart(): void {
    cy.get(this.addToCartLocator).each((item) => {
      cy.wrap(item).click();
    });
  }

  // ===methods for Assertions ===

  assertEmptyCart(): void {
    //asserts that the cart is empty
    cy.get(this.badgeInCartLocator).should("not.exist");
  }

  assertCartItemCount(expectedCount: string): void {
    //asserts the count of item in a cart
    cy.get(this.badgeInCartLocator).should(
      "have.text",
      expectedCount.toString()
    );
  }

  assertRemoveButton(): void {
    //assert that a button has text "Remove"
    cy.get(this.removeButtonLocator).should("have.text", "Remove");
  }

  assertYourCartDisplayed(): void {
    //assert user is in cart page
    cy.get(this.yourCartLocator).should("be.visible");
  }

  assertProductDetailsInCart(
    // assert product details in product cards
    parentSelector: string,
    childSelectors: string[] = []
  ): void {
    cy.get(parentSelector).within(() => {
      childSelectors.forEach((selector: string) => {
        cy.get(selector).should("be.visible");
      });
    });
  }

  assertNoAccessToCartWithoutLogin(expectedText: string): void {
    // assert users have no access to cart without login
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("have.text", expectedText);
  }

  addRemoveProductToCart(): this {
    //assert cart item count is udaated dynamically
    cy.get(this.btn_inventorySelector)
      .each(($btn, index) => {
        cy.wrap($btn).should("have.text", "Add to cart").click();
        const expectedCount = (index + 1).toString();
        cy.get(this.cartBadgeSelector).should("have.text", expectedCount);
      })
      .then(($buttons) => {
        const total = $buttons.length;
        cy.get(this.btn_inventorySelector).each(($btn, index) => {
          cy.wrap($btn).should("have.text", "Remove").click();
          const remaining = total - (index + 1);
          if (remaining > 0) {
            cy.get(this.cartBadgeSelector).should(
              "have.text",
              remaining.toString()
            );
          } else {
            cy.get(this.cartBadgeSelector).should("not.exist");
          }
        });
      });
    return this;
  }
}
