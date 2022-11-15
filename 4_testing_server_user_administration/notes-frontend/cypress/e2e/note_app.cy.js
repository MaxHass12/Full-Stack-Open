describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const user = {
      name: 'mluukkai',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:8080/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('log in')
    cy.contains('show important')
  })

  it('log in form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('mluukkai logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong Credentials')
    cy.get('html').should('not.contain', 'mluukkai logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a test note created by cypress')
      cy.contains('save').click()
      cy.contains('a test note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function() {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()

        cy.contains('second note')
          .contains('make not important')
      })
    })
  })
})

