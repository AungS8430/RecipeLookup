"use client"

import recipes from "../../public/recipes.json";
import { Divider } from "@nextui-org/divider";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Saved() {
	const router = useRouter();
	const [saved, setSaved] = useState<string[]>([]);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let saved = JSON.parse(localStorage.getItem("saved") || "[]");
			setSaved(saved);
        }
    }, [])
    function handleRemoveFromSave(id: string) {
        let saved = JSON.parse(localStorage.getItem("saved") || "[]");
		const index = saved.indexOf(id);
		if (index !== -1) {
			saved.splice(index, 1);
		}
		localStorage.setItem("saved", JSON.stringify(saved));
		setSaved(saved);
    }
	let recipeData: any;
	if (Array.isArray(recipes)) {
		recipeData = recipes
	}
	if (saved.length === 0) {
		return (
			<div className="max-w-sm mx-auto items-start text-center flex flex-col gap-2 pt-5">
				<h1 className="text-xl sm:text-2xl font-black">Saved Items</h1>
				<p className="text-sm sm:text-md text-default-500">You haven&apos;t save any items yet!</p>
			</div>
		)
	}
    return (
        <div className="flex flex-col container max-w-md mx-auto items-center justify-center p-2">
			<h1 className="text-xl sm:text-2xl font-black">Saved Items</h1>
			<div className="grid gap-4 items-center justify-center pb-4 px-2">
				{
					saved.map((id, index) => {
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
												<Button color="danger" className="flex-none right-0" onPress={() => handleRemoveFromSave(id)}>Remove</Button>
											</Link>
										</div>		
									</CardHeader>
									<Divider />
									{ recipe.desc === null ? null : <CardBody suppressHydrationWarning>{recipe.desc}</CardBody> }
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