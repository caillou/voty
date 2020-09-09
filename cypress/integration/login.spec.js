describe("Test Login Page", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
  });
  it("logs in with a valid user (role: teacher)!", () => {
    cy.visit("/");
    cy.contains("Anmelden").click();
    cy.url().should("include", "/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type(Cypress.env("PASS"));
    cy.get("button").contains("Anmelden").click();
    cy.contains("Startseite").click();
    cy.url().should("include", "/user/teacher");
  });

  it("shows an error with wrong password", () => {
    cy.visit("/user/login");
    cy.findByLabelText("Email:").type(Cypress.env("USER"));
    cy.findByLabelText("Passwort:").type("wrongpass");
    cy.get("button").contains("Anmelden").click();
    cy.contains("Email oder Passwort");
  });
});

describe("Test Login", () => {
  beforeEach(() => {
    cy.task("prismaLoader", "testdb.yml");
    cy.login();
  });

  it("User is already logged in!", () => {
    cy.visit("/user/login");
    cy.contains("Startseite").click();
    cy.url().should("include", "/user/teacher");
  });
});