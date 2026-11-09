/// <reference types="cypress" />
import { LightScrollbarReturns } from "../../dist/utils/types";
import { attach, WrapperPlacement } from "../../dist/index.js";
import { rail } from "../../dist/rail.js";
import type { config } from "../../dist/src/index";
import { ScrollbarBaseObject } from "./Scrollbar.pageObject";
import { addElements } from "./utils/addElements";
import { waitForRerender } from "./utils/waitForRerender";

type Elements = {
  mountingElement?: HTMLElement;
  wrapperStandaloneElement?: HTMLElement;
  wrapperParentElement?: HTMLElement;
};

let instance: LightScrollbarReturns;
const elements: Elements = {
  mountingElement: undefined,
  wrapperStandaloneElement: undefined,
  wrapperParentElement: undefined,
};

const isCI = Cypress.expose("CI");

const page = () =>
  new ScrollbarBaseObject({
    outerElement: instance?.outerElement as HTMLElement,
    innerElement: instance?.innerElement as HTMLElement,
  });

const loadPage = () =>
  cy.visit("http://localhost:3000/cypress/fixtures/index.html").then(() => {
    cy.get(".my-wrapper-standalone").then((el) => (elements.wrapperStandaloneElement = el[0]));
    cy.get(".my-wrapper").then((el) => (elements.wrapperParentElement = el[0]));
    cy.get(".my-scrollbar").then((el) => (elements.mountingElement = el[0]));
  });

const initializePlugin = (el: HTMLElement, options: config = {}) => {
  instance = attach(el, options);
};

// window mouse listeners must be registered in the tested page (not the spec iframe) for dragging to work
const initializePluginInPage = (el: HTMLElement, options: config = {}) =>
  cy
    .window()
    .then((win) => win.eval('import("/dist/index.modern.mjs")') as Promise<{ attach: typeof attach }>)
    .then((pageModule) => {
      instance = pageModule.attach(el, options);
    });

beforeEach(() => loadPage());
afterEach(() => {
  instance?.detach();

  page().hasOriginalHTMLStructure(
    elements.mountingElement as HTMLElement,
    elements.wrapperParentElement as HTMLElement,
    elements.wrapperStandaloneElement as HTMLElement
  );
});

