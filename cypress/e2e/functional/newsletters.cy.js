describe('testing newsletters', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;

    before(function () {
     //   cy.clearWordPressCookies();
     //   cy.deleteUser(subscriber);
    });

    after(function (){
        cy.deleteUser(subscriber);
    })

    it( 'login via the navigation - email doesnt exist. Then registers. Then checks invalid otp.', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('a.login-button').click();
        cy.get('.password-login').should('be.visible' );
        cy.get('.send-magic-email').type(subscriber.email);
        cy.get('.mail-login-engine-shortcode-sumbit').click();
        cy.get('.email-label').should('contain.text', 'Perhaps you entered your email incorrectly?' );
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

        //cy.wait(1000);
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        //cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
        cy.getWordPressCookies('subscriber');
    });

    it( 'logs in as existing subscriber and check the newsletter page.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.setWordPressCookies('subscriber');
        cy.visit( Cypress.env('newsletterUrl'));
       // cy.get('input#tbp_user_firstname').should("have.value",subscriber.firstname);
       // cy.get('input#tbp_user_email').should("have.value",subscriber.email);
        cy.get('.newsletter-block').should( "have.length", 20 );
    });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})
