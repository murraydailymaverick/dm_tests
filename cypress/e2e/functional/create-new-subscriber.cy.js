context( 'Create a new user via the API and ads a user meta' , function () {

    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    before(function () {
        cy.clearWordPressCookies();
    });

    after(function () {
        cy.deleteUser(subscriber);
    });

    it( 'registers via the from the front end form.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');

        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.visit( Cypress.env('loginUrl'));
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
        cy.intercept('POST', '/ossc-api/create-order/').as('ajaxCreateOrder');
        cy.intercept('POST', '/ossc-api/generate-payment-gateway-signature/').as('ajaxCreateSignature');
        cy.intercept('POST', 'https://sandbox.payfast.co.za/eng/method/WalletFunds/').as('ajaxWalletFunds');
        cy.setWordPressCookies('reader');
        cy.visit(Cypress.env('baseUrl'));
        cy.get('button.navbar-toggle').click()
        cy.get('li.login-mobile-profile a').should('have.length', 6)
        cy.get('li.login-mobile-profile a.profile-link').should('contain.text', 'mr_subscriber')
        cy.visit(Cypress.env('baseUrl')+'/manage-membership/');

        cy.visit(Cypress.env('insiderUrl'));
        cy.get('.proceed-btn.col-md-4').click();
        cy.location('pathname').should( 'contain', '/insider/' );
        cy.wait(500)
        cy.get('.actions-block .pay-now-btn').should('be.visible').click();
        //cy.pause();
        cy.wait('@ajaxCreateOrder');
        cy.wait('@ajaxCreateSignature');
        //cy.wait(1000)
        cy.location('host').should( 'contain', 'payfast' );
        cy.get('#pay-with-wallet').click();
        //https://sandbox.payfast.co.za/eng/method/WalletFunds/35115c17-960b-4b39-af15-3a9f256dc167/pay
        cy.wait('@ajaxWalletFunds');
        cy.wait(50000);
        cy.location('pathname').should( 'contain', 'membership-thank-you' );
        cy.get('.proceed-btn').click();

        cy.location('pathname').should( 'contain', '/manage-membership/' );
        cy.get('#membership-details > div:nth-child(1) > div.col-md-7.col-xs-9').should('contain.text', '200' );
        cy.get('#membership-details > div:nth-child(3) > div.col-md-6.col-xs-6.subscription-status').should('contain.text', 'Active' );


    });

    //check user
    it( 'checks the new users data and delete the user', function(){
        cy.setWordPressCookies('admin');
        cy.visit(Cypress.env('dashboardUrl') + 'users.php');
        cy.get('#user-search-input').type(subscriber.username, {force: true});
        cy.get('#search-submit').click();
        cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
        cy.get('.email a').should('contain', subscriber.email);
        cy.get('div.row-actions').invoke('attr', 'style', 'left: 0').should('have.attr', 'style', 'left: 0');
        cy.get('div.row-actions > .edit').click();
        cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'user-edit.php').then((pathname) => {
            cy.get("#pp_roles_chosen > ul > li.search-choice.ui-sortable-handle > span").should('contain.text', 'Reader');//check role

            ///wp-admin/user-edit.php?user_id=43996&wp_http_referer=%2Fwp-admin%2Fusers.php
            //https://dev.dailymaverick.co.za/wp-admin
            const params = new Proxy(new URLSearchParams(pathname), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            let user_id = params.user_id;

            //cy.visit( Cypress.env('baseUrl') + pathname)
            //cy.location('pathname').should( 'contain', '/insider/' );
            //cy.getWordPressCookies('reader');
        })

       // cy.visit(Cypress.env('dashboardUrl') + '/edit.php?s=' + subscriber.username + '&post_status=all&post_type=shop_order&action=-1&m=0&_customer_user&shop_order_subtype&paged=1&action2=-1');
       // cy.get('td.order_number.column-order_number.has-row-actions.column-primary > a.order-view').click();

        //     .then((pathname) => {
        //     location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'user-edit.php').
        // });

        //cy.get("#your-profile > div:nth-child(18) > div:nth-child(1)").should('contain.text', 'wordpress-users'); //rev-engine labels
       // cy.get("#your-profile > p:nth-child(36) > strong").should('contain.text', '_dm_campaign_created_by_utm_source');
       // cy.get("#your-profile > p:nth-child(36)").should('contain.text', 'testing');


    });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})