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

	it('testing the singleOpinionPiece template', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('singleOpinionPiece'));
		cy.percySnapshot();
	});

	it('testing singleOpinionPiece on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('singleOpinionPiece'));
		cy.percySnapshot();
	});

	it('testing the templateCartoonPage2 template', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('templateCartoonPage2'));
		cy.percySnapshot();
	});

	it('testing templateCartoonPage2 on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('templateCartoonPage2'));
		cy.percySnapshot();
	});


});
Cypress.on('uncaught:exception', (err, runnable) => {
	let messageArray = [err, runnable];
	return false;
});
