/// <reference types="cypress" />
import { attach, WrapperPlacement } from '../../dist/index.js';
import type { config } from '../../dist/src/index';
import { BasePage } from './BasePage.pageObject';

type Elements = {
  mountingElement?: HTMLElement,
  wrapperStandaloneElement?: HTMLElement,
  wrapperParentElement?: HTMLElement
};

let instance: ReturnType<typeof attach>;
const elements: Elements  = {
  mountingElement: undefined,
  wrapperStandaloneElement: undefined,
  wrapperParentElement: undefined
};

const page = () => new BasePage();
const loadPage = () =>
  cy.visit('http://localhost:3000/cypress/fixtures/index.html').then(() => {
    cy.get('.my-wrapper-standalone').then(el => elements.wrapperStandaloneElement = el[0]);
    cy.get('.my-wrapper').then(el => elements.wrapperParentElement = el[0]);
    cy.get('.my-scrollbar').then(el => elements.mountingElement = el[0]);
  });

const initializePlugin = (el: HTMLElement, options: config = {}) => {
  instance = attach(el, options);
};

beforeEach(() => loadPage());
afterEach(() => {
  instance?.detach();

  page().hasOriginalHTMLStructure(
    elements.mountingElement as HTMLElement,
    elements.wrapperParentElement as HTMLElement,
    elements.wrapperStandaloneElement as HTMLElement
  );
});

const checkConfigOffset = (mount: keyof Elements, parentOptions: config = {}) => {
  describe('offset', () => {
    it('is default', () => {
      initializePlugin(elements[mount] as HTMLElement, parentOptions);
      page()
        .hasScrollbarYShortGap(instance?.outerElement, 0)
        .hasScrollbarXShortGap(instance?.outerElement, 0);
    });

    it('when set, should be correct', () => {
      const options = {
        bar: {
          y: { offset: [10, 0] },
          x: { offset: [0, 10] }
        },
        ...parentOptions
      };
      initializePlugin(elements[mount] as HTMLElement, options);
      page()
        .hasScrollbarYShortGap(instance?.outerElement, options.bar.y.offset[0])
        .hasScrollbarXShortGap(instance?.outerElement, options.bar.x.offset[1]);
    });
  });
};


describe('light-scrollbar', () => {
  describe('when wrapper inside', () => {
    describe('when without given wrapper', () => {
      it('should mount properly', () => {
        initializePlugin(elements.mountingElement as HTMLElement);
        expect(instance?.outerElement).to.equal(elements.mountingElement as HTMLElement);
        // innerElement is generated
      });

      checkConfigOffset('mountingElement');
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

    describe('when given wrapper - parent', () => {
      it('should mount properly', () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperElement: elements.wrapperParentElement as HTMLElement
        });
        expect(instance?.outerElement).to.equal(elements.mountingElement as HTMLElement);
        expect(instance?.innerElement).to.equal(elements.wrapperParentElement as HTMLElement);
      });

      checkConfigOffset('mountingElement');
    });
  });

  describe('when wrapper outside', () => {
    describe('when without given wrapper', () => {
      it('should mount properly', () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperPlacement: WrapperPlacement.outside,
        });
        expect(instance?.innerElement).to.equal(elements.mountingElement as HTMLElement);
        // outerElement is generated
      });

      checkConfigOffset('mountingElement', {
        wrapperPlacement: WrapperPlacement.outside,
      });
    });

    describe('when given wrapper - parent', () => {
      it('should mount properly', () => {
        initializePlugin(elements.mountingElement as HTMLElement, {
          wrapperPlacement: WrapperPlacement.outside,
          wrapperElement: elements.wrapperParentElement as HTMLElement
        });
        expect(instance?.outerElement).to.equal(elements.wrapperParentElement as HTMLElement);
        expect(instance?.innerElement).to.equal(elements.mountingElement as HTMLElement);
      });
      checkConfigOffset('mountingElement', {
        wrapperPlacement: WrapperPlacement.outside,
        wrapperElement: elements.wrapperParentElement as HTMLElement
      });
    });
  });

  //     describe('when given wrapper - standalone', () => {
  //         it('should mount properly', () => {
  //         })
  //     })
});

// When hover long should change scrollbar
