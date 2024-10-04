"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import { getProductById } from "@/constants/productsStore";
import Loader from "@/components/Loader";

interface Review {
	name: string;
	userImageUrl: string;
	date: string;
	rating: number;
	reviewTitle: string;
	reviewMessage: string;
}

const ReviewsPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const productId = searchParams.get("id"); // Access the product._id

	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);
	const [ratingDistribution, setRatingDistribution] = useState<number[]>([
		0, 0, 0, 0, 0,
	]); // For 5 stars to 1 star
	const product = getProductById(productId);

	// Load reviews from localStorage on component mount
	useEffect(() => {
		const savedReviews = localStorage.getItem(`reviews-${productId}`);
		if (savedReviews) {
			const parsedReviews = JSON.parse(savedReviews);
			setReviews(parsedReviews);
			calculateAverageRating(parsedReviews);
			calculateRatingDistribution(parsedReviews);
		}
	}, [productId]);

	// Calculate the average rating
	const calculateAverageRating = (reviews: Review[]) => {
		if (reviews?.length === 0) return;

		const totalRating = reviews?.reduce(
			(acc, review) => acc + review.rating,
			0
		);
		const avgRating = totalRating / reviews?.length;
		setAverageRating(parseFloat(avgRating.toFixed(1))); // Round to 1 decimal
	};

	// Calculate rating distribution (percentages for each rating)
	const calculateRatingDistribution = (reviews: Review[]) => {
		const distribution = [0, 0, 0, 0, 0]; // Index 0 for 5 stars, 4 stars, etc.

		reviews?.forEach((review) => {
			const ratingIndex = 5 - review?.rating; // Convert 5-star to index 0, 4-star to index 1, etc.
			distribution[ratingIndex]++;
		});

		// Calculate percentage
		const distributionPercentage = distribution.map(
			(count) => (count / reviews?.length) * 100
		);
		setRatingDistribution(distributionPercentage);
	};

	// If the product isn't found, show loading
	if (!product) {
		return <Loader />;
	}

	const handleBack = () => {
		if (router && router.back) {
			router.back();
		}
	};

	return (
		<main className="bg-white dark:bg-[#2E2E2E]">
			<section className="px-[5%] 2xl:px-[110px] pt-[22px] pb-[45px]">
				{/* Back button */}
				<CircleArrowLeft
					size={40}
					className="mt-2 mb-8 cursor-pointer hover:text-[#B47B2B] dark:hover:text-[#FFCE31]"
					onClick={handleBack}
				/>

				<div className="mb-[27.19px] flex max-lg:flex-col gap-5 sm:gap-4">
					<div>
						<Image
							src={product?.media[0]}
							width={440}
							height={281.48}
							alt={product?.productName}
							className="object-cover w-[440px] h-[350px]"
						/>
						<div className="p-[10px]">
							<h1 className="pb-2 font-open-sans font-semibold text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text dark:text-white">
								{product?.productName}
							</h1>

							{/* Display average rating */}
							<p className="pb-1 font-open-sans font-normal text-base leading-[21.79px] tracking-[-0.02em] text-figure-text dark:text-gray-300">
								Average rating
							</p>
							<div className="flex items-center gap-2">
								{[...Array(5)]?.map((_, i) => {
									const fullStar = Math.floor(averageRating); // Full stars count
									const isHalfStar =
										averageRating - i >= 0.5 && averageRating - i < 1; // Check for half star

									return (
										<span key={i}>
											{i < fullStar ? (
												<FaStar className="w-6 h-6 text-[#FFCE31]" />
											) : isHalfStar ? (
												<FaStarHalfAlt className="w-6 h-6 text-[#FFCE31]" />
											) : (
												<FaRegStar className="w-6 h-6 text-figure-text" />
											)}
										</span>
									);
								})}

								<p className="font-open-sans font-normal text-lg leading-[21.79px] tracking-[-0.02em] text-figure-text dark:text-gray-300 flex items-center">
									{averageRating} ({reviews?.length})
								</p>
							</div>
						</div>
					</div>

					{/* Rating distribution breakdown */}
					<div className="flex-1">
						<div className="mb-6">
							{[5, 4, 3, 2, 1].map((stars, index) => (
								<div
									key={stars}
									className="flex items-center gap-[5.96px] mb-4"
								>
									<p className="flex justify-center max-sm:items-center gap-[4.85px] font-work-sans font-normal text-xl sm:text-[30px] sm:leading-[34.96px] tracking-[-0.02em] text-figure-text dark:text-gray-300 w-[50px]">
										{stars}{" "}
										<FaStar className="w-6 h-6 sm:w-[30px] sm:h-[30px] text-[#FFCE31]" />
									</p>
									<div className="flex-1 h-[26.83px] mr-[5.96px] bg-old-price-text rounded-full overflow-hidden">
										<div
											className="h-full bg-[#106A5E] rounded-full transition-all duration-500 ease-out"
											style={{ width: `${ratingDistribution[index]}%` }}
										></div>
									</div>
									<p className="font-work-sans font-normal text-xl sm:text-[30px] sm:leading-[34.96px] tracking-[-0.02em] text-figure-text dark:text-gray-300 w-[70px] sm:w-[110px]">
										{ratingDistribution[index].toFixed(1)}%
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<h2 className="font-open-sans font-semibold text-xl xs:text-2xl xs:leading-[32.68px] pb-8 text-black dark:text-white sm:mt-14">
					Previous verified reviews ({reviews?.length})
				</h2>

				{reviews.map((review, index) => (
					<div key={index} className="mb-8">
						<div className="mb-[22px] flex sm:items-center gap-4">
							<div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
								<Image
									src={review?.userImageUrl}
									width={48}
									height={48}
									alt="User Profile"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 flex max-sm:flex-col gap-3 justify-between items-start flex-wrap">
								<div>
									<h2 className="font-open-sans font-semibold text-xl leading-[27.24px] text-figure-text mb-[2px] sm:mb-1 dark:text-white">
										{review?.name}
									</h2>
									<p className="font-open-sans font-normal text-sm leading-[19.07px] text-figure-text dark:text-gray-300">
										{review?.date}
									</p>
								</div>

								{/* Rating display */}
								{review?.rating > 0 && (
									<div className="flex justify-start items-center gap-[2.75px]">
										{[...Array(5)].map((_, i) =>
											i < review.rating ? (
												<FaStar key={i} className="w-6 h-6 text-[#FFCE31]" />
											) : (
												<Star key={i} className="w-6 h-6 text-figure-text" />
											)
										)}
									</div>
								)}
							</div>
						</div>
						<h3 className="font-open-sans font-semibold text-xl leading-[27.24px] text-figure-text mb-[10px] dark:text-white">
							{review?.reviewTitle}
						</h3>
						<p className="font-open-sans font-normal text-xl leading-[32.68px] text-figure-text dark:text-gray-300">
							{review?.reviewMessage}
						</p>
					</div>
				))}
			</section>
		</main>
	);
};

export default ReviewsPage;
