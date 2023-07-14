// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

import '@percy/cypress'

Cypress.Commands.overwrite('visit',  (originalFn, url, options) => {
    options = options || {}
    options.auth = {
        username: Cypress.env('credentials').username,
        password: Cypress.env('credentials').password
    }
    return originalFn(url, options);
});


// Cypress.Commands.add("authWithCredentials", (url = '') => {
//     cy.visit(url, {
//         auth: {
//             username: credentials,
//             password: 'D@ily168!'
//         }
//     })
// });

Cypress.Commands.add("clearWordPressCookies", () => {
    cy.clearCookie('wordpress_a8b94154380982c3184a469b8aa525c6');
    cy.clearCookie('wordpress_a8b94154380982c3184a469b8aa525c6');
    cy.clearCookie('wordpress_logged_in_a8b94154380982c3184a469b8aa525c6');
    cy.clearCookie('wordpress_test_cookie');
});

Cypress.Commands.add("getWordPressCookies", (role = 'admin') => {
    cy.getCookies()
        .then((cookies) => {
            cy.writeFile(Cypress.env('env') + '.' + role + 'UserLoginCookiesFromCypress.json', cookies);
        });
});

Cypress.Commands.add("setWordPressCookies", (role = 'admin') => {
    cy.readFile(Cypress.env('env') + '.' + role + 'UserLoginCookiesFromCypress.json')
        .then((cookies) => {
            cookies.forEach((cookie) => {
                 cy.log( JSON.stringify( cookie ) ); // See the cookie contents
                cy.setCookie(cookie.name, cookie.value, {
                    domain: Cypress.env('domain'),
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expiry: cookie.expiry
                });
            });
        });
});

Cypress.Commands.add("wpRequest", (requestURL) => {

    let options = {}
    options.method = 'GET';
    options.url = requestURL;
    options.auth = {
        username: Cypress.env('wp_credentials').username,
        password: Cypress.env('wp_credentials').password
    }
    cy.request( options ).as('retrievedOrder');
    cy.get('@retrievedOrder').should((response) => {
        //expect(response.body).to.have.length(500)
        expect(response.body).to.have.property('status')
        //expect(response).to.have.property('headers')
        //expect(response).to.have.property('duration')
    })

});

Cypress.Commands.add("manualWordPressAdminLogin", () => {
    //cy.clearWordPressCookies();
    cy.visit(Cypress.env('users').admin.adminLoginUrl);
    // if(Cypress.env('dev')==='dev'){
    // if(Cypress.env('dev')==='dev'){
    //     cy.get( '.jetpack-sso-toggle .wpcom' ).click();
    // }
    cy.get('#user_login').wait(200).type(Cypress.env('users').admin.username, {force: true});
    cy.get('#user_pass').wait(200).type(Cypress.env('users').admin.pw, {force: true});
    cy.get('#wp-submit').click();
    cy.get('h1').contains('Dashboard');
});

Cypress.Commands.add("dismissCookieConcent", () => {
    cy.wait(500);
    cy.get('#cookie-law-info-bar').should("be.visible");
    cy.get('#wt-cli-accept-all-btn').click();
    cy.get('#cookie-law-info-bar').should(
        "not.be.visible"
    );
});

Cypress.Commands.add("checkLoggedIn", (user) => {
    //scroll
    cy.get('.footer').scrollIntoView().click();
    cy.get('button.navbar-toggle-right').click();

    // cy.get('.mail_login_engine li a').should('have.length', 5);
    // cy.get('.mail_login_engine h4').should('have.length', 3);
     cy.get('.mail_login_engine .menu-container h3').should('contain.text', user.username);
});

