import type { Metadata } from "next";
import "./globals.css";
import { ToasterProvider } from "@/lib/ToasterProvider";
import { Providers } from "@/components/theme-provider";

export const metadata: Metadata = {
	title: "DNBL Fashion House",
	description:
		"Discover the latest fashion trends at D'Nobles Fashion House, your premier online destination for high-quality, stylish apparel. Shop our curated collection of children's, women's and men's traditional clothing. Enjoy fast, reliable shipping and exceptional customer service. Elevate your look with DNBL",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-white dark:bg-[#1E1E1E]">
				<Providers>
					<ToasterProvider />
					<div className="container mx-auto">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
