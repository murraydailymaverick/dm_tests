describe('tests the commenting functions', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;


    it('tests an commenting if logged out', () => {
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })

    it( 'logs in as existing subscriber.', function(){
        cy.manualLogIn(subscriber);
        cy.getWordPressCookies('subscriber');//set the cookies for further tests
        // cy.checkLoggedIn(insider);
    });

    it('tests an commenting if subscriber logged in', () => {
        cy.setWordPressCookies('subscriber');
        cy.get('.footer').scrollIntoView()
        cy.checkLoggedIn(subscriber);
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })

    it( 'logs in as existing insider.', function(){
        cy.manualLogIn(insider);
        cy.getWordPressCookies('insider');//set the cookies for further tests
       // cy.checkLoggedIn(insider);
    });

    it('tests an commenting if insider logged in', () => {
        cy.intercept('POST', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments').as('ajaxCommentsPost');
        cy.intercept('GET', Cypress.env('baseUrl') + '/wp-json/dmc/v1/comments?reviewformtype=fetchfirstthree').as('ajaxFetchfirstthree');
        //https://dev.dailymaverick.co.za/wp-json/dmc/v1/comments
        cy.setWordPressCookies('insider');
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.footer').scrollIntoView()
        cy.checkLoggedIn(insider);
        cy.visit(Cypress.env('articleUrl'));
        cy.get('p.logged-in-as a:first-child').contains( 'Logged in as Insider One')
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
       // cy.get('div.step:nth-child(4)').should('be.visible')

        //display a success message
        //an error message

    })

})
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})