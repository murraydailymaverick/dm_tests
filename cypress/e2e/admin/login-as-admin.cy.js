context( 'Login, set and prep cookies' , function () {

	it( 'Ensure no one is logged in', function() {
		cy.clearWordPressCookies();
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should('eq', Cypress.env('localfolder')+'/wp-login.php' ); // Not logged in
	});


	it( 'Logs in a admin user', function(){
		if(Cypress.env('dev')==='dev'){
			cy.get( '.jetpack-sso-toggle .wpcom' ).click();
		}
		cy.manualWordPressAdminLogin();
		cy.getWordPressCookies();
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' );
	});


	it( 'logs out the user - and logs back in using setting wp-cookies', function(){
		cy.clearWordPressCookies();
		cy.visit( Cypress.env('loginUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-login.php' ); // Not logged in
		cy.setWordPressCookies();
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' ); // Is logged in
	});

});
