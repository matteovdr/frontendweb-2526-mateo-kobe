describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
  });

  it('should display the register form correctly', () => {
    cy.get('[data-cy=voornaam_input]').should('exist');
    cy.get('[data-cy=achternaam_input]').should('exist');
    cy.get('[data-cy=email_input]').should('exist');
    cy.get('[data-cy=telefoon_input]').should('exist');
    cy.get('[data-cy=geboortedatum_input]').should('exist');
    cy.get('[data-cy=wachtwoord_input]').should('exist');
    cy.get('[data-cy=bevestig_wachtwoord_input]').should('exist');
    cy.get('[data-cy=register_btn]').should('exist');
  });

  it('should show errors for empty submit', () => {
    cy.get('[data-cy=register_btn]').click();

    cy.contains('Voornaam is verplicht').should('exist');
    cy.contains('Achternaam is verplicht').should('exist');
    cy.contains('E-mail is verplicht').should('exist');
    cy.contains('Telefoonnummer is verplicht').should('exist');
    cy.contains('Geboortedatum is verplicht').should('exist');
    cy.contains('Wachtwoord is verplicht').should('exist');
    cy.contains('Bevestig je wachtwoord').should('exist');
  });

  it('should validate mismatching passwords', () => {
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('87654321');
    cy.get('[data-cy=register_btn]').click();

    cy.contains('Wachtwoorden komen niet overeen').should('exist');
  });

  //   it('should allow typing all fields', () => {
  //     cy.get('[data-cy=voornaam_input]')
  //       .type('Jan')
  //       .should('have.value', 'Jan');

  //     cy.get('[data-cy=achternaam_input]')
  //       .type('Janssens')
  //       .should('have.value', 'Janssens');

  //     cy.get('[data-cy=email_input]')
  //       .type('jan.janssens@example.com')
  //       .should('have.value', 'jan.janssens@example.com');

  //     cy.get('[data-cy=telefoon_input]')
  //       .type('0470123456')
  //       .should('have.value', '0470123456');

  //     cy.get('[data-cy=geboortedatum_input]')
  //       .type('2000-01-01')
  //       .should('have.value', '2000-01-01');

  //     cy.get('[data-cy=wachtwoord_input]')
  //       .type('12345678')
  //       .should('have.value', '12345678');

  //     cy.get('[data-cy=bevestig_wachtwoord_input]')
  //       .type('12345678')
  //       .should('have.value', '12345678');
  //   });

  it('should attempt register and redirect', () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;
    
    cy.get('[data-cy=voornaam_input]').type('Jan');
    cy.get('[data-cy=achternaam_input]').type('Janssens');
    cy.get('[data-cy=email_input]').type(uniqueEmail);
    cy.get('[data-cy=telefoon_input]').type('0470123456');
    cy.get('[data-cy=geboortedatum_input]').type('2000-01-01');
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('12345678');

    cy.get('[data-cy=register_btn]').click();

    // Wacht tot de redirect gebeurt
    cy.url().should('not.include', '/register');
  });
});
