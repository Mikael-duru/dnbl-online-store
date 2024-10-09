// FilterSection.tsx
import React from "react";

import CustomDropdown from "@/components/CustomDropdown";
import { Separator } from "@/components/ui/separator";
import slugify from "slugify";

const FilterSection = ({
	categories,
	selectedCategories,
	setSelectedCategories,
	materials,
	selectedMaterial,
	setSelectedMaterial,
	sizes,
	selectedSize,
	setSelectedSize,
	minPrice,
	setMinPrice,
	maxPrice,
	setMaxPrice,
	sortOptions,
	sortOption,
	setSortOption,
	handleResetFilters,
}: any) => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-between">
				<h1 className="font-libre-franklin font-semibold text-base text-black dark:text-white leading-[16.97px]">
					Filter
				</h1>
				<button
					type="button"
					onClick={handleResetFilters}
					className="font-libre-franklin font-semibold text-base text-black dark:text-white border-none hover:text-gold-text"
				>
					Reset
				</button>
			</div>
			<Separator className="bg-black  dark:bg-white mt-2 mb-8" />
			<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] mb-3">
				Categories
			</h2>
			{categories?.map((category: any) => (
				<div className="mb-2" key={category}>
					<input
						type="checkbox"
						id={category}
						value={category}
						checked={selectedCategories.includes(category)}
						onChange={(e) =>
							setSelectedCategories(
								e.target.checked
									? [...selectedCategories, e.target.value]
									: selectedCategories.filter(
											(cat: any) => cat !== e.target.value
									  )
							)
						}
					/>
					<label htmlFor={category} className="filter-text ml-2">
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</label>
				</div>
			))}

			<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] mb-3 mt-[28px]">
				Materials
			</h2>
			<div className="w-full max-w-sm mx-auto mb-[28px]">
				<CustomDropdown
					options={materials?.map((material: any) => ({
						value: `${slugify(material)}`,
						label: `${material.charAt(0).toUpperCase() + material.slice(1)}`,
					}))}
					selectedOption={selectedMaterial}
					onChange={setSelectedMaterial}
				/>
			</div>

			<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] mb-3 mt-[28px]">
				Select Size
			</h2>
			<div className="w-full max-w-sm mx-auto mb-[28px]">
				<CustomDropdown
					options={sizes?.map((size: any) => ({
						value: size,
						label: size,
					}))}
					selectedOption={selectedSize}
					onChange={setSelectedSize}
				/>
			</div>

			<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] mb-3">
				Price Range
			</h2>
			<div className="flex items-center">
				<input
					type="number"
					className="w-full py-[8.4px] px-2 border border-gray-300 rounded-lg mr-2 dark:bg-[#444444] dark:border-gray-600"
					value={minPrice}
					onChange={(e) => {
						const value = Math.max(0, Number(e.target.value));
						setMinPrice(value);
					}}
					placeholder="Min Price"
				/>
				<input
					type="number"
					className="w-full py-[8.4px] px-2 border border-gray-300 rounded-lg ml-2 dark:bg-[#444444] dark:border-gray-600"
					value={maxPrice}
					onChange={(e) => {
						const value = Math.max(0, Number(e.target.value));
						setMaxPrice(value);
					}}
					placeholder="Max Price"
				/>
			</div>

			<h2 className="font-libre-franklin font-semibold text-sm text-black dark:text-white leading-[18.56px] mt-[28px] mb-3">
				Sort By
			</h2>
			<div className="w-full max-w-sm mx-auto">
				<CustomDropdown
					options={sortOptions}
					selectedOption={sortOption}
					onChange={setSortOption}
				/>
			</div>
		</div>
	);
};

export default FilterSection;
