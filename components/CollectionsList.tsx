"use client"; // Add this at the top of the file

import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import ProductCard from "@/components/ProductCard";
import CustomDropdown from "@/components/CustomDropdown";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import Link from "next/link";
import Image from "next/image";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "New Products" },
];

const COOKIE_NAME = "currentCollectionsListPage";

interface CollectionsListProps {
	collectionDetail: any;
}

const CollectionsList: React.FC<CollectionsListProps> = ({
	collectionDetail,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(30); // Default to 30
	const [isLoading, setIsLoading] = useState(true);
	const [sortOption, setSortOption] = useState<string>("all");
	console.log(collectionDetail);

	useEffect(() => {
		const savedPage = Cookies.get(COOKIE_NAME);
		if (savedPage) {
			setCurrentPage(parseInt(savedPage, 10));
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			Cookies.set(COOKIE_NAME, currentPage.toString(), { expires: 7 });
		}
	}, [currentPage, isLoading]);

	useEffect(() => {
		const updateItemsPerPage = () => {
			setItemsPerPage(window.innerWidth < 768 ? 10 : 30); // 768px as a breakpoint
		};

		updateItemsPerPage(); // Set initial value
		window.addEventListener("resize", updateItemsPerPage); // Update on resize

		return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup
	}, []);

	// Sort products based on the selected sort option
	const sortedProducts = useMemo(() => {
		let sorted = [...collectionDetail?.products];

		switch (sortOption) {
			case "low-to-high":
				sorted = sorted.sort((a, b) => a.price - b.price);
				break;
			case "high-to-low":
				sorted = sorted.sort((a, b) => b.price - a.price);
				break;
			case "newest":
				sorted = sorted.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			default:
				break;
		}

		return sorted;
	}, [collectionDetail.products, sortOption]);

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentProducts = sortedProducts.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main>
			<section className="pt-10 px-[5%] xl:px-[100px] pb-[68px] bg-light-brown-gold dark:bg-[#2E2E2E]">
				<Image
					src={collectionDetail?.image}
					width={1500}
					height={1000}
					alt="collection"
					className="w-full max-h-[450px] object-cover rounded-xl"
				/>

				<div className="mt-10 sm:mt-12 mb-5 flex flex-col gap-4 items-center">
					<h1 className="text-2xl sm:text-[28px] sm:leading-[120%] font-libre-franklin font-semibold tracking-[-0.02em] text-dark-blue dark:text-white">
						{collectionDetail?.title}
					</h1>
					<p className="text-sm sm:text-lg text-[#333] dark:text-gray-300 text-center max-w-[900px]">
						{collectionDetail?.description}
					</p>
				</div>

				{/* Sort Options */}
				<div className="mt-10 mb-6 flex sm:justify-end items-center gap-3">
					<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] shrink-0">
						Sort By
					</h2>

					<div className="w-[200px]">
						<CustomDropdown
							options={sortOptions}
							selectedOption={sortOption}
							onChange={setSortOption}
						/>
					</div>
				</div>

				{/* Special Orders */}
				<p className="text-center font-open-sans font-normal text-sm sm:text-lg text-black dark:text-gray-300 pb-11">
					For your Bespoke/Custom made wears, please contact customer support
					via our&nbsp;
					<Link
						href="https://wa.link/gfswrn"
						className="font-bold text-brown-gold underline inline"
					>
						WhatsApp
					</Link>
					&nbsp;platform
				</p>

				{/* Product Cards */}
				<div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-8">
					{currentProducts.map((product: ProductType) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</section>
		</main>
	);
};

export default CollectionsList;
