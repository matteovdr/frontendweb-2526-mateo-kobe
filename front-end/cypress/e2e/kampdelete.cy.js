describe('Kamp verwijderen', () => {
  describe('Niet ingelogde gebruiker', () => {
    it('zou de delete button niet mogen zien', () => {
      cy.visit('http://localhost:5173/kampen');
      cy.get('[data-cy="delete"]').should('not.exist');
    });
  });

  describe('Ingelogde gebruiker (niet hoofdleiding)', () => {
    beforeEach(() => {
      // Login als lid (niet hoofdleiding)
      cy.visit('http://localhost:5173/login');
      cy.get('[data-cy=email_input]').type('amelie.depauw@gmail.com');
      cy.get('[data-cy=password_input]').type('12345678');
      cy.get('[data-cy=submit_btn]').click();
      
      // Wacht tot ingelogd en ga naar kampen pagina
      cy.url().should('not.include', '/login');
      cy.visit('http://localhost:5173/kampen');
    });

    it('zou de delete button niet mogen zien', () => {
      cy.get('[data-cy="delete"]').should('not.exist');
    });
  });

  describe('Ingelogde gebruiker (hoofdleiding)', () => {
    beforeEach(() => {
      // Login als hoofdleiding
      cy.visit('http://localhost:5173/login');
      cy.get('[data-cy=email_input]').type('lotte.staes@gmail.com');
      cy.get('[data-cy=password_input]').type('12345678');
      cy.get('[data-cy=submit_btn]').click();
      
      // Wacht tot ingelogd en ga naar kampen pagina
      cy.url().should('not.include', '/login');
      cy.visit('http://localhost:5173/kampen');
    });

    it('zou de delete button moeten zien', () => {
      cy.get('[data-cy="delete"]').should('exist');
    });

    it('verwijdert een kamp correct', () => {
      // volgen aanvraag en geven een naam: deleteKamp (zo kunnen we checken of het juist is gelukt met de status code)
      cy.intercept('DELETE', '**/kampen/*').as('deleteKamp');
      
      // Klik de delete knop van het eerste kamp
      cy.get('[data-cy="delete"]').first().click();
      
      // Bevestig de delete actie
      cy.on('window:confirm', () => true);
      
      // wacht op antwoord backEnd en check of code 200 is
      cy.wait('@deleteKamp').its('response.statusCode').should('eq', 200);
    });
  });
});
