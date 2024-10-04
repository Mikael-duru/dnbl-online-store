"use client";

import { useEffect, useState } from "react";
import Slider from "./Slider";

const RecentlyViewed = () => {
	const [recentlyViewed, setRecentlyViewed] = useState<ProductType[]>([]);

	useEffect(() => {
		const storedProducts = JSON.parse(
			localStorage.getItem("recentlyViewed") || "[]"
		);
		setRecentlyViewed(storedProducts);
	}, []);

	if (recentlyViewed.length === 0) return null;

	return (
		<div className="py-14">
			<h2 className="font-open-sans text-lg sm:text-2xl leading-[28px] tracking-[0.63px] font-medium text-black dark:text-white mb-4 sm:mb-6">
				Recently viewed products
			</h2>
			{/* display the recently viewed products */}
			<Slider prods={recentlyViewed} />
		</div>
	);
};

export default RecentlyViewed;
