describe('Percy Visual testing articleTemplate2', function() {
	it('testing the articleTemplate2 template', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleTemplate2'));
		cy.percySnapshot();
	});

	it('testing articleTemplate2 on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplate2'));
		cy.percySnapshot();
	});

});