describe('Kamp verwijderen', () => {
  it('verwijdert een kamp correct', () => {

    cy.visit('http://localhost:5173/kampen');
    // volgen aanvraag en geven een naam: deleteKamp (zo kunnen we checken of het juist is gelukt met de status code)
    cy.intercept('DELETE', '**/kampen/*').as('deleteKamp');
    // Klik de delete knop van het eerste kamp
    cy.get('[data-cy="delete"]').first().click();
    // wacht op antwoord backEnd en check of code 200 is
    cy.wait('@deleteKamp').its('response.statusCode').should('eq', 200);
  });
});
