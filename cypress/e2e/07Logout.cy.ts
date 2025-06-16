import { LogoutPage } from "../pages/LogoutPage";

const logout=new LogoutPage()

describe("Logout Tests", () => {
    beforeEach(() => {
        cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"))
    })

    it("TC-LOGOUT-101:Tests for successful Logout", () => {
        logout.clickHamburgerIcon()
        logout.clickLogoutLink()
        logout.assertSuccessfullLogout()
    })

    it("TC-LOGOUT-102:Tests if users are asked for Confirmation", () => {
        logout.clickHamburgerIcon()
        logout.clickLogoutLink()
        logout.assertConformationMessage("Do you really want to logout?")
        
    })
    
    it("TC-LOGOUT-103:Tests if login session expires after logout", () => {
      logout.clickHamburgerIcon();
        logout.clickLogoutLink();
        cy.go("back")
        cy.url().should("eq", "https://www.saucedemo.com/");
        logout.assertErrorMessage('[data-test="error"]',"Epic sadface: You can only access '/inventory.html' when you are logged in.");
    });


})