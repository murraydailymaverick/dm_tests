context( 'Lets test if the elementor pages look consistent' , function () {

    it( 'visits a sponsored page', function(){
        cy.visit( Cypress.env('baseUrl') + '/article/2018-06-04-distinctive-sophistication/');
        cy.get('div.titles h4').should('have.text', 'SPONSORED CONTENT')
        //cy.get('div.titles h1').should('have.text', 'Distinctive Sophistication: A Tsogo Sun Experience')
        cy.percySnapshot();
    });

    it( 'visits a questions page', function(){
        cy.visit( Cypress.env('baseUrl') + '/22-questions-with-with-alet-law/');
        cy.get('.elementor-heading-title.elementor-size-xl').should('have.text', '22 Questions with Alet Law')
        cy.get('div.elementor-toggle-item').should('have.length', 22)
        cy.get('.elementor-toggle-icon .elementor-toggle-icon-closed .e-font-icon-svg').should('have.length', 22);
        cy.percySnapshot();
    });

});
Cypress.on('uncaught:exception', (err, runnable) => {
    let messageArray = [err, runnable];
    return false;
});