"use client";

import Image from "next/image";
import Link from "next/link";
import slugify from "slugify";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useEffect, useState } from "react";
import useCart from "@/lib/hook/useCart";
import SizeChart from "./SizeChart";
import { FaStar } from "react-icons/fa";
import HeartFavorite from "./HeartFavourite";
import { useCalculateRemainingInventory } from "./Inventory";

interface ProductCardProps {
	product: ProductType;
	updateSignedInUser?: (updatedUser: UserType) => void;
}

const WishListCard = ({ product, updateSignedInUser }: ProductCardProps) => {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [quantity, setQuantity] = useState<number>(1);
	const cart = useCart();
	const productUrl = slugify(product.title);
	const [selectedColor, setSelectedColor] = useState<string>(
		product?.colors[0]
	);
	const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0]);
	const [showSizeChart, setShowSizeChart] = useState<boolean>(false); // State to handle size chart visibility

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await fetch(`/api/reviews/${product._id}`);
			const data: ReviewType[] = await response.json();
			setReviews(data);
		};

		fetchReviews();
	}, [product._id]);

	// Product status
	const remainingInventory = useCalculateRemainingInventory(product);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	const handleRecentlyViewed = () => {
		const recentlyViewed = JSON.parse(
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
		<div className="bg-white dark:bg-[#3E3E3E] border-[1.47px] rounded-[5.87px] border-product-card-border p-6 shadow-md w-full max-sm:mx-auto max-w-[900px] overflow-hidden sm:flex sm:gap-6">
			<div className="w-full sm:w-[280px] sm:h-[360px]">
				<Link
					href={`/product/${productUrl}?id=${product?._id}`}
					key={product?._id}
					onClick={handleRecentlyViewed}
				>
					<Image
						src={product?.media[0]}
						alt={product?.title}
						width={500}
						height={500}
						className="w-full sm:w-[280px] sm:h-[365px] object-contain rounded-lg cursor-pointer bg-white"
					/>
				</Link>
			</div>

			<div className="flex-1 max-sm:pt-[11.74px]">
				<div>
					<h3 className="text-lg font-semibold text-black dark:text-white font-rubik">
						{product?.title}
					</h3>

					<p className="font-open-sans text-sm text-figure-text font-medium dark:text-gray-300 my-[5.87px] capitalize">
						<span className="text-[#777]">Category:</span> {product?.category}
					</p>

					{product?.oldPrice ? (
						<p className="text-base font-bold font-open-sans text-figure-text dark:text-white flex items-baseline gap-[5.47px] my-3">
							₦{product.price.toLocaleString()}
							<span className="line-through font-bold text-sm text-old-price-text">
								₦{product.oldPrice.toLocaleString()}
							</span>
						</p>
					) : (
						<p className="text-base font-bold font-open-sans text-figure-text dark:text-white my-2 sm:my-3">
							₦{product.price.toLocaleString()}
						</p>
					)}

					<div>
						{reviews?.length > 0 && (
							<div className="flex items-center gap-[10px] mb-4">
								<FaStar className="h-5 w-5 text-star-rating-color" />
								<span className="lg:text-lg font-normal text-black dark:text-white font-open-sans">
									{reviews.length} {reviews.length > 1 ? "reviews" : "review"}
								</span>
							</div>
						)}
					</div>

					{product?.colors.length > 0 && (
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-5">
							<p className="font-open-sans font-semibold text-base text-black dark:text-white">
								Available Colors:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.colors.map((color, index) => (
									<div
										key={index}
										className={`w-8 lg:w-10 h-8 lg:h-10 rounded-lg cursor-pointer hover:border-black ${
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
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-2">
							<p className="font-open-sans font-semibold text-base text-black dark:text-white">
								Available Sizes:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.sizes.map((size, index) => (
									<p
										key={index}
										className={`w-8 lg:w-10 h-8 lg:h-10 bg-old-price-text border-2 hover:border-black rounded-lg cursor-pointer font-semibold text-xs lg:text-sm tracking-[-0.6%] overflow-hidden uppercase ${
											selectedSize === size && "border-0"
										}`}
										onClick={() => setSelectedSize(size)}
									>
										<span
											className={`p-[8px] sm:p-[10px] w-full h-full flex items-center justify-center  ${
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
				{!isOutOfStock && (
					<div className="flex items-center gap-4 mt-4">
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

							<button
								disabled={remainingInventory === quantity}
								onClick={() => setQuantity(quantity + 1)}
							>
								<CiSquarePlus
									size={28}
									className={`hover:text-green-500 cursor-pointer ${
										remainingInventory === quantity &&
										"cursor-not-allowed hover:text-red-500"
									}`}
								/>
							</button>
						</div>
					</div>
				)}

				{isOutOfStock ? (
					<p className="font-open-sans font-semibold text-base text-black dark:text-white pt-4">
						Status: <span className="text-red-500">Out of Stock</span>
					</p>
				) : (
					<p className="font-open-sans font-semibold text-base text-black dark:text-white pt-4">
						Status: <span className="text-green-500">In Stock</span>
						{remainingInventory <= 10 && (
							<span className="text-red-500 font-rubik pl-1 text-sm tracking-[0.06em]">
								({remainingInventory} left!)
							</span>
						)}
					</p>
				)}

				<div className="mt-5 flex items-center gap-20">
					<button
						type="button"
						disabled={isOutOfStock}
						className={`font-rubik font-medium text-sm  text-figure-text dark:text-white flex gap-1 items-center justify-center ${
							isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"
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

					<HeartFavorite
						product={product}
						updateSignedInUser={updateSignedInUser}
					/>
				</div>
			</div>
		</div>
	);
};

export default WishListCard;
