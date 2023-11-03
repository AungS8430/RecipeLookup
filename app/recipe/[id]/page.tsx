"use client"

import recipes from "../../../public/recipes.json";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export function getStaticParams() {
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
    return { params };
}

export default function Recipe({ params }: { params: { id: string } }) {
    const [copyButtonText, setCopyButtonText] = useState("Share");
    const { id } = params;
    let recipe;
    if (Array.isArray(recipes)) {
        recipe = recipes.filter((item) => item.id.toString() === id)[0];
    }
    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        setCopyButtonText("Copied!");
        setTimeout(() => {
            setCopyButtonText("Share");
        }, 5000);
    }
    const [planned, setPlanned] = useState<string[]>([]);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let planned = JSON.parse(localStorage.getItem("planned") || "[]");
            setPlanned(planned);
        }
    }, [])
    const [addToPlannerButtonText, setAddToPlannerButtonText] = useState("Add to planner");
    function handleAddToPlanner() {
        let planned = JSON.parse(localStorage.getItem("planned") || "[]");
        planned.push(id);
        localStorage.setItem("planned", JSON.stringify(planned));
        setPlanned(planned);
        setAddToPlannerButtonText("Added!");
        setTimeout(() => {
            setAddToPlannerButtonText("Add to planner");
        }, 5000);
    }
    const [saved, setSaved] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let saved = JSON.parse(localStorage.getItem("saved") || "[]").includes(id);
            setSaved(saved);
        }
    }, [id])
    function handleSave() {
        let saved = JSON.parse(localStorage.getItem("saved") || "[]");
        if (saved.includes(id)) {
            const index = saved.indexOf(id);
            if (index !== -1) {
                saved.splice(index, 1);
            }
            localStorage.setItem("saved", JSON.stringify(saved));
            setSaved(false);
        } else {
            saved.push(id);
            localStorage.setItem("saved", JSON.stringify(saved));
            setSaved(true);
        }
    }
    return (
        <div className="flex flex-col container max-w-2xl mx-auto items-center justify-center p-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{recipe.title}</h1>
                <p className="text-sm sm:text-md text-default-500">Rating: {recipe.rating} / 5.0</p>
                <Divider />
                <div className="hidden sm:flex flex-row gap-2">
                    <ButtonGroup>
                        <Button color="success" onPress={handleAddToPlanner}>{addToPlannerButtonText}</Button>
                        <Button color="primary" onPress={copyLink}>{copyButtonText}</Button>
                        <Button onPress={handleSave}>{saved ? "Unsave" : "Save"}</Button>
                    </ButtonGroup>
                </div>
                <div className="flex sm:hidden flex-row gap-2">
                    <ButtonGroup>
                        <Button color="success" onPress={handleAddToPlanner} size="sm">{addToPlannerButtonText}</Button>
                        <Button color="primary" onPress={copyLink} size="sm">{copyButtonText}</Button>
                        <Button size="sm">Save</Button>
                    </ButtonGroup>
                </div>
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