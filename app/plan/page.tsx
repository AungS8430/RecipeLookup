"use client"

import recipes from "../../public/recipes.json";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Plan() {
	const router = useRouter();
	const [planned, setPlanned] = useState<string[]>([]);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let planned = JSON.parse(localStorage.getItem("planned") || "[]");
			setPlanned(planned);
        }
    }, [])
    function handleRemoveFromPlanner(id: string) {
        let planned = JSON.parse(localStorage.getItem("planned") || "[]");
		const index = planned.indexOf(id);
		if (index !== -1) {
			planned.splice(index, 1);
		}
		localStorage.setItem("planned", JSON.stringify(planned));
		setPlanned(planned);
    }
	function handleClearPlanner() {
		localStorage.setItem("planned", JSON.stringify([]));
		setPlanned([]);
	}
	let recipeData: any;
	if (Array.isArray(recipes)) {
		recipeData = recipes
	}
	if (planned.length === 0) {
		return (
			<div className="max-w-sm mx-auto items-start text-center flex flex-col gap-2 pt-5">
				<h1 className="text-xl sm:text-2xl font-black">Your plan</h1>
				<p className="text-sm sm:text-md text-default-500">You haven&apos;t added any recipes to your planner yet!</p>
			</div>
		)
	}
	const calories = planned.map((id) => recipeData.filter((item: any) => item.id.toString() === id)[0].calories).reduce((a: number, b: number) => a + b, 0);
	const fat = planned.map((id) => recipeData.filter((item: any) => item.id.toString() === id)[0].fat).reduce((a: number, b: number) => a + b, 0);
	const protein = planned.map((id) => recipeData.filter((item: any) => item.id.toString() === id)[0].protein).reduce((a: number, b: number) => a + b, 0);
	const sodium = planned.map((id) => recipeData.filter((item: any) => item.id.toString() === id)[0].sodium).reduce((a: number, b: number) => a + b, 0);
    return (
        <div className="flex flex-col container max-w-2xl mx-auto items-start justify-start p-2 gap-2">
			<h1 className="text-xl sm:text-2xl font-black">Your plan</h1>
			<Divider />
			<p className="text-sm sm:text-md text-default-500">Calories: {calories}<br />Fat: {fat}<br />Protein: {protein}<br />Sodium: {sodium}</p>
			<div className="hidden sm:flex flex-row gap-2">
                <Button color="danger" onPress={handleClearPlanner}>Clear planner</Button>
            </div>
            <div className="flex sm:hidden flex-row gap-2">
                <Button color="danger" onPress={handleClearPlanner} size="sm">Clear planner</Button>
            </div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{
					planned.map((id, index) => {
						let recipe = recipeData.filter((item: any) => item.id.toString() === id)[0];
						return (
							<Link href={`/recipe/${recipe.id}`} suppressHydrationWarning key={index}>
								<Card suppressHydrationWarning>
									<CardHeader suppressHydrationWarning>
										<div className="flex flex-row w-full">
											<div className="flex-none flex flex-col">
												<p className="text-md" suppressHydrationWarning>{recipe.title}</p>
												<p className="text-sm text-default-500" suppressHydrationWarning>Rating: {recipe.rating} / 5.0</p>
											</div>
											<div className="flex-1 w-full"></div>
											<Link href="javascrip: void(0)" suppressHydrationWarning>
												<Button color="danger" className="flex-none right-0" onPress={() => handleRemoveFromPlanner(id)}>Remove</Button>
											</Link>
										</div>		
									</CardHeader>
									<Divider />
									<CardBody suppressHydrationWarning className="text-sm sm:text-md text-default-500">Calories: {recipe.calories}<br />Fat: {recipe.fat}<br />Protein: {recipe.protein}<br />Sodium: {recipe.sodium}</CardBody>
									<div className="hidden sm:flex gap-2 p-2 sm:max-w-lg overflow-auto whitespace-nowrap" suppressHydrationWarning>
										{
											recipe.categories.map((category: string, index: number) => (
												<div key={index}>
													<Link href={`/search?q=${category}`} color="primary" className="text-sm" suppressHydrationWarning={true}>
														<Chip key={index} suppressHydrationWarning={true}>{category}</Chip>
													</Link>
												</div>
											))
										}
									</div>
								</Card>
							</Link>
						)
					})
				}
			</div>
        </div>
    )
}