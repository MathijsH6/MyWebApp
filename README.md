 Sakila Filmverhuur Webapplicatie

Welkom bij de Sakila Filmverhuur webapplicatie!  
Deze applicatie is gebouwd als fullstack project voor Avans Hogeschool en biedt een moderne, gebruiksvriendelijke omgeving voor het zoeken, bekijken en beheren van films, favorieten en persoonlijke gegevens.

---

 Inhoudsopgave

- [Beschrijving](beschrijving)
- [Technologieën](technologieën)
- [Architectuur](architectuur)
- [Functionaliteit](functionaliteit)
- [Installatie & lokaal draaien](installatie--lokaal-draaien)
- [Testen](testen)
- [CI/CD & Deployment](cicd--deployment)
- [Structuur](structuur)
- [Contact](contact)

---

 Beschrijving

Deze webapplicatie ontsluit de Sakila database via een moderne Express/Node.js backend en een responsive frontend.  
Gebruikers kunnen films zoeken, filteren, favorieten beheren, hun profiel aanpassen en winkelinformatie bekijken.

---

 Technologieën

- Backend: Node.js, Express
- Frontend: EJS, Bootstrap 5, CSS
- Database: MySQL (Sakila schema)
- Testing: Cypress
- CI/CD: GitHub Actions (of andere pipeline)
- Deployment: Online provider (bijv. Heroku, Vercel, Azure)

---

 Architectuur

De applicatie volgt het MVC-principe:
- Model: Data access objects (`src/dao`)
- View: EJS templates (`src/views`)
- Controller: Business logic (`src/controllers`)
- Service: Tussenlaag voor business rules (`src/services`)
- Routes: Express routers (`src/routes`)
- Middleware: Validatie & authenticatie (`src/middleware`)

---

 Functionaliteit

 Must-have features

- Films zoeken en filteren: Zoek op titel, filter op genre en jaar.
- Film detailpagina: Bekijk uitgebreide info per film.
- Favorieten: Voeg films toe aan favorieten, bekijk en verwijder ze.
- Authenticatie: Registreren, inloggen, uitloggen, sessiebeheer.
- Profielbeheer: Bekijk en wijzig je profielgegevens.
- Winkelinformatie: Bekijk locaties en details van winkels.
- Contact & About: Algemene informatie en contactpagina.
- Heldere foutmeldingen: Altijd een duidelijke melding bij fouten.
- Responsive design: Werkt op desktop, tablet en mobiel.

Zie [about.ejs](src/views/about.ejs) voor een volledig overzicht van de epics en user stories.

---

 Installatie & lokaal draaien

1. Clone de repository:
   ```bash
   git clone <jouw-repo-url>
   cd mywebapp
   ```

2. Installeer dependencies:
   ```bash
   npm install
   ```

3. .env bestand aanmaken:
   ```
   DB_HOST=...
   DB_USER=...
   DB_PASSWORD=...
   DB_NAME=sakila
   SESSION_SECRET=...
   ```

4. Start de server:
   ```bash
   npm start
   ```
   Of voor development:
   ```bash
   npm run dev
   ```

5. Open in browser:
   ```
   http://localhost:3000
   ```

---

 Testen

- Cypress:  
  Testcases staan in `/cypress/e2e/My-tests/`.  
  Start de server en run Cypress:
  ```bash
  npx cypress open
  ```
  Of headless:
  ```bash
  npx cypress run
  ```

- Testcases dekken:  
  - Registratie
  - Login
  - Profiel wijzigen
  - Films zoeken/filteren
  - Favorieten toevoegen/verwijderen

---

 CI/CD & Deployment

- CI/CD:  
  Bij elke push worden de tests automatisch uitgevoerd via GitHub Actions (of jouw pipeline).
- Deployment:  
  De applicatie wordt automatisch gedeployed naar een online provider als de tests slagen.
- Online database:  
  De productieomgeving gebruikt een online MySQL database.

---

 Structuur

```
src/
  controllers/
  dao/
  middleware/
  routes/
  services/
  views/
public/
  images/
  stylesheets/
cypress/
  e2e/
  fixtures/
  support/
```

---

 Contact

Voor vragen kun je terecht op de [contactpagina](http://localhost:3000/contact) of mailen naar je projectteam.

---

Veel plezier met Sakila Filmverhuur!
