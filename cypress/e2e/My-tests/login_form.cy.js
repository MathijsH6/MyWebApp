describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('toont validatie-meldingen bij lege velden', () => {
    cy.get('form').submit();
    cy.get('#email:invalid').should('exist');
    cy.get('#password:invalid').should('exist');
  });

  it('geeft foutmelding bij verkeerde gegevens', () => {
    cy.get('#email').type('nietbestaand@user.com');
    cy.get('#password').type('foutwachtwoord');
    cy.get('form').submit();
    cy.get('.alert-danger').should('contain', 'Geen bestaand account');
  });

  it('logt succesvol in met juiste gegevens', () => {
    cy.get('#email').type('testgebruiker@example.com'); // Gebruik een bestaand account!
    cy.get('#password').type('testwachtwoord');
    cy.get('form').submit();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});