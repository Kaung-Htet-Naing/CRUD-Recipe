import React from "react";

import { Delete, Edit } from "@mui/icons-material";
import { Chip, Stack, Typography, IconButton } from "@mui/material";
import { recipeType } from "@/app/page";

const DetailComponent: React.FC<{
	recipe: recipeType;
	onEditRecipe: (id: number) => void;
	onDeleteRecipe: (id: number) => void;
}> = ({ recipe, onEditRecipe, onDeleteRecipe }) => {
	const { label, ingredients, description, category, id } = recipe;

	return (
		<div className="w-[70%] mx-auto">
			<div className="flex justify-end">
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
			<Typography
				color="text.primary"
				variant="h4"
				gutterBottom
				className="text-center"
			>
				{label}
			</Typography>
			<Typography
				color="text.primary"
				variant="subtitle1"
				gutterBottom
				className="mb-4 font-semibold"
			>
				{category}
			</Typography>
			<Typography
				color="text.primary"
				variant="subtitle1"
				gutterBottom
				className="my-4 font-semibold"
			>
				Ingredients
			</Typography>
			<Stack direction="row" className="pb-4" sx={{ flexWrap: "wrap", gap: 1 }}>
				{ingredients &&
					ingredients.map((ingredient, index) => (
						<Chip
							label={ingredient}
							color="primary"
							key={index}
							onClickCapture={() => console.log("kaung")}
						/>
					))}
			</Stack>
			<Typography
				color="text.primary"
				variant="subtitle1"
				gutterBottom
				className="my-4 font-semibold"
			>
				Chicken Curry
			</Typography>
			<Typography color="text.primary" variant="body1" gutterBottom>
				{description}
			</Typography>
		</div>
	);
};

export default DetailComponent;
