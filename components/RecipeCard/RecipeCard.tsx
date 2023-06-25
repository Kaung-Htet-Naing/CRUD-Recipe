import { recipeType } from "@/app/page"
import { Edit, Delete } from "@mui/icons-material"
import { Stack, Typography, Chip, Card, IconButton } from "@mui/material"
import React from "react"

type recipeCardType = Omit<recipeType, "category" | "description"> & {
  onSelectCard: (id: number) => void
  onDeleteRecipe: (id: number) => void
  onEditRecipe: (id: number) => void
}

const RecipeCard = ({
  title,
  ingredients,
  onSelectCard,
  onDeleteRecipe,
  onEditRecipe,
  id,
}: recipeCardType) => {
  return (
    <Card
      data-testid="card"
      className="w-[inherit] px-2 hover:bg-[#FFEEBB]  mb-4 bg-[#DADEE2]"
      onClickCapture={() => onSelectCard(id)}
      sx={{
        overflow: "visible",
      }}
    >
      <div data-testid="parent" className="flex flex-row justify-between py-4">
        <Typography
          data-testid="title-card"
          sx={{ fontSize: 20 }}
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="edit" onClickCapture={() => onEditRecipe(id)}>
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClickCapture={() => onDeleteRecipe(id)}
          >
            <Delete />
          </IconButton>
        </Stack>
      </div>
      <Stack direction="row" className="pb-4" sx={{ flexWrap: "wrap", gap: 1 }}>
        {ingredients.map((ingredient, index) => (
          <Chip
            label={ingredient}
            color="primary"
            key={index}
            onClickCapture={() => console.log("kaung")}
          />
        ))}
      </Stack>
    </Card>
  )
}

export default RecipeCard
