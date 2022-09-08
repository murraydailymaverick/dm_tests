context( 'Login as an admin, create a new insider via subscriptions' , function () {

	var users = Cypress.env('users');
	var insider1 = users.insider1;

	before(function () {
		cy.clearWordPressCookies();

	});

	beforeEach(function () {
		//Cypress.Cookies.preserveOnce('PHPSESSID');
		cy.setWordPressCookies();
	});

	it( 'make sure we are logged in', function(){
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' ); // Is logged in
	});

	it( 'creates a new user via wc_user_memberships', function(){
		cy.maunallyCreateInsider(insider1);
	});

	//reset password http://localhost/dm/wp-admin/user-edit.php?user_id=12431&wp_http_referer=%2Fdm%2Fwp-admin%2Fusers.php%3Frole%3Dcustomer

	// it( 'deletes a user', function(){
	// 	cy.deleteUser(insider1);
	// });

});
