import { BasePage } from "./BasePage.pageObject";

export class ScrollbarBaseObject extends BasePage {
  isVisible() {
    this.container.should("be.visible");
    return this;
  }

  matchImage() {
    cy.then(() => this.container.matchImage());
    return this;
  }

  hasOriginalHTMLStructure = (el: HTMLElement, wrapper: HTMLElement, standaloneWrapper: HTMLElement) => {
    cy.get(".my-scrollbar")
      .should("have.attr", "style", "border-color: red;")
      .then((element) => {
        expect(element[0]).to.equal(el);
      });
    cy.get(".my-wrapper")
      .then((element) => {
        expect(element[0]).to.equal(wrapper);
        return element;
      })
      .should("have.attr", "style", "border: 1px solid green;")
      .children()
      .eq(0)
      .should("have.class", "my-scrollbar");
    cy.get(".my-wrapper-standalone")
      .should("have.attr", "style", "border: 1px solid teal;")
      .then((element) => {
        expect(element[0]).to.equal(standaloneWrapper);
      });
    return this;
  };

  hasScrollbarYShortGap(value: number) {
    cy.then(() => {
      expect(this.afterElementStyle.right).to.be.equal(`${value}px`);
    });
    return this;
  }

  hasScrollbarHeight(value: number) {
    cy.then(() => {
      expect(this.afterElementStyle.height).to.be.equal(`${value}px`);
    });
    return this;
  }

  hasScrollbarXShortGap(value: number) {
    cy.then(() => {
      expect(this.beforeElementStyle.bottom).to.be.equal(`${value}px`);
    });
    return this;
  }

  hasVisibleScrollbar() {
    cy.then(() => {
      expect(this.beforeElementStyle.backgroundColor).to.be.equal("rgb(203, 213, 225)");
      expect(this.afterElementStyle.backgroundColor).to.be.equal("rgb(203, 213, 225)");
    });
    return this;
  }

  hasNotVisibleScrollbar() {
    cy.then(() => {
      expect(this.beforeElementStyle.backgroundColor).to.be.equal("rgba(0, 0, 0, 0)");
      expect(this.afterElementStyle.backgroundColor).to.be.equal("rgba(0, 0, 0, 0)");
    });
    return this;
  }

  hoverOverOuterElement() {
    this.outerElement.realHover();
    return this;
  }

  hoverBottomOfBody() {
    this.bodyElement.realHover({ position: "bottom" });
    return this;
  }
}
