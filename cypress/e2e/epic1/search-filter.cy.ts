describe('Epic 1 – Search & Filter Interface', () => {
  beforeEach(() => {
    cy.visit('/explore/');
  });

  it('filters results via search input', () => {
    cy.contains('Interaction Search & Filter').should('exist');
    cy.get('[data-testid="search-input"]').clear().type('expert');
    cy.contains('2000 sequences match your criteria.').should('be.visible');
  });

  it('shows empty state message when no results match', () => {
    cy.get('[data-testid="search-input"]').clear().type('zzz-no-match');
    cy.contains(/no interaction sequences match/i).should('be.visible');
  });

  it('exports csv with toast feedback', () => {
    cy.window().then((win) => {
      cy.stub(win.URL, 'createObjectURL').returns('blob:mock');
      cy.stub(win.URL, 'revokeObjectURL').as('revoke');
    });
    cy.findByRole('button', { name: /export csv/i }).click();
    cy.findByText(/exported \d+ rows/).should('be.visible');
  });
});
