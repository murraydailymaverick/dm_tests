describe('Percy Visual testing articleTemplate1', function() {
	it('testing the articleTemplate1 template', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleTemplate1'));
		cy.percySnapshot();
	});

	it('testing articleTemplate1 on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplate1'));
		cy.percySnapshot();
	});

});