describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alec Blance',
      username: 'AlecBlance',
      password: 'alec',
    }
    const user2 = {
      name: 'GawrGura',
      username: 'GawrGura',
      password: 'gura',
    }
    cy.createUser(user)
    cy.createUser(user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('AlecBlance')
      cy.get('[name="Password"]').type('alec')
      cy.contains('login').click()
      cy.contains('Alec Blance logged in')
      cy.get('.error').should('not.exist')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('AlecBlance')
      cy.get('[name="Password"]').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
        .should('contain' ,'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Alec Blance logged in').should('not.exist')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const blog = {
        title: 'First Blog',
        author: 'Alec Blance',
        url: 'http://youneverknow.com/first',
      }
      const user = {
        username: 'AlecBlance',
        password: 'alec',
      }
      cy.login(user)
      cy.createBlog(blog)
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('[name="author"]').type('Alec Blance')
      cy.get('[name="title"]').type('Cypress the best')
      cy.get('[name="url"]').type('http://youneverknow.com/cypress')
      cy.get('#blogForm').click()
      cy.contains('Cypress the best Alec Blance')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes:1')
    })

    it('A blog can be removed by the creator', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('First Blog Alec Blance').should('not.exist')
    })

    it('Blog\'s delete button can only be seen by creator', function() {
      const user = {
        username: 'GawrGura',
        password: 'gura',
      }

      cy.contains('view').click()
      cy.contains('remove')
      cy.contains('logout').click()
      cy.login(user)
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are ordered according to likes', function() {
      const blog = {
        title: 'The title with the most likes',
        author: 'Alec Blance',
        url: 'http://idk.com'
      }
      const blog2 = {
        title: 'The title with the second most likes',
        author: 'Alec Blance',
        url: 'http://idk.com'
      }
      cy.createBlog(blog)
      cy.createBlog(blog2)

      cy.contains('The title with the most likes').parent().as('mostLikedParent').find('.viewButton').click()
      cy.get('@mostLikedParent').find('.likeButton').click().wait(1000).click()
      cy.get('@mostLikedParent').contains('likes:2')

      cy.contains('The title with the second most likes').parent().as('secondLikedParent').find('.viewButton').click()
      cy.get('@secondLikedParent').find('.likeButton').click()
      cy.get('@secondLikedParent').contains('likes:1')

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})