describe('tests the commenting functions', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;


    it( 'sends an itn to the site', function(){
        cy.updatePayfastOrder('1640405');
    });

    // it( 'deletes a User', function(){
    //     cy.deleteUser(subscriber);
    // });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})