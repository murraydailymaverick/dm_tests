describe('Visual testing with percy', function() {
	it('testing the article page', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleUrl'));
		cy.percySnapshot();
	});

	it('testing the article page on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleUrl'));
		cy.percySnapshot();
	});

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

	it('Tests an elementor page on iPhone SE ', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('baseUrl') + '/section/scorpio/')
		cy.percySnapshot();
	});

	it('Tests an elementor page on Desktop', () => {
		cy.viewport(1280, 1024);
		cy.visit( Cypress.env('baseUrl') + '/section/scorpio/')
		cy.percySnapshot();
	});
});