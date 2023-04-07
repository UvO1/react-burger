describe('Test constructor', () => {
  const testUrl = "http://localhost:3000/#/";
  const cardIngredient = '[data-testid="card"]';
  const cardName = '[data-testid="cardname"]';
  const dropArea = '[data-testid="droparea"]';
  const bunTest = 'Флюоресцентная булка R2-D3';
  const modal = '[data-testid="ismodal"]';
  const getOrder = '[data-testid="getorder"]';
    beforeEach(() => {
        cy.visit(testUrl);
        cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {fixture: "ingredients.json"});
        cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {fixture: "orders.json"});
      })
    it("should show ingredients", () =>{
        cy.get(cardIngredient).children(cardName).contains(bunTest).should("exist");
    })

    it("should open modal", () => {
        cy.get(cardIngredient).first().click();
        cy.get(modal).should("exist");
        cy.get('[data-testid="namemodal"]').contains('Краторная булка N-200i');
    })
    it("should close modal", () => {
        cy.get(cardIngredient).first().click();
        cy.get(modal).should("exist");
        cy.get('[data-testid="closemodal"]').click();
        cy.get(modal).should('not.exist');
    })
    it("should drag bun in the burger", () => {
        const dataTransfer = new DataTransfer();
        cy.get(cardIngredient).children(cardName).contains(bunTest).trigger('dragstart', {
            dataTransfer
          });
       
          cy.get(dropArea).trigger('drop', {
            dataTransfer
          });
    })
    it("should create order", () => {
        const dataTransfer = new DataTransfer();
        const email = "ouv11@ouv11.ru";
        const password = "e3w2q1";
        
        cy.get(cardIngredient).children(cardName).contains(bunTest).trigger('dragstart', {
            dataTransfer
          });
       
          cy.get(dropArea).trigger('drop', {
            dataTransfer
          });

          cy.get(cardIngredient).children(cardName).contains('Соус Spicy-X').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get(dropArea).trigger('drop', {
            dataTransfer
          });
          cy.get(cardIngredient).children(cardName).contains('Биокотлета из марсианской Магнолии').trigger('dragstart', {
            dataTransfer
          });
       
          cy.get(dropArea).trigger('drop', {
            dataTransfer
          });
          cy.get(getOrder).click();
          cy.get('[name="email"]').type(email);
          cy.get('[name="password"]').type(password);

          cy.get('[data-testid="islogin"]').click();
          //cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {fixture: "orders.json"});
      
          cy.get(getOrder).click();
          cy.get(modal).should("exist");
          cy.get('[data-testid="closemodal"]').click();
          cy.get(modal).should('not.exist');
    })


})