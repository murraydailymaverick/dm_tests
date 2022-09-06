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


Cypress.Commands.add( "clearWordPressCookies", () => {
    cy.clearCookie( 'wordpress_a8b94154380982c3184a469b8aa525c6' );
    cy.clearCookie( 'wordpress_a8b94154380982c3184a469b8aa525c6' );
    cy.clearCookie( 'wordpress_logged_in_a8b94154380982c3184a469b8aa525c6' );
    cy.clearCookie( 'wordpress_test_cookie' );
});

Cypress.Commands.add( "getWordPressCookies", () => {
    cy.getCookies()
        .then( (cookies) => {
            cy.writeFile( 'adminUserLoginCookiesFromCypress.json', cookies );
        });
});

Cypress.Commands.add( "setWordPressCookies", () => {

    cy.readFile( 'adminUserLoginCookiesFromCypress.json' )
        .then( (cookies) => {
            cookies.forEach( (cookie) => {
                // cy.log( JSON.stringify( cookie ) ); // See the cookie contents
                cy.setCookie( cookie.name, cookie.value, {
                    domain: Cypress.env('domain'),
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expiry: cookie.expiry
                });
            });
        });
});

Cypress.Commands.add( "manualWordPressAdminLogin", () => {
    cy.clearWordPressCookies();
    cy.visit( Cypress.env('dashboardUrl') );
    cy.get('#user_login').wait(200).type( Cypress.env('users').admin.username , { force: true } );
    cy.get('#user_pass').wait(200).type( Cypress.env('users').admin.pw, { force: true } );
    cy.get('#wp-submit').click();
    cy.get('h1').contains( 'Dashboard' );
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

Cypress.Commands.add( "maunallyCreateInsider", (user) => {
    cy.visit( Cypress.env('dashboardUrl') +  'edit.php?post_type=wc_user_membership');
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'edit.php' );
    cy.get('a.page-title-action').click();
    cy.get('#wc-memberships-member-modal-user-source').select('Create a new user to add as a member', {force: true});

    cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
    cy.get('#wc-memberships-member-modal-user-email').type(user.email, {force: true});
    cy.get('#wc-memberships-member-modal-user-first-name').type(user.firstname, {force: true});
    cy.get('#wc-memberships-member-modal-user-last-name').type(user.lastname, {force: true});
    cy.get('#btn-ok').click();
    cy.wait('@ajaxPost');
    //murray+user@dailymaverick.co.za
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'post-new.php' );

    cy.location('href').then(path => {
        cy.wrap(path).as('woo_member_url');
    });

    cy.visit( Cypress.env('dashboardUrl') +  'post-new.php?post_type=shop_subscription');

    cy.get('#select2-customer_user-container').click();
    //cy.wait(100);
    cy.get('input[aria-owns="select2-customer_user-results"]').type(user.email+'{enter}');
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
        cy.wrap(subscriptionArray[1].replace(/#/g,'')).as('subscription_number');
    });

    cy.get('button.save_order').click();
    cy.wait('@ajaxPost');

    cy.visit( Cypress.env('dashboardUrl') +  'edit.php?post_type=wc_user_membership');

    cy.get('@woo_member_url').then(woo_member_url => {
        cy.visit(woo_member_url);
    });
    cy.wait('@ajaxPost');
    cy.get('a.js-edit-subscription-link-toggle').click();

    cy.get('#select2-_subscription_id-container').click();

    cy.get('@subscription_number').then(subscription_number => {

        cy.get('input[aria-controls="select2-_subscription_id-results"]').type(subscription_number+'{enter}');

    });
    cy.wait('@ajaxPost');
    cy.wait(10000);

    cy.get('li.select2-results__option--highlighted').click();

    cy.wait('@ajaxPost');
    cy.wait(100);

    cy.get('input.save_action').click();
    cy.wait('@ajaxPost');
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'post.php' );

});

Cypress.Commands.add( "deleteUser", (user) => {

    cy.setWordPressCookies();
    cy.visit( Cypress.env('dashboardUrl') +  'users.php');

    cy.get('#user-search-input').type(user.email, {force: true});
    cy.get('#search-submit').click();
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'users.php' );
    cy.get('.email a').should('contain', user.email);
    cy.get('div.row-actions').invoke('attr', 'style', 'left: 0').should('have.attr', 'style', 'left: 0');
    cy.get('a.submitdelete').click();
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'users.php' );
    cy.get('#delete_option0').click();
    cy.get('#submit').click();
    cy.location('pathname').should( 'eq', Cypress.env('localfolder')+'/wp-admin/'+'users.php' );

});








