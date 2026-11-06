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
      cy.wrap(el)
        .realHover({ position })
        .realMouseDown({ position })
        .realMouseMove(position.x, position.y - 1, { keepMouseDownButton: "left" })
        .realMouseUp({ position: { x: position.x, y: position.y - 1 } });
    });
    return this;
  }

  hoverCenterOfInnerElement() {
    this.innerElement.realHover({ position: "center" });
    return this;
  }

  // presses the middle of the given thumb and drags it along its axis by `distance` px;
  // the thumb is hovered exactly once before pressing - like a fast user would do
  dragThumb(axis: "x" | "y", distance: number) {
    this.innerElement.then((el) => {
      const inner = el[0];
      const outer = inner.ownerDocument.querySelector<HTMLElement>(".light-scrollbar-wrapper-outside") as HTMLElement;
      const cssVar = (name: string) => parseFloat(outer.style.getPropertyValue(name)) || 0;
      const { width, height } = inner.getBoundingClientRect();
      const start =
        axis === "y"
          ? { x: width - 3, y: cssVar("--ls-bar-y-top") + cssVar("--ls-bar-y-height") / 2 }
          : { x: cssVar("--ls-bar-x-left") + cssVar("--ls-bar-x-width") / 2, y: height - 3 };
      const steps = 5;
      const at = (step: number) => {
        const offset = (distance * step) / steps;
        return axis === "y" ? { x: start.x, y: start.y + offset } : { x: start.x + offset, y: start.y };
      };

      cy.wrap(el).realHover({ position: start }).realMouseDown({ position: start });
      for (let step = 1; step <= steps; step++) {
        const { x, y } = at(step);
        cy.wrap(el).realMouseMove(x, y, { keepMouseDownButton: "left" });
      }
      cy.wrap(el).realMouseUp({ position: at(steps) });
    });
    return this;
  }

  getScrollPosition() {
    // waits for smooth scrolling to settle
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    return this.innerElement.then((el) => ({ top: el[0].scrollTop, left: el[0].scrollLeft }));
  }

  hasScrollPosition({ top, left }: { top?: number; left?: number }) {
    // waits for smooth scrolling to settle
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    this.innerElement.should((el) => {
      if (top !== undefined) expect(el[0].scrollTop, "scrollTop").to.be.closeTo(top, 1);
      if (left !== undefined) expect(el[0].scrollLeft, "scrollLeft").to.be.closeTo(left, 1);
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
