context( 'Deletes the insider user' , function () {

    var users = Cypress.env('users');
    var insider = users.insider;

    //check user
    it( 'checks the new users data and delete the user', function(){
    	cy.deleteUser(insider);
    });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})