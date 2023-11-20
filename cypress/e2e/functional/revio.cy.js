describe('test revio payments', () => {
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

    it( 'registers via the navigation via otp.', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('a.login-button').click();
        cy.get('.send-magic-email').type(subscriber.email);
        cy.get('.mail-login-engine-shortcode-sumbit').click();
        cy.get('.email-label').should('contain.text', 'Perhaps you entered your email incorrectly?' );
        cy.get('.your-email').should('contain.text', subscriber.email );
        cy.get('.register-btn').click();
        cy.get('.email-sent-to').should('contain.text', subscriber.email );
        cy.get('#otp').should('be.visible' );
        cy.setCode(subscriber);
        cy.wait(1000);
        cy.get('#otp input[data-index=0]').type('9');
        cy.get('#otp input[data-index=1]').type('7');
        cy.get('#otp input[data-index=2]').type('1');
        cy.get('#otp input[data-index=3]').type('3');

        cy.wait(1000);
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        //cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
        cy.getWordPressCookies('subscriber');
    });

    it( 'set session, signs up via the insider blocks and checks out via DebiCheck', function(){
        cy.setWordPressCookies('subscriber');
        cy.viewport(1440, 1024);
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.populateDebitForm(subscriber);
        cy.debiCheckModalWait();
        cy.getWordPressCookies('subscriber');
    });


   it( 'logs in as the /insider to check the manage-membership page.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.setWordPressCookies('subscriber');
        cy.visit(Cypress.env('baseUrl')+'/manage-membership/');
        cy.location('pathname').should( 'contain', '/manage-membership/' );

        cy.get('#whyQuestionsModal').should("be.visible");
        cy.get('ul.wc-radios li label').should('have.length', 8);
        cy.get('ul.wc-radios li label').first().click();
        cy.get('#submitWhyQuestions').click();
        cy.wait('@ajaxPost');
        cy.visit(Cypress.env('baseUrl')+'/manage-membership/');
    });

    //check order here:
   it( 'checks the payfast order info.', function(){
        cy.checkSubscriptionAndOrder(subscriber, {amount:'200.00', payment_method: 'payfast', status: 'completed'});
    });

    it( 'set session, check insiderBlockUrl redirect, check active message, switch to 150  and checks out via DebiCheck', function(){
        cy.setWordPressCookies('subscriber');
        cy.viewport(1440, 1024);
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.location('pathname').should( 'contain', 'manage-membership' );
        cy.get('#manage-membership-holder .col-xs-12  h3').should('contain.text', 'Please see your membership details below:');
        cy.get('#manage-membership-holder .col-xs-12  .woocommerce-info').should('contain.text', 'You currently have an active membership of R 200 / Monthly with Payfast as your payment method. To change your membership details, please choose your preferences below and complete the checkout process.');

        cy.get('.switchSubscription').click();
        cy.get('#switchSubscription .modal-dialog').should('be.visible');
        cy.get('button[data-switch-amount=150]').click();

        cy.location('pathname').should( 'contain', 'checkout' );
        cy.get('#revio_paymenttype_debicheck').click();
        cy.populateDebitForm(subscriber);
        cy.debiCheckModalWait();
        cy.getWordPressCookies('subscriber');
    });

    //check order here:
    it( 'checks the DebiCheck order info.', function(){
        cy.checkSubscriptionAndOrder(subscriber, { amount:'200.00', payment_method: 'dmrevio', status: 'completed' });
    });

    //start revio
/*

    it( 'deletes the subscriber', function(){
        cy.deleteUser(subscriber);
    });
*/

    it( 'logged out, registers a new user, checks out via revio DebiCheck', function(){
        cy.clearWordPressCookies();
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.loggedOutRegistersUsesOTPToLogin(subscriber);
        cy.populateDebitForm(subscriber);
        cy.debiCheckModalWait();
        cy.getWordPressCookies('subscriber');
    });

    it( 'checks the DebiCheck order info.', function(){
        cy.checkSubscriptionAndOrder(subscriber, { amount:'200.00', payment_method: 'dmrevio', status: 'completed' });
    });

    it( 'logged out and uses OTP to login, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.different-amount form.benefits-form button').should('contain.text', '150').click(); //clicks th R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.loggedOutUsesOTPToLogin( subscriber );
        cy.getWordPressCookies('subscriber');
        //page should refresh and login via token.
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.populateDebitForm(subscriber);
        cy.debiCheckModalWait();
        cy.checkWhySignUpModal();
    });

    it( 'OTP login, existing subscription, chooses different amount, checks out via revio CreditCard', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('a.login-button').click();
        cy.loggedOutUsesOTPToLogin(subscriber);
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.location('pathname').should( 'contain', 'manage-membership' );
        cy.get('#manage-membership-holder .col-xs-12  h3').should('contain.text', 'Please see your membership details below:');
       // cy.get('#manage-membership-holder .col-xs-12  .woocommerce-info').should('contain.text', 'You currently have an active membership of R 200 / Monthly with Payfast as your payment method. To change your membership details, please choose your preferences below and complete the checkout process.');

        cy.get('.switchSubscription').click();
        cy.get('#switchSubscription .modal-dialog').should('be.visible');
        cy.get('button[data-switch-amount=150]').click();
        cy.chooseCreditCardForm( subscriber );
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.fillCreditCardForm(subscriber);
    });

    it( 'checks the revio credit card order order info.', function(){
        cy.checkSubscriptionAndOrder(subscriber, { amount:'150.00', payment_method: 'dmrevio', status: 'failed' });
    });

    it( 'existing session, existing subscription, chooses different amount, checks out via revio CreditCard', function(){
        cy.viewport(1440, 1024);
        cy.setWordPressCookies('subscriber');
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.different-amount form.benefits-form button').should('contain.text', '150').click(); //clicks th R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.chooseCreditCardForm( subscriber );
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.fillCreditCardForm(subscriber);
    });

    it( 'checks the revio credit card order order info.', function(){
        cy.checkSubscriptionAndOrder(subscriber, { amount:'150.00', payment_method: 'dmrevio', status: 'failed' });
    });

    it( 'registers a new subscriber via the gutenburg block, pays via revio cc.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.intercept('POST',  '/?wc-ajax=checkout&elementor_page_id=').as('ajaxelementor_page_id');
        //todo test the utm tags
        cy.visit( Cypress.env('baseUrl') +'/support-daily-maverick/?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.components-button-group .components-button:first-child').click();
        cy.get('.hero-submit-button.selected').click();
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/checkout/' );
        cy.loggedOutRegistersUsesOTPToLogin(subscriber);
        cy.chooseCreditCardForm( subscriber );
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.fillCreditCardForm(subscriber);
        cy.getWordPressCookies('subscriber');
    });


    // it( 'sends an itn to the site', function(){
    //     cy.updatePayfastOrder('1640405');
    // });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})