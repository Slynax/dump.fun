describe('Buy 25%', () => {
    it('should buy 25%', () => {
        cy.visit('http://localhost:5173');
        cy.get('button#open-modal-btn').click();
    });
});