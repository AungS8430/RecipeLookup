"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export const MainSearchBar = () => {
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
        <div className="w-full flex flex-col items-center justify-center">
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
        </div>
    )
}