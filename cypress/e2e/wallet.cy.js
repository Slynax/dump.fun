describe('Wallet creation', () => {
  it('should create a new wallet', () => {
    cy.visit('http://localhost:5173');
    cy.get('button#open-modal-btn').click();
    cy.get('button#create-wallet-btn').click();
    cy.get('span#modal-close-icon').click();  // cy.get('button[aria-label="Close"]').click();
    cy.get('span#wallet-public-key').should('exist').and('be.visible').and('not.be.empty');
  });

  it('should copy wallet public key to clipboard', () => {
    cy.visit('http://localhost:5173');
    cy.get('button#open-modal-btn').click();
    cy.get('button#create-wallet-btn').click();
    cy.get('span#modal-close-icon').click();  // cy.get('button[aria-label="Close"]').click();
    cy.get('span#wallet-public-key button').click({ force: true });

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.have.length(44);
      });
    });
  });
});

describe('Wallet import', () => {
  it('should import a wallet', () => {
    cy.visit('http://localhost:5173');
    cy.get('button#open-modal-btn').click();
    cy.get('button#import-wallet-btn').click();
    cy.get('input#private-key-input').type('3kdLcf8sUYMMq2hL8zwDTcefv9qMKKMWeYT5djHKBjXHYydqDE2hW1pgHkW7Z9F1iP6LwMDa9Nhd9TpRjg7v3hm6');
    cy.get('button#restore-wallet-btn').click();
    cy.get('span#wallet-public-key').should('exist').and('be.visible').and('not.be.empty');
  });
});