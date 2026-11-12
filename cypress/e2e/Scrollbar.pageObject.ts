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

  // middle of the thumb along the axis, `fromEdge` px from the container edge across it - relative to the inner element
  private thumbCenter(inner: HTMLElement, axis: "x" | "y", fromEdge: number) {
    const outer = inner.ownerDocument.querySelector<HTMLElement>(".light-scrollbar-wrapper-outside") as HTMLElement;
    const cssVar = (name: string) => parseFloat(outer.style.getPropertyValue(name)) || 0;
    const { width, height } = inner.getBoundingClientRect();
    return axis === "y"
      ? { x: width - fromEdge, y: cssVar("--ls-bar-y-top") + cssVar("--ls-bar-y-height") / 2 }
      : { x: cssVar("--ls-bar-x-left") + cssVar("--ls-bar-x-width") / 2, y: height - fromEdge };
  }

  hoverThumb(axis: "x" | "y") {
    this.innerElement.then((el) => {
      cy.wrap(el).realHover({ position: this.thumbCenter(el[0], axis, 3) });
    });
    return this;
  }

  // ::before - x thumb, ::after - y thumb
  hasScrollbarBackground({ x, y }: { x: string; y: string }) {
    this.outerElement.should(([outer]) => {
      const view = outer.ownerDocument.defaultView as Window;
      expect(view.getComputedStyle(outer, "::before").backgroundColor, "x scrollbar background").to.equal(x);
      expect(view.getComputedStyle(outer, "::after").backgroundColor, "y scrollbar background").to.equal(y);
    });
    return this;
  }

  // a single click (press + release, no move in between) at the very start of the axis strip:
  // y - top of the right edge, x - left of the bottom edge; `fromEdge` - distance from that edge across the axis
  clickAxisStart(axis: "x" | "y", fromEdge: number) {
    this.innerElement.then((el) => {
      const { width, height } = el[0].getBoundingClientRect();
      const position = axis === "y" ? { x: width - fromEdge, y: 1 } : { x: 1, y: height - fromEdge };
      cy.wrap(el).realHover({ position }).realMouseDown({ position }).realMouseUp({ position });
    });
    return this;
  }

  // a single click in the middle of the thumb
  clickThumb(axis: "x" | "y") {
    this.innerElement.then((el) => {
      const position = this.thumbCenter(el[0], axis, 3);
      cy.wrap(el).realHover({ position }).realMouseDown({ position }).realMouseUp({ position });
    });
    return this;
  }

  scrollTo({ top, left }: { top: number; left: number }) {
    this.innerElement.then((el) => {
      el[0].scrollTo({ top, left, behavior: "instant" });
    });
    return this;
  }

  // presses the middle of the given thumb and drags it along its axis by `distance` px;
  // the thumb is hovered exactly once before pressing - like a fast user would do.
  // `fromEdge` - how far from the container edge (across the axis) the press happens
  dragThumb(axis: "x" | "y", distance: number, fromEdge = 3) {
    this.innerElement.then((el) => {
      const start = this.thumbCenter(el[0], axis, fromEdge);
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

  // rail is drawn by the inner element pseudo-elements: ::before - x rail, ::after - y rail
  private railStyles(inner: HTMLElement) {
    const view = inner.ownerDocument.defaultView as Window;
    return { x: view.getComputedStyle(inner, "::before"), y: view.getComputedStyle(inner, "::after") };
  }

  hasNoRail() {
    this.innerElement.should(([inner]) => {
      const rail = this.railStyles(inner);
      expect(inner.className, "inner element classes").not.to.contain("light-scrollbar-rail");
      expect(rail.x.content, "x rail").to.equal("none");
      expect(rail.y.content, "y rail").to.equal("none");
    });
    return this;
  }

  // `xLength` / `yLength` are counted from the inner element size: e.g. `clientHeight - 6`
  hasRail({
    y,
    x,
  }: {
    y: { width: number; right: number; length: (inner: HTMLElement) => number };
    x: { height: number; bottom: number; length: (inner: HTMLElement) => number };
  }) {
    this.innerElement.should(([inner]) => {
      const rail = this.railStyles(inner);
      expect(rail.y.position, "y rail position").to.equal("fixed");
      expect(parseFloat(rail.y.width), "y rail width").to.be.closeTo(y.width, 0.01);
      expect(parseFloat(rail.y.right), "y rail right").to.be.closeTo(y.right, 0.01);
      expect(parseFloat(rail.y.top), "y rail top").to.equal(0);
      expect(parseFloat(rail.y.height), "y rail length").to.be.closeTo(y.length(inner), 0.5);
      expect(rail.x.position, "x rail position").to.equal("fixed");
      expect(parseFloat(rail.x.height), "x rail height").to.be.closeTo(x.height, 0.01);
      expect(parseFloat(rail.x.bottom), "x rail bottom").to.be.closeTo(x.bottom, 0.01);
      expect(parseFloat(rail.x.left), "x rail left").to.equal(0);
      expect(parseFloat(rail.x.width), "x rail length").to.be.closeTo(x.length(inner), 0.5);
    });
    return this;
  }

  // the inner element is the scroll container - its pseudo-elements stay in place only when they are
  // `position: fixed` and the outer element (`contain: layout`) is their containing block
  hasRailPinnedToOuterElement() {
    this.outerElement.should(([outer]) => {
      const view = outer.ownerDocument.defaultView as Window;
      expect(view.getComputedStyle(outer).contain, "outer element contain").to.contain("layout");
    });
    this.innerElement.should(([inner]) => {
      const rail = this.railStyles(inner);
      expect(rail.x.position, "x rail position").to.equal("fixed");
      expect(rail.y.position, "y rail position").to.equal("fixed");
    });
    return this;
  }

  hasNoRailContainment() {
    this.outerElement.should(([outer]) => {
      const view = outer.ownerDocument.defaultView as Window;
      expect(view.getComputedStyle(outer).contain, "outer element contain").to.equal("none");
    });
    return this;
  }

  hasRailBackground(color: string) {
    this.innerElement.should(([inner]) => {
      const rail = this.railStyles(inner);
      expect(rail.x.backgroundColor, "x rail background").to.equal(color);
      expect(rail.y.backgroundColor, "y rail background").to.equal(color);
    });
    return this;
  }

  // on the body - an ancestor of the scrollbar, the variables are inherited
  setCssVariables(variables: Record<string, string>) {
    this.bodyElement.then(([body]) => {
      Object.entries(variables).forEach(([name, value]) => body.style.setProperty(name, value));
    });
    return this;
  }

  // moves rail.css before index.css - the styles must not depend on the stylesheets order
  loadRailStylesBeforeCoreStyles() {
    this.bodyElement.then(([body]) => {
      const head = body.ownerDocument.head;
      const railStyles = head.querySelector('link[href$="rail.css"]') as HTMLLinkElement;
      head.insertBefore(railStyles, head.querySelector('link[href$="index.css"]'));
    });
    return this;
  }

  // inline on <html> - more specific than the library defaults declared on `:where(:root)`
  setRootCssVariables(variables: Record<string, string>) {
    this.bodyElement.then(([body]) => {
      const root = body.ownerDocument.documentElement;
      Object.entries(variables).forEach(([name, value]) => root.style.setProperty(name, value));
    });
    return this;
  }

  hasRootCssVariables(variables: Record<string, string>) {
    this.bodyElement.should(([body]) => {
      const root = body.ownerDocument.documentElement;
      const styles = (body.ownerDocument.defaultView as Window).getComputedStyle(root);
      Object.entries(variables).forEach(([name, value]) =>
        expect(styles.getPropertyValue(name).trim(), name).to.equal(value)
      );
    });
    return this;
  }

  hasScrollbarBorderRadius(value: string) {
    this.outerElement.should(([outer]) => {
      const view = outer.ownerDocument.defaultView as Window;
      expect(view.getComputedStyle(outer, "::before").borderRadius, "x scrollbar radius").to.equal(value);
      expect(view.getComputedStyle(outer, "::after").borderRadius, "y scrollbar radius").to.equal(value);
    });
    return this;
  }

  hasRailBorderRadius(value: string) {
    this.innerElement.should(([inner]) => {
      const rail = this.railStyles(inner);
      expect(rail.x.borderRadius, "x rail radius").to.equal(value);
      expect(rail.y.borderRadius, "y rail radius").to.equal(value);
    });
    return this;
  }

  hasScrollbarYWidth(value: number) {
    cy.then(() => {
      expect(this.afterElementStyle.width).to.be.equal(`${value}px`);
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

  // shown scrollbar has a length (::before width - x, ::after height - y), a hidden one has 0
  hasScrollbars({ x, y }: { x: "shown" | "hidden"; y: "shown" | "hidden" }) {
    this.outerElement.should(([outer]) => {
      const view = outer.ownerDocument.defaultView as Window;
      const xLength = parseFloat(view.getComputedStyle(outer, "::before").width);
      const yLength = parseFloat(view.getComputedStyle(outer, "::after").height);
      expect(xLength > 0, `x scrollbar ${x}`).to.equal(x === "shown");
      expect(yLength > 0, `y scrollbar ${y}`).to.equal(y === "shown");
    });
    return this;
  }

  hoverBottomOfBody() {
    this.bodyElement.realHover({ position: "bottom" });
    return this;
  }
}
