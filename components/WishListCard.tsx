"use client";

import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useState } from "react";
import useCart from "@/lib/hook/useCart";
import useWishlistStore from "@/lib/hook/useWishlist";
import SizeChart from "./SizeChart";

const WishListCard = ({ product }: { product: ProductType }) => {
	const [quantity, setQuantity] = useState<number>(1);
	const cart = useCart();
	const productUrl = slugify(product.productName);
	const [selectedColor, setSelectedColor] = useState<string>(
		product?.colors[0]
	);
	const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0]);
	const [showSizeChart, setShowSizeChart] = useState<boolean>(false); // State to handle size chart visibility

	// Product status
	const disabled = product?.quantity === 0;

	const removeFromWishlist = useWishlistStore(
		(state) => state.removeFromWishlist
	);

	const handleRemoveClick = () => {
		removeFromWishlist(product?._id);
	};

	const handleRecentlyViewed = () => {
		let recentlyViewed = JSON.parse(
			localStorage.getItem("recentlyViewed") || "[]"
		);
		const productExists = recentlyViewed.find(
			(p: ProductType) => p._id === product?._id
		);

		// Add the product to the beginning of the list
		if (!productExists) {
			recentlyViewed.unshift(product);
			localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
		}
	};

	return (
		<div className="bg-white dark:bg-[#3E3E3E] border-[1.47px] rounded-[5.87px] border-product-card-border p-6 shadow-md w-full max-sm:mx-auto max-w-[800px] overflow-hidden sm:flex sm:gap-6">
			<div>
				<Link
					href={`/product/${productUrl}?id=${product?._id}`}
					key={product?._id}
					onClick={handleRecentlyViewed}
				>
					<Image
						src={product?.media[0]}
						alt={product?.productName}
						width={300}
						height={320}
						className="w-full sm:w-[280px] sm:h-[320px] object-cover rounded-lg cursor-pointer"
					/>
				</Link>
			</div>

			<div className="flex-1 max-sm:pt-[11.74px]">
				<div>
					<h3 className="text-lg font-semibold text-black dark:text-white font-rubik">
						{product?.productName}
					</h3>
					{product?.newPrice ? (
						<p className="text-base font-bold font-open-sans text-figure-text dark:text-white flex items-baseline gap-[5.47px] my-2 sm:my-3">
							₦{product.newPrice.toLocaleString()} &nbsp;
							<span className="line-through font-normal text-sm text-old-price-text">
								₦{product.oldPrice.toLocaleString()}
							</span>
						</p>
					) : (
						<p className="text-base font-bold font-open-sans text-figure-text dark:text-white my-2 sm:my-3">
							₦{product.oldPrice.toLocaleString()}
						</p>
					)}

					{product?.colors.length > 0 && (
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-5">
							<p className="font-open-sans font-semibold text-base text-black dark:text-white">
								Available Colors:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.colors.map((color, index) => (
									<div
										key={index}
										className={`w-[32px] h-[32px] rounded-lg cursor-pointer hover:border-black ${
											selectedColor === color
												? "border-2 border-black"
												: "border"
										}`}
										style={{ backgroundColor: color }}
										onClick={() => setSelectedColor(color)}
									></div>
								))}
							</div>
						</div>
					)}

					{product?.sizes.length > 0 && (
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-3">
							<p className="font-open-sans font-semibold text-base text-black dark:text-white">
								Available Sizes:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.sizes.map((size, index) => (
									<p
										key={index}
										className={`w-[32px] h-[32px] bg-old-price-text border-2 hover:border-black rounded-lg cursor-pointer font-semibold text-base leading-[24px] tracking-[-0.6%] overflow-hidden ${
											selectedSize === size && "border-0"
										}`}
										onClick={() => setSelectedSize(size)}
									>
										<span
											className={`p-[8px] sm:p-[10px] w-full h-full flex items-center justify-center ${
												selectedSize === size
													? "bg-black text-white"
													: "text-black dark:bg-white"
											}`}
										>
											{size}
										</span>
									</p>
								))}
							</div>
						</div>
					)}

					{/* Button to toggle SizeChart visibility */}
					<button
						onClick={() => setShowSizeChart(!showSizeChart)}
						className="border-none outline-none font-open-sans text-black dark:text-white font-normal text-sm leading-[24px] hover:underline"
					>
						View Size Chart
					</button>

					{/* Render SizeChart if showSizeChart is true */}
					{showSizeChart && <SizeChart />}
				</div>

				{/* Quantity */}
				<div className="flex items-center gap-4 mt-3">
					<p className="font-open-sans font-semibold text-base text-black dark:text-white">
						Quantity:
					</p>

					<div className="flex gap-3 items-center">
						<CiSquareMinus
							size={28}
							className="hover:text-red-500 cursor-pointer"
							onClick={() => quantity > 1 && setQuantity(quantity - 1)}
						/>

						<p className="font-rubik font-normal text-xl text-black dark:text-white">
							{quantity}
						</p>

						<CiSquarePlus
							size={28}
							className="hover:text-green-500 cursor-pointer"
							onClick={() => setQuantity(quantity + 1)}
						/>
					</div>
				</div>

				{disabled ? (
					<p className="font-open-sans font-semibold text-base text-black dark:text-white pt-3">
						Status: <span className="text-red-500">Out of Stock</span>
					</p>
				) : (
					<p className="font-open-sans font-semibold text-base text-black dark:text-white pt-3">
						Status: <span className="text-green-500">In Stock</span>
					</p>
				)}

				<div className="mt-5 flex items-center gap-10">
					<button
						type="button"
						disabled={disabled}
						className={`font-rubik font-medium text-sm leading-[16.59px] text-figure-text dark:text-white flex gap-1 items-center justify-center ${
							disabled ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						onClick={() => {
							cart.addItem({
								item: product,
								quantity,
								color: selectedColor,
								size: selectedSize,
							});
						}}
					>
						<span>
							<Image
								src="/assets/mdi_cart-outline.svg"
								width={24}
								height={24}
								alt=""
								className="object-cover dark:invert"
							/>
						</span>
						Add To Cart
					</button>

					<button
						type="button"
						className="font-rubik font-medium text-sm leading-[16.59px] text-[#FE5D5D] flex items-center gap-1"
						onClick={handleRemoveClick}
					>
						<span>
							<Image
								src="/assets/Delete.svg"
								width={18.86}
								height={20.57}
								alt=""
								className="object-cover"
							/>
						</span>
						Remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default WishListCard;
