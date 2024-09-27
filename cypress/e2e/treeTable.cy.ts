describe('TreeTable spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });
  it('should display Tree table component', () => {
    cy.get('ly-tree-table').should('be.visible');
  });

  it('should expand on click the tree table items second level', () => {
    cy.get(':nth-child(2) > .ly-tree-table-item__row-action').first().click();
    cy.get('tr.ly-tree-table-item__row--second-level').first().should('exist');
  });

  it('should expand on click the tree table items third level', () => {
    cy.get(':nth-child(2) > .ly-tree-table-item__row-action').first().click();
    cy.get(':nth-child(4) > .ly-tree-table-item__row-action').first().click();
    cy.get('tr.ly-tree-table-item__row--third-level').first().should('exist');
  });

  it('Should have a zebra pattern in the tree table', () => {
    cy.get('tr')
      .first()
      .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('tr')
      .eq(1)
      .should('have.css', 'background-color', 'rgb(243, 244, 244)');
  });

  it('should have padding left on third level items', () => {
    cy.get(':nth-child(2) > .ly-tree-table-item__row-action').first().click();
    cy.get(':nth-child(4) > .ly-tree-table-item__row-action').first().click();
    cy.get(
      '.ly-tree-table-item__row--third-level > [style="width: 60%;"]'
    ).should('have.css', 'padding-left', '24px');
  });

  it('Should have padding according to th position', () => {
    cy.get('th').first().should('have.css', 'padding-left', '32px');

    cy.get('th').last().should('have.css', 'padding-right', '16px');
  });
});
