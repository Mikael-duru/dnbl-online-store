"use client";

import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

import ProductCard from "@/components/ProductCard";
import CustomDropdown from "@/components/CustomDropdown";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";
import BackButton from "@/components/BackButton";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "New Products" },
];

const ITEMS_PER_PAGE = 30;
const COOKIE_NAME = "currentTrendyProductsPage";

interface CategoryListProps {
	categoryName: string;
	products: ProductType[];
}

const CategoryList: React.FC<CategoryListProps> = ({
	categoryName,
	products,
}) => {
	const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [sortOption, setSortOption] = useState<string>("all");

	useEffect(() => {
		const savedPage = Cookies.get(COOKIE_NAME);
		if (savedPage) {
			setCurrentPage(parseInt(savedPage, 10));
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (products) {
			const normalizedCategoryName = categoryName.trim().toLowerCase();
			const filteredCategoryProduct = products.filter(
				(product) =>
					product.category.trim().toLowerCase() === normalizedCategoryName
			);
			setFilteredProducts(filteredCategoryProduct);
		}
	}, [products, categoryName]);

	useEffect(() => {
		if (!isLoading) {
			Cookies.set(COOKIE_NAME, currentPage.toString(), { expires: 7 });
		}
	}, [currentPage, isLoading]);

	const sortedProducts = useMemo(() => {
		let sorted = [...filteredProducts];

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
	}, [filteredProducts, sortOption]);

	const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentProducts = sortedProducts.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!categoryName) {
		return (
			<div className="text-black text-base dark:text-white">
				Category not found
			</div>
		);
	}

	return (
		<main>
			<section className="pt-10 px-[5%] xl:px-[100px] pb-[68px] bg-light-brown-gold dark:bg-[#2E2E2E]">
				<div className="mb-5 flex gap-5 items-center">
					<BackButton />

					<h1 className="text-2xl sm:text-[28px] sm:leading-[120%] font-libre-franklin font-semibold tracking-[-0.02em] text-dark-blue dark:text-white uppercase">
						{categoryName} Store
					</h1>
				</div>

				{/* Sort Options */}
				<div className="max-w-[300px] mt-[28px] mb-6 flex justify-start items-center gap-3">
					<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] shrink-0">
						Sort By
					</h2>
					<div className="w-full max-sm:w-[200px]">
						<CustomDropdown
							options={sortOptions}
							selectedOption={sortOption}
							onChange={setSortOption}
						/>
					</div>
				</div>

				<div className="flex max-sm:justify-center items-center flex-wrap gap-4 mt-4 xl:gap-6 sm:ml-[5%] xl:ml-0 2xl:ml-[5%]">
					{currentProducts?.length > 0 ? (
						currentProducts?.map((product: ProductType) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p className="text-black dark:text-white">
							No products found in this category.
						</p>
					)}
				</div>

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

export default CategoryList;
