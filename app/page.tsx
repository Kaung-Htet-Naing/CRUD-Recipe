"use client";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Autocomplete, Chip, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
	CreateOrEditComponent,
	DetailComponent,
	RecipeCard,
} from "@/components";

const recipeMenus = [
	{
		id: 1,
		label: "Chicken Curry",
		category: "lunch",
		ingredients: ["salt", "sugar", "papper", "chicken"],
		description: "I love this chicken curry so much",
	},
	{
		id: 2,
		label: "Rubber Band",
		category: "breakfast",
		ingredients: [
			"salt",
			"sugar",
			"papper",
			"chicken",
			"salt",
			"sugar",
			"papper",
			"chicken",
			"salt",
			"sugar",
			"papper",
			"chicken",
			"salt",
			"sugar",
			"papper",
			"chicken",
			"salt",
			"sugar",
			"papper",
			"chicken",
			"salt",
			"sugar",
			"papper",
			"chicken",
		],
		description: "I love this chicken curry so much",
	},
	{
		id: 3,
		label: "Pizza",
		category: "dinner",
		ingredients: ["salt", "sugar", "papper", "chicken"],
		description: "I love this chicken curry so much",
	},
	{
		id: 4,
		label: "chuper Curry",
		category: "lunch",
		ingredients: ["salt", "sugar", "papper", "chicken"],
		description: "I love this chicken curry so much",
	},
];

export type recipeType = {
	id: number;
	label: string;
	category: string;
	ingredients: string[];
	description: string;
};

type recipesType = recipeType[];

export default function Home() {
	const [recipes, setRecipes] = useState<recipesType>(recipeMenus);
	const [filterRecipes, setFilterRecipes] = useState<recipesType>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<recipeType>(recipes[0]);
	const [editRecipe, setEditRecipe] = useState<recipeType | null>(null);
	const [isCreate, setIsCreate] = useState<boolean>(false);
	const [isDetail, setDetail] = useState(true);

	const onFilterRecipe = (value: string) => {
		console.log(value.length);
		if (value.length === 0) {
			setFilterRecipes(recipes);
			return;
		}
		/* const filter = recipes.filter((recipe) =>
			recipe.label
				.toLowerCase()
				.replace(/\s/g, "")
				.includes(value.toLowerCase().replace(/\s/g, ""))
		);
		setFilterRecipes(filter); */
	};

	const onSelectCard = (id: number) => {
		const filter = recipes.filter((recipe) => recipe.id === id);
		setSelectedRecipe(filter[0]);
		setDetail(true);
	};

	const onDeleteRecipe = (id: number) => {
		const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
		setRecipes(updatedRecipes);
		setSelectedRecipe(updatedRecipes[0]);
	};

	const onEditRecipe = (id: number) => {
		const filterEditRecipe = recipes.filter((recipe) => recipe.id === id);
		setEditRecipe(filterEditRecipe[0]);
		setDetail(false);
		setIsCreate(false);
	};

	const onUpdateRecipe = (id: number, updatedRecipe: recipeType) => {
		setRecipes((prevRecipes) =>
			prevRecipes.map((recipe) =>
				recipe.id === id ? { ...updatedRecipe } : recipe
			)
		);
	};

	const onCreateRecipe = (newRecipe: Omit<recipeType, "id">) => {
		const maxId = recipes.reduce(
			(max, recipe) => (recipe.id > max ? recipe.id : max),
			0
		);
		const recipeWithNewId = {
			...newRecipe,
			id: maxId + 1,
		};
		setRecipes((prevRecipes) => [...prevRecipes, recipeWithNewId]);
	};

	return (
		<div className="flex flex-row h-screen">
			<div className="flex w-[30%] flex-col pt-10 px-2">
				<Button
					variant="contained"
					color="primary"
					endIcon={<Add />}
					className="self-end min-w-min"
					onClickCapture={() => {
						setDetail(false);
						setIsCreate(true);
					}}
				>
					Add New recipe
				</Button>
				<Autocomplete
					selectOnFocus
					clearOnBlur
					options={recipeMenus}
					disablePortal
					getOptionLabel={(option) => option.label}
					renderOption={(props, option) => (
						<li
							{...props}
							onClickCapture={() => {
								setFilterRecipes(option);
							}}
						>
							{option.label}
						</li>
					)}
					renderInput={(params) => <TextField {...params} label="Search" />}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.defaultMuiPrevented = true;
							console.log(event.target.value);
							setFilterRecipes(
								recipes.filter((recipe) =>
									recipe.label
										.toLowerCase()
										.replace(/\s/g, "")
										.includes(
											event.target.value.toLowerCase().replace(/\s/g, "")
										)
								)
							);
						}
					}}
					className="my-4"
					onInputChange={(event) => onFilterRecipe(event.target.value)}
				/>
				<div className="flex flex-col overflow-y-scroll">
					{filterRecipes?.length > 0
						? filterRecipes.map(({ label, ingredients, id }, index) => (
								<RecipeCard
									key={index}
									label={label}
									ingredients={ingredients}
									onSelectCard={onSelectCard}
									onDeleteRecipe={onDeleteRecipe}
									onEditRecipe={onEditRecipe}
									id={id}
								/>
						  ))
						: recipes.map(({ label, ingredients, id }, index) => (
								<RecipeCard
									key={index}
									label={label}
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
					/>
				)}

				{isDetail === false && !isCreate && (
					<CreateOrEditComponent
						editRecipe={editRecipe}
						isCreate={isCreate}
						onUpdateRecipe={onUpdateRecipe}
					/>
				)}
			</div>
		</div>
	);
}
