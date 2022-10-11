context( 'Create a new user via the API and ads a user meta' , function () {

    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    before(function () {
        cy.clearWordPressCookies();
    });

    it( 'registers via the from the front end form.', function(){
        cy.visit( Cypress.env('loginUrl') );
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );
        //cy.get('#nav a:first').click();
        cy.get('ul.nav-tabs li a[href="#register"]').click();
        cy.get('input#email').type(subscriber.email);
        cy.get('input#password').type(subscriber.pw);
        cy.get('input#agree_terms').click();
        cy.get('input[name="user_registration"]').click();
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );

    });



    //reset password http://localhost/dm/wp-admin/user-edit.php?user_id=12431&wp_http_referer=%2Fdm%2Fwp-admin%2Fusers.php%3Frole%3Dcustomer

    it( 'deletes a user', function(){
    	cy.deleteUser(subscriber);
    });

});
