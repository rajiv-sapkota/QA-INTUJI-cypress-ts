import { Header } from "../pages/Header";
const header = new Header();
describe("Tests for header", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });

  it("TC-HEADER-102:Tests if Hamburger Icon is visible and working", () => {
    header.assertHamburgerIconToBeVisible();
    header.clickHamburgerIcon();
    header.assertSidebarOpens();
  });

  it("TC-HEADER-102:Tests if Sidebar Opens ", () => {
    header.clickHamburgerIcon();
    header.assertSidebarOpens();
  });

  it("TC-HEADER-103:Tests if Cart Icon is Visible ", () => {
    header.assertCartIconisDisplayed();
  });

  it("TC-HEADER-104:Test if All Items link on Sidebar Works", () => {
    header.clickAProduct("#item_4_title_link");
    header.assertDisplayedText("#back-to-products", "Back to products");
    header.clickHamburgerIcon();
    header.clickOnAllItems();
    header.assertUrl("https://www.saucedemo.com/inventory.html");
  });

  it("TC-HEADER-105:Test if users can acces about page from side bar", () => {
    header.clickHamburgerIcon();
    cy.contains("About")
      .should("have.attr", "href")
      .and("include", "https://saucelabs.com/");
  });

  it.only("TC-HEADER-106):Test if Logout Function Works", () => {
    header.clickHamburgerIcon();
    header.clickOnAnElement("#logout_sidebar_link");
    header.assertUrl("https://www.saucedemo.com/");
  });
    
    
});
