import { recipeType } from "@/app/page"
import { Add, AddCircle, PlusOne } from "@mui/icons-material"
import {
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material"
import React, { useEffect, useRef, useState } from "react"

type CreateOrEditComponentType = {
  editRecipe?: recipeType | null
  onUpdateRecipe: (id: any, updatedRecipe: recipeType) => void
  isCreate?: boolean
  onCreateRecipe: (updatedRecipe: any) => void
}

type errorType = {
  titleError: boolean
  categoryError: boolean
  ingredientError: boolean
  descriptionError: boolean
}

const CreateOrEditComponent = ({
  editRecipe,
  onUpdateRecipe,
  isCreate,
  onCreateRecipe,
}: CreateOrEditComponentType) => {
  const [cat, setCat] = React.useState<string>("")
  const [recipeId, setRecipeID] = React.useState<number>(0)
  const [title, setTitle] = React.useState<string>("")
  const [ings, setIngs] = React.useState<string[]>([])
  const [descr, setDescr] = React.useState<string>("")
  const newRecipeRef = useRef<any>(null)
  const [error, setError] = React.useState<errorType>({
    titleError: false,
    categoryError: false,
    ingredientError: false,
    descriptionError: false,
  })

  const formValidation = () => {
    setError((prevError) => ({
      ...prevError,
      titleError: title.length === 0,
      categoryError: cat.length === 0,
      ingredientError: ings.length < 4,
      descriptionError: descr.length === 0,
    }))
  }

  useEffect(() => {
    if (!isCreate && editRecipe) {
      const { title, category, description, ingredients, id } = editRecipe
      setRecipeID(id)
      setCat(category)
      setTitle(title)
      setIngs(ingredients)
      setDescr(description)
    }
  }, [editRecipe])

  const handleAdd = (ing: string) => {
    if (ing.length === 0) return
    const newIngs = [...ings, ing]
    setIngs(newIngs)
    newRecipeRef.current.value = ""
  }

  const handleDelete = (ing: string) => {
    const newIngs = ings.filter((i) => i !== ing)
    setIngs(newIngs)
  }

  const handleCreateOrUpdateRecipe = () => {
    formValidation()
    if (title.length !== 0 && cat.length !== 0 && ings.length >= 4) {
      if (isCreate) {
        onCreateRecipe({
          title: title,
          category: cat,
          ingredients: ings,
          description: descr,
        })
        setCat("")
        setTitle("")
        setIngs([])
        setDescr("")
        return
      } else {
        onUpdateRecipe(recipeId, {
          id: recipeId,
          title: title,
          category: cat,
          ingredients: ings,
          description: descr,
        })
      }
    }
  }

  return (
    <div
      data-testid={isCreate ? "create-form" : "update-form"}
      className="flex flex-col  w-[70%] mx-auto"
    >
      <FormControl sx={{ maxWidth: 400 }} className="my-4">
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          inputProps={{
            "data-testid": "title",
          }}
          required
          error={error.titleError}
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value)
          }}
        />
      </FormControl>
      <FormControl required sx={{ maxWidth: 200 }} error={error.categoryError}>
        <InputLabel id="demo-simple-select-error-label">
          select category
        </InputLabel>
        <Select
          data-testid="category"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cat}
          label="select category *"
          onChange={(event) => setCat(event.target.value as string)}
        >
          <MenuItem value="breakfast">Breakfast</MenuItem>
          <MenuItem value="lunch">Lunch</MenuItem>
          <MenuItem value="dinner">Dinner</MenuItem>
          <MenuItem value="dessert">Dessert</MenuItem>
        </Select>
      </FormControl>
      <div className="w-full my-4">
        <TextField
          required
          inputProps={{
            "data-testid": "description",
          }}
          id="outlined-multiline-static"
          label="Description"
          error={error.descriptionError}
          multiline
          value={descr}
          onChange={(event) => setDescr(event.target.value as string)}
          rows={6}
          defaultValue="Default Value"
          className="w-full"
        />
      </div>
      <Typography
        color="text.primary"
        variant="h6"
        gutterBottom
        className="my-4 font-semibold"
      >
        Ingredient
      </Typography>
      <Stack
        direction="row"
        className="mb-10"
        sx={{
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {ings.map((ing, index) => {
          return (
            <Chip
              label={ing}
              color="primary"
              key={index}
              onDelete={() => handleDelete(ing)}
            />
          )
        })}
        <div className="flex flex-row bg-[#1976D2] rounded-full  items-center pr-2 pl-4 ">
          <TextField
            inputRef={newRecipeRef}
            variant="standard"
            color="warning"
            inputProps={{
              "data-testid": "chip",
            }}
            placeholder="Add New Recipe"
            InputProps={{ disableUnderline: true }}
            sx={{ input: { color: "white" }, maxWidth: 150 }}
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                event.defaultMuiPrevented = true
                handleAdd(event.target.value as string)
              }
            }}
          />
          <div
            className="inline-block "
            data-testid="add-chip"
            onClickCapture={() =>
              handleAdd(newRecipeRef.current.value as string)
            }
          >
            <AddCircle
              sx={{ color: "#c2d8f2", "&:hover": { color: "white" } }}
            />
          </div>
        </div>
      </Stack>
      {error.ingredientError && (
        <Typography
          variant="subtitle1"
          gutterBottom
          className="mb-4 font-semibold"
          color="#FF0000"
        >
          You Have to set at least 4 ingredient
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        data-testid={isCreate ? "create-recipe" : "update-recipe"}
        className="self-center min-w-min"
        onClickCapture={handleCreateOrUpdateRecipe}
      >
        {isCreate ? "Create" : "Update"} Recipe
      </Button>
    </div>
  )
}

export default CreateOrEditComponent
