import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { Logo } from "@/components/icons";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="md" isBlurred={false} className="bg-gray-900">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-md sm:text-2xl">RecipeLookup</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="flex">
					<Button
						as={Link}
						className="text-sm font-normal"
						href="/saved"
						color="primary"
						variant="bordered"
					>
						Saved Items
					</Button>
				</NavbarItem>
				<NavbarItem className="flex">
					<Button
						as={Link}
						className="text-sm font-normal"
						href="/plan"
						color="primary"
						variant="shadow"
					>
						Planner
					</Button>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
