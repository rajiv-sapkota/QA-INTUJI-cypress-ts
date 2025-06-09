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

    // === methods for gettingElement===

    getPrices() {
        return cy.get('[data-test="inventory-item-price"]');
    }

    
    
    
    // === method for Clicking ===

    clickFilterButton(): void {
        cy.get(this.filterButtonSelector).should("be.enabled").click();
    }

    clickAddToCart(): void {
        cy.contains("Add to Cart").click();
    }

    clickProductName(): void {
        cy.get(this.cardTitleLocator).eq(1).click();
    }
    clickProductImage(): void {
        cy.get(this.cardImageLocator).eq(1).click()
    }
    selectFilterOption(option: string): void{
        cy.get(this.filterButtonSelector).select(option)
    }

    // ===methods for Assertions ===

    assertPageTitle(expectedTitle: string): void {
        cy.get(this.headingTextSelector)
            .should("have.text", expectedTitle)
            .and("be.visible");
    }

    assertUrl(url: string): void {
        cy.url().should("eq", url);
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





}