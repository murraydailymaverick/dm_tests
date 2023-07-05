describe('some quick tests', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    // afterEach(function () {
    //     cy.getWordPressCookies('subscriber');
    // });

    // beforeEach(function () {
    //      cy.setWordPressCookies('subscriber');
    // });

    before(function () {
         //cy.clearWordPressCookies();
        //cy.visit(Cypress.env('articleUrl'));
        // cy.loggedOutRegistersUsesOTPToLogin(subscriber);
        //cy.deleteUser(subscriber);
    });

    after(function (){
        //cy.deleteUser(subscriber);
    })

//_pc_DM_MEMBERSHIP_ID
//     it( 'logged out, registers a new user, checks out via DebiCheck', function(){
//         cy.clearWordPressCookies();
//         cy.viewport(1440, 1024);
//         cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
//         cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
//         cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value
//         cy.location('pathname').should( 'contain', 'checkout' );
//         cy.loggedOutRegistersUsesOTPToLogin(subscriber);
//         cy.populateDebitForm(subscriber);
//         cy.get('button[name="woocommerce_checkout_place_order"]').click();
//         cy.debiCheckModalWait();
//         cy.getWordPressCookies('subscriber');
//     });

    it( 'sends an itn to the site', function(){
        cy.checkSubscriptionAndOrder(subscriber, {amount:'200.00'});
    });


})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})