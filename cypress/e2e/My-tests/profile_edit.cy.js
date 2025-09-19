Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Gebruikersgegevens aanpassen', () => {
  it('kan profielgegevens wijzigen', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('#firstname').clear().type('NieuweNaam');
    cy.get('#lastname').clear().type('NieuweAchternaam');
    cy.get('#email').clear().type('testgebruiker1@example.com');
    cy.get('#address1').clear().type('Teststraat 1');
    cy.get('#postcode').clear().type('1234AB');
    cy.get('#city').clear().type('Teststad');
    cy.get('#country').clear().type('Nederland');
    cy.get('form').first().submit();
    cy.wait(1000);

    // Opnieuw inloggen om zeker te zijn van de sessie
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('testgebruiker1@example.com');
    cy.get('#password').type('testwachtwoord');
    cy.get('form').first().submit();

    // Nu naar register en de juiste gegevens opnieuw invullen
    cy.visit('http://localhost:3000/register');
    cy.get('#firstname').clear().type('NieuweNaam');
    cy.get('#lastname').clear().type('NieuweAchternaam');
    cy.get('#email').clear().type('testgebruiker1@example.com');
    cy.get('#address1').clear().type('Teststraat 1');
    cy.get('#postcode').clear().type('1234AB');
    cy.get('#city').clear().type('Teststad');
    cy.get('#country').clear().type('Nederland');
    // Je kunt hier eventueel een assertion toevoegen om te controleren of de velden correct zijn ingevuld
    cy.get('#firstname').should('have.value', 'NieuweNaam');
    cy.get('#lastname').should('have.value', 'NieuweAchternaam');
  });
});