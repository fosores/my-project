describe('Button spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should have a block primary button with the correct class', () => {
    cy.get('[data-cy="primary-block"] button')
      .should('exist')
      .and('have.class', 'ly-button--primary')
      .and('have.class', 'ly-button--block');
  });

  it('should have a base primary button with the correct class', () => {
    cy.get('[data-cy="primary-base"] button')
      .should('exist')
      .and('have.class', 'ly-button--primary')
      .and('have.class', 'ly-button--base');
  });

  it('should have a small primary button with the correct class', () => {
    cy.get('[data-cy="primary-small"] button')
      .should('exist')
      .and('have.class', 'ly-button--primary')
      .and('have.class', 'ly-button--small');
  });

  it('should have a block secondary button with the correct class', () => {
    cy.get('[data-cy="secondary-block"] button')
      .should('exist')
      .and('have.class', 'ly-button--secondary')
      .and('have.class', 'ly-button--block');
  });

  it('should have a base secondary button with the correct class', () => {
    cy.get('[data-cy="secondary-base"] button')
      .should('exist')
      .and('have.class', 'ly-button--secondary')
      .and('have.class', 'ly-button--base');
  });

  it('should have a small secondary button with the correct class', () => {
    cy.get('[data-cy="secondary-small"] button')
      .should('exist')
      .and('have.class', 'ly-button--secondary')
      .and('have.class', 'ly-button--small');
  });

  it('should add the --animated class to the primary button after click', () => {
    cy.get('[data-cy="primary-base"] button')
      .click()
      .then(() => {
        cy.get('[data-cy="primary-base"] button').should(
          'have.class',
          'ly-button--primary--animated'
        );
      });
  });

  it('should add the --animated class to the secondary button after click', () => {
    cy.get('[data-cy="secondary-base"] button')
      .click()
      .then(() => {
        cy.get('[data-cy="secondary-base"] button').should(
          'have.class',
          'ly-button--secondary--animated'
        );
      });
  });

  it('should find the disabled block button', () => {
    cy.get('[data-cy="disabled-block"] button').should('be.disabled');
  });

  it('should find the disabled primary base button', () => {
    cy.get('[data-cy="disabled-primary-base"] button').should('be.disabled');
  });

  it('should find the disabled secondary block button', () => {
    cy.get('[data-cy="disabled-secondary-block"] button').should('be.disabled');
  });

  it('should find the disabled secondary base button', () => {
    cy.get('[data-cy="disabled-secondary-base"] button').should('be.disabled');
  });
});
