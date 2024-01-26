describe('Percy Visual testing articles', function() {
	it('testing the article Template 1 on desktop', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleTemplate1'));
		cy.percySnapshot();
	});

	it('testing article Template 1 on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplate1'));
		cy.percySnapshot();
	});

	it('testing the article Template 2 on desktop', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('articleTemplate2'));
		cy.percySnapshot();
	});

	it('testing article Template 2 on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplate2'));
		cy.percySnapshot();
	});

	// it('testing the article Template NoAds  on desktop', function() {
	// 	cy.viewport(1280, 1024);
	// 	cy.visit(Cypress.env('articleTemplateNoAds'));
	// 	cy.percySnapshot();
	// });

	it('testing article Template NoAds on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleTemplateNoAds'));
		cy.percySnapshot();
	});

	it('testing the single Opinion Piece on desktop', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('singleOpinionPiece'));
		cy.percySnapshot();
	});

	it('testing single Opinion Piece on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('singleOpinionPiece'));
		cy.percySnapshot();
	});

	it('testing the template Cartoon on desktop', function() {
		cy.viewport(1280, 1024);
		cy.visit(Cypress.env('templateCartoonPage2'));
		cy.percySnapshot();
	});

	it('testing template Cartoon on mobile', function() {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('templateCartoonPage2'));
		cy.percySnapshot();
	});

});
Cypress.on('uncaught:exception', (err, runnable) => {
	let messageArray = [err, runnable];
	return false;
});