const checkConfigDescribe = (mount: keyof Elements, parentOptions: config = {}) => {
  describe("offset", () => {
    it("is default", () => {
      initializePlugin(elements[mount] as HTMLElement, parentOptions);
      page().hasScrollbarYShortGap(0).hasScrollbarXShortGap(0);
    });

    it("when set, should be correct", () => {
      const options = {
        bar: {
          y: { offset: [10, 0] },
          x: { offset: [0, 10] },
        },
        ...parentOptions,
      };
      initializePlugin(elements[mount] as HTMLElement, options);
      page().hasScrollbarYShortGap(options.bar.y.offset[0]).hasScrollbarXShortGap(options.bar.x.offset[1]);
    });
  });

  describe("when showOnHover", () => {
    describe("when is set to false/disable", () => {
      it("scrollbar should be visible all the time", () => {
        initializePlugin(elements[mount] as HTMLElement, parentOptions);

        page().hasVisibleScrollbar();
      });
    });

    describe("when is set to 20 ms", () => {
      afterEach(() => {
        page().hoverBottomOfBody();
      });

      it("should show scrollbar on hover after 20ms", () => {
        initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, showOnHover: 20 });

        page().hasNotVisibleScrollbar().hoverOverOuterElement();

        // intentionally waiting past the configured 20ms showOnHover delay
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(100);
        page().hasVisibleScrollbar();
      });
    });
  });

  describe("when both scrollbars are visible", () => {
    afterEach(() => {
      page().hoverBottomOfBody();
    });

    it("scrolled to the end, scrollbars should end before the corner", () => {
      initializePlugin(elements[mount] as HTMLElement, parentOptions);

      page().scrollToEnd().hasScrollbarsEndingBeforeCorner({ yWidth: 6, xHeight: 6 });
    });

    it("pressing in the corner where rails cross should not scroll", () => {
      initializePluginInPage(elements[mount] as HTMLElement, parentOptions);

      page().pressAndMoveInnerElementFromBottomRight(3, 3).hasScroll({ top: "start", left: "start" });
    });

    it("pressing on the y rail next to the corner should scroll only y", () => {
      initializePluginInPage(elements[mount] as HTMLElement, parentOptions);

      page().pressAndMoveInnerElementFromBottomRight(3, 10).hasScroll({ top: "moved", left: "start" });
    });

    it("pressing a thumb right after moving the cursor onto it should start dragging", () => {
      initializePluginInPage(elements[mount] as HTMLElement, parentOptions);

      page().hoverCenterOfInnerElement().dragThumb("y", 30).hasScroll({ top: "moved", left: "start" });
    });

    // https://github.com/FRSOURCE/light-scrollbar/issues/531
    (
      [
        ["y", "x"],
        ["x", "y"],
      ] as const
    ).forEach(([first, second]) => {
      it(`dragging the ${second} thumb after dragging the ${first} thumb should not scroll ${first}`, () => {
        initializePluginInPage(elements[mount] as HTMLElement, parentOptions);
        const scrollKey = first === "y" ? "top" : "left";

        page()
          .dragThumb(first, 30)
          .getScrollPosition()
          .then((afterFirstDrag) => {
            expect(afterFirstDrag[scrollKey], `${first} scrolled by the first drag`).to.be.greaterThan(0);

            page()
              .dragThumb(second, 30)
              .hasScroll({ top: "moved", left: "moved" })
              .hasScrollPosition({ [scrollKey]: afterFirstDrag[scrollKey] });
          });
      });
    });
  });

  describe("rail", () => {
    it("is not added by default", () => {
      initializePlugin(elements[mount] as HTMLElement, parentOptions);

      page().hasNoRail().hasNoRailContainment();
    });

    it("is not added when the rail plugin is passed without enableRail", () => {
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, plugins: [rail] });

      // default scrollbar color - not the darker one used on top of the rail
      page().hasNoRail().hasNoRailContainment().hasVisibleScrollbar();
    });

    it("is not added and warns when enableRail is set without the rail plugin", () => {
      const warn = cy.spy(console, "warn");
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, enableRail: true });

      page().hasNoRail().hasNoRailContainment();
      cy.then(() => expect(warn).to.have.been.calledWithMatch("enableRail requires plugins: [rail]"));
    });

    it("takes thickness and offsets from bar when rail is not configured", () => {
      initializePlugin(elements[mount] as HTMLElement, {
        ...parentOptions,
        enableRail: true,
        plugins: [rail],
        bar: { y: { width: 8, offset: [3, 0] }, x: { height: 5, offset: [0, 2] } },
      });

      page()
        .hasRail({
          // the bottom right corner (other rail thickness + its offset) belongs to neither rail
          y: { width: 8, right: 3, length: (inner) => inner.clientHeight - (5 + 2) },
          x: { height: 5, bottom: 2, length: (inner) => inner.clientWidth - (8 + 3) },
        })
        .hasRailPinnedToOuterElement();
    });

    it("uses its own settings and falls back to bar only for the missing ones", () => {
      initializePlugin(elements[mount] as HTMLElement, {
        ...parentOptions,
        enableRail: true,
        plugins: [rail],
        bar: { x: { height: 6, offset: [0, 4] } },
        rail: { y: { width: 10, offset: [1, 0] }, x: { height: 12 } },
      });

      page()
        .hasRail({
          y: { width: 10, right: 1, length: (inner) => inner.clientHeight - (12 + 4) },
          // x rail offset is not set - taken from bar.x.offset
          x: { height: 12, bottom: 4, length: (inner) => inner.clientWidth - (10 + 1) },
        })
        // the thumb keeps the bar settings
        .hasScrollbarYWidth(6);
    });

    it("is shown only for the axis that overflows and then has no corner", () => {
      ((elements[mount] as HTMLElement).querySelector(".item") as HTMLElement).style.width = "10px";
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, enableRail: true, plugins: [rail] });

      page().hasRail({
        y: { width: 6, right: 0, length: (inner) => inner.clientHeight },
        x: { height: 6, bottom: 0, length: () => 0 },
      });
    });

    it("makes the scrollbar darker", () => {
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, enableRail: true, plugins: [rail] });

      page().hasScrollbarBackground({ x: "rgb(148, 163, 184)", y: "rgb(148, 163, 184)" });
    });

    it("makes the hovered scrollbar darker still", () => {
      initializePluginInPage(elements[mount] as HTMLElement, { ...parentOptions, enableRail: true, plugins: [rail] });

      page()
        .hoverThumb("y")
        .hasScrollbarBackground({ x: "rgb(148, 163, 184)", y: "rgb(100, 116, 139)" })
        .hoverBottomOfBody();
    });

    it("is hidden together with the scrollbar when showOnHover is set", () => {
      initializePlugin(elements[mount] as HTMLElement, {
        ...parentOptions,
        enableRail: true,
        plugins: [rail],
        showOnHover: 20,
      });

      const hidden = "rgba(0, 0, 0, 0)";
      page().hasRailBackground(hidden).hasScrollbarBackground({ x: hidden, y: hidden }).hoverOverOuterElement();
      // intentionally waiting past the configured 20ms showOnHover delay
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(100);
      page()
        .hasRailBackground("rgb(241, 245, 249)")
        .hasScrollbarBackground({ x: "rgb(148, 163, 184)", y: "rgb(148, 163, 184)" })
        .hoverBottomOfBody();
    });

    describe("when wider than the scrollbar", () => {
      // 16px rails, default 6px scrollbars
      const wideRail = { enableRail: true, plugins: [rail], rail: { y: { width: 16 }, x: { height: 16 } } };

      afterEach(() => {
        page().hoverBottomOfBody();
      });

      (["y", "x"] as const).forEach((axis) => {
        it(`pressing the ${axis} rail outside the scrollbar thickness should drag the scrollbar`, () => {
          initializePluginInPage(elements[mount] as HTMLElement, { ...parentOptions, ...wideRail });

          page()
            .dragThumb(axis, 30, 12)
            .hasScroll({ top: axis === "y" ? "moved" : "start", left: axis === "x" ? "moved" : "start" });
        });
      });

      it("pressing next to the rail should not scroll", () => {
        initializePluginInPage(elements[mount] as HTMLElement, { ...parentOptions, ...wideRail });

        page().dragThumb("y", 30, 20).hasScroll({ top: "start", left: "start" });
      });

      it("pressing in the corner where the rails cross should not scroll", () => {
        initializePluginInPage(elements[mount] as HTMLElement, { ...parentOptions, ...wideRail });

        page().pressAndMoveInnerElementFromBottomRight(12, 12).hasScroll({ top: "start", left: "start" });
      });

      it("scrolled to the end, scrollbars should end where the rails end", () => {
        initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, ...wideRail });

        page().scrollToEnd().hasScrollbarsEndingBeforeCorner({ yWidth: 16, xHeight: 16 });
      });
    });

    it("is removed on detach", () => {
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions, enableRail: true, plugins: [rail] });

      page().hasRailPinnedToOuterElement();
      cy.then(() => {
        instance?.detach();
        instance = undefined;
      });
      cy.get(".light-scrollbar-rail").should("not.exist");
    });
  });

  describe("when iniatlly got x items and y height", () => {
    it("scrollbar should have z height", () => {
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions });

      waitForRerender().then(() => {
        // Different values, different render on headless and headed chrome
        page().hasScrollbarHeight(isCI ? 128.219 : 127.047);
      });
    });
  });

  describe("when having 1000 items", () => {
    it("scrollbar should have z height", () => {
      initializePlugin(elements[mount] as HTMLElement, { ...parentOptions });

      if (instance) {
        addElements(instance?.innerElement, 1000);
        waitForRerender().then(() => {
          page().hasScrollbarHeight(23.3906);
        });
      }
    });
  });
};

