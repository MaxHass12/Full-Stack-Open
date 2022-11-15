describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:8080/api/testing/reset')
    const userData = {
      'username': 'mluukkai',
      'name': 'mluukkai',
      'password': 'salainen'
    }
    cy.request('POST', 'http://localhost:8080/api/users', userData)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login to the application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login').click()
      cy.contains('mluukkai is signed in')
      cy.contains('new blog')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong username')
      cy.get('#password').type('wrong password')
      cy.get('#login').click()
      cy.contains('wrong credentials')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.contains('mluukkai is signed in')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('title by cypress')
      cy.get('#author-input').type('author by cypress')
      cy.get('#url-input').type('url by cypress')
      cy.contains('submit').click()
      cy.contains('view')
      cy.contains('title by cypress author by cypress')
      cy.contains('A new blog')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({title: 'another title', author: 'another author', url: 'another url' })
        cy.contains('another title')
        cy.contains('view').click()
      })

      it('blog can be liked', function() {
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
      })

      it('blog can be deleted', function() {
        cy.contains('remove').click()
        cy.get('#blogs').not('another title')
      })
    })
  })
})