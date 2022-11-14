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
        cy.intercept('POST', Cypress.env('dashboardUrl') + 'admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('loginUrl') );
        //cy.get('#nav a:first').click();
        //cy.get('ul.nav-tabs li a[href="#register"]').click();
        cy.get('input#sign_user_email').type(subscriber.email);
        cy.get('input#user_password').type(subscriber.pw);
        cy.get('input#remember_me').click();
        cy.get('input[name=user_login]').click();
        cy.wait('@ajaxPost');

        cy.location('pathname').should('eq', '/');

        cy.getWordPressCookies('subscriber');//set the cookies for further tests

        cy.get('button.navbar-toggle').click()
        cy.get('li.login-mobile-profile a').should('have.length', 6)
        cy.get('li.login-mobile-profile a.profile-link').should('contain.text', subscriber.username).click();
        cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li').should('have.length', 7);


    });
    /*
        it( 'tests the set cookie process and logout', function(){
            cy.intercept(  'POST', '/cdn-cgi/challenge-platform/h/b/flow/ov1/*').as('CDNChallenge');
            cy.intercept( Cypress.env('baseUrl') + 'dm-admin/?action=logout&redirect_to=*').as('LogoutRequest');
            cy.clearWordPressCookies();
            cy.setWordPressCookies('subscriber');
            cy.visit(Cypress.env('baseUrl'));
            cy.get('button.navbar-toggle').click()
            cy.get('li.login-mobile-profile a').should('have.length', 6)
            cy.get('li.login-mobile-profile a.profile-link').should('contain.text', subscriber.username).click();
            cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li a').should('have.length', 4);

            //now logout
            cy.get('ul.mobile-social-wrap li.login-mobile-profile ul.dropdown-menu li:last-child a').click();
            cy.wait('@LogoutRequest');
            cy.wait('@LogoutRequest');
            cy.wait(10000);


            cy.location('pathname').should('eq', '/');

            cy.get('li.login-mobile-profile a.login-button').should('contain.text', 'Login');

        });
    */
    it( 'tests the forgot / reset password process', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit(Cypress.env('loginUrl'));
        cy.get('form#user_login .checkbox a').click(); // cy.get('a.forgot-password-link').click();
        cy.location('pathname').should('eq', '/forgot-your-password/');
        cy.get('form#wp_pass_reset input#submitbtn').click();
        cy.get('form#wp_pass_reset label#user_input-error').should('be.visible');

        cy.get('form#wp_pass_reset input#user_input').type(subscriber.email);
        cy.get('form#wp_pass_reset label#user_input-error').should('be.hidden');
        cy.get('form#wp_pass_reset input#submitbtn').click();
        cy.wait('@ajaxPost');
        //forgot password doesn't need recpatcha on dev?
        cy.get('form#wp_pass_reset ').should('contain.text', 'If a matching account was found, you will receive an email with password reset instructions. Please check your spam folder if you do not receive an email'); //p.response-message

    });

});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})