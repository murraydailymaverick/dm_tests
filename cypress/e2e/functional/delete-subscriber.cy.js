context( 'Deletes the subscriber user' , function () {

    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    //check user
    it( 'checks the new users data and delete the user', function(){
    	cy.deleteUser(subscriber);
    });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})