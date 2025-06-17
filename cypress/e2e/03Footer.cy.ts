import { Footer } from "../support/pages/Footer";
const footer = new Footer();

describe("Tests for Footer", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });

  it("TC-FOOTER-101:Test if Footer is visible", () => {
    footer.assertSocialIconsVisible();
  });

  it("TC-FOOTER-103:Test if icons are clickable", () => {
    footer.assertSocialIconsAreClickable();
  });
  it("TC-FOOTER-103:Test if Icons have Text", () => {
    footer.assertTextLabelsOfIcons();
  });
});
