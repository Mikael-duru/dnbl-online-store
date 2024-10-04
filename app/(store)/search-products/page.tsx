"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IoClose, IoSearchOutline, IoFilterOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Cookies from "js-cookie";

import { products } from "@/store/products";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import { categories, materials, sizes } from "@/constants/productsStore";
import FilterSection from "@/components/CustomFilter";

const sortOptions = [
	{ value: "low-to-high", label: "Price: Low to High" },
	{ value: "high-to-low", label: "Price: High to Low" },
	{ value: "newest", label: "Newest Arrival" },
];

function SearchProducts() {
	const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
	const [searchText, setSearchText] = useState<string>("");
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
	const [selectedSize, setSelectedSize] = useState<string>("all");
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(1000000);
	const [sortOption, setSortOption] = useState<string>("all");
	const [showFilters, setShowFilters] = useState(false);

	const memoizedFilteredProducts = useMemo(() => {
		if (!searchText) return [];

		let filtered = products;

		filtered = filtered.filter((product) =>
			product.productName.toLowerCase().includes(searchText.toLowerCase())
		);

		if (selectedCategories.length > 0) {
			filtered = filtered.filter((product) =>
				selectedCategories.some((category) =>
					product.categories.includes(category)
				)
			);
		}

		if (selectedMaterial) {
			filtered = filtered.filter((product) => {
				if (selectedMaterial === "all") {
					return true;
				}
				return product.material === selectedMaterial;
			});
		}

		if (selectedSize && selectedSize !== "all") {
			filtered = filtered.filter(
				(product) => product.sizes && product.sizes.includes(selectedSize)
			);
		}

		filtered = filtered.filter(
			(product) => product.newPrice >= minPrice && product.newPrice <= maxPrice
		);

		switch (sortOption) {
			case "low-to-high":
				filtered.sort((a, b) => a.newPrice - b.newPrice);
				break;
			case "high-to-low":
				filtered.sort((a, b) => b.newPrice - a.newPrice);
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
		searchText,
		selectedCategories,
		selectedMaterial,
		selectedSize,
		minPrice,
		maxPrice,
		sortOption,
	]);

	const performSearch = () => {
		const trimmedSearchText = searchText.trim();
		if (trimmedSearchText) {
			setFilteredProducts(memoizedFilteredProducts);
			const updatedRecentSearches = [
				trimmedSearchText,
				...recentSearches.filter((term) => term !== trimmedSearchText),
			].slice(0, 5);
			setRecentSearches(updatedRecentSearches);
			Cookies.set("recentSearches", JSON.stringify(updatedRecentSearches), {
				expires: 7,
			});
		}
	};

	useEffect(() => {
		const storedRecentSearches = Cookies.get("recentSearches");
		if (storedRecentSearches) {
			setRecentSearches(JSON.parse(storedRecentSearches));
		}
	}, []);

	useEffect(() => {
		if (searchText) {
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
	]);

	const handleSearchButtonClick = () => {
		performSearch();
	};

	const handleRecentSearchClick = (term: string) => {
		setSearchText(term);
		if (term) {
			setFilteredProducts([]);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			performSearch();
		}
	};

	const handleDeleteRecentSearch = (term: string) => {
		const updatedRecentSearches = recentSearches.filter(
			(search) => search !== term
		);
		setRecentSearches(updatedRecentSearches);
		Cookies.set("recentSearches", JSON.stringify(updatedRecentSearches), {
			expires: 7,
		});
	};

	const handleClearAllRecentSearches = () => {
		setRecentSearches([]);
		Cookies.remove("recentSearches");
	};

	const handleResetFilters = () => {
		setSelectedCategories([]);
		setSelectedMaterial("all");
		setSelectedSize("all");
		setMinPrice(0);
		setMaxPrice(1000000);
		setSortOption("all");
		setFilteredProducts([]);
	};

	return (
		<div className="px-[5%] xl:px-[98px] relative bg-white dark:bg-[#1E1E1E] text-black dark:text-white">
			<div className="flex max-lg:flex-col gap-6 lg:gap-8">
				<div className="absolute top-4 right-6 sm:top-12 sm:right-[38px] md:right-[38px] z-20 cursor-pointer lg:hidden">
					<IoFilterOutline
						className="text-2xl sm:text-[28px] mr-1 text-black dark:text-white"
						onClick={() => setShowFilters(!showFilters)}
					/>
				</div>

				{showFilters && (
					<div className="absolute top-0 right-0 z-10 pt-14 sm:pt-20 bg-[#FAFAFA] dark:bg-[#2E2E2E] lg:pt-[38px] px-5 pb-[68px] lg:hidden">
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

				<div className="max-lg:hidden w-[286px] min-h-auto bg-[#FAFAFA] dark:bg-[#2E2E2E] pt-[38px] px-5 pb-[68px]">
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

				<div className="lg:w-3/4">
					<div className="flex items-center gap-4 mt-14 sm:mt-[41px] mb-6">
						<div className="inline-flex w-[88%] sm:w-[480px] lg:w-[600px] relative">
							<input
								type="text"
								onChange={(e) => setSearchText(e.target.value)}
								value={searchText}
								onKeyDown={handleKeyPress}
								onFocus={() => setShowRecentSearches(true)}
								onBlur={() =>
									setTimeout(() => setShowRecentSearches(false), 200)
								}
								placeholder="Search for products..."
								className="w-full flex-1 rounded-[10px] text-black dark:text-white bg-white dark:bg-[#444444] placeholder:text-lighter-gray dark:placeholder:text-white placeholder:font-medium shadow-sm ring-1 ring-inset ring-[#B57C2C] dark:ring-[#B57C2C] placeholder:text-base placeholder:tracking-[0.6px] focus:ring-1 focus:ring-[#B57C2C] px-3 pt-[13.5px] pb-[12.5px] outline-none"
							/>
							{searchText && (
								<IoClose
									size={24}
									onClick={() => {
										setSearchText("");
										handleResetFilters();
									}}
									className="absolute top-3 right-[14px] text-lighter-gray dark:text-white hover:text-error cursor-pointer duration-200"
								/>
							)}
						</div>
						<button
							type="button"
							onClick={handleSearchButtonClick}
							className="flex flex-col justify-center items-center px-3 pt-[13.5px] pb-[12.5px] gap-2 shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300"
						>
							<IoSearchOutline size={24} className="text-white" />
						</button>
					</div>

					{showRecentSearches && recentSearches.length > 0 && (
						<div className="absolute top-20 lg:top-16 z-10 w-[88%] max-w-[600px] bg-white dark:bg-[#444444] border border-gray-300 dark:border-gray-600 rounded-lg mt-7 shadow-lg">
							<div className="flex justify-between p-2">
								<span className="font-semibold text-sm">Recent Searches</span>
								<button
									onClick={handleClearAllRecentSearches}
									className="text-sm text-red-500 hover:underline"
								>
									Clear All
								</button>
							</div>
							<Separator className="bg-gray-300 dark:bg-gray-600" />
							<ul>
								{recentSearches.map((term, index) => (
									<li
										key={index}
										className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
										onClick={() => handleRecentSearchClick(term)}
									>
										<span className="text-black dark:text-white">{term}</span>
										<button
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteRecentSearch(term);
											}}
											className="text-gray-500 hover:text-red-500"
										>
											<IoClose size={16} />
										</button>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className="flex-1">
						{filteredProducts.length > 0 ? (
							<div>
								<p className="mb-4 font-open-sans text-base font-medium text-lighter-gray dark:text-white">
									Search results for <strong>{searchText}</strong> (
									{filteredProducts.length})
								</p>
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
									{filteredProducts.map((product: ProductType) => (
										<ProductCard key={product._id} product={product} />
									))}
								</div>
							</div>
						) : (
							<div className="max-lg:h-[400px] max-lg:flex justify-center items-center">
								<p className="flex max-lg:justify-center items-center gap-2 font-open-sans text-xl lg:pt-8 lg:pb-32">
									<FcSearch className="text-4xl" /> No search result
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="px-4 pt-10">
				<RecentlyViewed />
			</div>
		</div>
	);
}

export default SearchProducts;
