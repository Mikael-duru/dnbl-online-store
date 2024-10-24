import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getUniqueCategoriesMaterialsSizes } from "@/lib/actions/filterActions";

export default async function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { uniqueCategories } = await getUniqueCategoriesMaterialsSizes();

	return (
		<>
			<div className="dark:border-x-2 dark:border-x-dark-brown">
				<Header />
				{children}
				<Footer uniqueCategories={uniqueCategories} />
			</div>
		</>
	);
}
