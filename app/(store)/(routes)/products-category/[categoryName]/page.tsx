"use client";

import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import CustomDropdown from "@/components/CustomDropdown";
import Pagination from "@/components/Pagination";
import Loader from "@/components/Loader";

import {
	getCategoryType,
	getFilteredCategoryProducts,
} from "@/constants/productsStore";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "Newest Arrival" },
];

const ITEMS_PER_PAGE = 30;
const COOKIE_NAME = "currentTrendyProductsPage";

function ProductCategory({ params }: any) {
	const categoryType = getCategoryType(params?.categoryName);
	const filteredCategoryProduct = getFilteredCategoryProducts(categoryType);
	const router = useRouter();
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
		if (!isLoading) {
			Cookies.set(COOKIE_NAME, currentPage.toString(), { expires: 7 });
		}
	}, [currentPage, isLoading]);

	const sortedProducts = useMemo(() => {
		let sorted = [...filteredCategoryProduct];

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
				break;
		}

		return sorted;
	}, [sortOption]);

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

	const handleBack = () => {
		if (router && router.back) {
			router.back();
		}
	};

	if (!categoryType) {
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
					<CircleArrowLeft
						size={40}
						className="cursor-pointer hover:text-[#B47B2B] dark:text-white"
						onClick={handleBack}
					/>
					<h1 className="text-2xl sm:text-[28px] sm:leading-[120%] font-libre-franklin font-semibold tracking-[-0.02em] text-dark-blue dark:text-white uppercase">
						{categoryType} Store
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

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
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
}

export default ProductCategory;
