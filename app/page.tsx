"use client"
import { Add, Delete, Edit } from "@mui/icons-material"
import { Autocomplete, Chip, Stack, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import Card from "@mui/material/Card"
import {
  CreateOrEditComponent,
  DetailComponent,
  RecipeCard,
} from "@/components"

const API_URL = "https://recipe-apo.onrender.com/api/v1/"
export type recipeType = {
  id: number
  title: string
  category: string
  ingredients: string[]
  description: string
}

type recipesType = recipeType[]

export default function Home() {
  const [recipes, setRecipes] = useState<recipesType>([])
  const [filterRecipes, setFilterRecipes] = useState<recipesType>([])
  const [selectedRecipe, setSelectedRecipe] = useState<recipeType | null>(null)
  const [editRecipe, setEditRecipe] = useState<recipeType | undefined | null>(
    null
  )
  const [isCreate, setIsCreate] = useState<boolean>(false)
  const [isDetail, setDetail] = useState(true)
  const [inputValue, setInputValue] = useState<string>("")

  const getRecipes = () => {
    fetch(`${API_URL}/recipes`, { method: "GET" })
      .then((res) => res.json())
      .then((r) => {
        setRecipes(r)
        setSelectedRecipe(r[0])
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getRecipes()
  }, [])

  const onFilterRecipe = () => {
    if (inputValue.length === 0) {
      setFilterRecipes(recipes)
      return
    }
  }

  const onSelectCard = (id: number) => {
    const filter = recipes.filter((recipe) => recipe.id === id)

    setSelectedRecipe(filter[0])
    setDetail(true)
  }

  const onDeleteRecipe = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
    fetch(`${API_URL}/recipes/${id}`, { method: "DELETE" })
    setRecipes(updatedRecipes)
    setSelectedRecipe(updatedRecipes[0])
  }

  const onEditRecipe = (id: number) => {
    const filterEditRecipe = recipes.filter((recipe) => recipe.id === id)
    setEditRecipe(filterEditRecipe[0])
    setDetail(false)
    setIsCreate(false)
  }

  const onUpdateRecipe = (id: number, updatedRecipe: recipeType) => {
    fetch(`${API_URL}/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    })
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...updatedRecipe } : recipe
      )
    )
  }

  const onCreateRecipe = (newRecipe: Omit<recipeType, "id">) => {
    fetch(`${API_URL}/recipes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((r) => console.log(r))
      .catch((e) => console.log(e))
    const maxId = recipes.reduce(
      (max, recipe) => (recipe.id > max ? recipe.id : max),
      0
    )
    const recipeWithNewId = {
      ...newRecipe,
      id: maxId + 1,
    }
    setRecipes((prevRecipes) => [...prevRecipes, recipeWithNewId])
  }

  return (
    <div className="flex flex-row h-screen">
      <div className="flex w-[30%] flex-col pt-10 px-2">
        <Button
          variant="contained"
          color="primary"
          endIcon={<Add />}
          className="self-end min-w-min"
          data-testid="go-create-recipe"
          onClickCapture={() => {
            setDetail(false)
            setIsCreate(true)
          }}
        >
          Add New recipe
        </Button>
        <Autocomplete
          selectOnFocus
          clearOnBlur
          options={recipes}
          disableClearable
          disablePortal
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => {
            return (
              <li
                {...props}
                /* onClickCapture={() => {
									setFilterRecipes([option]);
								}} */
              >
                {option.title}
              </li>
            )
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onKeyDown={(event: any) => {
            if (event.key === "Enter") {
              event.defaultMuiPrevented = true
              setFilterRecipes(
                recipes.filter((recipe) =>
                  recipe.title
                    .toLowerCase()
                    .replace(/\s/g, "")
                    .includes(
                      event.target.value.toLowerCase().replace(/\s/g, "")
                    )
                )
              )
            }
          }}
          className="my-4"
          onInputChange={onFilterRecipe}
        />
        <div data-testid="list" className="flex flex-col overflow-y-scroll">
          {filterRecipes?.length > 0
            ? filterRecipes.map(({ title, ingredients, id }) => (
                <RecipeCard
                  key={id}
                  title={title}
                  ingredients={ingredients}
                  onSelectCard={onSelectCard}
                  onDeleteRecipe={onDeleteRecipe}
                  onEditRecipe={onEditRecipe}
                  id={id}
                />
              ))
            : recipes.map(({ title, ingredients, id }) => (
                <RecipeCard
                  key={id}
                  title={title}
                  ingredients={ingredients}
                  onSelectCard={onSelectCard}
                  onDeleteRecipe={onDeleteRecipe}
                  onEditRecipe={onEditRecipe}
                  id={id}
                />
              ))}
        </div>
      </div>
      <div className="flex flex-1 pt-4 bg-[#DADEE2]">
        {selectedRecipe && isDetail && (
          <DetailComponent
            recipe={selectedRecipe}
            onEditRecipe={onEditRecipe}
            onDeleteRecipe={onDeleteRecipe}
          />
        )}

        {isDetail === false && isCreate && (
          <CreateOrEditComponent
            onCreateRecipe={onCreateRecipe}
            isCreate={isCreate}
            onUpdateRecipe={() => {}}
          />
        )}

        {isDetail === false && !isCreate && (
          <CreateOrEditComponent
            onCreateRecipe={() => {}}
            editRecipe={editRecipe}
            isCreate={isCreate}
            onUpdateRecipe={onUpdateRecipe}
          />
        )}
      </div>
    </div>
  )
}
