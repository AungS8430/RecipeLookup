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
import { MainSearchBar } from "@/components/mainSearchBar";
import { RandomRecipe } from "@/components/randomRecipe";
import recipeData from "../public/recipes.json";
const recipe = JSON.parse(JSON.stringify(recipeData));

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-5 py-0">
			<section className="flex flex-col items-center justify-center gap-1 bg-gray-900 w-screen h-full pt-2 pb-4 px-2">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={title()}>Find&nbsp;</h1>
					<h1 className={title({ color: "violet" })}>healthy&nbsp;</h1>
					<h1 className={title()}>meals</h1>
				</div>
				<MainSearchBar />
			</section>
			<RandomRecipe />
		</section>
	);
}