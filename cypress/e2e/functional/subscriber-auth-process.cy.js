context( 'Create a new user via the API and ads a user meta' , function () {

    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    it( 'tries to register with same email as existing user.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('loginUrl') );
        //cy.get('#nav a:first').click();
        cy.get('ul.nav-tabs li a[href="#register"]').click();
        cy.get('input#email').type(subscriber.email);
        cy.get('input#password').type(subscriber.pw);
        cy.get('input#agree_terms').click();
        cy.get('input[name="user_registration"]').click();
        //look fo pop up / toast that says
    });

    it( 'logs in as existing user.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('loginUrl') );
        //cy.get('#nav a:first').click();
        //cy.get('ul.nav-tabs li a[href="#register"]').click();
        cy.get('input#email').type(subscriber.email);
        cy.get('input#password').type(subscriber.pw);
        cy.get('input#agree_terms').click();

        cy.pause();
        //cy.get('input[name="user_registration"]').click();
        //look fo pop up / toast
    });

    it( 'logs in and tests the log out', function(){
        cy.setWordPressCookies('reader');
        cy.visit(Cypress.env('baseUrl'));
        cy.get('button.navbar-toggle').click()
        cy.get('li.login-mobile-profile a').should('have.length', 6)
        cy.get('li.login-mobile-profile a.profile-link').should('contain.text', 'mr_subscriber').click();
        cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li').should('have.length', 4);
        cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li:last-child').click();
    });

    it( 'tests the reset password process', function(){
        //reset password http://localhost/dm/wp-admin/user-edit.php?user_id=12431&wp_http_referer=%2Fdm%2Fwp-admin%2Fusers.php%3Frole%3Dcustomer

        cy.clearWordPressCookies();
        cy.visit(Cypress.env('baseUrl'));
    //     cy.get('button.navbar-toggle').click()
    //     cy.get('li.login-mobile-profile a').should('have.length', 6)
    //     cy.get('li.login-mobile-profile a.profile-link').should('contain.text', 'mr_subscriber').click();
    //     cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li').should('have.length', 4);
    //     cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li:last-child').click();
    });


});