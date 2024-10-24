"use client";

import React, { useEffect, useState } from "react";

import ProductCard from "../ProductCard";
import ButtonSecondary from "../custom-buttons/ButtonSecondary";

interface ProductDisplayProps {
	products: ProductType[];
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ products }) => {
	const [displayCount, setDisplayCount] = useState(15); // Default to 15 for small screens

	useEffect(() => {
		const updateDisplayCount = () => {
			setDisplayCount(window.innerWidth >= 640 ? 30 : 16);
		};

		updateDisplayCount(); // Initialize on mount
		window.addEventListener("resize", updateDisplayCount);

		return () => window.removeEventListener("resize", updateDisplayCount);
	}, []);

	const showViewAllButton = products.length > displayCount;

	return (
		<>
			<div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-8 pb-11">
				{products.slice(0, displayCount).map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>

			{showViewAllButton && (
				<div className="mt-10 w-[150px] mx-auto">
					<ButtonSecondary label="View All" href="/product" />
				</div>
			)}
		</>
	);
};

export default ProductDisplay;
