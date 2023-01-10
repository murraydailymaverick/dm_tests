describe('Visit urls on front end and ensure elements exist', () => {

	it('tests an article on iPhone SE', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('articleUrl'));

		//cy.get('.main-article-container .hero .feed_item a.feed_link').click();
		//cy.url().should('contain', Cypress.env('baseUrl') + 'article/')

		//masthead
		cy.get('.masthead-intro').should('have.length', 1)
		//heading
		//cy.get('.articleheader-small .titles h4').should('have.length', 1)
		//cy.get('.articleheader-small .titles h1').should('have.length', 1)
		//cy.get('.articleheader-small img.img-responsive.header-image ').should('have.length', 1)

		//article
		//cy.get('.article .titles span.image-caption').should('have.length', 1)
		//cy.get('.article .titles .hidden-xs a').should('have.length', 1) //link to the author
		cy.get('.article .author-bar .author-name .author-bio a').should('have.length', 1)
		cy.get('.article .author-bar .pull-right.comments span').should('have.length',4)
		cy.get('.article .first-paragraph').should('have.length',1)
		//cy.get('.article .sk-play-button__wrap').should('have.length',2)

		//col-right
		cy.get('.col-right .side-ad .dm_add').should('have.length', 1)
		cy.get('.col-right .side-ad .ad-control-link').should('have.length', 1)
		//cy.get('div#ad-container').should('have.length', 1)

		//dm-blocks these are campaign related
		//cy.get('#post-article-footer .dm_campaign_render').should('have.length', 1)
		//cy.get('#post-article-footer .dm_campaign_render .dm_close_generic_modal').should('have.length', 1)
		//cy.get('#post-article-footer .dm_campaign_render .post-article-cta-button').should('have.length', 1)

		//comments
		cy.get('.comments-area .comment-opinion').should('have.length', 1)
		cy.get('.comments-area .comments-number').should('have.length', 1)
		cy.get('.comments-area .comment-list').should('have.length', 1)
		cy.get('#at4-share').scrollIntoView().should('have.length', 1)

		//footer
		cy.get('.homepagify').should('have.length', 1)

	})


	it('tests the home page, nav, and footer on iPhone SE ', () => {
		cy.viewport(375, 667);
		cy.visit( Cypress.env('baseUrl') )
	})

	it('tests the home page, nav, and footer on in Desktop 1280px', () => {
		cy.viewport(1280, 1024);
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
		//cy.get('div#ad-container').should('have.length', 3)

		//dm-blocks
		cy.get('.wp-block-column .feed_item.three-col').should('have.length', 28)
		cy.get('.wp-block-column .top-reads-block ').should('have.length', 22)
		cy.get('.wp-block-column .top-reads-block .list-item').should('have.length', 122)

		//footer
		cy.get('.footer .col-sm-2').should('have.length', 6)
		cy.get('.footer .col-sm-2 h3').should('have.length', 12)
		cy.get('.footer .col-sm-2 .footer-menu').should('have.length', 12)
		cy.get('.footer .col-sm-2 .footer-menu .menu-item').should('have.length', 72)

	})

	it('Tests an elementor page on Desktop', () => {
		cy.viewport(1280, 1024);
	});

	it('tests the scorpio page on Desktop', () => {
		cy.viewport(1280, 1024);
		cy.visit( Cypress.env('baseUrl') + 'section/scorpio/')

		//masthead
		cy.get('.masthead-intro').should('have.length', 1)
		cy.get('.categories-sublinks ul.list-inline li').should('have.length', 11)

		//browsi ads
		//cy.get('div#ad-container').should('have.length', 1) //could we wait for the ad service?

		//dm-blocks
		cy.get('.categories .media-item').should('have.length', 22)

	})


})
