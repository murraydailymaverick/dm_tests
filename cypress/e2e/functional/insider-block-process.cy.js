context( 'Create a new user via the API and ads a user meta' , function () {

    var users = Cypress.env('users');
    var insider = users.insider;

    before(function () {
        cy.clearWordPressCookies();
    });

    it( 'registers via the from the front end form.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.intercept('POST',  '/?wc-ajax=checkout&elementor_page_id=').as('ajaxelementor_page_id');
        cy.intercept('POST', 'https://sandbox.payfast.co.za/eng/method/WalletFunds/*').as('ajaxWalletFunds');
        cy.visit( Cypress.env('baseUrl') +'/support-daily-maverick/?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');

        cy.get('.components-button-group .components-button:first-child').click();
        cy.get('.hero-submit-button.selected').click();
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/checkout/' );
        cy.get('input#billing_first_name').type(insider.firstname);
        cy.get('input#billing_last_name').type(insider.lastname);
        cy.get('input#account_username').type(insider.email);
        cy.get('input#account_password').type(insider.pw);
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click();
        cy.get('#place_order').click();

        //cy.wait('@ajaxelementor_page_id');

    //    cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/checkout/order-pay/' );

        cy.wait(5000);
        cy.location('host').should( 'contain', 'payfast' );
        cy.get('#pay-with-wallet').click();
        cy.wait('@ajaxWalletFunds');
        cy.wait(5000);
       // cy.location('pathname').should( 'contain', '/maverick-portal/' );
        cy.location('pathname').should( 'contain', '/manage-membership/' );
        // cy.wait('@ajaxPost');
        // cy.wait(2000);
        //
        // cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );
        //
        //

        // 'utmSource': _self.getQueryParameter( 'utm_source' ),
        //     'utmMedium': _self.getQueryParameter( 'utm_medium' ),
        //     'utmCampaign': _self.getQueryParameter( 'utm_campaign' ),
        //     'utmTerm': _self.getQueryParameter( 'utm_term' ),
        //     'coupon': window.jQuery( '#subscription-checkout-holder' ).data( 'trackingCoupon' ),
        //     'referral': window.jQuery( '#subscription-checkout-holder' ).data( 'trackingReferral' ),
        //     'choose': window.jQuery( '#subscription-checkout-holder' ).data( 'choose' ),
        //     'deviceType': _self.getDeviceDetails().deviceType,
        //     'referralURL': _self.getReferrerUrl(),
        cy.getWordPressCookies('insider');
    });

    it( 'deletes a User', function(){
        cy.deleteUser(insider);
    });


    //
    //
    // it( 'checks the new users data and delete the user', function(){
    //     cy.setWordPressCookies('admin');
    //     cy.visit(Cypress.env('dashboardUrl') + 'users.php');
    //     cy.get('#user-search-input').type(insider.username, {force: true});
    //     cy.get('#search-submit').click();
    //     cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
    //     cy.get('.email a').should('contain', insider.email);
    //     cy.get('div.row-actions').invoke('attr', 'style', 'left: 0').should('have.attr', 'style', 'left: 0');
    //     cy.get('div.row-actions > .edit').click();
    //     cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'user-edit.php').then((pathname) => {
    //         cy.get("#pp_roles_chosen > ul > li.search-choice.ui-sortable-handle > span").should('contain.text', 'Reader');//check role
    //
    //         const params = new Proxy(new URLSearchParams(pathname), {
    //             get: (searchParams, prop) => searchParams.get(prop),
    //         });
    //         let user_id = params.user_id;
    //
    //     })
    // });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})