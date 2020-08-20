const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      name: 'Test User',
      username: 'username',
      password: 'password'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type('username')
      cy.get('input[name="password"]').type('password')
      cy.get('button[type="submit"]').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('username')
      cy.get('input[name="password"]').type('WrongPassword')
      cy.get('button[type="submit"]').click()

      cy.should('not.contain', 'Test User logged in')
      cy.get('.notify')
        .should('have.class', 'error')
        .should('contain', 'wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'username',
        password: 'password'
      })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Blog Title')
      cy.get('input[name="author"]').type('Blog Author')
      cy.get('input[name="url"]').type('https://example.com')
      cy.get('#create-blog').click()

      cy.get('html').should('contain', 'Blog Title - Blog Author')
      cy.get('.notify')
        .should('have.class', 'success')
    })

    describe('and one blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog Title',
          author: 'Blog Author',
          url: 'https://example.com'
        })
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.get('.likeBtn').click()
        cy.get('.likeBtn').should('contain', 'unlike')
      })

      it('can be removed by the creator', function() {
        cy.contains('view').click()
        cy.get('.deleteBtn').click()
        cy.get('html').should('not.contain', 'Blog Title - Blog Author')
      })
    })

    // describe.only('and multiple blogs exist', function() {
    //   beforeEach(function() {
    //     cy.createBlogWithLikes({ title: 'Blog Title', author: 'Blog Author', url: 'https://example.com' })
    //     cy.createBlogWithLikes({ title: 'Blog Title', author: 'Blog Author', url: 'https://example.com' })
    //     cy.createBlogWithLikes({ title: 'Blog Title', author: 'Blog Author', url: 'https://example.com' })
    //     cy.createBlogWithLikes({ title: 'Blog Title', author: 'Blog Author', url: 'https://example.com' })
    //   })

    //   it('blogs are ordered by likes', function() {
    //     cy.get('.blog').then(function($blogs) {
    //       console.log(Object.values($blogs))
    //     })
    //   })
    // })
  })
})