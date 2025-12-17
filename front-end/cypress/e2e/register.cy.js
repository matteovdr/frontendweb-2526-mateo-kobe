describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost/register');
  });

  it('should display the register form correctly', () => {
    cy.get('[data-cy=usertype_select]').should('exist');
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

  it('should show leiding-only fields and require them', () => {
    cy.get('[data-cy=usertype_select]').select('leiding');
    cy.get('[data-cy=agegroup_select]').should('exist');
    cy.get('[data-cy=beschrijving_input]').should('exist');

    // Submit empty to trigger validation for leiding-only fields
    cy.get('[data-cy=register_btn]').click();
    cy.contains('Leeftijdsgroep is verplicht voor leiding').should('exist');
    cy.contains('Beschrijving is verplicht voor leiding').should('exist');
  });

  it('should validate invalid email format', () => {
    cy.get('[data-cy=email_input]').type('not-an-email');
    cy.get('[data-cy=register_btn]').click();
    cy.contains('Ongeldig e-mailadres').should('exist');
  });

  it('should reject geboortedatum set to today or future (lid)', () => {
    // Fill required fields for lid
    cy.get('[data-cy=voornaam_input]').type('Piet');
    cy.get('[data-cy=achternaam_input]').type('Peeters');
    cy.get('[data-cy=email_input]').type(`piet.${Date.now()}@example.com`);
    cy.get('[data-cy=telefoon_input]').type('0470111222');
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('12345678');

    // Use a future date to be unambiguous
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureStr = tomorrow.toISOString().split('T')[0];
    cy.get('[data-cy=geboortedatum_input]').type(futureStr);

    cy.get('[data-cy=register_btn]').click();
    cy.contains('Geboortedatum kan niet vandaag of in de toekomst liggen').should('exist');
  });

  it('should enforce minimum age 6 for lid', () => {
    // Fill required fields for lid
    cy.get('[data-cy=voornaam_input]').type('Lidje');
    cy.get('[data-cy=achternaam_input]').type('Junior');
    cy.get('[data-cy=email_input]').type(`lid.${Date.now()}@example.com`);
    cy.get('[data-cy=telefoon_input]').type('0470333444');
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('12345678');

    // Set DOB to be younger than 6 years old
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5); // approx 5 years ago
    const underSix = d.toISOString().split('T')[0];
    cy.get('[data-cy=geboortedatum_input]').type(underSix);

    cy.get('[data-cy=register_btn]').click();
    cy.contains('Je moet minimaal 6 jaar oud zijn').should('exist');
  });

  it('should enforce minimum age 18 for leiding', () => {
    // Switch to leiding
    cy.get('[data-cy=usertype_select]').select('leiding');

    // Fill required fields for leiding
    cy.get('[data-cy=voornaam_input]').type('Leidster');
    cy.get('[data-cy=achternaam_input]').type('Lena');
    cy.get('[data-cy=email_input]').type(`leiding.${Date.now()}@example.com`);
    cy.get('[data-cy=telefoon_input]').type('0470555666');
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('12345678');
    cy.get('[data-cy=agegroup_select]').select('+16');
    cy.get('[data-cy=beschrijving_input]').type('Ik wil leiding worden.');

    // Set DOB to be younger than 18 years old
    const d2 = new Date();
    d2.setFullYear(d2.getFullYear() - 17); // approx 17 years ago
    const underEighteen = d2.toISOString().split('T')[0];
    cy.get('[data-cy=geboortedatum_input]').type(underEighteen);

    cy.get('[data-cy=register_btn]').click();
    cy.contains('Je moet minimaal 18 jaar oud zijn voor leiding').should('exist');
  });

  it('should attempt register and redirect', () => {
    const uniqueEmail = `test.user.${Date.now()}@example.com`;
    
    cy.get('[data-cy=voornaam_input]').type('Jan');
    cy.get('[data-cy=achternaam_input]').type('Janssens');
    cy.get('[data-cy=email_input]').type(uniqueEmail);
    cy.get('[data-cy=telefoon_input]').type('0470123456');
    cy.get('[data-cy=geboortedatum_input]').type('2000-01-01');
    cy.get('[data-cy=wachtwoord_input]').type('12345678');
    cy.get('[data-cy=bevestig_wachtwoord_input]').type('12345678');

    // Observe backend call and assert 201 Created
    cy.intercept('POST', '**/personen/register').as('register');
    cy.get('[data-cy=register_btn]').click();
    cy.wait('@register').its('response.statusCode').should('eq', 201);

    // Wacht tot de redirect gebeurt
    cy.url().should('not.include', '/register');
  });
});
