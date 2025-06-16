export class LogoutPage{

    private readonly hamburgerIconLocator='#react-burger-menu-btn'
    private readonly loginLinkLocator = '#logout_sidebar_link'

    clickHamburgerIcon(): void{
        cy.get(this.hamburgerIconLocator).click()
    }

    clickLogoutLink(): void{
        cy.get(this.loginLinkLocator).click()
    }

    assertSuccessfullLogout(): void{
        cy.url().should("eq", "https://www.saucedemo.com/")
    }

    assertConformationMessage(message:string): void{
        cy.contains(message)
    }

    assertErrorMessage(locator:string,expectedMessage: string): void{
        cy.get(locator).should("have.text",expectedMessage)
        
    }




}