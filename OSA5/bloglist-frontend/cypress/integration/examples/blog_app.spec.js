// cypress testi avataan komennolla "npm run cypress:open"

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })

    it('Frontpage can be opened, 5.17', function() {
        cy.contains('Login')
        cy.contains('Username')
        cy.contains('Password')
        
    })

})