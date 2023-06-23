describe('tests the commenting functions', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;

    before(function () {
           cy.clearWordPressCookies();
          // cy.deleteUser(subscriber);
    });

    // after(function (){
    //     cy.deleteUser(subscriber);
    // })


})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})