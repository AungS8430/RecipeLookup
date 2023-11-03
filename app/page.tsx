"use client"

import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import recipeData from "../public/recipes.json";
const recipe = JSON.parse(JSON.stringify(recipeData));

export default function Home() {
	const randomNumber: number = Math.floor(Math.random() * recipe.length);
	const randomRecipe: any = recipe[randomNumber];
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState("");
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const button = document.getElementById("search-btn");
			if (button) {
				button.click();
			}
		}
	}
	
	const handleSearch = () => {
		if (!(searchTerm.trim() === "")) {
			router.push(`/search?q=${searchTerm}`);
		}
	}
	return (
		<section className="flex flex-col items-center justify-center gap-5 py-0">
			<section className="flex flex-col items-center justify-center gap-1 bg-gray-900 w-screen h-full pt-2 pb-4 px-2">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Find&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>healthy&nbsp;</h1>
					<h1 className={title()}>meals</h1>
				</div>
				<div className="hidden lg:flex mt-8 w-full max-w-lg flex-row gap-3">
					<Input type="text" placeholder="Search for recipes" size="lg" variant="bordered" className="w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleKeyDown} />
					<Button color="primary" size="lg" id="search-btn" onClick={handleSearch}>Search</Button>
				</div>
				<div className="hidden md:flex lg:hidden mt-8 w-full max-w-lg flex-row gap-3">
					<Input type="text" placeholder="Search for recipes" size="md" variant="bordered" className="w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleKeyDown} />
					<Button color="primary" size="md" id="search-btn" onClick={handleSearch}>Search</Button>
				</div>
				<div className="flex md:hidden mt-8 w-full max-w-lg flex-row gap-3">
					<Input type="text" placeholder="Search for recipes" size="sm" variant="bordered" className="w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleKeyDown} />
					<Button color="primary" size="sm" id="search-btn" onClick={handleSearch}>Search</Button>
				</div>
			</section>
			<section>
				<Link href={`/recipe/${randomRecipe.id}`} suppressHydrationWarning>
					<Card className="max-w-lg" suppressHydrationWarning>
						<CardHeader suppressHydrationWarning>
							<div className="flex flex-col">
								<p className="text-md" suppressHydrationWarning>{randomRecipe.title}</p>
								<p className="text-sm text-default-500" suppressHydrationWarning>Rating: {randomRecipe.rating} / 5.0</p>
							</div>
						</CardHeader>
						<Divider />
						{ randomRecipe.desc === null ? null : <CardBody suppressHydrationWarning>{randomRecipe.desc}</CardBody> }
						<div className="hidden sm:flex gap-2 p-2 sm:max-w-lg overflow-auto whitespace-nowrap" suppressHydrationWarning>
							{
								randomRecipe.categories.map((category: string, index: number) => (
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
			</section>
		</section>
	);
}