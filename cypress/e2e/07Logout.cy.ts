import { LogoutPage } from "../support/pages/LogoutPage";

const logout = new LogoutPage();

describe("Logout Tests", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });

  it("TC-LOGOUT-101:Tests for successful Logout", () => {
    logout.clickHamburgerIcon();
    logout.clickLogoutLink();
    logout.assertSuccessfullLogout();
  });

  it.skip("TC-LOGOUT-102:Tests if users are asked for Confirmation", () => {
    logout.clickHamburgerIcon();
    logout.clickLogoutLink();
    logout.assertConformationMessage("Do you really want to logout?");
  });

  it("TC-LOGOUT-103:Tests if login session expires after logout", () => {
    logout.clickHamburgerIcon();
    logout.clickLogoutLink();
    cy.go("back");
    logout.assertSuccessfullLogout();
    logout.assertErrorMessage();
  });
});