Cypress.Commands.add("manualLogIn", (user, underscore=false) => {
    cy.intercept('POST', Cypress.env('dashboardUrl') + 'admin-ajax.php').as('ajaxPost');
    cy.visit( Cypress.env('loginUrl') );
    cy.get('.password-login').click();
    //cy.get('ul.nav-tabs li a[href="#register"]').click();
    var useremail = user.email;
    if(underscore) { useremail = user._email }
    cy.get('input#sign_user_email').type(useremail);
    cy.get('input#user_password').type(user.pw);
    cy.get('input#remember_me').click();
    cy.get('input[name=user_login]').click();
    cy.wait('@ajaxPost');
});

Cypress.Commands.add("loggedOutRegistersUsesOTPToLogin", (user, underscore=false) => {
    cy.intercept('POST', Cypress.env('baseUrl') + '/wp-json/dm_rest_api/v1/validate_code_and_login').as('validateCode');
    cy.get('#send-magic-email').type(user.email);
    cy.get('.mail-login-engine-shortcode-sumbit').click();
    cy.get('.email-label').should('contain.text', 'Perhaps you entered your email incorrectly?' );
    cy.get('.your-email').should('contain.text', user.email );
    cy.get('.register-btn').click();
    cy.wait(2000);
    cy.get('#otp').should('be.visible' );
    cy.setCode(user);
    cy.get('#otp input[data-index=0]').type('9');
    cy.get('#otp input[data-index=1]').type('7');
    cy.get('#otp input[data-index=2]').type('1');
    cy.get('#otp input[data-index=3]').type('3');
    cy.wait('@validateCode');
    //cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
});

Cypress.Commands.add("loggedOutUsesOTPToLogin", (user, underscore=false) => {
    cy.intercept('POST', Cypress.env('baseUrl') + '/wp-json/dm_rest_api/v1/validate_code_and_login').as('validateCode');
    cy.get('#send-magic-email').type(user.email);
    cy.get('.mail-login-engine-shortcode-sumbit').click();
    cy.get('.email-sent-to').should('contain.text', user.email );
    cy.get('#otp').should('be.visible' );
    cy.setCode(user);
    cy.get('#otp input[data-index=0]').type('9');
    cy.get('#otp input[data-index=1]').type('7');
    cy.get('#otp input[data-index=2]').type('1');
    cy.get('#otp input[data-index=3]').type('3');
    cy.wait('@validateCode');
    //cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
});

Cypress.Commands.add("populateDebitForm", (user, success=true) => {
    //debit form
    cy.get('input[name="billing_first_name"]').clear().type(user.firstname);
    cy.get('input[name="billing_last_name"]').clear().type(user.lastname);
    cy.get('label[for="revio_paymenttype_debicheck"]').click();
    cy.get('input[name="PaycePhoneNumber"]').type(user.tel);
    cy.get('input[name="SAIdNumber"]').type(user.IDNumber);
    cy.get('select[name="PayceBank"]').select('FNB');
    if(success){
        cy.get('input[name="PayceAccount"]').type('560001234');
    } else {
        cy.get('input[name="PayceAccount"]').type('910000001');
    }

    cy.get('input[name="terms"]').click();
});

Cypress.Commands.add("debiCheckModalWait", () => {
    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php' ).as('ajaxAuthenticationWait');
    cy.get('button[name="woocommerce_checkout_place_order"]').click();
    cy.wait(2000);
    cy.get('div.debicheck-modal').should('have.class', 'open' );
    cy.get('div.debicheck-modal h2').should('contain.text', 'Waiting for authentication' );
    cy.wait(20000);//Timed out retrying after 30000ms: cy.wait() timed out waiting 30000ms for the 1st response to the route: ajaxAuthenticationWait. No response ever occurred.
    cy.get('div.debicheck-modal h2').should('contain.text', 'Transaction Successful' );
    cy.wait(40000);
    cy.location('pathname').should( 'contain', 'manage-membership' );
});

