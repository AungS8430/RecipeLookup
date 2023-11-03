"use client"

import React from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchLayout({
	children,
}: {
	children: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const search = searchParams.get("q");
    const sort = searchParams.get("s");

	const [searchTerm, setSearchTerm] = useState(search || "");
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			const button = document.getElementById("search-btn");
			if (button) {
				button.click();
			}
		}
	}
	
	const handleSearch = () => {
        if (searchTerm === null || !searchTerm) {
            router.push(`/search?s=${sortQuery}`);
        } else if (!(searchTerm.trim() === "")) {
			router.push(`/search?q=${searchTerm}&s=${sortQuery}`);
		} else {
            router.push(`/search?s=${sortQuery}`)
        }
	}

    const [sortQuery, setSortQuery] = useState(sort || "relevance");
    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortQuery(event.target.value);
    }
    return (
        <section className="flex flex-col items-center justify-center gap-5 py-0">
            <section className="flex flex-col items-center justify-center gap-1 bg-gray-900 w-screen pb-4 px-2">
                <div className="hidden sm:flex w-full max-w-3xl flex-row gap-3">
                    <Select color="primary" size="sm" placeholder="How to sort?" className="w-96" variant="faded" radius="lg" onChange={handleSort} defaultSelectedKeys={[sortQuery]}>
                        <SelectItem value="relevance" key="relevance">Relevance</SelectItem>
                        <SelectItem value="rating" key="rating">Rating</SelectItem>
                        <SelectItem value="fat12" key="fat12">Fat(Low to high)</SelectItem>
                        <SelectItem value="fat21" key="fat21">Fat(High to low)</SelectItem>
                        <SelectItem value="calories12" key="calories12">Calories(Low to high)</SelectItem>
                        <SelectItem value="calories21" key="calories21">Calories(High to low)</SelectItem>
                        <SelectItem value="protein12" key="protein12">Protein(Low to high)</SelectItem>
                        <SelectItem value="protein21" key="protein21">Protein(High to low)</SelectItem>
                        <SelectItem value="sodium12" key="sodium12">Sodium(Low to high)</SelectItem>
                        <SelectItem value="sodium21" key="sodium21">Sodium(High to low)</SelectItem>
                    </Select>
					<Input type="text" placeholder="Search for recipes" size="lg" variant="bordered" className="w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleKeyDown} />
					<Button color="primary" size="lg" id="search-btn" onClick={handleSearch}>Search</Button>
				</div>
				<div className="flex sm:hidden w-full max-w-lg flex-row gap-3">
                    <Select color="primary" size="sm" placeholder="How to sort?" labelPlacement="outside" className="hidden xs:flex w-96 text-sm" variant="faded" onChange={handleSort} defaultSelectedKeys={[sortQuery]}>
                        <SelectItem value="relevance" key="relevance">Relevance</SelectItem>
                        <SelectItem value="rating" key="rating">Rating</SelectItem>
                        <SelectItem value="fat12" key="fat12">Fat(Low to high)</SelectItem>
                        <SelectItem value="fat21" key="fat21">Fat(High to low)</SelectItem>
                        <SelectItem value="calories12" key="calories12">Calories(Low to high)</SelectItem>
                        <SelectItem value="calories21" key="calories21">Calories(High to low)</SelectItem>
                        <SelectItem value="protein12" key="protein12">Protein(Low to high)</SelectItem>
                        <SelectItem value="protein21" key="protein21">Protein(High to low)</SelectItem>
                        <SelectItem value="sodium12" key="sodium12">Sodium(Low to high)</SelectItem>
                        <SelectItem value="sodium21" key="sodium21">Sodium(High to low)</SelectItem>
                    </Select>
					<Input type="text" placeholder="Search for recipes" size="sm" variant="bordered" className="w-full" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyDown={handleKeyDown} />
					<Button color="primary" size="sm" id="search-btn" onClick={handleSearch}>Search</Button>
				</div>
            </section>
            {children}
        </section>
    )
}