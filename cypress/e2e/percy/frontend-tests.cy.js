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

	it('Tests scorpio page on iPhone SE ', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('baseUrl') + '/section/scorpio/')
		cy.percySnapshot();
	});

	it('Tests scorpio page on Desktop', () => {
		cy.viewport(1280, 1024);
		cy.visit( Cypress.env('baseUrl') + '/section/scorpio/')
		cy.percySnapshot();
	});

	it('Tests our-burning-planet page on iPhone SE ', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('baseUrl') + '/our-burning-planet/')
		cy.percySnapshot();
	});

	it('Tests our-burning-planet page on Desktop', () => {
		cy.viewport(1280, 1024);
		cy.visit( Cypress.env('baseUrl') + '/our-burning-planet/')
		cy.percySnapshot();
	});
});
Cypress.on('uncaught:exception', (err, runnable) => {
	let messageArray = [err, runnable];
	return false;
});