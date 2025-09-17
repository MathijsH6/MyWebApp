describe('Register Form Validatie', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('toont validatie-meldingen bij lege verplichte velden', () => {
    cy.get('form').submit();
    cy.get('#firstname:invalid').should('exist');
    cy.get('#lastname:invalid').should('exist');
    cy.get('#email:invalid').should('exist');
    cy.get('#password:invalid').should('exist');
    cy.get('#address1:invalid').should('exist');
    cy.get('#postcode:invalid').should('exist');
    cy.get('#city:invalid').should('exist');
    cy.get('#country:invalid').should('exist');
  });
});