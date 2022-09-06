describe('Visit urls on front end and ensure elements exist', () => {

	it('tests the first article', () => {
		cy.visit( Cypress.env('baseUrl') )

		cy.get('.main-article-container .hero .feed_item a.feed_link').click();
		cy.url().should('contain', Cypress.env('baseUrl') + '/article/')

		//masthead
		cy.get('.masthead-intro').should('have.length', 1)
		//heading
		cy.get('.articleheader-small .titles h4').should('have.length', 1)
		cy.get('.articleheader-small .titles h1').should('have.length', 1)
		cy.get('.articleheader-small img.img-responsive.header-image ').should('have.length', 1)

		//article
		cy.get('.article .titles span.image-caption').should('have.length', 1)
		cy.get('.article .titles .hidden-xs a').should('have.length', 1) //link to the author
		cy.get('.article .author-bar .author-name .author-bio a').should('have.length', 1)
		cy.get('.article .author-bar .pull-right.comments span').should('have.length',2)
		cy.get('.article .first-paragraph').should('have.length',2)
		cy.get('.article .sk-play-button__wrap').should('have.length',2)

		//col-right
		cy.get('.col-right .side-ad .dm_add').should('have.length', 1)
		cy.get('.col-right .side-ad .ad-control-link').should('have.length', 1)
		cy.get('div#ad-container').should('have.length', 1)

		//dm-blocks
		cy.get('#post-article-footer .dm_campaign_render').should('have.length', 1)
		cy.get('#post-article-footer .dm_campaign_render .dm_close_generic_modal').should('have.length', 1)
		cy.get('#post-article-footer .dm_campaign_render .post-article-cta-button').should('have.length', 1)

		//comments
		cy.get('.comments-area .comment-opinion').should('have.length', 1)
		cy.get('.comments-area .comments-number').should('have.length', 1)
		cy.get('.comments-area .comment-list').should('have.length', 1)
		cy.get('.article-share').should('have.length', 1)

		//footer
		cy.get('.footer-top-reads .wp-block-columns .wp-block-column').should('have.length', 3)

	})

})
