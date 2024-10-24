"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import useCart from "@/lib/hook/useCart";
import ButtonCart from "./custom-buttons/ButtonCart";
import SizeChart from "./SizeChart";
import HeartFavorite from "./HeartFavourite";
import { useCalculateRemainingInventory } from "./Inventory";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [showSizeChart, setShowSizeChart] = useState<boolean>(false); // State to handle size chart visibility
	const [quantity, setQuantity] = useState<number>(1);
	const cart = useCart();
	const [selectedColor, setSelectedColor] = useState<string>(
		productInfo?.colors[0]
	);
	const [selectedSize, setSelectedSize] = useState<string>(
		productInfo?.sizes[0]
	);

	useEffect(() => {
		const fetchReviews = async () => {
			const response = await fetch(`/api/reviews/${productInfo._id}`);
			const data: ReviewType[] = await response.json();
			setReviews(data);
		};

		fetchReviews();
	}, [productInfo._id]);

	const product = productInfo;

	// Product status
	const remainingInventory = useCalculateRemainingInventory(product);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	return (
		<div className="w-full max-w-full sm:max-w-[502px]">
			<div className="flex justify-between items-center">
				<h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white font-open-sans">
					{productInfo?.title}
				</h3>
				<HeartFavorite product={productInfo} />
			</div>

			<p className="font-open-sans text-sm text-figure-text font-medium dark:text-gray-300 my-[5.87px] capitalize">
				<span className="text-[#777]">Category:</span> {productInfo?.category}
			</p>

			{productInfo?.oldPrice ? (
				<p className="text-xl sm:text-2xl font-semibold font-open-sans text-figure-text dark:text-white flex items-baseline gap-[5.47px] my-4">
					₦{productInfo.price.toLocaleString()}
					<span className="line-through font-bold text-base sm:text-xl text-old-price-text">
						₦{productInfo.oldPrice.toLocaleString()}
					</span>
				</p>
			) : (
				<p className="text-lg sm:text-2xl font-semibold font-open-sans text-figure-text dark:text-white my-5">
					₦{productInfo.price.toLocaleString()}
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

			{productInfo?.colors.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4 mb-4 sm:mb-6">
					<p className="font-open-sans font-normal lg:text-lg text-black dark:text-white">
						Available Colors:
					</p>
					<div className="flex gap-3 flex-wrap">
						{productInfo.colors.map((color, index) => (
							<div
								key={index}
								className={`w-10 sm:w-[45px] h-10 sm:h-[45px] p-2 rounded-lg cursor-pointer hover:border-black ${
									selectedColor === color ? "border-2 border-black" : "border"
								}`}
								style={{ backgroundColor: color }}
								onClick={() => setSelectedColor(color)}
							></div>
						))}
					</div>
				</div>
			)}

			{productInfo?.sizes?.length > 0 && (
				<div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-4 mb-4">
					<p className="font-open-sans font-normal lg:text-lg  text-black dark:text-white">
						Available Sizes:
					</p>
					<div className="flex gap-3 flex-wrap">
						{productInfo.sizes.map((size, index) => (
							<p
								key={index}
								className={`w-10 lg:w-[45px] h-10 lg:h-[45px] bg-old-price-text border-2 hover:border-black rounded-lg cursor-pointer font-semibold text-sm lg:text-xl tracking-[-0.6%] overflow-hidden uppercase ${
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
				className="border-none outline-none font-open-sans text-black font-normal text-sm lg:text-base hover:underline dark:text-white"
			>
				View Size Chart
			</button>

			{/* Render SizeChart if showSizeChart is true */}
			{showSizeChart && <SizeChart />}

			{/* Quantity */}
			{!isOutOfStock && (
				<div className="flex items-center gap-4 mt-4">
					<p className="font-open-sans font-normal lg:text-lg text-black dark:text-white">
						Quantity:
					</p>

					<div className="flex gap-4 items-center">
						<CiSquareMinus
							size={30}
							className="hover:text-red-500 cursor-pointer"
							onClick={() => quantity > 1 && setQuantity(quantity - 1)}
						/>

						<p className="font-rubik font-normal text-base sm:text-xl text-black dark:text-white">
							{quantity}
						</p>

						<button
							disabled={remainingInventory === quantity}
							onClick={() => setQuantity(quantity + 1)}
						>
							<CiSquarePlus
								size={30}
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
				<p className="font-open-sans font-normal text-base text-black dark:text-white mt-4">
					Status: <span className="text-red-500">Out of Stock</span>
				</p>
			) : (
				<p className="font-open-sans font-normal text-base text-black dark:text-white mt-5">
					Status: <span className="text-green-500">In Stock</span>
					{remainingInventory <= 10 && (
						<span className="text-red-500 font-rubik pl-1 text-sm tracking-[0.06em]">
							({remainingInventory} left!)
						</span>
					)}
				</p>
			)}

			<div className="w-full mt-5">
				<ButtonCart
					type="button"
					disabled={isOutOfStock}
					label="Add To Cart"
					onClick={() => {
						cart.addItem({
							item: productInfo,
							quantity,
							color: selectedColor,
							size: selectedSize,
						});
					}}
					className={`${
						isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"
					}`}
				/>
			</div>
		</div>
	);
};

export default ProductInfo;
