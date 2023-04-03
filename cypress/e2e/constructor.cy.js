describe('Test constructor', () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
        cy.intercept("GET", "/ingredients", {fixture: "ingredients.json"});
        //cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {fixture: "order.json"});
    })
    it("should show ingredients", () =>{
        cy.get("[data-testid=card]").children('[data-testid="cardname"]').contains('Флюоресцентная булка R2-D3').should("exist");
    })

    it("should open modal", () => {
        cy.get('[data-testid="card"]').first().click();
        cy.get('[data-testid="ismodal"]').should("exist");
        cy.get('[data-testid="namemodal"]').contains('Краторная булка N-200i');
    })
    it("should close modal", () => {
        cy.get('[data-testid="card"]').first().click();
        cy.get('[data-testid="ismodal"]').should("exist");
        cy.get('[data-testid="closemodal"]').click();
        cy.get('[data-testid="ismodal"]').should('not.exist');
    })
    it("should drag bun in the burger", () => {
        const dataTransfer = new DataTransfer();
        cy.get("[data-testid=card]").children('[data-testid="cardname"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get('[data-testid="droparea"]').trigger('drop', {
            dataTransfer
          });
    })
    it("should create order", () => {
        const dataTransfer = new DataTransfer();
        cy.get("[data-testid=card]").children('[data-testid="cardname"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get('[data-testid="droparea"]').trigger('drop', {
            dataTransfer
          });

          cy.get("[data-testid=card]").children('[data-testid="cardname"]').contains('Соус Spicy-X').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get('[data-testid="droparea"]').trigger('drop', {
            dataTransfer
          });
          cy.get("[data-testid=card]").children('[data-testid="cardname"]').contains('Биокотлета из марсианской Магнолии').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get('[data-testid="droparea"]').trigger('drop', {
            dataTransfer
          });
          cy.get('[data-testid="getorder"]').click();
          cy.get('[data-testid="ismodal"]').should("exist");
          cy.get('[data-testid="closemodal"]').click();
          cy.get('[data-testid="ismodal"]').should('not.exist');
    })


})