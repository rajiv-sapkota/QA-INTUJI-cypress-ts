export class Footer {
  private readonly expectedLabels = ["Twitter", "Facebook", "LinkedIn"];

  //===click methods===

  //===assert methods===

  assertSocialIconsVisible(): void {
    cy.get(".social").each((item) => {
      cy.wrap(item).should("be.visible");
    });
  }

  assertSocialIconsAreClickable(): void {
    cy.get("ul.social li a")
      .should("have.length", 3)
      .each((item) => {
        cy.wrap(item).should("have.attr", "href");
      });
  }

  assertTextLabelsOfIcons(): void {
    cy.get("ul.social li a").each((link, index) => {
      cy.wrap(link).contains(this.expectedLabels[index]);
    });
  }

  assertSocialIcons(): void {
    cy.get("ul.social li a")
      .should("have.length", 3)
      .each((link, index) => {
        cy.wrap(link)
          .should("be.visible")
          .and("have.attr", "href")
          .and("contain.text", this.expectedLabels[index]);
      });
  }
}

