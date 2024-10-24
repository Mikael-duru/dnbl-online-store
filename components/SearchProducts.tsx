"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IoClose, IoFilterOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Cookies from "js-cookie";

import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import FilterSection from "@/components/CustomFilter";
import Pagination from "./Pagination";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "New Products" },
];

interface SearchProductsProps {
	products: ProductType[];
	decodedQuery: string;
	categories: string[];
	materials: string[];
	sizes: string[];
}

const COOKIE_NAME = "currentProducts";

const SearchProducts: React.FC<SearchProductsProps> = ({
	products,
	decodedQuery,
	categories,
	materials,
	sizes,
}) => {
	// const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
	const [selectedSize, setSelectedSize] = useState<string>("all");
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(1000000);
	const [sortOption, setSortOption] = useState<string>("all");
	const [showFilters, setShowFilters] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(15); // Default to 15
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

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

	const searchedProducts = products;

	const memoizedFilteredProducts = useMemo(() => {
		let filtered = [...searchedProducts];

		if (!filtered || !decodedQuery) return [];

		if (selectedCategories.length > 0) {
			filtered = filtered.filter((product) =>
				selectedCategories.some((category) =>
					product?.category.includes(category)
				)
			);
		}

		if (selectedMaterial && selectedMaterial !== "all") {
			filtered = filtered.filter((product) => {
				return (
					product?.material && product?.material?.includes(selectedMaterial)
				);
			});
		}

		if (selectedSize && selectedSize !== "all") {
			filtered = filtered.filter(
				(product) => product?.sizes && product?.sizes?.includes(selectedSize)
			);
		}

		filtered = filtered.filter(
			(product) => product?.price >= minPrice && product?.price <= maxPrice
		);

		switch (sortOption) {
			case "low-to-high":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "high-to-low":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "newest":
				filtered.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
				break;
			default:
				break;
		}

		return filtered;
	}, [
		selectedCategories,
		selectedMaterial,
		selectedSize,
		minPrice,
		maxPrice,
		sortOption,
	]);

	useEffect(() => {
		if (searchedProducts) {
			setFilteredProducts(memoizedFilteredProducts);
		} else {
			setFilteredProducts([]);
		}
	}, [
		selectedCategories,
		selectedMaterial,
		selectedSize,
		minPrice,
		maxPrice,
		sortOption,
		decodedQuery,
	]);

	const handleResetFilters = () => {
		setSelectedCategories([]);
		setSelectedMaterial("all");
		setSelectedSize("all");
		setMinPrice(0);
		setMaxPrice(1000000);
		setSortOption("all");
		setFilteredProducts([]);
		// setSearchedProducts([]);
	};

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentProducts = filteredProducts.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	return (
		<main className="px-[5%] xl:px-[98px] relative bg-white dark:bg-[#1E1E1E] text-black dark:text-white">
			<section className="flex max-lg:flex-col gap-6 lg:gap-8">
				<div className="absolute top-14 right-6 sm:top-10 sm:right-[38px] md:right-[38px] cursor-pointer lg:hidden">
					<IoFilterOutline
						className="text-2xl sm:text-[28px] mr-1 text-black dark:text-white"
						onClick={() => setShowFilters(!showFilters)}
					/>
				</div>

				{showFilters && (
					<div className="fixed top-[90px] right-0 z-10 bg-[#FAFAFA] dark:bg-[#2E2E2E] lg:pt-[38px] px-5 pb-[68px] lg:hidden max-h-[calc(100vh-90px)] overflow-y-auto transition-all ease-in-out duration-300">
						<div className="flex justify-end">
							<IoClose
								className="text-2xl sm:text-[28px] mr-1 text-black dark:text-white mt-8 mb-6"
								onClick={() => setShowFilters(!showFilters)}
							/>
						</div>

						<FilterSection
							categories={categories}
							selectedCategories={selectedCategories}
							setSelectedCategories={setSelectedCategories}
							materials={materials}
							selectedMaterial={selectedMaterial}
							setSelectedMaterial={setSelectedMaterial}
							sizes={sizes}
							selectedSize={selectedSize}
							setSelectedSize={setSelectedSize}
							minPrice={minPrice}
							setMinPrice={setMinPrice}
							maxPrice={maxPrice}
							setMaxPrice={setMaxPrice}
							sortOptions={sortOptions}
							sortOption={sortOption}
							setSortOption={setSortOption}
							handleResetFilters={handleResetFilters}
						/>
					</div>
				)}

				<div className="max-lg:hidden w-[250px] xl:w-[286px] min-h-auto bg-[#FAFAFA] dark:bg-[#2E2E2E] pt-[38px] px-5 pb-[68px]">
					<FilterSection
						categories={categories}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
						materials={materials}
						selectedMaterial={selectedMaterial}
						setSelectedMaterial={setSelectedMaterial}
						sizes={sizes}
						selectedSize={selectedSize}
						setSelectedSize={setSelectedSize}
						minPrice={minPrice}
						setMinPrice={setMinPrice}
						maxPrice={maxPrice}
						setMaxPrice={setMaxPrice}
						sortOptions={sortOptions}
						sortOption={sortOption}
						setSortOption={setSortOption}
						handleResetFilters={handleResetFilters}
					/>
				</div>

				<div className="lg:w-3/4 mt-14 sm:mt-[41px] pb-6">
					<div className="flex-1">
						{currentProducts && currentProducts.length > 0 ? (
							<div>
								<p className="mb-4 font-open-sans text-base font-medium text-lighter-gray dark:text-white">
									Search results for <strong>{decodedQuery}</strong> (
									{currentProducts.length})
								</p>
								<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center 2xl:pr-40">
									{currentProducts.map((product: ProductType) => (
										<ProductCard key={product._id} product={product} />
									))}
								</div>
							</div>
						) : (
							<div className="max-lg:h-[400px] max-lg:flex justify-center items-center">
								<p className="flex max-lg:justify-center items-center gap-2 font-open-sans text-xl lg:pt-8 lg:pb-32">
									<FcSearch className="text-4xl" /> No result found
								</p>
							</div>
						)}
					</div>

					{/* The pagination component is only rendered if there is more than 10 products */}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</section>

			<section className="pt-10">
				<RecentlyViewed />
			</section>
		</main>
	);
};

export default SearchProducts;
