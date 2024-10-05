"use client";

import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import slugify from "slugify";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/store/products";
import Pagination from "@/components/Pagination";
import CustomDropdown from "@/components/CustomDropdown";
import { categories } from "@/constants/productsStore";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "Newest Arrival" },
];

const COOKIE_NAME = "currentProductsPage";

export default function ProductsPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [sortOption, setSortOption] = useState<string>("all");
	const [itemsPerPage, setItemsPerPage] = useState(30); // Default to 30

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

	// Dynamically filter products based on the selected category
	const filteredProducts = products.filter((product) => {
		if (selectedCategory === "all") {
			return true; // Show all products if "all" is selected
		}
		return product.categories.includes(selectedCategory.toLowerCase()); // Filter by selected category
	});

	const sortedProducts = useMemo(() => {
		let sorted = [...filteredProducts]; // Copy the array to avoid mutating the original

		switch (sortOption) {
			case "low-to-high":
				sorted = sorted.sort((a, b) => a.newPrice - b.newPrice);
				break;
			case "high-to-low":
				sorted = sorted.sort((a, b) => b.newPrice - a.newPrice);
				break;
			case "newest":
				sorted = sorted.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			default:
				// If "all" is selected, we show all products
				break;
		}

		return sorted;
	}, [filteredProducts, sortOption]);

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentProducts = sortedProducts.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	const handleDropdownChange = (value: string) => {
		setSelectedCategory(value);
		setCurrentPage(1); // Reset to first page when category changes
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main>
			<section className="pt-[38px] px-[5%] 2xl:px-[100px] pb-[68px] bg-light-brown-gold dark:bg-[#2E2E2E]">
				<h1 className="text-2xl sm:text-[28px] sm:leading-[120%] font-libre-franklin font-semibold tracking-[-0.02em] text-dark-blue dark:text-white mb-3">
					All Products
				</h1>

				<div className="flex max-sm:flex-col justify-between sm:items-center gap-6 my-8">
					<div className="w-full sm:w-[250px] flex max-md:flex-col justify-center sm:items-center gap-2">
						<div className="w-full">
							<CustomDropdown
								options={categories?.map((category) => ({
									value: `${slugify(category)}`,
									label: `${
										category.charAt(0).toUpperCase() + category.slice(1)
									}`,
								}))}
								selectedOption={selectedCategory}
								onChange={handleDropdownChange}
							/>
						</div>
					</div>

					{/* Sort Options */}
					<div className="w-full sm:w-[280px] flex max-md:flex-col justify-center sm:items-center gap-2">
						<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] shrink-0">
							Sort By
						</h2>
						<div className="w-full">
							<CustomDropdown
								options={sortOptions}
								selectedOption={sortOption}
								onChange={setSortOption}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-center items-center flex-wrap gap-4">
					{currentProducts?.length > 0 ? (
						currentProducts.map((product: ProductType) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p className="text-black dark:text-white">
							No products found in this category.
						</p>
					)}
				</div>

				{/* The pagination component is only rendered if there is more than one page */}
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
}
