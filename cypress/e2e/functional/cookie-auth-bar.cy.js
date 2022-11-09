context( 'Create a new user via the API and ads a user meta' , function () {

    before(function () {
        cy.clearWordPressCookies();
    });

    it( 'checks the check for cookie bar and dismisses it.', function(){
        cy.visit( Cypress.env('loginUrl') );
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );

        cy.get('#cookie-law-info-bar').should("be.visible"
        );
        cy.get('#wt-cli-accept-all-btn').click();
        cy.get('#cookie-law-info-bar').should(
            "not.be.visible"
        );
    });

});