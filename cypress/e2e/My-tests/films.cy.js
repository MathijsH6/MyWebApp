describe('Films Pagina', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('testgebruiker@example.com'); // Vul hier een bestaand account in!
    cy.get('#password').type('testwachtwoord');
    cy.get('form').submit();
    cy.url().should('not.include', '/login');
  });

  it('laadt de films pagina en toont films', () => {
    cy.visit('http://localhost:3000/films');
    cy.get('h1').should('contain', 'Sakila Films');
    cy.get('#films-list .card').should('have.length.greaterThan', 0);
  });

  it('kan zoeken op titel', () => {
    cy.visit('http://localhost:3000/films');
    cy.get('#searchInput').type('CIRCUS');
    cy.get('#films-list .card-title').each(($el) => {
      expect($el.text().toUpperCase()).to.include('CIRCUS');
    });
  });

  it('kan filteren op genre', () => {
    cy.visit('http://localhost:3000/films');
    cy.get('#genreFilter').select(1); // selecteer eerste genre
    cy.get('#films-list .card').should('have.length.greaterThan', 0);
  });
});