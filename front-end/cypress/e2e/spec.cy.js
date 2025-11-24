describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:5173');
    cy.get('h2').should('exist');  
  });
});