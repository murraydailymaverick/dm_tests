describe('some quick tests', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;

    before(function () {
           //cy.clearWordPressCookies();
          // cy.deleteUser(subscriber);
         // cy.setWordPressCookies('subscriber');
    });

    after(function (){
        //cy.deleteUser(subscriber);
    })

    it( 'logged out and uses OTP to login, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value

        cy.location('pathname').should( 'contain', 'checkout' );
        cy.loggedOutUsesOTPToLogin( subscriber );
        //cy.getWordPressCookies('subscriber');
        //page should refresh and login via token.
        cy.location('pathname').should( 'contain', 'checkout' );
        // cy.chooseCreditCardForm( subscriber );
        // cy.get('button[name="woocommerce_checkout_place_order"]').click();
        // cy.fillCreditCardForm(subscriber);
        cy.populateDebitForm(subscriber);
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.debiCheckModalWait();
        cy.checkWhySignUpModal();

    });


})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})