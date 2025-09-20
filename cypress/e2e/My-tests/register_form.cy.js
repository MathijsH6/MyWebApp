describe('Register Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('registreert een nieuw account succesvol', () => {
    const randomEmail = `testuser_${Date.now()}@sakila.test`;

    cy.get('#firstname').type('Test');
    cy.get('#lastname').type('Gebruiker');
    cy.get('#email').type(randomEmail);
    cy.get('#password').type('Test123!');
    cy.get('#address1').type('Teststraat 1');
    cy.get('#address2').type('Apt 2');
    cy.get('#postcode').type('1234AB');
    cy.get('#city').type('Amsterdam');
    cy.get('#district').type('Centrum');
    cy.get('#phone').type('0612345678');
    cy.get('#country').type('Nederland');

    cy.get('form').submit();
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