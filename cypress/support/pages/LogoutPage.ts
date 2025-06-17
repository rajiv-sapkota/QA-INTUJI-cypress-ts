import {
//   
  AssertHelpers,
  ClickHelpers,
  
} from "../helpers";

export class LogoutPage {
  private readonly hamburgerIconLocator = "#react-burger-menu-btn";
  private readonly loginLinkLocator = "#logout_sidebar_link";
  private readonly errorLocator = '[data-test="error"]';

  
  private assertHelpers = new AssertHelpers();
  private clickHelpers = new ClickHelpers();
  

  clickHamburgerIcon(): void {
    this.clickHelpers.clickButton(this.hamburgerIconLocator);
  }

  clickLogoutLink(): void {
    this.clickHelpers.clickButton(this.loginLinkLocator);
  }

  assertSuccessfullLogout(): void {
    this.assertHelpers.assertUrl("https://www.saucedemo.com/");
  }

  assertConformationMessage(message: string): void {
    cy.contains(message);
  }

  assertErrorMessage(): void {
    this.assertHelpers.assertVisibleText(
      this.errorLocator,
      "Epic sadface: You can only access '/inventory.html' when you are logged in."
    );
  }
}
