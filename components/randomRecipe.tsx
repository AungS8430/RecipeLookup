"use client";

import { useEffect, useState } from 'react';
import { Link } from '@nextui-org/link';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Chip } from '@nextui-org/chip';
import recipeData from "../public/recipes.json";
const recipe = JSON.parse(JSON.stringify(recipeData));

export const RandomRecipe = () => {
    const [randomNumber, setRandomNumber] = useState(-1);

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * recipe.length))

    }, [])

    let randomRecipe: any;

    if (randomNumber === -1) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        randomRecipe = recipe[randomNumber];
    }
    return (
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
    )
}