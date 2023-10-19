describe('Visual testing with percy', function() {

	// it('testing articleTemplate2_old', function() {
	// 	cy.viewport(1280, 1024);
	// 	cy.visit(Cypress.env('articleTemplate2_old'));
	// 	cy.percySnapshot();
	// });
	//
	// it('testing articleTemplate2_old on mobile', function() {
	// 	cy.viewport(375, 667);
	// 	cy.visit( Cypress.env('articleTemplate2_old'));
	// 	cy.percySnapshot();
	// });

	// it('testing articleTemplate1_old', function() {
	// 	cy.viewport(1280, 1024);
	// 	cy.visit(Cypress.env('articleTemplate1_old'));
	// 	cy.percySnapshot();
	// });
	//
	// it('testing articleTemplate1_old on mobile', function() {
	// 	cy.viewport(375, 667);
	// 	cy.visit( Cypress.env('articleTemplate1_old'));
	// 	cy.percySnapshot();
	// });

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