import React from "react";
import Link from "next/link";

import { getProducts } from "@/lib/actions/actions";
import ProductDisplay from "./ProductDisplay";

const ProductLists = async () => {
	const products = await getProducts();

	return (
		<section className="pt-[38px] px-[5%] xl:px-[74px] pb-[68px] bg-light-brown-gold dark:bg-[#2E2E2E] dark:border-b dark:border-b-dark-brown">
			<h2 className="home-heading text-black dark:text-white pb-2 sm:pb-4">
				PRODUCTS
			</h2>

			{/* Special Orders */}
			<p className="text-center font-open-sans font-normal text-sm sm:text-lg text-black dark:text-gray-300 pb-11">
				For your Bespoke/Custom made wears, please contact customer support via
				our&nbsp;
				<Link
					href="https://wa.link/gfswrn"
					className="font-bold text-brown-gold underline"
				>
					WhatsApp
				</Link>
				&nbsp;platform
			</p>

			{/* Products display */}
			{!products || products.length === 0 ? (
				<p className="font-open-sans font-normal text-sm sm:text-lg text-black dark:text-gray-300">
					No products found
				</p>
			) : (
				<ProductDisplay products={products} />
			)}
		</section>
	);
};

export default ProductLists;
