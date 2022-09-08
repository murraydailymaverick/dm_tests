context( 'Login as an admin, create a new insider via subscriptions' , function () {

	var users = Cypress.env('users');
	var insider1 = users.insider1;

	before(function () {
		cy.clearWordPressCookies();
	});

	beforeEach(function () {
		cy.setWordPressCookies();
	});


	it( 'As an Admin - Get a token, Logout.', function(){

		cy.visit( Cypress.env('dashboardUrl') +  'admin.php?page=mailloginengine_encode');

		// cy.get('span#current_user_id').then(($span) => {
		// 	cy.wrap($span.text()).as('current_user_id');
		// });
		//
		// cy.get('@current_user_id').then(current_user_id => {
		// 	cy.get('input[name=user_id]').clear().type(current_user_id);
		// });
		cy.get('input[name=user_id]').clear().type(insider1.id);

		cy.get('input#submit').click();

		cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'admin.php' );

		cy.get('pre#token').then(($pre) => {
			cy.task('setToken', $pre.text());
			cy.wrap($pre.text()).as('token');
		});




	});


	it( 'Logs in with a token and checks that you are logged in', function(){

		cy.task('getToken').then((token) => {
			//cy.visit( Cypress.env('baseUrl') +  '?token=' + token + '&maillogindebug=1');
			cy.visit( Cypress.env('baseUrl') +  '?token=' + token );
		});

		cy.get('button.navbar-toggle').click()
		cy.get('li.login-mobile-profile a').should('have.length', 6)
	});
});
