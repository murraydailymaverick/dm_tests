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
    });

    after(function (){
       // cy.deleteUser(subscriber);
    })



    // it( 'sends an itn to the site', function(){
    //     cy.updatePayfastOrder('1640405');
    // });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})