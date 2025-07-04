import {
  ClickHelpers,
  GetHelpers,
} from "../helpers";


export class Products {
  // === defining Selectors ===
  private readonly headingTextSelector = '[data-test="title"]';
  private readonly filterButtonSelector =
    '[data-test="product-sort-container"]';
  private readonly cardImageLocator = ".inventory_item_img";
  private readonly cardLocator = ".inventory_item";
  private readonly cardTitleLocator = '[data-test="inventory-item-name"]';
  private readonly cardDescriptionLocator = '[data-test="inventory-item-desc"]';
  private readonly cardPriceLocator = '[data-test="inventory-item-price"]';
  private readonly backToProductLocator = "#back-to-products";
  private readonly selectedProductTitle = ".inventory_details_name ";
  private readonly inventoryDetailsImgLocator =
    ".inventory_details_img_container";
  private readonly inventoryDetailsDescLocator =
    ".inventory_details_desc_container";
   
  
  //creating instances for helpers
 
  private clickHelpers = new ClickHelpers();
  private getHelpers = new GetHelpers();

  // === methods for gettingElement===

  getPrices() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  // === method for Clicking ===

  clickFilterButton(): void {
    this.clickHelpers.clickButton(this.filterButtonSelector).should("be.enabled").click();
  }

  clickAddToCart() {
    return this.clickHelpers.clickByText("Add to cart");
  }

  clickProductName() {
    return this.clickHelpers.clickFirstElement(this.cardTitleLocator);
  }

  clickProductImage() {
    return this.clickHelpers.clickLink(this.cardImageLocator);
  }

  selectFilterOption(option: string): void {
    cy.get(this.filterButtonSelector).select(option);
  }

  // ===methods for Assertions ===

  assertPageTitle(expectedTitle: string): void {
    cy.get(this.headingTextSelector)
      .should("have.text", expectedTitle)
      .and("be.visible");
  }

  assertProductsPageUrl(): void {
    this.getHelpers.getUrl().should("eq", "https://www.saucedemo.com/inventory.html");
  }

  assertLoadedFilterValue(locator: string, value: string): void {
    cy.get(locator).should("have.text", value);
  }

  assertAllProductDetails(): boolean {
    cy.get(this.cardLocator).each((element) => {
      cy.wrap(element).find(this.cardTitleLocator).should("be.visible");
      cy.wrap(element).find(this.cardImageLocator).should("be.visible");
      cy.wrap(element).find(this.cardDescriptionLocator).should("be.visible");
      cy.wrap(element).find(this.cardPriceLocator).should("be.visible");
      cy.wrap(element).contains("button", "Add to cart").should("be.visible");
    });
    return true;
  }

  assertNavigateProduct(): void {
    cy.get(this.backToProductLocator).should("be.visible");
    cy.get(this.inventoryDetailsImgLocator).should("be.visible");
    cy.get(this.inventoryDetailsDescLocator).should("be.visible");
  }

  assertItemsOnCart(): void {
    cy.get(".shopping_cart_badge")
      .should("be.visible")
      .should("have.text", "1");
  }
}
