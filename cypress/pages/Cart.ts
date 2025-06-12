



export class CartPage {
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

  // === methods for Navigation ===
  visitCartPage(): void {
    cy.visit(this.cartPageURL);
  }

  // === methods for Typing ===

  // === method for Clicking ===
  clickAddToCart(): void {
    cy.get(this.addToCartSingle).click();
  }

  clickCartIcon(): void {
    cy.get(this.cartIconLocator).click();
  }

  clickRemoveButton(): void {
    cy.contains("Remove").click();
  }

  clickBurgerIcon(): void {
    cy.get(this.burgerIconLocator).click();
  }

  clickLogout(): void {
    cy.get(this.logoutLinkLocator).click();
  }

  addAllItemsToCart(): void {
    cy.get(this.addToCartLocator).each((item) => {
      cy.wrap(item).click();
    });
  }

  // ===methods for Assertions ===

  assertEmptyCart(): void {
    cy.get(this.badgeInCartLocator).should("not.exist");
  }

  assertCartItemCount(expectedCount: string): void {
    cy.get(this.badgeInCartLocator).should(
      "have.text",
      expectedCount.toString()
    );
  }
  assertRemoveButton(): void {
    cy.get(this.removeButtonLocator).should("have.text", "Remove");
  }
  assertYourCartDisplayed(): void {
    cy.get(this.yourCartLocator).should("be.visible");
  }

  assertProductDetailsInCart(
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
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("have.text", expectedText);
  }
  addRemoveProductToCart(): this {
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
            cy.get(this.cartBadgeSelector).should("have.text", remaining.toString());
          } else {
            cy.get(this.cartBadgeSelector).should("not.exist");
          }
        });
      });
    return this;
  }
}
