import { RecipeList } from "../fixtures/recipeslist"

describe("Ui Testing ", () => {
  it("displays the list  Recipe", () => {
    cy.visit("/")
    cy.intercept("GET", `https://recipe-apo.onrender.com/api/v1/recipes`, {
      body: RecipeList,
    }).as("RecipeList")

    cy.get("[data-testid=list]").should("exist")

    cy.get("[data-testid=list]").should("have.length.above", 0)

    cy.get("[data-testid=list]").as("rows")
    cy.wait("@RecipeList").then(({ response }) => {
      cy.get("@rows").each(($row, index) => {
        cy.wrap($row)
          .get('div[data-testid="card"]')
          .find('p[data-testid="title-card"]')
          .should("contain", response?.body[0].title)
      })
    })
  })

  it("Detail Recipe api check", () => {
    cy.visit("/")
    cy.intercept("GET", `https://recipe-apo.onrender.com/api/v1/recipes`, {
      body: RecipeList,
    }).as("RecipeList")

    cy.wait("@RecipeList").then(({ response }) => {
      const DetailData = response?.body[0]

      cy.get('[data-testid="detail-title"]').should(
        "have.text",
        DetailData?.title
      )
      cy.get('[data-testid="detail-category"]').should(
        "have.text",
        DetailData?.category
      )
      cy.get('[data-testid="detail-description"]').should(
        "have.text",
        DetailData?.description
      )
      cy.get("[data-testid=detail-ingredients]").as("rows")

      cy.get("@rows").each(($row, index) => {
        cy.wrap($row)
          .find('div[data-testid="detail-chip"] span')
          .should("contain", DetailData.ingredients[index])
      })
    })
  })

  it("Create Recipe with Mock data", () => {
    cy.visit("/")
    cy.intercept("POST", `https://recipe-apo.onrender.com/api/v1/recipes`, {
      body: { message: "successfully created" },
    }).as("CreateRecipe")

    cy.get("[data-testid=go-create-recipe]").should("exist")

    cy.get('[data-testid="go-create-recipe"]').click()
    cy.get('[data-testid="create-form"]').should("exist")

    cy.get('[data-testid="title"]').type("Spagahi")

    cy.get('[data-testid="description"]').type(
      "Spagahi Spagahi Spagahi Spagahi"
    )
    cy.get('[data-testid="category"]').click()

    cy.contains("Lunch").click()

    cy.get('[data-testid="chip"]').type("tomato")
    cy.get('[data-testid="add-chip"]').click()
    cy.get('[data-testid="chip"]').type("ornage")
    cy.get('[data-testid="add-chip"]').click()

    cy.get('[data-testid="chip"]').type("food")
    cy.get('[data-testid="add-chip"]').click()
    cy.get('[data-testid="chip"]').type("chipe")
    cy.get('[data-testid="add-chip"]').click()

    cy.get('[data-testid="create-recipe"]').click()
    cy.wait("@CreateRecipe")
  })

  it("Update Recipe with Mock data", () => {
    cy.visit("/")
    cy.intercept("POST", `https://recipe-apo.onrender.com/api/v1/recipes`, {
      body: { message: "successfully Updated" },
    }).as("UpdateRecipe")

    cy.get("[data-testid=go-update-recipe]").should("exist")

    cy.get('[data-testid="go-update-recipe"]').click()
    cy.get('[data-testid="update-form"]').should("exist")

    cy.get('[data-testid="category"]').click()

    cy.contains("Breakfast").click()
    cy.get('[data-testid="title"]').type("Spagahi")

    cy.get('[data-testid="description"]').type(
      "Spagahi Spagahi Spagahi Spagahi"
    )

    cy.wait(200)

    cy.get('[data-testid="chip"]').type("tomato")
    cy.get('[data-testid="add-chip"]').click()
    cy.get('[data-testid="chip"]').type("ornage")
    cy.get('[data-testid="add-chip"]').click()

    cy.get('[data-testid="chip"]').type("food")
    cy.get('[data-testid="add-chip"]').click()
    cy.get('[data-testid="chip"]').type("chipe")
    cy.get('[data-testid="add-chip"]').click()

    cy.get('[data-testid="update-recipe"]').click()
    cy.wait("@UpdateRecipe")
  })
})
