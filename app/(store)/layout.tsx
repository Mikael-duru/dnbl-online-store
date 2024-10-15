import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="dark:border-2 dark:border-dark-brown">
				<Header />
				{children}
				<Footer />
			</div>
		</>
	);
}
