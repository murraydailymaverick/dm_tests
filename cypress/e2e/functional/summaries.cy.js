//Simon’s Town blaze rips through 450ha, hundreds of firefighters continue battle
// http://local.dailymaverick.co.za/article/2023-12-20-simons-town-blaze-rips-through-450ha-firefighters-continue-battle/?topreads=card&utm_source=socialshare&utm_medium=twitter
describe('tests the summaries page', () => {
    var users = Cypress.env('users');
    var subscriber = users.subscriber;

    before(function () {
        //   cy.clearWordPressCookies();
        //   cy.deleteUser(subscriber);
    });

    after(function (){
       // cy.deleteUser(subscriber);
    });

    it( 'check the summaries page', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('summariesUrl'));
        cy.get('.top-read-container .list-item').should('have.length', 46);
        cy.get('.top-read-container .list-item:first').click();
        cy.get('.articles-container #article1 article-summary .article-header').should("contain.text", "Ukraine war");
        cy.get('.top-read-container .list-item:last').click();
        cy.get('.articles-container #article46 article-summary .article-header').should("contain.text", "small-scale farmers");
    });

    /*it( 'check the redirect to the summaries page ', function(){
        cy.viewport(1440, 1024);
        cy.intercept('POST', Cypress.env('dashboardUrl') + '/admin-ajax.php').as('ajaxPost');
        cy.visit( Cypress.env('summariesUrlRedirect')).wait(1000).should('eq', Cypress.env('summariesUrl'));
        //ursl should be the same

    });*/
});