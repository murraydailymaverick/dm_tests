describe('Daily Maverick', () => {

    beforeEach(() => {

        cy.eyesOpen({
            appName: 'Daily Maverick Prod',                       // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
        })
    })


    it('should open up the home page', () => {


        cy.visit( Cypress.env('baseUrl') )
        cy.eyesCheckWindow({
            tag: "Prod Home page",
            target: 'window',
            fully: true
        });

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