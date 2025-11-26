describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login'); 
  });

  it('should display the login form correctly', () => {
    cy.get('[data-cy=email_input]').should('exist');
    cy.get('[data-cy=password_input]').should('exist');
    cy.get('[data-cy=login_btn]').should('exist');
  });

  it('should show error for empty login', () => {
    cy.get('[data-cy=login_btn]').click();
    cy.contains('Vul uw email en wachtwoord in').should('exist'); 
  });

  // it('should allow typing email and password', () => {
  //   cy.get('[data-cy=email_input]').type('test@example.com').should('have.value', 'test@example.com');

  //   cy.get('[data-cy=password_input]')
  //     .type('123456')
  //     .should('have.value', '123456');

  // });

  it('should attempt login', () => {
    cy.get('[data-cy=email_input]').type('test@example.com');
    cy.get('[data-cy=password_input]').type('123456');
    cy.get('[data-cy=login_btn]').click();

    cy.url().should('include', '/home');
  });
});
