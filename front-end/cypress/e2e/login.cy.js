describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display the login form correctly', () => {
    cy.get('[data-cy=email_input]').should('exist');
    cy.get('[data-cy=password_input]').should('exist');
    cy.get('[data-cy=submit_btn]').should('exist');
  });

  it('should show error for empty login', () => {
    cy.get('[data-cy=submit_btn]').click();
    
    cy.contains('E-mail is verplicht').should('exist');
    cy.contains('Wachtwoord is verplicht').should('exist');
  });

  // it('should allow typing email and password', () => {
  //   cy.get('[data-cy=email_input]')
  //     .type('test@example.com')
  //     .should('have.value', 'test@example.com');

  //   cy.get('[data-cy=password_input]')
  //     .type('123456')
  //     .should('have.value', '123456');
  // });

  it('should attempt login and redirect', () => {
    cy.get('[data-cy=email_input]').type('test@example.com');
    cy.get('[data-cy=password_input]').type('123456');
    cy.get('[data-cy=submit_btn]').click();

    cy.url().should('include', '/home');
  });
});
