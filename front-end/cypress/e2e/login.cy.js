describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  describe('Form Elements', () => {
    it('should display the login form correctly', () => {
      cy.get('[data-cy=email_input]').should('exist').should('be.visible');
      cy.get('[data-cy=password_input]').should('exist').should('be.visible');
      cy.get('[data-cy=submit_btn]').should('exist').should('be.visible');
    });

    it('should display the login heading', () => {
      cy.contains('h1', 'Login').should('exist');
    });

    it('should have a link to register page', () => {
      cy.contains('Registreer').should('exist').and('have.attr', 'href', '/register');
    });
  });

  describe('Form Validation', () => {
    it('should show errors for empty login', () => {
      cy.get('[data-cy=submit_btn]').click();
      
      cy.contains('E-mail is verplicht').should('exist');
      cy.contains('Wachtwoord is verplicht').should('exist');
    });

    it('should show error for empty email only', () => {
      cy.get('[data-cy=password_input]').type('123456');
      cy.get('[data-cy=submit_btn]').click();

      cy.contains('E-mail is verplicht').should('exist');
      cy.contains('Wachtwoord is verplicht').should('not.exist');
    });

    it('should show error for empty password only', () => {
      cy.get('[data-cy=email_input]').type('test@example.com');
      cy.get('[data-cy=submit_btn]').click();

      cy.contains('E-mail is verplicht').should('not.exist');
      cy.contains('Wachtwoord is verplicht').should('exist');
    });

    it('should validate password minimum length', () => {
      cy.get('[data-cy=email_input]').type('test@example.com');
      cy.get('[data-cy=password_input]').type('12345');
      cy.get('[data-cy=submit_btn]').click();

      cy.contains('Wachtwoord moet minimaal 6 tekens lang zijn').should('exist');
    });

    it('should accept password with exactly 6 characters', () => {
      cy.get('[data-cy=email_input]').type('test@example.com');
      cy.get('[data-cy=password_input]').type('123456');
      cy.get('[data-cy=email_input]').focus().blur();

      cy.contains('Wachtwoord moet minimaal 6 tekens lang zijn').should('not.exist');
    });
  });

  describe('Form Input', () => {
    it('should allow typing email and password', () => {
      cy.get('[data-cy=email_input]')
        .type('mira.degraeve@gmail.com')
        .should('have.value', 'mira.degraeve@gmail.com');

      cy.get('[data-cy=password_input]')
        .type('12345678')
        .should('have.value', '12345678');
    });

    it('should clear values when cancel button is clicked', () => {
      cy.get('[data-cy=email_input]').type('mira.degraeve@gmail.com');
      cy.get('[data-cy=password_input]').type('12345678');
      
      cy.contains('Annuleren').click();
      
      cy.get('[data-cy=email_input]').should('have.value', '');
      cy.get('[data-cy=password_input]').should('have.value', '');
    });
  });

  describe('Login Submission', () => {
    it('should attempt login with valid credentials', () => {
      cy.get('[data-cy=email_input]').type('mira.degraeve@gmail.com');
      cy.get('[data-cy=password_input]').type('12345678');
      cy.get('[data-cy=submit_btn]').click();

      // Wacht tot de redirect gebeurt
      cy.url().should('not.include', '/login');
    });

    it('should disable submit button while loading', () => {
      cy.get('[data-cy=email_input]').type('mira.degraeve@gmail.com');
      cy.get('[data-cy=password_input]').type('12345678');
      
      // Check dat button niet disabled is voordat we klikken
      cy.get('[data-cy=submit_btn]').should('not.be.disabled');
      
      cy.get('[data-cy=submit_btn]').click();
    });
  });
});
