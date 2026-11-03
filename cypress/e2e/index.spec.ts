/// <reference types="cypress" />
import { LightScrollbarReturns } from "../../dist/utils/types";
import { attach, WrapperPlacement } from "../../dist/index.js";
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
