context( 'Create a new user via the API and ads a user meta' , function () {

    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    before(function () {
        cy.clearWordPressCookies();
    });

    it( 'registers via the from the front end form.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');

        cy.visit( Cypress.env('loginUrl') );
        //cy.get('#nav a:first').click();
        cy.get('ul.nav-tabs li a[href="#register"]').click();
        cy.get('input#email').type(subscriber.email);
        cy.get('input#password').type(subscriber.pw);
        cy.get('input#agree_terms').click();
        cy.get('input[name="user_registration"]').click();
        cy.wait('@ajaxPost');
        cy.wait(2000);

        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );


        cy.get('span.heading-step').should('be.visible' );
        cy.get('span.heading-step:first').should( "have.text", "Step 2 of 3" );
        // lets subscribe to a newsletter? or check the count?
        cy.get('div.newsletter-container').children().should('have.length', 12);
        cy.get('input#user-segment0').should('have.class', 'plus-minus');

        cy.get('input#user-segment0').should('be.checked' );
        cy.get('input#user-segment0').click()
        cy.get('input#user-segment0').should('not.be.checked' );

        cy.get('input.subscribe-btn').scrollIntoView().click();
        cy.wait('@ajaxPost');
        cy.get('.toast-message')
            .should('be.visible' )
            //.should('have.text', 'Newsletter Preferences updated' );

        //cy.get('span.heading-step').should( "have.text", "Step 3 of 3" );
        cy.get('a.btn-full').should('have.attr', 'href').and('include', '/insider/').then((href) => {
            cy.visit( Cypress.env('baseUrl') + href)
            cy.location('pathname').should( 'contain', '/insider/' );
            cy.getWordPressCookies('reader');
        })
    });



    it( 'logs in as a reader', function(){
        cy.setWordPressCookies('reader');
        cy.visit(Cypress.env('baseUrl'));
        cy.get('button.navbar-toggle').click()
        cy.get('li.login-mobile-profile a').should('have.length', 6)
        cy.get('li.login-mobile-profile a.profile-link').should('contain.text', 'mr_subscriber')
    });


    //reset password http://localhost/dm/wp-admin/user-edit.php?user_id=12431&wp_http_referer=%2Fdm%2Fwp-admin%2Fusers.php%3Frole%3Dcustomer

    it( 'deletes a user', function(){
        cy.setWordPressCookies('admin');
        cy.wait(30);
        cy.visit(Cypress.env('dashboardUrl'));
    	cy.deleteUser(subscriber);
    });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})