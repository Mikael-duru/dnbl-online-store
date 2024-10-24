import React from "react";

import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import Loader from "@/components/Loader";
import ReviewSection from "@/components/ReviewSection";
import BackButton from "@/components/BackButton";
import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { Separator } from "@/components/ui/separator";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import RelatedProducts from "@/components/RelatedProducts";

const ProductDetails = async ({
	params,
}: {
	params: { productId: string };
}) => {
	const product = await getProductDetails(params.productId);
	const relatedProducts = await getRelatedProducts(params.productId);

	if (!product) {
		return (
			<div className="flex justify-center items-center">
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<section className="px-[5%] 2xl:pl-[100px] pt-[22px] pb-[45px] bg-product-details-bg dark:bg-[#1E1E1E]">
				<BackButton />

				<div className="flex justify-center xl:justify-start gap-10 lg:gap-12 xl:gap-16 max-lg:flex-col">
					<Gallery productMedia={product?.media} />
					<ProductInfo productInfo={product} />
				</div>
			</section>

			<section className="flex flex-col gap-2 pb-[53.52px] bg-white dark:bg-[#2E2E2E]">
				<h2 className="px-[5%] 2xl:pl-[110px] font-open-sans font-semibold text-2xl leading-[32.68px] pt-[31px] pb-[14.56px] text-black dark:text-white uppercase">
					Description
				</h2>
				<Separator className="bg-black dark:bg-gray-600" />
				<p className="px-[5%] 2xl:pl-[110px] pt-[27.3px] font-open-sans font-normal text-base sm:text-2xl sm:leading-[40px] text-black dark:text-white">
					{product?.description}
				</p>
			</section>

			{/* Review Form */}
			<ReviewSection productId={params.productId} />

			{relatedProducts.length > 0 ? (
				<RelatedProducts relatedProducts={relatedProducts} />
			) : null}

			{/* Recently Viewed */}
			<div className="px-[5%] dark:bg-[#2E2E2E]">
				<RecentlyViewed />
			</div>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default ProductDetails;
