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
		<div className="px-4 lg:px-0">
			{/* Grid for larger screens */}
			<div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 2xl:gap-14">
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
						<div className="bg-lighter-black absolute bottom-0 right-0 left-0 pt-2 pl-[11px] pb-6">
							<h3 className="font-semiBold font-open-sans text-2xl tracking-[-0.02rem] text-white">
								{featuredProducts[0].productName}
							</h3>
							<p className="font-open-sans text-3xl font-extrabold text-white pt-2 pb-8">
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
				<div className="space-y-8 xl:h-[670px]">
					{featuredProducts.length > 1 && (
						<div className="h-[265px] xl:h-[320px]">
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
						<div className="h-[265px] xl:h-[320px]">
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
						<div className="bg-lighter-black absolute bottom-0 right-0 left-0 pt-2 pl-[11px] pb-6">
							<h3 className="font-semiBold font-open-sans text-2xl tracking-[-0.02rem] text-white">
								{featuredProducts[3].productName}
							</h3>
							<p className="font-open-sans text-3xl font-extrabold text-white pt-2 pb-8">
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

			{/* Regular display for small screens */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
				{featuredProducts.map((product, index) => (
					<div className="relative w-[210px] h-[320px] mx-auto">
						<div key={index} className="relative">
							<Image
								src={product.media[0]}
								alt={product.productName}
								width={500}
								height={500}
								className="w-[210px] h-[320px] object-fit mb-4"
							/>
						</div>
						<div className="bg-lighter-black absolute bottom-0 right-0 left-0 pt-2 pl-2 pb-4">
							<h3 className="font-semiBold font-open-sans text-base tracking-[-0.02rem] text-white">
								{product.productName}
							</h3>
							<p className="font-open-sans text-lg sm:text-[20px] font-extrabold text-white pt-[2px] pb-4">
								₦{product.newPrice.toLocaleString()}
							</p>
							<div className="w-[140px]">
								<ButtonPrimary
									type="button"
									label="View Details"
									onClick={() =>
										router.push(
											`/product/${slugify(product.productName)}?id=${
												product._id
											}`
										)
									}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FeaturedProducts;
