describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alec Blance',
      username: 'AlecBlance',
      password: 'alec',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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
  })
})