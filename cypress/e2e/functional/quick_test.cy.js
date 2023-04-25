describe('tests the commenting functions', () => {

    // beforeEach(function () {
    //     //cy.visit('https://devautotest:ZMk4pz2T2dmSgPF@dev.dailymaverick.co.za');
    //      cy.intercept(`${Cypress.env('baseUrl')}**`),
    //         req => {
    //         req.headers['Authorization'] = 'Basic ZGV2YXV0b3Rlc3Q6Wk1rNHB6MlQyZG1TZ1BG'
    //         }
    // });
    // before(function () {
    //     cy.visit('https://devautotest:ZMk4pz2T2dmSgPF@dev.dailymaverick.co.za');
    //
    //     //cy.authWithCredentials(Cypress.env('authUrl'));
    //     // cy.visit(Cypress.env('baseUrl'), {
    //     //     auth: {
    //     //         username: Cypress.env('credentials').username,
    //     //         password: Cypress.env('credentials').password
    //     //     },
    //     //     failOnStatusCode: false
    //     // })
    //
    //
    // });

    it('tests commenting if logged out', () => {
        cy.visit(Cypress.env('articleUrl'));
        cy.get('.comment-opinion').contains('Everybody has an opinion but not everyone has the knowledge and the experience to contribute meaningfully to a discussion. That’s what we want from our members. Help us learn with your expertise and insights on articles that we publish. We encourage different, respectful viewpoints to further our understanding of the world. View our comments policy')
    })

})
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
})