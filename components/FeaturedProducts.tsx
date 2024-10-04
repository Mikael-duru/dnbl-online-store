"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import ButtonPrimary from "./ButtonPrimary";
import { getFilteredCategoryProducts } from "@/constants/productsStore";

const FeaturedProducts = () => {
	const router = useRouter();

	// Filter products by the 'featured' category
	const featuredProducts = getFilteredCategoryProducts("featured").slice(0, 4); // Get up to 4 products

	return (
		<div>
			{/* continue here */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[55px]">
				{/* First column */}
				{featuredProducts.length > 0 && (
					<div className="relative">
						<Image
							src={featuredProducts[0].media[0]}
							alt={`${featuredProducts[0].productName}`}
							width={300}
							height={400}
							className="w-full h-full object-cover mb-4"
						/>
						<div className="bg-lighter-black absolute bottom-0 right-0 left-0 pt-2 pl-[11px] pb-8 sm:pb-12">
							<h3 className="font-semiBold font-open-sans text-3xl sm:text-[32px] sm:leading-[43.58px] tracking-[-0.02rem] text-white">
								{featuredProducts[0].productName}
							</h3>
							<p className="font-open-sans text-3xl sm:text-[32px] sm:leading-[43.58px] font-extrabold text-white pt-[2px] pb-[33px]">
								₦{featuredProducts[0].newPrice.toLocaleString()}
							</p>
							<div className="w-[263px]">
								<ButtonPrimary
									type="button"
									label="View Details"
									onClick={() =>
										router.push(
											`/product/${slugify(
												featuredProducts[0].productName
											)}?id=${featuredProducts[0]._id}`
										)
									}
								/>
							</div>
						</div>
					</div>
				)}

				{/* Second column */}
				<div className="space-y-8 h-[868px]">
					{featuredProducts.length > 1 && (
						<div className="h-[420px]">
							<Image
								src={featuredProducts[1].media[0]}
								alt={`${featuredProducts[1].productName}`}
								width={383}
								height={420}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
					{featuredProducts.length > 2 && (
						<div className="h-[420px]">
							<Image
								src={featuredProducts[2].media[0]}
								alt={`${featuredProducts[2].productName}`}
								width={383}
								height={420}
								className="w-full h-full object-cover"
							/>
						</div>
					)}
				</div>

				{/* Third column */}
				{featuredProducts.length > 3 && (
					<div className="relative">
						<Image
							src={featuredProducts[3].media[0]}
							alt={`${featuredProducts[3].productName}`}
							width={300}
							height={400}
							className="w-full h-full object-cover mb-4"
						/>
						<div className="bg-lighter-black absolute bottom-0 right-0 left-0 pt-2 pl-[11px] pb-8 sm:pb-12">
							<h3 className="font-semiBold font-open-sans text-3xl sm:text-[32px] leading-[43.58px] tracking-[-0.02rem] text-white">
								{featuredProducts[3].productName}
							</h3>
							<p className="font-open-sans text-3xl sm:text-[32px] sm:leading-[43.58px] font-extrabold text-white pt-[2px] pb-[33px]">
								₦{featuredProducts[3].newPrice.toLocaleString()}
							</p>
							<div className="w-[263px]">
								<ButtonPrimary
									type="button"
									label="View Details"
									onClick={() =>
										router.push(
											`/product/${slugify(
												featuredProducts[3].productName
											)}?id=${featuredProducts[3]._id}`
										)
									}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FeaturedProducts;
