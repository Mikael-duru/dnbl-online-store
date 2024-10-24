"use client";

import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { getRecentlyViewedProducts } from "./recentlyViewedUtils";

const RecentlyViewed = () => {
	const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);

	useEffect(() => {
		const storedProducts = getRecentlyViewedProducts();
		setRecentlyViewed(storedProducts);
	}, []);

	if (recentlyViewed.length === 0) return null;

	return (
		<div className="py-14">
			<h2 className="font-open-sans text-lg sm:text-2xl leading-[28px] tracking-[0.63px] font-medium text-black dark:text-white mb-4 sm:mb-6">
				Recently viewed products
			</h2>

			{/* display the recently viewed products */}
			<div className="relative overflow-hidden">
				<div className="flex overflow-x-auto snap-x snap-mandatory mx-7">
					{recentlyViewed.map((prod: ProductType) => (
						<div key={prod._id} className="flex-shrink-0 mr-4 snap-end">
							<ProductCard product={prod} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RecentlyViewed;
