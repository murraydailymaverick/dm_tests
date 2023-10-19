describe('Percy Visual testing articleTemplateNoAds', function() {
	it('testing the articleTemplateNoAds template', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleTemplateNoAds'));
		cy.percySnapshot();
	});

	it('testing articleTemplateNoAds on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplateNoAds'));
		cy.percySnapshot();
	});

});