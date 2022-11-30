export class BasePage {
  protected outerElementHTMLElement: HTMLElement;
  protected innerElementHTMLElement: HTMLElement;

  constructor({ outerElement, innerElement }: { outerElement: HTMLElement; innerElement: HTMLElement }) {
    this.outerElementHTMLElement = outerElement;
    this.innerElementHTMLElement = innerElement;
    this.bodyElement.then(el => el[0].style.height = "600px");
  }

  protected get container() {
    return cy.get(`body`);
  }

  protected get outerElement() {
    return cy.get('.light-scrollbar-wrapper-outside');
  }

  protected get innerElement() {
    return cy.get('.light-scrollbar-wrapper-inside');
  }

  protected get bodyElement() {
    return cy.get('.body-example');
  }

  protected get parentContainer() {
    return this.container.parent();
  }

  private get standaloneWrapper() {
    return this.container.find('.my-wrapper-standalone');
  }

  get beforeElementStyle() {
    return window.getComputedStyle(this.outerElementHTMLElement, 'before');
  }

  get afterElementStyle() {
    return window.getComputedStyle(this.outerElementHTMLElement, 'after');
  }
}
