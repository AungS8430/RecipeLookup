"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import recipeData from "../../public/recipes.json";
const recipes = JSON.parse(JSON.stringify(recipeData));

export default function Profile() {
    function filterByValue(array: any, string: any) {
        return array.filter((o: any) =>
            Object.keys(o).some(k => {
                const value = o[k];
                if (typeof value === "string") {
                    return value.toLowerCase().includes(string.toLowerCase());
                }
                return false;
            })
        );
    }
    const searchParams = useSearchParams();
    const router = useRouter();
    let search = searchParams.get("q");
    let sort = searchParams.get("s");
    let page = searchParams.get("p");
    if (page === null) {
        page = "1";
    }
    let unsorted = filterByValue(recipes, search);
    let sorted;
    if (sort == "rating") {
        sorted = unsorted.sort((a: any, b: any) => {
            return b.rating - a.rating;
        })
    } else if (sort == "fat12") {
        sorted = unsorted.sort((a: any, b: any) => {
            return a.fat - b.fat;
        })
    } else if (sort == "fat21") {
        sorted = unsorted.sort((a: any, b: any) => {
            return b.fat - a.fat;
        })
    } else if (sort == "calories12") {
        sorted = unsorted.sort((a: any, b: any) => {
            return a.calories - b.calories;
        })
    } else if (sort == "calories21") {
        sorted = unsorted.sort((a: any, b: any) => {
            return b.calories - a.calories;
        })
    } else if (sort == "protein12") {
        sorted = unsorted.sort((a: any, b: any) => {
            return a.protein - b.protein;
        })
    } else if (sort == "protein21") {
        sorted = unsorted.sort((a: any, b: any) => {
            return b.protein - a.protein;
        })
    } else if (sort == "sodium12") {
        sorted = unsorted.sort((a: any, b: any) => {
            return a.sodium - b.sodium;
        })
    } else if (sort == "sodium21") {
        sorted = unsorted.sort((a: any, b: any) => {
            return b.sodium - a.sodium;
        })
    } else {
        sorted = unsorted;
    }
    let recipesPerPage = 10;
    let totalPages = Math.ceil(sorted.length / recipesPerPage);
    let recipesOnPage = sorted.slice((parseInt(page) - 1) * recipesPerPage, parseInt(page) * recipesPerPage);

    function handlePageChange(page: number) {
        router.push(`/search?q=${search}&s=${sort}&p=${page}`);
    }
    return (
        <main className="flex flex-col container max-w-md mx-auto items-center justify-center p-2">
            <div className="grid gap-4 items-center justify-center pb-4 px-2">
                {
                    recipesOnPage.map((recipe: any, index: number) => (
                        <Link key={index} href={`/recipe/${recipe.id}`} suppressHydrationWarning>
                            <Card suppressHydrationWarning key={index}>
                                <CardHeader suppressHydrationWarning>
                                    <div className="flex flex-col">
                                        <p className="text-md" suppressHydrationWarning>{recipe.title}</p>
                                        <p className="text-sm text-default-500" suppressHydrationWarning>Rating: {recipe.rating} / 5.0</p>
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
                    ))
                }
            </div>
            <Pagination total={totalPages} page={parseInt(page)} onChange={handlePageChange} />
        </main>
    )
}