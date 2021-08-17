/// <reference types="cypress" />

describe('super list app', () => {

  it('can calculate', () => {

    localStorage.setItem('superList', '15, 25, 35, 4, 99, 11, 17, 98, 33, 67')
    cy.visit('http://localhost:4200')
    cy.get('.mat-button-wrapper').contains('start').click()

    // original calculations
    cy.get('.display-card').should('contain', 'count').contains('10')
    cy.get('.display-card').should('contain', 'average').contains('40.40')
    cy.get('.display-card').should('contain', 'median').contains('29.00')
    cy.get('.display-card').should('contain', 'standard deviation').contains('35.22')

    cy.get('.list-card > :nth-child(1)').contains('15')
    cy.get('.list-card ').scrollTo('bottom')
    cy.get('.list-card  > :nth-child(10)').should('contain', '67').contains('close').click()

    cy.get('.list-card').find('.shell').should('have.length', 9)
    cy.get('.display-card').should('contain', 'count').contains('9')

    //adding new number 
    cy.get('.add-number').should('be.disabled')
    cy.get('.new-number').type('yolo')
    cy.get('.add-number').should('be.disabled')
    cy.get('.new-number').type('77')
    cy.get('.add-number').should('not.be.disabled')
    cy.get('.new-number').clear()
    cy.get('.add-number').should('be.disabled')
    cy.get('.new-number').type('0')
    cy.get('.add-number').click()
    cy.get('.list-card  > :nth-child(10)').contains('0')

    // new calculations
    cy.get('.display-card').should('contain', 'count').contains('10')
    cy.get('.display-card').should('contain', 'average').contains('33.70')
    cy.get('.display-card').should('contain', 'median').contains('21.00')
    cy.get('.display-card').should('contain', 'standard deviation').contains('35.96')

  })

  it('can handle empty list', () => {

    localStorage.setItem('superList', '15')
    cy.visit('http://localhost:4200/app')
    cy.get('.list-card  > :nth-child(1)').should('contain', '15').contains('close').click()

    cy.get(':nth-child(1) > .display-info').invoke("text").then((text) => text.trim()).should("equal", "")
    cy.get(':nth-child(2) > .display-info').invoke("text").then((text) => text.trim()).should("equal", "")
    cy.get(':nth-child(3) > .display-info').invoke("text").then((text) => text.trim()).should("equal", "")
    cy.get(':nth-child(4) > .display-info').invoke("text").then((text) => text.trim()).should("equal", "")

  })


  it('can translate and route', () => {

    localStorage.setItem('superList', '15')
    cy.visit('http://localhost:4200')


    cy.get('.language-select').select('German')
    cy.get('.hello').contains('Willkommen in der Superliste')
    cy.get('.info').contains('ein Localstorage-basierter Listenschoner, damit Sie...')
    cy.get('.mat-button-wrapper').contains('starten').click()

    cy.url().should('include', '/app')
    cy.get('.display-card').should('contain', 'zählen').contains('1')
    cy.get('.display-card').should('contain', 'Gemittelter').contains('15')
    cy.get('.display-card').should('contain', 'Median').contains('15')
    cy.get('.display-card').should('contain', 'Standardabweichung').contains('0')

    cy.get('.home-page').contains('Super List').click()
    cy.url().should('eq', 'http://localhost:4200/')

  })
})

