describe('KampForm', () => {
  it('should show validation errors when fields are empty', () => {
    // Intercept login request
    cy.intercept('POST', '**/api/sessions').as('loginRequest');
    
    // Login
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('amelie.depauw@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=submit_btn]').click();
    
    // IMPORTANT: Wait for login API call to complete
    cy.wait('@loginRequest');
    
    // Then wait for navigation to complete
    cy.url().should('not.include', '/login', { timeout: 5000 });
    
    // Finally go to kamp form page
    cy.visit('http://localhost:5173/kampen/add');

    cy.get('[data-cy="submit-button"]').click();

    cy.contains('Naam is verplicht');
    cy.contains('Stad is verplicht');
    cy.contains('Startdatum is verplicht');
    cy.contains('Einddatum is verplicht');
    cy.contains('Beschrijving is verplicht');
  });

  it('should enforce min/max validation rules', () => {
    // Intercept login request
    cy.intercept('POST', '**/api/sessions').as('loginRequest');
    
    // Login
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('amelie.depauw@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=submit_btn]').click();
    
    // Wait for login
    cy.wait('@loginRequest');
    cy.url().should('not.include', '/login', { timeout: 5000 });
    
    cy.visit('http://localhost:5173/kampen/add');

    cy.get('[data-cy="input-naam"]').type('A');
    cy.get('[data-cy="input-stad"]').type('B');
    cy.get('[data-cy="input-beschrijving"]').type('Te kort');
    cy.get('[data-cy="submit-button"]').click();

    cy.contains('Naam moet minstens 2 tekens bevatten');
    cy.contains('Stad moet minstens 2 tekens bevatten');
    cy.contains('Beschrijving moet minstens 10 tekens bevatten');

    const longString = 'x'.repeat(260);
    cy.get('[data-cy="input-naam"]').clear().type(longString);
    cy.get('[data-cy="input-stad"]').clear().type(longString);
    cy.get('[data-cy="input-beschrijving"]').clear().type('x'.repeat(1001));
    cy.get('[data-cy="submit-button"]').click();

    cy.contains('Naam mag maximaal 255 tekens bevatten');
    cy.contains('Stad mag maximaal 255 tekens bevatten');
    cy.contains('Beschrijving mag maximaal 1000 tekens bevatten');
  });

  it('should validate that end date is after start date', () => {
    // Intercept login request
    cy.intercept('POST', '**/api/sessions').as('loginRequest');
    
    // Login
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('amelie.depauw@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=submit_btn]').click();
    
    // IMPORTANT: Wait for login API call to complete
    cy.wait('@loginRequest');
    
    // Then wait for navigation to complete
    cy.url().should('not.include', '/login', { timeout: 5000 });
    
    // Finally go to kamp form page
    cy.visit('http://localhost:5173/kampen/add');
    cy.get('[data-cy="input-start"]').type('2030-01-10');
    cy.get('[data-cy="input-eind"]').type('2030-01-10');
    cy.get('[data-cy="submit-button"]').click();
    cy.contains('Einddatum moet later zijn dan de startdatum');
  });

  it('should successfully create a kamp', () => {// Intercept login request
    cy.intercept('POST', '**/api/sessions').as('loginRequest');
    
    // Login
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type('lotte.staes@gmail.com');
    cy.get('[data-cy=password_input]').type('12345678');
    cy.get('[data-cy=submit_btn]').click();
    
    // IMPORTANT: Wait for login API call to complete
    cy.wait('@loginRequest');
    
    // Then wait for navigation to complete
    cy.url().should('not.include', '/login', { timeout: 5000 });
    
    // Finally go to kamp form page
    cy.visit('http://localhost:5173/kampen/add');
    cy.get('[data-cy="input-naam"]').type('Cypress Kamp');
    cy.get('[data-cy="input-stad"]').type('Gent');
    cy.get('[data-cy="input-start"]').type('2030-01-10');
    cy.get('[data-cy="input-eind"]').type('2030-01-12');
    cy.get('[data-cy="input-beschrijving"]').type('Een toffe beschrijving van het kamp.');

    // volgen aanvraag en geven een naam: createKamp (zo kunnen we checken of het juist is gelukt met de status code)
    // ** -> eender welke tekst, inclusief meerdere folders of karakters (handig voor later bij de release)
    cy.intercept('POST', '**/kampen').as('createKamp');
    cy.get('[data-cy="submit-button"]').click();
    // wacht op antwoord backEnd en check of code 201 is
    cy.wait('@createKamp').its('response.statusCode').should('eq', 201);
    // kijken of pagina naar /kampen gaat
    cy.url().should('include', '/kampen');
  });
});
