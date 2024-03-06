describe('Visual testing with percy', function() {
	it('tests the home page on iPhone SE ', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('baseUrl') )
		cy.percySnapshot();
	})

	it('tests the home page in Desktop 1280px', () => {
		cy.viewport(1280, 1024);
		cy.visit( Cypress.env('baseUrl') )
		cy.percySnapshot();
	})
});
Cypress.on('uncaught:exception', (err, runnable) => {
	let messageArray = [err, runnable];
	return false;
});