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
})