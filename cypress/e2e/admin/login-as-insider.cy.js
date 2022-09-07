context( 'Login as an admin, create a new insider via subscriptions' , function () {

	var users = Cypress.env('users');
	var insider1 = users.insider1;

	before(function () {
		cy.clearWordPressCookies();
	});

	// beforeEach(function () {
	// 	cy.clearWordPressCookies();
	// });

	// it( 'logs out the user - and logs back in using setting wp-cookies', function(){
	// 	cy.visit( Cypress.env('dashboardUrl') );
	// 	cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' ); // Is logged in
	// });

	it( 'Logs in a admin user', function(){
		cy.manualWordPressAdminLogin();
		cy.getWordPressCookies();
		cy.visit( Cypress.env('dashboardUrl') );
		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/' );
	});


	it( 'As an Admin - Get a token, Logout.', function(){

		cy.setWordPressCookies();
		//http://localhost/dm/wp-admin/admin.php?page=mailloginengine_encode
		cy.visit( Cypress.env('dashboardUrl') +  'admin.php?page=mailloginengine_encode');

		cy.get('span#current_user_id').then(($span) => {
			cy.wrap($span.text()).as('current_user_id');
		});

		// cy.get('@current_user_id').then(current_user_id => {
		// 	cy.get('input[name=user_id]').clear().type(current_user_id);
		// });

		cy.get('input#submit').click();

		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'admin.php' );

		cy.get('pre#token').then(($pre) => {
			cy.task('setToken', $pre.text());
			cy.wrap($pre.text()).as('token');
		});




	});

//then test ur to see if logged in
	it( 'Logs in with a token', function(){

		cy.task('getToken').then((token) => {
			cy.visit( Cypress.env('baseUrl') +  '?token=' + token);
		});

		cy.get('button.navbar-toggle').click()
	});

	it( 'deletes a user', function(){
		cy.deleteUser(insider1);
	});

});
