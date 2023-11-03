import recipesData from "../../../public/recipes.json";
import { RecipeButtons } from "@/components/recipeButtons";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Recipe {
    id: number,
    directions: string[],
    fat: number,
    date: string,
    categories: string[],
    calories: number,
    desc: string | null,
    protein: number,
    rating: number,
    title: string,
    ingredients: string[],
    sodium: number
}

let recipes: Recipe[] = recipesData as Recipe[];

export function generateStaticParams() {
    let params = [];
    if (Array.isArray(recipes)) {
        for (let i = 0; i < recipes.length; i++) {
            params.push({
                params: {
                    id: recipes[i].id.toString()
                }
            })
        }
    }
    return params;
}

export default function Recipe({ params }: { params: { id: string } }) {
    const { id } = params;
    let recipe;
    if (Array.isArray(recipes)) {
        recipe = recipes.filter((item) => item.id.toString() === id)[0];
    }
    if (recipe === undefined) {
        return (
            <div className="max-w-sm mx-auto items-start text-center flex flex-col gap-2 pt-5">
                <h1 className="text-xl sm:text-2xl font-black">Recipe not found</h1>
                <p className="text-sm sm:text-md text-default-500">The recipe you are looking for does not exist.</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col container max-w-2xl mx-auto items-center justify-center p-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{recipe.title}</h1>
                <p className="text-sm sm:text-md text-default-500">Rating: {recipe.rating} / 5.0</p>
                <Divider />
                <RecipeButtons params={params} />
                { recipe.desc == null ? null : <p className="text-sm sm:text-md">{recipe.desc}</p> }
                <h1 className="text-lg sm:text-xl font-bold">Nutritions</h1>
                <div>
                    <p className="text-sm sm:text-md">Calories: {recipe.calories}</p>
                    <p className="text-sm sm:text-md">Fat: {recipe.fat}</p>
                    <p className="text-sm sm:text-md">Protein: {recipe.protein}</p>
                    <p className="text-sm sm:text-md">Sodium: {recipe.sodium}</p>
                </div>
                <h1 className="text-lg sm:text-xl font-bold">Ingredients</h1>
                <div>
                    {
                        recipe.ingredients.map((ingredient: string, index: number) => (
                            <p key={index} className="text-sm sm:text-md"> • {ingredient}</p>
                        ))
                    }
                </div>
                <h1 className="text-lg sm:text-xl font-bold">Instructions</h1>
                <div>
                    {
                        recipe.directions[0].startsWith("1") ?
                        recipe.directions.map((instruction: string, index: number) => (
                            <p key={index} className="text-sm sm:text-md">{instruction}</p>
                        )) :
                        recipe.directions.map((instruction: string, index: number) => (
                            <p key={index} className="text-sm sm:text-md">{index + 1}. {instruction}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}