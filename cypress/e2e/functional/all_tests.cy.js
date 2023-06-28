describe('test frikkingeverthing', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;

    before(function () {
     //   cy.clearWordPressCookies();
     //   cy.deleteUser(insider);
     //   cy.deleteUser(subscriber);
    });

    after(function (){
        cy.deleteUser(insider);
        cy.deleteUser(subscriber);
    })

    // beforeEach(function () {
    //     cy.authWithCredentials(Cypress.env('authUrl'));
    // });

    // it( 'checks the check for cookie bar and dismisses it.', function(){
    //     cy.visit( Cypress.env('loginUrl') );
    //     cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );
    //     cy.dismissCookieConcent();
    // });

    it('tests commenting if logged out', () => {
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })

    it( 'login via the navigation - email doesnt exist. Then registers. Then checks invalid otp.', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        //cy.get('#onesignal-slidedown-allow-button').click();
        cy.get('a.login-button').click();
        cy.get('.password-login').should('be.visible' );
        cy.get('#send-magic-email').type(subscriber.email);
        cy.get('.mail-login-engine-shortcode-sumbit').click();
        cy.get('.email-label').should('contain.text', 'Perhaps you entered your email incorrectly?' );
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
        cy.wait(3000);
        cy.location('search').should( 'contain', '?token=' );

        cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
        cy.getWordPressCookies('subscriber');
    });

    //it( 'registers via the reg-wall.', function(){});


    it( 'logs in as existing subscriber and check the profile page.', function() {
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');

        cy.setWordPressCookies('subscriber');
        cy.visit(Cypress.env('baseUrl'));
        cy.checkLoggedIn(subscriber);
        //check the profile pages
        cy.visit(Cypress.env('baseUrl') + '/edit-my-profile/');
        cy.location('pathname').should('contain', '/edit-my-profile/');
        //cy.wait('@ajaxPost');
        cy.get('h2').should("have.length", 2);
        //cy.get('.categories-sublinks li').should( "have.length", 3 );
        //cy.get('.categories-sublinks li:nth-child(2)').should( "have.class", "active" );
        //change your name
        //cy.get('input#first_name').should("have.value",subscriber.firstname);
        cy.get('input#first_name').type(subscriber.firstname);
        cy.get('input#last_name').type(subscriber.lastname);
        cy.get('input.user_profile_update').click();
        cy.wait('@ajaxPost');
        cy.get('.toast-message').should("contain.text", "Your profile has been updated!");
        cy.location('pathname').should('contain', '/edit-my-profile/');
        cy.get('input#first_name').should("have.value", subscriber.firstname);

    });

    it( 'logs in as existing subscriber and check the newsletter page.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.setWordPressCookies('subscriber');
        //Newsletter Preferences
        cy.visit( Cypress.env('newsletterUrl'));
       // cy.get('input#tbp_user_firstname').should("have.value",subscriber.firstname);
       // cy.get('input#tbp_user_email').should("have.value",subscriber.email);
        cy.get('.newsletter-block').should( "have.length", 20 );
        //Email Alerts
        //cy.get('.email-preferences').should( "have.length", 6 );

    });

    //start revio

    it( 'logged out, registers a new user, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.test-me form.benefits-form button').should('contain.text', '200').click(); //clicks the R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.loggedOutRegistersUsesOTPToLogin(subscriber);
        cy.populateDebitForm(subscriber);
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.debiCheckModalWait();
        cy.getWordPressCookies('subscriber');
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
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.debiCheckModalWait();
        cy.checkWhySignUpModal();
    });

    it( 'existing session login and changes the amount, checks out via DebiCheck', function(){
        cy.viewport(1440, 1024);
        cy.setWordPressCookies('subscriber');
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('insiderBlockUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.different-amount form.benefits-form button').should('contain.text', '150').click(); //clicks th R200 value
        cy.location('pathname').should( 'contain', 'checkout' );
        cy.populateDebitForm(subscriber);
        cy.get('button[name="woocommerce_checkout_place_order"]').click();
        cy.debiCheckModalWait();
    });

    //end revio

    it( 'logs in as a subscriber, goes to the /insider signup and pays via sandbox. Checks active status', function(){
        cy.intercept('POST', '/ossc-api/create-order/').as('ajaxCreateOrder');
        cy.intercept('POST', '/ossc-api/generate-payment-gateway-signature/').as('ajaxCreateSignature');
       // cy.intercept('POST', '**/eng/method/WalletFunds/**').as('ajaxWalletFunds'); //its there but its problimatic
        //cy.intercept('POST', 'https://sandbox.payfast.co.za/eng/method/WalletFunds/*').as('ajaxWalletFunds');
        cy.setWordPressCookies('subscriber');
        cy.visit(Cypress.env('baseUrl')+'/manage-membership/');
        cy.visit(Cypress.env('insiderUrl'));
        cy.get('.proceed-btn.col-md-4').click();
        cy.location('pathname').should( 'contain', '/insider/' );
        cy.wait(500)
        cy.get('.actions-block .pay-now-btn').should('be.visible').click();
        //cy.pause();
        cy.wait('@ajaxCreateOrder');
        cy.wait('@ajaxCreateSignature');
        //cy.wait(1000)
        cy.location('host').should( 'contain', 'payfast' );
        cy.get('#pay-with-wallet').click();

        //cy.wait('@ajaxWalletFunds');
        cy.wait(60000);

        cy.location('hostname').should( 'contain', 'dailymaverick' );
        cy.getWordPressCookies('subscriber');
        cy.location('pathname').should( 'contain', 'membership-thank-you' );
        cy.get('.proceed-btn').click();
    });

    it( 'logs in as an insider and check the membership page', function(){
        cy.setWordPressCookies('subscriber'); // is now an insider
        cy.visit( Cypress.env('baseUrl')+'/manage-membership/');
        cy.location('pathname').should( 'contain', '/manage-membership/' );
        cy.get('#membership-details > div:nth-child(1) > div.col-md-7.col-xs-9').should('contain.text', '200' );
        cy.get('#membership-details > div:nth-child(3) > div.col-md-6.col-xs-6.subscription-status').should('contain.text', 'Active' );
    });

    it( 'logs in as an insider and Checks active status', function(){
        cy.setWordPressCookies('subscriber'); // is now an insider
        cy.visit( Cypress.env('baseUrl')+'/edit-my-profile/');
        cy.location('pathname').should( 'contain', '/edit-my-profile/' );
        cy.wait('@ajaxPost');
        //Membership Details
        cy.get('#Membership_Details').should( "have.length", 1 );
        cy.get('#manage-membership-holder .btn-blue').should( "have.length", 5 );

        //Ad Preference
        cy.get('.adfree-toggle-check').should( "have.length", 1 );
    });


    it( 'registers a new insider via the insider gutenburg block, pays via payfast.', function(){
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.intercept('POST',  '/?wc-ajax=checkout&elementor_page_id=').as('ajaxelementor_page_id');
      //  cy.intercept('POST', 'https://sandbox.payfast.co.za/eng/method/WalletFunds/*').as('ajaxWalletFunds');
      //  cy.intercept('POST', '**/eng/method/WalletFunds/**').as('ajaxWalletFunds');
        //todo test the utm tags
        cy.visit( Cypress.env('baseUrl') +'/support-daily-maverick/?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        cy.get('.components-button-group .components-button:first-child').click();
        cy.get('.hero-submit-button.selected').click();
        cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/checkout/' );
        cy.get('input#billing_first_name').type(insider.firstname);
        cy.get('input#billing_last_name').type(insider.lastname);
        cy.get('input#account_username').type(insider.email);
        cy.get('input#account_password').type(insider.pw);
        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click();
        cy.get('#place_order').click();
        //cy.wait('@ajaxelementor_page_id');
        //cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/checkout/order-pay/' );
        cy.wait(5000);
        cy.location('host').should( 'contain', 'payfast' );
        cy.get('#pay-with-wallet').click();

       // cy.wait('@ajaxWalletFunds');
        cy.wait(50000);
        // cy.location('pathname').should( 'contain', '/maverick-portal/' );
        cy.location('pathname').should( 'contain', '/manage-membership/' );
        // cy.wait('@ajaxPost');
        // cy.wait(2000);
        // cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );
        cy.getWordPressCookies('insider');
    });

    it( 'logs in as existing insider.', function(){
        cy.manualLogIn(insider);
        cy.getWordPressCookies('insider');//set the cookies for further tests
        cy.checkLoggedIn(insider);
    });

    it('tests commenting if insider logged in', () => {
        cy.intercept('POST', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments').as('ajaxCommentsPost');
        cy.intercept('GET', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments?reviewformtype=fetchfirstthree').as('ajaxFetchfirstthree');
        //https://dev.dailymaverick.co.za/wp-json/dmc/v1/comments
        cy.setWordPressCookies('insider');
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.footer').scrollIntoView()
        cy.checkLoggedIn(insider);
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('everybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')

        cy.get('p.logged-in-as').contains( 'Logged in as Insider One')
        cy.get('p.logged-in-as a:first-child').contains( 'Edit your profile')
        cy.get('p.logged-in-as a:nth-child(2)').contains( 'Log out?')
        cy.get('#commentform #comment').type( 'Automated Test comment.')
        cy.get('#commentform #submit').click()
        //s://dev.dailymaverick.co.za/wp-json/dmc/v1/comments?reviewformtype=fetchfirstthree
        cy.wait('@ajaxFetchfirstthree')
        cy.get('div.dmc-modal-dialog.dmcomment-review').should('be.visible')
        cy.get('div.dmc-modal-dialog.dmcomment-review h2.heading').should('contain.text', 'You look like the level-headed sort.')
        cy.get('div.step:first-child').should('be.visible')
        cy.get('div.step:first-child div.comment-review-buttons label').should('have.length', 3)
        cy.get('div.step:first-child div.comment-review-buttons input[type=radio]').should('have.length', 3)
        cy.get('div.step:first-child div.comment-review-buttons input[type=hidden]').should('have.length', 1)
        cy.get('div.step:first-child label.radio-label-civil-yes').click()
        cy.get('div.step:nth-child(2)').should('be.visible')
        cy.get('div.step:nth-child(2) label.radio-label-civil-no').click()
        cy.get('div.step:nth-child(3)').should('be.visible')
        cy.get('div.step:nth-child(3) label.radio-label-misinfo').click()
        cy.wait('@ajaxCommentsPost')
        //cy.get('div.step:nth-child(4)').should('be.visible')
        //display a success message
        //an error message
    })

    // it( 'sends an itn to the site', function(){
    //     cy.updatePayfastOrder('1640405');
    // });

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})

//old tests

/*
it( 'registers via the from the /sign-in/ form with password. Adds a newsletter and goes to Insider page', function(){
    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
    cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
    cy.visit( Cypress.env('loginUrl'));
    cy.get('ul.nav-tabs li a[href="#register"]').click();
    cy.get('input#email').type(subscriber.email);
    cy.get('input#password').type(subscriber.pw);
    cy.get('input#agree_terms').click();
    cy.get('input[name="user_registration"]').click();
    cy.wait('@ajaxPost');
    cy.wait(2000);
    cy.location('pathname').should( 'contain', Cypress.env('localfolder')+'/sign-in' );
    cy.get('span.heading-step').should('be.visible' );
    cy.get('span.heading-step:first').should( "have.text", "Step 2 of 3" );
    // lets subscribe to a newsletter? or check the count?
    cy.get('div.newsletter-container').children().should('have.length', 12);
    cy.get('input#user-segment0').should('have.class', 'plus-minus');
    cy.get('input#user-segment0').should('be.checked' );
    cy.get('input#user-segment0').click()
    cy.get('input#user-segment0').should('not.be.checked' );
    cy.get('input.subscribe-btn').scrollIntoView().click();
    //fails for some reason TBP
    // cy.wait('@ajaxPost');
    // cy.get('.toast-message').should('be.visible' ).should('have.text', 'Newsletter Preferences updated' );
    // cy.get('.toast-close-button').click();

    //cy.get('span.heading-step').should( "have.text", "Step 3 of 3" );
    cy.get('a.btn-blue-border:nth-child(2)').should('have.attr', 'href').and('include', '/insider/').then((href) => {
        cy.visit( Cypress.env('baseUrl') + href)
        cy.location('pathname').should( 'contain', '/insider/' );
        cy.getWordPressCookies('subscriber');
    })
});

it( 'tries to register with same email as existing subscriber/insider.', function(){
    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
    cy.visit( Cypress.env('loginUrl') );
    //cy.get('#nav a:first').click();
    cy.get('ul.nav-tabs li a[href="#register"]').click();
    cy.get('input#email').type(subscriber.email);
    cy.get('input#password').type(subscriber.pw);
    cy.get('input#agree_terms').click();
    cy.get('input[name="user_registration"]').click();
    //look for pop up / toast that says
});

it( 'tests the forgot / reset password process', function(){
    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
    cy.visit(Cypress.env('loginUrl'));
    cy.get('form#user_login .checkbox a').click(); // cy.get('a.forgot-password-link').click();
    cy.location('pathname').should('eq', '/forgot-your-password/');
    cy.get('form#wp_pass_reset input#submitbtn').click();
    cy.get('form#wp_pass_reset label#user_input-error').should('be.visible');
    cy.get('form#wp_pass_reset input#user_input').type(subscriber.email);
    cy.get('form#wp_pass_reset label#user_input-error').should('be.hidden');
    cy.get('form#wp_pass_reset input#submitbtn').click();
    cy.wait('@ajaxPost');
    //forgot password doesn't need recpatcha on dev?
    cy.get('form#wp_pass_reset ').should('contain.text', 'If a matching account was found, you will receive an email with password reset instructions. Please check your spam folder if you do not receive an email');
});

    //check insider in admin
    it( 'checks the new users data', function(){
        cy.setWordPressCookies('admin');
        cy.visit(Cypress.env('dashboardUrl') + 'users.php');
        cy.get('#user-search-input').type(subscriber.username, {force: true});
        cy.get('#search-submit').click();
        cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'users.php');
        cy.get('.email a').should('contain', subscriber.email);
        cy.get('div.row-actions').invoke('attr', 'style', 'left: 0').should('have.attr', 'style', 'left: 0');
        cy.get('div.row-actions > .edit').click();
        cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'user-edit.php');
        //we check the user profile
        cy.get("#pp_roles_chosen > ul > li.search-choice.ui-sortable-handle > span").should('contain.text', 'Reader');//check role
        // cy.get("div.user-memberships p").should('contain.text', 'This user is a member of'); //check membership
        // cy.get("div.user-memberships p a").click();
        // //we check the users membership
        // cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'post.php'); // edit user membership
        // cy.get("div.user-memberships p").should('contain.text', 'This user is a member of'); //check membership
        // cy.get("#wc-memberships-user-membership-data > div.inside > div.billing-details > div > p:nth-child(1)").should('contain.text', 'Purchased in:'); //check membership
        // cy.get("#wc-memberships-user-membership-data > div.inside > div.billing-details > div > p:nth-child(1) ").should('contain.text', 'Order '); //check membership
        //
        // cy.get("div.billing-details > div.woocommerce_options_panel p.billing-detail:nth-child(4)").should('contain.text', 'Subscription:'); //check membership
        // cy.get("div.billing-details > div.woocommerce_options_panel p.billing-detail:nth-child(4) a:nth-child(1)").click()
        //
        // //we check the users subscription
        // cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'post.php'); // Edit Subscription
        // cy.get("select#order_status").should('have.value', 'Active');
        // cy.get("#order_data > div.order_data_column_container > p.wc-customer-subscription-tracking-info:nth-child(1) strong").should('contain.text', 'Device Type:');
        //
        // cy.get("#order_data > div.order_data_column_container > div:nth-child(1) > p.form-field-wide:nth-child(4)").should('contain.text', 'Parent order');
        // cy.get("#order_data > div.order_data_column_container > div:nth-child(1) > p.form-field-wide:nth-child(4) a").click();
        //
        // cy.location('pathname').should('eq', Cypress.env('localfolder') + '/wp-admin/' + 'post.php'); // Edit Order

       // cy.visit(Cypress.env('dashboardUrl') + '/edit.php?s=' + subscriber.username + '&post_status=all&post_type=shop_order&action=-1&m=0&_customer_user&shop_order_subtype&paged=1&action2=-1');
       // cy.get('td.order_number.column-order_number.has-row-actions.column-primary > a.order-view').click();

        //

        //cy.get("#your-profile > div:nth-child(18) > div:nth-child(1)").should('contain.text', 'wordpress-users'); //rev-engine labels
       // cy.get("#your-profile > p:nth-child(36) > strong").should('contain.text', '_dm_campaign_created_by_utm_source');
       // cy.get("#your-profile > p:nth-child(36)").should('contain.text', 'testing');
       //  <meta name="user_id" content="12486">
//http://localhost/dm/wp-admin/user-edit.php?user_id=12510&wp_http_referer=%2Fdm%2Fwp-admin%2Fusers.php%3Fs%3Dmr_subscriber%26action%3D-1%26new_role%26add_user_tag%26remove_user_tag%26paged%3D1%26action2%3D-1%26new_role2
        cy.location('pathname').should('contain',  '/wp-admin/' + 'user-edit.php').then((pathname) => {

            const arr = pathname.split('/user-edit.php?')[1].split('&');
            const paramObj = {};
            arr.forEach(param => {
                const [ key, value ] = param.split('=');
                paramObj[key] = value;
            });

              });


    });

*/
