export class Header {
  // === defining Selectors ===
  private readonly hamburgerIconSelector = "#react-burger-menu-btn";
  private readonly sidebarSelector = "#inventory_sidebar_link";
    private readonly cartIconSelector = "#shopping_cart_container";
    private readonly allItemsSelector="#inventory_sidebar_link"

  // === methods for Navigation ===

  // === methods for Typing ===

  // === method for Clicking ===
  clickHamburgerIcon(): void {
    cy.get(this.hamburgerIconSelector).click();
    }
    clickAProduct(locator: string): void{
        cy.get(locator).click()
    }
    clickOnAllItems(): void{
        cy.get(this.allItemsSelector).click()
        
    }

    clickOnAnElement(locator: string): void{
        cy.get(locator).click()
    }

  // ===methods for Assertions ===
  assertSidebarOpens(): void {
    cy.get(this.sidebarSelector).should("be.focused");
  }

  assertHamburgerIconToBeVisible(): void {
    cy.get(this.hamburgerIconSelector).should("be.visible");
  }
  assertCartIconisDisplayed(): void {
    cy.get(this.cartIconSelector).should("be.visible");
    }
    
    assertDisplayedText(locator: string, text: string): void{
        cy.get(locator).should("have.text", text);
    }
    assertUrl(url: string): void{
        cy.url().should("eq",url)
    }
}

