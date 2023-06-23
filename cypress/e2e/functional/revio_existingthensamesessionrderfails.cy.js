describe('some quick tests', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;

    before(function () {
           cy.clearWordPressCookies();
          // cy.deleteUser(subscriber);
    });

    it( 'logged out and uses OTP to login, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value

        cy.location('pathname').should( 'contain', 'checkout' );
        cy.loggedOutUsesOTPToLogin( subscriber );

        //page should refresh and login via token.
        cy.location('pathname').should( 'contain', 'checkout' );

        cy.populateDebitForm(subscriber);
        cy.get('button[name="woocommerce_checkout_place_order"]').click();

        cy.wait(2000);
        cy.get('div.debicheck-modal').should('have.class', 'open' );
        cy.get('div.debicheck-modal h2').should('contain.text', 'Waiting for authentication' );
        cy.wait(5000);
        cy.get('div.debicheck-modal h2').should('contain.text', 'Transaction Successful' );
        cy.wait(30000);
        cy.location('pathname').should( 'contain', 'manage-membership' );

        cy.getWordPressCookies('subscriber');
    });

    it( 'existing session login and changes the amount, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.setWordPressCookies('subscriber');
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.different-amount form.benefits-form button').should('contain.text', '150').click(); //clicks th R200 value

        //checkout login
        cy.location('pathname').should( 'contain', 'checkout' );

        cy.populateDebitForm(subscriber);
        cy.get('button[name="woocommerce_checkout_place_order"]').click();

        cy.wait(2000);
        cy.get('div.debicheck-modal').should('have.class', 'open' );
        cy.get('div.debicheck-modal h2').should('contain.text', 'Waiting for authentication' );
        cy.wait(50000);// fails - never get the request back
        cy.get('div.debicheck-modal h2').should('contain.text', 'Transaction Successful' );
        cy.wait(50000);
        cy.location('pathname').should( 'contain', 'manage-membership' );

    });


})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})