Cypress.Commands.add("chooseCreditCardForm", (user) => {
    //Credit form
    cy.get('input[name="billing_first_name"]').clear().type(user.firstname);
    cy.get('input[name="billing_last_name"]').clear().type(user.lastname);
    cy.get('label[for="revio_paymenttype_creditcard"]').click();
    cy.get('input[name="terms"]').click();
});

Cypress.Commands.add("fillCreditCardForm", (user) => {
    cy.wait(5000);
    cy.location('host').should( 'contain', 'payments.revio' );
    cy.intercept('GET','standard.paystack.co/charge/*').as('payCharge');
    cy.intercept('GET','standard.paystack.co/p/*').as('pay');
    // Credit Card form
    // 4444 3333 2222 1111 - non-3D Secure card
    // 5555 5555 5555 4444 - 3D Secure card
    // any cardholder name
    // any expiry larger or equal to the current month/year
    // CVC = 123
    // For a failed payment, please change the CVC or expiration date.
    //cy.get('input[name="card_number"]').clear().type('4444333322221111');
    cy.get('input[name="card_number"]').clear().type('5555555555554444');
    cy.get('input[name="cardholder_name"]').clear().type('test user'+user.lastname);
    cy.get('input[name="expires"]').clear().type('1025');
    cy.get('input[name="cvc"]').clear().type('123');
    cy.get('button.submit_button').click();
    // cy.wait('@payCharge');
    // cy.wait('@pay');
    cy.wait(5000);
    cy.location('host').should( 'contain', Cypress.env('domain') );
});

Cypress.Commands.add("checkWhySignUpModal", (user) => {
    //woocommerce-additional-fields modal
    cy.wait(1000);
    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPostcheckWhySignUpModal');
    cy.get('#whyQuestionsModalLabel').should('be.visible');
    cy.get('#whyQuestionsModalLabel').should('contain.text', 'Why did you sign up for Maverick Insider?');
    cy.get('.wc-radios input[value="0"]').click();
    cy.get('.wc-radios input[value="4"]').click();
    cy.get('button#submitWhyQuestions').click();
    cy.wait('@ajaxPostcheckWhySignUpModal');
    cy.get('#whyQuestionsModalLabel').should('be.hidden');
});

