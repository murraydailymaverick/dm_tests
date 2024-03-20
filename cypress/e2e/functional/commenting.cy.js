describe('test commenting', () => {
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

    it('tests commenting if logged out', () => {
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comments-area h3').contains('Comments - Please login in order to comment.')
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
        cy.get('#otp input[data-index=0]').type('9');
        cy.get('#otp input[data-index=1]').type('7');
        cy.get('#otp input[data-index=2]').type('1');
        cy.get('#otp input[data-index=3]').type('3');

        //cy.wait(1000);
        cy.visit( Cypress.env('baseUrl') +'?utm_source=testing&utm_medium=testing&utm_campaign=testing&utm_term=testing&utm_content=testing');
        //cy.get('.your-account').should('be.visible' ).should('contain.text', 'Your Account' );
        cy.getWordPressCookies('subscriber');
    });

    it('tests commenting if logged in', () => {
        cy.intercept('POST', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments').as('ajaxCommentsPost');
        cy.intercept('GET', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments?reviewformtype=fetchfirstthree').as('ajaxFetchfirstthree');
        //https://dev.dailymaverick.co.za/wp-json/dmc/v1/comments

        cy.setWordPressCookies('subscriber');
        cy.visit(Cypress.env('articleUrl'));
        //cy.checkLoggedIn(subscriber);
        cy.get('.footer').scrollIntoView()
        cy.get('.comment-opinion').contains('When you comment on a Daily Maverick article, you add your voice to a community of readers who place a high premium on the truth. We encourage you to think twice before voicing untested claims. Instead, we want you to bring your expertise and experience to the conversation to further our understanding of the issues. View our comments policy ')

        // cy.get('p.logged-in-as').contains( 'Logged in as Subscriber One')
        // cy.get('p.logged-in-as a:first-child').contains( 'Edit your profile')
        // cy.get('p.logged-in-as a:nth-child(2)').contains( 'Log out?')
        cy.get('#commentform #comment').type( 'Automated Test comment.')
        cy.get('div.logged-in-as p:first-child').contains( 'You are about to comment as murraysubscriber@dailymaverick.co.za.');
        cy.get('div.logged-in-as p:nth-child(2)').contains( 'Add your name when commenting?');
        cy.get('#commentform #submit').click();
        cy.get('#firstname-error').contains( 'This field is required.');
        cy.get('#firstname').type( 'Murray');
        cy.get('#lastname').type( 'Greig')
        cy.get('#commentform #submit').click()
        //s://dev.dailymaverick.co.za/wp-json/dmc/v1/comments?reviewformtype=fetchfirstthree
        cy.wait('@ajaxFetchfirstthree')
        cy.get('div.dmc-modal-dialog.dmcomment-review').should('be.visible')
        cy.get('div.dmc-modal-dialog.dmcomment-review h2.heading').should('contain.text', 'You look like the level-headed sort.')
        cy.get('div.step:first-child').should('be.visible')
        cy.get('div.step:first-child div.comment-review-buttons label').should('have.length', 3)
        cy.get('div.step:first-child div.comment-review-buttons input[type=radio]').should('have.length', 3)
        cy.get('div.step:first-child div.comment-review-buttons input[type=hidden]').should('have.length', 1)
        cy.get('div.step:first-child label.radio-label-civil-yes').click({force: true})
        cy.get('div.step:nth-child(2)').should('be.visible')
        cy.get('div.step:nth-child(2) label.radio-label-civil-no').click({force: true})
        cy.get('div.step:nth-child(3)').should('be.visible')
        cy.get('div.step:nth-child(3) label.radio-label-misinfo').click({force: true})
        cy.wait('@ajaxCommentsPost')
        //cy.get('div.step:nth-child(4)').should('be.visible')
        //display a success message
        //an error message
    })

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})

