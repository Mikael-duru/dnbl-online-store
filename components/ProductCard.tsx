"use client";

import Image from "next/image";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import HeartFavorite from "./HeartFavourite";
import ProductItemDetail from "./ProductItemDetail";
import { addToRecentlyViewed } from "./recentlyViewedUtils";
import { useCalculateRemainingInventory } from "./Inventory";

interface ProductCardProps {
	product: ProductType;
	updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);
	const productId = product?._id;

	// Load reviews from localStorage on component mount
	useEffect(() => {
		const fetchReviews = async () => {
			const response = await fetch(`/api/reviews/${productId}`);
			const data: ReviewType[] = await response.json();
			setReviews(data);
			calculateAverageRating(data);
		};

		fetchReviews();
	}, [productId]);

	// Calculate the average rating
	const calculateAverageRating = (reviews: ReviewType[]) => {
		if (reviews.length === 0) return;

		const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
		const avgRating = totalRating / reviews.length;
		setAverageRating(parseFloat(avgRating.toFixed(1))); // Round to 1 decimal
	};

	const handleRecentlyViewed = () => {
		addToRecentlyViewed(product);
	};

	const remainingInventory = useCalculateRemainingInventory(product);

	console.log("Remaining Inventory:", productId + ":" + remainingInventory);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	return (
		<div className="bg-white dark:bg-[#4E4E4E] border-[1.47px] rounded-[5.87px] border-product-card-border pb-[11.74px] w-[195px] md:w-[220px] xl:w-[250px] overflow-hidden hover:scale-[.96] hover:shadow-md transition-all ease-in cursor-pointer relative">
			<div className="absolute top-3 right-2 rounded-full bg-white dark:bg-[#3E3E3E] h-[30px] w-[30px]">
				<div className="w-full h-full flex items-center justify-center">
					<HeartFavorite
						product={product}
						updateSignedInUser={updateSignedInUser}
					/>
				</div>
			</div>
			<Link
				href={`/product/${product?._id}`}
				key={product?._id}
				onClick={handleRecentlyViewed}
			>
				<div className="bg-[#fdfdfd]">
					<Image
						src={product?.media[0]}
						alt="product"
						width={500}
						height={500}
						className="max-sm:h-[180px] w-full h-[200px] object-contain cursor-pointer"
					/>
				</div>
				<div className="pt-[11.74px] px-[9.46px]">
					<h3 className="text-[11.74px] leading-[13.91px] lg:text-sm font-medium text-black dark:text-white font-rubik">
						{product?.title}
					</h3>
					<p className="font-open-sans text-xs text-[#777] font-medium dark:text-gray-300 my-[5.87px] capitalize">
						{product?.category}
					</p>
					<div>
						{product?.oldPrice ? (
							<p className="text-sm lg:text-base font-bold font-open-sans text-figure-text dark:text-white pb-2 flex items-baseline gap-[5.47px]">
								₦{product.price.toLocaleString()}
								<span className="line-through font-bold text-xs lg:text-sm text-old-price-text">
									₦{product.oldPrice.toLocaleString()}
								</span>
							</p>
						) : (
							<p className="text-sm font-bold font-open-sans text-figure-text dark:text-white pb-2">
								₦{product.price.toLocaleString()}
							</p>
						)}
					</div>

					{/* Rating and Reviews */}
					<div className="flex items-center gap-1">
						{[...Array(5)].map((_, i) => {
							const fullStar = Math.floor(averageRating);
							const isHalfStar =
								averageRating - i >= 0.5 && averageRating - i < 1;

							return (
								<span key={i}>
									{i < fullStar ? (
										<FaStar className="w-3 h-3 text-star-rating-color" />
									) : isHalfStar ? (
										<FaStarHalfAlt className="w-3 h-3 text-star-rating-color" />
									) : (
										<FaRegStar className="w-3 h-3 text-star-rating-color" />
									)}
								</span>
							);
						})}

						<p className="text-[11.74px] font-medium text-black dark:text-gray-300 font-rubik pt-[1px]">
							{averageRating} ({reviews.length})
						</p>
					</div>

					{isOutOfStock ? (
						<p className="text-xs font-medium text-black dark:text-gray-300 font-rubik pt-2">
							<span className="text-red-500">Out of Stock</span>
						</p>
					) : (
						<p className="text-xs font-medium text-black dark:text-gray-300 font-rubik pt-2">
							<span className="text-green-500">In Stock</span>
							{remainingInventory <= 10 && (
								<span className="text-red-500 font-rubik pl-1 text-xs tracking-[0.06em]">
									({remainingInventory} left!)
								</span>
							)}
						</p>
					)}
				</div>
			</Link>

			{/* Add to cart */}
			<Dialog>
				<DialogTrigger disabled={isOutOfStock} className="w-full px-[9.46px]">
					<div
						className={`flex flex-col justify-center items-center py-2 px-4 lg:px-[17.6px] gap-[7.33px] w-full shadow-btn-shadow rounded-lg text-sm sm:text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300 mt-5 mb-1 ${
							isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"
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