Cypress.Commands.add("payWithPayfast", (user) => {
    cy.intercept('POST', '/ossc-api/create-order/').as('ajaxCreateOrder');
    //  cy.intercept('POST', '/ossc-api/generate-payment-gateway-signature/').as('ajaxCreateSignature');
    cy.get('.actions-block .pay-now-btn').should('be.visible').click();
    //cy.pause();
    cy.wait('@ajaxCreateOrder');
    // cy.wait('@ajaxCreateSignature'); //can take long
    cy.wait(5000)

    // cy.intercept('POST', '**/eng/method/WalletFunds/**').as('ajaxWalletFunds'); //its there but its problimatic
    //cy.intercept('POST', 'https://sandbox.payfast.co.za/eng/method/WalletFunds/*').as('ajaxWalletFunds');

    cy.location('host').should( 'contain', 'payfast' );
    cy.get('#pay-with-wallet').click();
    //cy.wait('@ajaxWalletFunds');
    cy.wait(60000);
    cy.location('hostname').should( 'contain', 'dailymaverick' );
    cy.location('pathname').should( 'contain', 'membership-thank-you' );
    cy.get('.proceed-btn').click();
    cy.location('pathname').should( 'contain', '/manage-membership/' );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//253497

Cypress.Commands.add("maunallyCreateInsider", (user) => {
    cy.visit(Cypress.env('dashboardUrl') + 'edit.php?post_type=wc_user_membership');
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'edit.php');
    cy.get('a.page-title-action').click();
    cy.get('#wc-memberships-member-modal-user-source').select('Create a new user to add as a member', {force: true});

    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
    if(Cypress.env('env')==='local'){
        cy.get('#wc-memberships-member-modal-user-login').type(user.username, {force: true});
        cy.get('#wc-memberships-member-modal-password').type(user.pw, {force: true});
    }

    cy.get('#wc-memberships-member-modal-user-email').type(user.email, {force: true});
    cy.get('#wc-memberships-member-modal-user-first-name').type(user.firstname, {force: true});
    cy.get('#wc-memberships-member-modal-user-last-name').type(user.lastname, {force: true});
    cy.get('#btn-ok').click();
    cy.wait('@ajaxPost');
    //murray+user@dailymaverick.co.za
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'post-new.php');

    cy.location('href').then(path => {
        cy.wrap(path).as('woo_member_url');
    });

    cy.visit(Cypress.env('dashboardUrl') + 'post-new.php?post_type=shop_subscription');

    cy.get('#select2-customer_user-container').click();
    //cy.wait(100);
    cy.get('input[aria-owns="select2-customer_user-results"]').type(user.email + '{enter}');
    cy.wait('@ajaxPost');
    cy.wait(10000);

    cy.get('li.select2-results__option--highlighted').click();

    cy.get('#order_status').select('Active', {force: true});

    cy.get('#_billing_first_name').type(user.firstname, {force: true});
    cy.get('#_billing_last_name').type(user.lastname, {force: true});
    cy.get('#_billing_address_1').type(user.residential_address, {force: true});
    cy.get('#_billing_address_2').type(user.residential_suburb, {force: true});
    cy.get('#_billing_city').type(user.residential_city, {force: true});
    cy.get('#_billing_postcode').type(user.residential_code, {force: true});
    cy.get('#_billing_country').select(user.residential_country, {force: true});

    cy.get('#order_data h2').then(($heading) => {
        const subscription_number = $heading.text();
        const subscriptionArray = subscription_number.split(" ");
        cy.wrap(subscriptionArray[1].replace(/#/g, '')).as('subscription_number');
    });

    cy.get('button.save_order').click();
    cy.wait('@ajaxPost');

    cy.visit(Cypress.env('dashboardUrl') + 'edit.php?post_type=wc_user_membership');

    cy.get('@woo_member_url').then(woo_member_url => {
        cy.visit(woo_member_url);
    });
    cy.wait('@ajaxPost');
    cy.get('a.js-edit-subscription-link-toggle').click();

    cy.get('#select2-_subscription_id-container').click();

    cy.get('@subscription_number').then(subscription_number => {
        cy.get('input[aria-controls="select2-_subscription_id-results"]').type(subscription_number + '{enter}');
    });

    cy.wait('@ajaxPost');
    cy.wait(10000);

    cy.get('li.select2-results__option--highlighted').click();

    cy.wait('@ajaxPost');
    cy.wait(100);

    cy.get('input.save_action').click();
    cy.wait('@ajaxPost');
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'post.php');

});

Cypress.Commands.add("deleteUser", (user, underscore=false) => {
    let options = {}
    options.method = 'POST';
    options.url = Cypress.env('baseUrl')+'/wp-json/dm_rest_api/v1/users/delete';
    options.auth = {
        username: Cypress.env('credentials').username,
        password: Cypress.env('credentials').password
    }
    var useremail = user.email;
    if(underscore) { useremail = user._email }
    options.body = {
        email: useremail,
        authorization: Cypress.env('authtoken')
    }
    cy.request( options );
})

Cypress.Commands.add("setCode", (user) => {
    let options = {}
    options.method = 'POST';
    options.url = Cypress.env('baseUrl')+'/wp-json/dm_rest_api/v1/set_test_code';
    options.auth = {
        username: Cypress.env('credentials').username,
        password: Cypress.env('credentials').password
    }
    options.body = {
        email: user.email,
        authorization: Cypress.env('authtoken')
    }
    cy.request( options ).as('setCodeRequest');
    cy.get('@setCodeRequest').should((response) => {

    })
})

Cypress.Commands.add("checkSubscriptionAndOrder", (user, type) => {
    let options = {}
    options.method = 'POST';
    options.url = Cypress.env('baseUrl')+'/wp-json/dm_rest_api/v1/set_test_code';
    options.auth = {
        username: Cypress.env('credentials').username,
        password: Cypress.env('credentials').password
    }
    options.body = {
        email: user.email,
        authorization: Cypress.env('authtoken')
    }
    cy.request( options ).as('setCodeRequest').then( (response) => {
        expect(response.body.subscriptions).to.have.property('parent_id');
        expect(response.body.subscriptions).to.have.property('customer_id');
      //  expect(response.body.subscriptions.billing.first_name).to.eq(user.firstname) //not set if payfast
        expect(response.body.subscriptions.schedule_next_payment).to.have.property('date');
        //expect(response.body.subscriptions.meta_data.ossc_inflation).to.have.property('key');//multiple keys
        expect(response.body).to.have.property('token');
        expect(response.body.user.data).to.have.property('user_email');
        expect(response.body).to.have.property('meta');
       // cy.wrap(response.body.user.data.user_email).as('user_email')
       // cy.wrap(response.body.meta).as('meta')
       // cy.wrap(response.body.token).as('token')
        cy.wrap(response.body.subscriptions.parent_id).as('order_id')
        cy.writeFile( 'test_info/user_'+response.body.user.data.ID + '_subscriptions.json', response.body.subscriptions);
    });

    cy.get('@order_id').then(order_id => {
        let options = {}
        options.method = 'GET';
        options.url = Cypress.env('baseUrl')+'/wp-json/wc/v3/orders/'+order_id;
        options.auth = {
            username: Cypress.env('wp_credentials').username,
            password: Cypress.env('wp_credentials').password
        }
        cy.request( options ).as('retrievedOrder').then((response) => {
            expect(response.body).to.have.property('status')
            expect(response.body).to.have.property('meta_data')
            expect(response.body.status).to.eq(type.status)
            expect(response.body.total).to.eq(type.amount)
            expect(response.body.payment_method).to.eq(type.payment_method)
            cy.writeFile( 'test_info/order_'+order_id+'.json', response.body);
        });
    });

});

Cypress.Commands.add("OlddeleteUser", (user) => {
    //cy.intercept('POST', '/cdn-cgi/rum?').as('ajaxcdn-cgi');
    //cy.intercept('GET', 'https://public-api.wordpress.com/rest/v1.1/me').as('restme');
    //cy.intercept('GET', 'https://public-api.wordpress.com/rest/v1.1/notifications/').as('restnotifications');
    cy.intercept('POST', '/wp-admin/admin-ajax.php').as('ajaxadmin-ajax');
    cy.setWordPressCookies();
    // cy.visit(Cypress.env('dashboardUrl') + 'users.php');
    // cy.get('#user-search-input').type(user.email, {force: true});
    // cy.get('#search-submit').click();

    cy.visit(Cypress.env('dashboardUrl') + 'users.php?s='+ encodeURIComponent(user.email) +'&action=-1&paged=1');
    cy.wait(8000);
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
    cy.get('.email a').should('contain', user.email);
    cy.get('div.row-actions').invoke('attr', 'style', 'left: 0; width: 100px;').should('have.attr', 'style', 'left: 0; width: 100px;');
    //cy.wait(1000);
    cy.get('a.submitdelete').click({ force: true }).wait(5000);
    //cy.wait('@ajaxcdn-cgi');
    //cy.wait('@restme');
    //cy.wait('@restnotifications');
    //cy.wait('@ajaxadmin-ajax');
    //cy.wait(10000);
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
    //cy.wait(1000);
    cy.get('#delete_option0').click();cy.wait(1000);
    cy.get('#submit').click({ force: true });
   // cy.log('Delete conf submit ');
    cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('list not defined')) {
        return false
    }
    if (err.message.includes('Cannot set properties of undefined (setting \'companyId\')')) {
        return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})






