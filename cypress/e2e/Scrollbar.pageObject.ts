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

  // position is counted from the bottom right corner of the scrolled area
  pressAndMoveInnerElementFromBottomRight(right: number, bottom: number) {
    this.innerElement.then((el) => {
      const { width, height } = el[0].getBoundingClientRect();
      const position = { x: width - right, y: height - bottom };
      // rails hover state is computed from the previous mousemove, so hover twice before pressing
      cy.wrap(el)
        .realHover({ position })
        .realHover({ position })
        .realMouseDown({ position })
        .realMouseMove(position.x, position.y - 1, { keepMouseDownButton: "left" })
        .realMouseUp({ position: { x: position.x, y: position.y - 1 } });
    });
    return this;
  }

  scrollToEnd() {
    this.innerElement.then((el) => {
      el[0].scrollTo({ top: el[0].scrollHeight, left: el[0].scrollWidth, behavior: "instant" });
    });
    return this;
  }

  hasScrollbarsEndingBeforeCorner({ yWidth, xHeight }: { yWidth: number; xHeight: number }) {
    this.outerElement.should(([outer]) => {
      const inner = outer.ownerDocument.querySelector<HTMLElement>(".light-scrollbar-wrapper-inside") as HTMLElement;
      const cssVar = (name: string) => parseFloat(outer.style.getPropertyValue(name));
      const yEnd = cssVar("--ls-bar-y-top") + parseFloat(window.getComputedStyle(outer, "after").height);
      const xEnd = cssVar("--ls-bar-x-left") + parseFloat(window.getComputedStyle(outer, "before").width);

      expect(yEnd, "y scrollbar end").to.be.closeTo(inner.clientHeight - xHeight, 0.5);
      expect(xEnd, "x scrollbar end").to.be.closeTo(inner.clientWidth - yWidth, 0.5);
    });
    return this;
  }

  hasScroll({ top, left }: { top: "start" | "moved"; left: "start" | "moved" }) {
    // waits for smooth scrolling to settle
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    this.innerElement.should((el) => {
      expect(el[0].scrollTop > 0, "scrollTop moved").to.equal(top === "moved");
      expect(el[0].scrollLeft > 0, "scrollLeft moved").to.equal(left === "moved");
    });
    return this;
  }

  hoverBottomOfBody() {
    this.bodyElement.realHover({ position: "bottom" });
    return this;
  }
}
