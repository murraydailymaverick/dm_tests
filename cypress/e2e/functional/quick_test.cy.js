describe('tests the commenting functions', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;
    it( 'login via the navigation - email doesnt exist. Then registers. Then checks invalid otp.', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        //cy.get('#onesignal-slidedown-allow-button').click();
        cy.get('a.login-button').click();
        cy.get('.password-login').should('be.visible' );
        cy.get('#send-magic-email').type(subscriber.email);
        cy.get('.mail-login-engine-shortcode-sumbit').click();
        cy.get('.email-label').should('contain.text', 'Perhaps you incorrectly entered your email?' );
        //cy.get('.register-form h4.first-child').should('contain.text', 'It looks like we don’t have an account for' );
        // cy.get('.register-form h4 strong.your-email').should('contain.text', subscriber.email );
        //cy.get('.register-form h4.second-child').should('contain.text', 'Would you like us to create an account for you?' );
        cy.get('.your-email').should('contain.text', subscriber.email );
        cy.get('.register-btn').click();
        cy.get('.email-sent-to').should('contain.text', subscriber.email );
        cy.get('#otp').should('be.visible' );

        cy.setCode(subscriber);

        cy.wait(1000);

        cy.get('#otp input[data-index=0]').type('1');
        cy.get('#otp input[data-index=1]').type('2');
        cy.get('#otp input[data-index=2]').type('3');
        cy.get('#otp input[data-index=3]').type('4');
        cy.get('.response-text').should('contain.text', 'Sorry, the OTP code is invalid. Please re-check?.' );

        cy.get('#otp input[data-index=0]').clear();
        cy.get('#otp input[data-index=1]').clear();
        cy.get('#otp input[data-index=2]').clear();
        cy.get('#otp input[data-index=3]').clear();
        cy.get('#otp input[data-index=0]').type('9');
        cy.get('#otp input[data-index=1]').type('7');
        cy.get('#otp input[data-index=2]').type('1');
        cy.get('#otp input[data-index=3]').type('3');

        //page should refresh and login via token.
        cy.location('pathname').should( 'contain', '/?token=' );

        cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
        cy.getWordPressCookies('subscriber');
    });

    it( 'deletes a User', function(){
        cy.deleteUser(subscriber);
    });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})