describe("light-scrollbar", () => {
  describe("when wrapper inside", () => {
    describe("when without given wrapper", () => {
      it("should mount properly", () => {
        initializePlugin(elements.mountingElement as HTMLElement);
        expect(instance?.outerElement).to.equal(elements.mountingElement as HTMLElement);
        // innerElement is generated
      });

      checkConfigDescribe("mountingElement");
    });

    // describe.only('when given wrapper - standalone', () => {
    //     it('should mount properly', () => {
    //         initializePlugin(mountingElement, {
    //             wrapperElement: wrapperStandaloneElement
    //         })
    //         cy.then(() => {
    //             expect(instance?.outerElement).to.equal(mountingElement);
    //             expect(instance?.innerElement).to.equal(wrapperStandaloneElement);
    //         })
    //     })
    // })

    describe("when given wrapper - parent", () => {
      it("should mount properly", () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperElement: elements.wrapperParentElement as HTMLElement,
        });
        expect(instance?.outerElement).to.equal(elements.mountingElement as HTMLElement);
        expect(instance?.innerElement).to.equal(elements.wrapperParentElement as HTMLElement);
      });

      checkConfigDescribe("mountingElement");
    });
  });

  describe("when wrapper outside", () => {
    describe("when without given wrapper", () => {
      it("should mount properly", () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperPlacement: WrapperPlacement.outside,
        });
        expect(instance?.innerElement).to.equal(elements.mountingElement as HTMLElement);
        // outerElement is generated
      });

      checkConfigDescribe("mountingElement", {
        wrapperPlacement: WrapperPlacement.outside,
      });
    });

    describe("when given wrapper - parent", () => {
      it("should mount properly", () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperPlacement: WrapperPlacement.outside,
          wrapperElement: elements.wrapperParentElement as HTMLElement,
        });
        expect(instance?.outerElement).to.equal(elements.wrapperParentElement as HTMLElement);
        expect(instance?.innerElement).to.equal(elements.mountingElement as HTMLElement);
      });
      checkConfigDescribe("mountingElement", {
        wrapperPlacement: WrapperPlacement.outside,
        wrapperElement: elements.wrapperParentElement as HTMLElement,
      });
    });
  });

  //     describe('when given wrapper - standalone', () => {
  //         it('should mount properly', () => {
  //         })
  //     })
});

// When hover long should change scrollbar
