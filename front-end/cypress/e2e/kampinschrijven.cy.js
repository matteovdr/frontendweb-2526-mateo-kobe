describe('Inschrijven voor kamp', () => {
  const loginAls = (email, password) => {
    cy.intercept('POST', '**/api/sessions').as('loginRequest');
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy=email_input]').type(email);
    cy.get('[data-cy=password_input]').type(password);
    cy.get('[data-cy=submit_btn]').click();
    cy.wait('@loginRequest');
    cy.url().should('include', '/home', { timeout: 10000 });
  };

  const openKampenPagina = () => {
    cy.visit('http://localhost:5173/kampen');
  };

  const stubAlert = () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });
  };

  describe('Niet ingelogde gebruiker', () => {
    it('ziet geen inschrijfknop', () => {
      openKampenPagina();
      cy.get('[data-cy="inschrijven-btn"]').should('not.exist');
    });
  });

  describe('Ingelogd lid', () => {
    beforeEach(() => {
      loginAls('amelie.depauw@gmail.com', '12345678');
      openKampenPagina();
      stubAlert();
    });

    it('kan succesvol inschrijven (201)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 201, body: { id: 1, kampid: 1 } });
      }).as('inschrijven');

      cy.get('[data-cy="inschrijven-btn"]').its('length').should('be.greaterThan', 0);
      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijven').its('response.statusCode').should('eq', 201);
      cy.get('@alert').should('have.been.calledWithMatch', 'Inschrijving is gelukt');
    });

    it('toont melding bij dubbele inschrijving (409)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 409, body: { message: 'U bent al ingeschreven voor dit kamp.' } });
      }).as('inschrijvenConflict');

      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijvenConflict').its('response.statusCode').should('eq', 409);
      cy.get('@alert').should('have.been.calledWithMatch', 'al ingeschreven');
    });
  });

  describe('Ingelogd leiding', () => {
    beforeEach(() => {
      loginAls('helena.miserez@gmail.com', '12345678');
      openKampenPagina();
      stubAlert();
    });

    it('kan succesvol inschrijven (201)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 201, body: { id: 12, kampid: 1 } });
      }).as('inschrijvenLeiding');

      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijvenLeiding').its('response.statusCode').should('eq', 201);
      cy.get('@alert').should('have.been.calledWithMatch', 'Inschrijving is gelukt');
    });

    it('krijgt melding bij dubbele inschrijving (409)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 409, body: { message: 'U bent al als leiding ingeschreven voor dit kamp.' } });
      }).as('inschrijvenLeidingConflict');

      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijvenLeidingConflict').its('response.statusCode').should('eq', 409);
      cy.get('@alert').should('have.been.calledWithMatch', 'al ingeschreven');
    });
  });

  describe('Ingelogd hoofdleiding', () => {
    beforeEach(() => {
      loginAls('lotte.staes@gmail.com', '12345678');
      openKampenPagina();
      stubAlert();
    });

    it('kan succesvol inschrijven (201)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 201, body: { id: 2, kampid: 1 } });
      }).as('inschrijvenHoofdleiding');

      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijvenHoofdleiding').its('response.statusCode').should('eq', 201);
      cy.get('@alert').should('have.been.calledWithMatch', 'Inschrijving is gelukt');
    });

    it('krijgt melding bij dubbele inschrijving (409)', () => {
      cy.intercept('POST', '**/kampen/*/inschrijven', (req) => {
        req.reply({ statusCode: 409, body: { message: 'U bent al als leiding ingeschreven voor dit kamp.' } });
      }).as('inschrijvenHoofdleidingConflict');

      cy.get('[data-cy="inschrijven-btn"]').first().click();

      cy.wait('@inschrijvenHoofdleidingConflict').its('response.statusCode').should('eq', 409);
      cy.get('@alert').should('have.been.calledWithMatch', 'al ingeschreven');
    });
  });
});
