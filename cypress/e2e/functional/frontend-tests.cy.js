describe('Visit urls on front end and ensure elements exist', () => {

	it('tests the home page, nav, and footer', () => {
		cy.visit( Cypress.env('baseUrl') )
		//top left nav
		cy.get('.menu-main-menu-container .dm-menu li.menu-item-has-children').should('have.length', 4)
		cy.get('.menu-main-menu-container .dm-menu li .sub-menu .menu-item').should('have.length', 18)

		//top right nav
		cy.get('.navbar-right.hidden-xs .menu-top-right-menu-container li.menu-item').should('have.length', 3)

		//mobile top right nav
		cy.get('.main-nav .mobile-second-nav .menu-top-right-menu-container li.menu-item').should('have.length', 3)

		//hero
		cy.get('.wp-block-columns.hero').should('have.length', 1)
		cy.get('.wp-block-columns.hero .wp-block-create-block-dailymaverick-blocks .feed_item.feed_wide').should('have.length', 1)
		cy.get('.wp-block-columns.hero .list-layout-block .list-item ').should('have.length', 3)

		//browsi ads
		cy.get('div#ad-container').should('have.length', 3)

		//dm-blocks
		cy.get('.wp-block-column .feed_item.three-col').should('have.length', 28)
		cy.get('.wp-block-column .top-reads-block ').should('have.length', 22)
		cy.get('.wp-block-column .top-reads-block .list-item').should('have.length', 111)

		//footer
		cy.get('.footer .col-sm-2').should('have.length', 6)
		cy.get('.footer .col-sm-2 h3').should('have.length', 12)
		cy.get('.footer .col-sm-2 .footer-menu').should('have.length', 12)
		cy.get('.footer .col-sm-2 .footer-menu .menu-item').should('have.length', 72)

	})

	it('tests the scorpio page', () => {
		cy.visit( Cypress.env('baseUrl') + '/section/scorpio/')

		//masthead
		cy.get('.masthead-intro').should('have.length', 1)
		cy.get('.categories-sublinks ul.list-inline li').should('have.length', 10)

		//browsi ads
		//cy.get('div#ad-container').should('have.length', 1)

		//dm-blocks
		cy.get('.categories .media-item').should('have.length', 22)

	})


})