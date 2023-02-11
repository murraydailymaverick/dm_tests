describe('tests teh commenting funcitons', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;
    var insider = users.insider;


    it('tests an commenting if logged out', () => {
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })
    it('tests an commenting if subscriber logged in', () => {
        cy.setWordPressCookies('subscriber');
        cy.get('.footer').scrollIntoView()
        cy.checkLoggedIn(subscriber);
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })
    it('tests an commenting if insider logged in', () => {
        cy.setWordPressCookies('insider');
        cy.get('.footer').scrollIntoView()
        cy.checkLoggedIn(insider);
        cy.visit(Cypress.env('articleUrl'));
       // cy.get('.comment-opinion').contains('verybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })

})