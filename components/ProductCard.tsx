"use client";

import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import slugify from "slugify";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";

import HeartFavorite from "./HeartFavourite";
import { useEffect, useState } from "react";
// import ButtonCart from "./ButtonCart";
import ProductItemDetail from "./ProductItemDetail";

interface Review {
	name: string;
	userImageUrl: string;
	date: string;
	rating: number;
	reviewTitle: string;
	reviewMessage: string;
}

const ProductCard = ({ product }: { product: ProductType }) => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);
	const productUrl = slugify(product.productName);
	const productId = product?._id;

	// Product status
	const disabled = product?.quantity === 0;

	// Load reviews from localStorage on component mount
	useEffect(() => {
		const savedReviews = localStorage.getItem(`reviews-${productId}`);
		if (savedReviews) {
			const parsedReviews = JSON.parse(savedReviews);
			setReviews(parsedReviews);
			calculateAverageRating(parsedReviews);
		}
	}, [productId]);

	// Calculate the average rating
	const calculateAverageRating = (reviews: Review[]) => {
		if (reviews.length === 0) return;

		const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
		const avgRating = totalRating / reviews.length;
		setAverageRating(parseFloat(avgRating.toFixed(1))); // Round to 1 decimal
	};

	const handleRecentlyViewed = () => {
		let recentlyViewed = JSON.parse(
			localStorage.getItem("recentlyViewed") || "[]"
		);

		const productIndex = recentlyViewed.findIndex(
			(p: ProductType) => p._id === product?._id
		);

		if (productIndex !== -1) {
			recentlyViewed.splice(productIndex, 1);
		}

		recentlyViewed.unshift(product);
		recentlyViewed = recentlyViewed.slice(0, 10);
		localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
	};

	return (
		<div className="bg-white dark:bg-[#4E4E4E] border-[1.47px] rounded-[5.87px] border-product-card-border px-[9.46px] py-[11.74px] max-sm:w-[247px] mx-auto overflow-hidden hover:scale-[.96] hover:shadow-md transition-all ease-in cursor-pointer relative">
			<div className="absolute top-5 right-5 p-1 rounded-full bg-white dark:bg-[#3E3E3E] flex items-center justify-center h-[36px] w-[36px]">
				<HeartFavorite product={product} />
			</div>
			<Link
				href={`/product/${productUrl}?id=${product?._id}`}
				key={product?._id}
				onClick={handleRecentlyViewed}
			>
				<div className="h-[263px]">
					<Image
						src={product?.media[0]}
						alt={product?.productName}
						width={300}
						height={300}
						className="w-[250px] h-[260px] object-cover rounded-lg cursor-pointer"
					/>
				</div>
				<div className="pt-[11.74px] px-1">
					<h3 className="text-[11.74px] leading-[13.91px] font-medium text-black dark:text-white font-rubik mb-[5.87px]">
						{product?.productName}
					</h3>
					<div>
						{product?.newPrice ? (
							<p className="text-[14.67px] font-bold font-open-sans text-figure-text dark:text-white pb-2 flex items-baseline gap-[5.47px]">
								₦{product.newPrice.toLocaleString()} &nbsp;
								<span className="line-through font-normal text-[11.74px] leading-[15.98px] text-old-price-text">
									₦{product.oldPrice.toLocaleString()}
								</span>
							</p>
						) : (
							<p className="text-[14.67px] font-bold font-open-sans text-figure-text dark:text-white pb-2">
								₦{product.oldPrice.toLocaleString()}
							</p>
						)}
					</div>

					{/* Rating and Reviews */}
					<div className="flex items-center gap-[8.8px]">
						{[...Array(5)].map((_, i) => {
							const fullStar = Math.floor(averageRating);
							const isHalfStar =
								averageRating - i >= 0.5 && averageRating - i < 1;

							return (
								<span key={i}>
									{i < fullStar ? (
										<FaStar className="h-[14.67px] w-[14.67px] text-star-rating-color" />
									) : isHalfStar ? (
										<FaStarHalfAlt className="h-[14.67px] w-[14.67px] text-star-rating-color" />
									) : (
										<FaRegStar className="h-[14.67px] w-[14.67px] text-star-rating-color" />
									)}
								</span>
							);
						})}

						<p className="text-xs font-medium text-black dark:text-gray-300 font-rubik pt-[1px]">
							{averageRating} ({reviews.length})
						</p>
					</div>

					{disabled ? (
						<p className="text-xs font-medium text-black dark:text-gray-300 font-rubik pt-2">
							Status: <span className="text-red-500">Out of Stock</span>
						</p>
					) : (
						<p className="text-xs font-medium text-black dark:text-gray-300 font-rubik pt-2">
							Status: <span className="text-green-500">In Stock</span>
						</p>
					)}
				</div>
			</Link>

			{/* Add to cart */}
			<Dialog>
				<DialogTrigger disabled={disabled} className="w-full">
					<div
						className={`flex flex-col justify-center items-center p-4 lg:px-[17.6px] gap-[7.33px] w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300 mt-5 mb-1 ${
							disabled ? "cursor-not-allowed" : "cursor-pointer"
						}`}
					>
						Add to cart
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogDescription>
							<ProductItemDetail product={product} />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProductCard;
