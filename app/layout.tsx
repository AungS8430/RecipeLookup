import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-gray-900 font-sans antialiased"
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-0 px-6 flex-grow">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
