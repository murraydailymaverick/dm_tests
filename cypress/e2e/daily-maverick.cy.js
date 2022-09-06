describe('Daily Maverick', () => {

    beforeEach(() => {

        cy.eyesOpen({
            appName: 'Daily Maverick',                       // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
        })
    })


    it('should open up the home page', () => {


        cy.visit('https://dev.dailymaverick.co.za')
        //cy.visit('https://demo.applitools.com')

        cy.eyesCheckWindow({
            tag: "mobile-header",
            target: 'region',
            selector: '#mobile-header'
        });

        cy.eyesCheckWindow({
            tag: "masthead-intro",
            target: 'region',
            selector: '.masthead-intro'
        });

        cy.eyesCheckWindow({
            tag: "footer",
            target: 'region',
            selector: '.footer'
        });
        // cy.eyesCheckWindow({
        //     tag: "Home page",
        //     target: 'window',
        //     fully: true
        // });

    })


    afterEach(() => {

        cy.eyesClose()
    })
})