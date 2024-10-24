import React from "react";
import Slider from "./Slider";

const RelatedProducts = ({ relatedProducts }: any) => {
	// get and display the latest 20 related products
	const latestProducts = relatedProducts
		?.sort(
			(a: any, b: any) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
		.slice(0, 20);

	return (
		<section className="px-[5%] pb-[94px] pt-10">
			<div className="sm:px-6">
				<h2 className="font-open-sans font-semibold sm:text-2xl text-black dark:text-white pb-4 sm:pb-6">
					You might also love one or more of these
				</h2>
				<div className="sm:mx-6">
					<Slider prods={latestProducts} />
				</div>
			</div>
		</section>
	);
};

export default RelatedProducts;
