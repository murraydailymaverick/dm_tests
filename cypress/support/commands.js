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

Cypress.Commands.add("authWithCredentials", (url = '') => {
     cy.visit(url);
    // cy.visit(url, {
    //     auth: {
    //         username: 'dmdev',
    //         password: 'D@ily168!'
    //     }
    // })
});

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

Cypress.Commands.add("checkLoggedIn", (user) => {
    //scroll
    cy.get('.footer').scrollIntoView().click();
    cy.get('button.navbar-toggle-right').click();
    cy.get('.mail_login_engine li a').should('have.length', 5);
    cy.get('.mail_login_engine h4').should('have.length', 3);
    cy.get('.mail_login_engine h3').should('contain.text', user.username);
});

Cypress.Commands.add("manualLogIn", (user) => {
    cy.intercept('POST', Cypress.env('dashboardUrl') + 'admin-ajax.php').as('ajaxPost');
    cy.visit( Cypress.env('loginUrl') );
    //cy.get('#nav a:first').click();
    //cy.get('ul.nav-tabs li a[href="#register"]').click();
    cy.get('input#sign_user_email').type(user.email);
    cy.get('input#user_password').type(user.pw);
    cy.get('input#remember_me').click();
    cy.get('input[name=user_login]').click();
    cy.wait('@ajaxPost');
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

Cypress.Commands.add("deleteUser", (user) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrl')+'/wp-json/dm_rest_api/v1/users/delete',
        auth: {
            'bearer': Cypress.env('authtoken')
        },
        body: {
            email: user.email
        },
    })
})

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






