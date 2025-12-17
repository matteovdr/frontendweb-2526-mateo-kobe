describe('General', () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost');
    cy.get('h2').should('exist');  
  });
});