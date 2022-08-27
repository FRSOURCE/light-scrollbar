export class BasePage {
  protected get container() {
    return cy.get(`body`);
  }

  protected get parentContainer() {
    return this.container.parent();
  }

  private get standaloneWrapper() {
    return this.container.find('.my-wrapper-standalone');
  }

  isVisible() {
    this.container.should('be.visible');
    return this;
  }

  matchImage() {
    cy.then(() => this.container.matchImage());
    return this;
  }

  hasOriginalHTMLStructure = (
    el: HTMLElement,
    wrapper: HTMLElement,
    standaloneWrapper: HTMLElement
  ) => {
    cy.get('.my-scrollbar')
      .should('have.attr', 'style', 'border-color: red;')
      .then(element => {
        expect(element[0].getAttribute('tabIndex'))
          .to.be.equal(el.getAttribute('tabindex'));
        expect(element[0] === el).to.be.true;
      });
    cy.get('.my-wrapper')
      .then(element => {
        expect(element[0].getAttribute('tabIndex'))
          .to.be.equal(wrapper.getAttribute('tabindex'));
        expect(element[0] === wrapper).to.be.true;
        return element;
      })
      .should('have.attr', 'style', 'border: 1px solid green;')
      .children().eq(0)
      .should('have.class', 'my-scrollbar');
    cy.get('.my-wrapper-standalone')
      .should('have.attr', 'style', 'border: 1px solid teal;')
      .then(element => {
        expect(element[0].getAttribute('tabIndex'))
          .to.be.equal(standaloneWrapper.getAttribute('tabindex'));
        expect(element[0] === standaloneWrapper).to.be.true;
      });
    return this;
  };

  hasScrollbarYShortGap(el: HTMLElement, value: number) {
    cy.then(() => {
      expect(
        window.getComputedStyle(
          el, 'after'
        ).right).to.be.equal(`${value}px`);
    });

    return this;
  }

  hasScrollbarXShortGap(el: HTMLElement, value: number) {
    cy.then(() => {
      expect(
        window.getComputedStyle(
          el, 'before'
        ).bottom).to.be.equal(`${value}px`);
    });
    return this;
  }
}
