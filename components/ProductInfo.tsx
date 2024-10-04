"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

import useCart from "@/lib/hook/useCart";
import ButtonCart from "./ButtonCart";
import SizeChart from "./SizeChart";

interface Review {
	name: string;
	userImageUrl: string;
	date: string;
	rating: number;
	reviewTitle: string;
	reviewMessage: string;
}

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [showSizeChart, setShowSizeChart] = useState<boolean>(false); // State to handle size chart visibility
	const [quantity, setQuantity] = useState<number>(1);
	const cart = useCart();
	const productId = productInfo?._id; // Directly use product._id

	// Product status
	const disabled = productInfo?.quantity === 0;

	// Load reviews from localStorage on component mount
	useEffect(() => {
		const savedReviews = localStorage.getItem(`reviews-${productId}`);
		if (savedReviews) {
			const parsedReviews = JSON.parse(savedReviews);
			setReviews(parsedReviews);
		}
	}, [productId]);
	const [selectedColor, setSelectedColor] = useState<string>(
		productInfo?.colors[0]
	);
	const [selectedSize, setSelectedSize] = useState<string>(
		productInfo?.sizes[0]
	);

	return (
		<div className="w-full max-w-full sm:max-w-[502px]">
			<h3 className="text-2xl font-semibold text-black dark:text-white font-open-sans">
				{productInfo?.productName}
			</h3>
			{productInfo?.newPrice ? (
				<p className="text-lg sm:text-2xl font-semibold font-open-sans text-figure-text dark:text-white flex items-baseline gap-[5.47px] my-4">
					₦{productInfo.newPrice.toLocaleString()}
					<span className="line-through font-normal text-base sm:text-xl text-old-price-text">
						₦{productInfo.oldPrice.toLocaleString()}
					</span>
				</p>
			) : (
				<p className="text-lg sm:text-2xl font-semibold font-open-sans text-figure-text dark:text-white my-5">
					₦{productInfo.oldPrice.toLocaleString()}
				</p>
			)}

			<div>
				{reviews?.length > 0 && (
					<div className="flex items-center gap-[10px] mb-4">
						<FaStar className="h-[24px] sm:h-[32px] w-[24px] sm:w-[32px] text-star-rating-color" />
						<span className="text-lg font-normal text-black dark:text-white font-open-sans">
							{reviews.length} {reviews.length > 1 ? "reviews" : "review"}
						</span>
					</div>
				)}
			</div>

			{productInfo?.colors.length > 0 && (
				<div className="flex flex-col gap-4 mb-6">
					<p className="font-open-sans font-normal text-lg text-black dark:text-white">
						Available Colors:
					</p>
					<div className="flex gap-3 flex-wrap">
						{productInfo.colors.map((color, index) => (
							<div
								key={index}
								className={`w-[40px] sm:w-[45px] h-[40px] sm:h-[45px] p-2 rounded-lg cursor-pointer hover:border-black ${
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
				<div className="flex flex-col gap-4 mb-4">
					<p className="font-open-sans font-normal text-lg  text-black dark:text-white">
						Available Sizes:
					</p>
					<div className="flex gap-3 flex-wrap">
						{productInfo.sizes.map((size, index) => (
							<p
								key={index}
								className={`w-[40px] sm:w-[45px] h-[40px] sm:h-[45px] bg-old-price-text border-2 hover:border-black rounded-lg cursor-pointer font-semibold text-sm sm:text-xl tracking-[-0.6%] overflow-hidden ${
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
				className="border-none outline-none font-open-sans text-black font-normal text-base hover:underline dark:text-white"
			>
				View Size Chart
			</button>

			{/* Render SizeChart if showSizeChart is true */}
			{showSizeChart && <SizeChart />}

			{/* Quantity */}
			<div className="flex items-center gap-4 mt-4">
				<p className="font-open-sans font-normal text-lg text-black dark:text-white">
					Quantity:
				</p>

				<div className="flex gap-4 items-center">
					<CiSquareMinus
						size={30}
						className="hover:text-red-500 cursor-pointer"
						onClick={() => quantity > 1 && setQuantity(quantity - 1)}
					/>

					<p className="font-rubik font-normal text-lg sm:text-xl text-black dark:text-white">
						{quantity}
					</p>

					<CiSquarePlus
						size={30}
						className="hover:text-green-500 cursor-pointer"
						onClick={() => setQuantity(quantity + 1)}
					/>
				</div>
			</div>

			{disabled ? (
				<p className="font-open-sans font-normal text-base text-black dark:text-white mt-4">
					Status: <span className="text-red-500">Out of Stock</span>
				</p>
			) : (
				<p className="font-open-sans font-normal text-base text-black dark:text-white mt-5">
					Status: <span className="text-green-500">In Stock</span>
				</p>
			)}

			<div className="w-full mt-5">
				<ButtonCart
					type="button"
					disabled={disabled}
					label="Add To Cart"
					onClick={() => {
						cart.addItem({
							item: productInfo,
							quantity,
							color: selectedColor,
							size: selectedSize,
						});
					}}
					className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
				/>
			</div>
		</div>
	);
};

export default ProductInfo;
