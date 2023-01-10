context( 'Login, set and prep cookies' , function () {

	before(function () {
		cy.clearWordPressCookies();
	});

	// it( 'Ensure no one is logged in', function() {
	// 	cy.clearWordPressCookies();
	// 	//cy.visit( Cypress.env('dashboardUrl') );
	// 	//cy.location('pathname').should('eq', Cypress.env('localfolder')+'/wp-login.php' ); // Not logged in
	// });


	it( 'Logs in a admin user', function(){
		cy.manualWordPressAdminLogin();
		cy.getWordPressCookies('admin');
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' );
	});


	it( 'logs out the user - and logs back in using setting wp-cookies', function(){
		cy.clearWordPressCookies();
		cy.visit( Cypress.env('loginUrl') , );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/sign-in/' ); // Not logged in
		cy.setWordPressCookies('admin');
		cy.wait(30);
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' ); // Is logged in
	});

});
