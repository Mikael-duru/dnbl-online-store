"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleArrowLeft, UserRoundCheck } from "lucide-react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

import { getProductById } from "@/constants/productsStore";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Pagination from "@/components/Pagination";

interface Review {
	name: string;
	ImageUrl: string;
	date: string;
	rating: number;
	reviewTitle: string;
	reviewMessage: string;
}

const COOKIE_NAME = "currentProductsPage";

const ReviewsPage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [itemsPerPage, setItemsPerPage] = useState(30); // Default to 30
	const router = useRouter();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);
	const [ratingDistribution, setRatingDistribution] = useState<number[]>([
		0, 0, 0, 0, 0,
	]); // For 5 stars to 1 star
	const searchParams = useSearchParams();
	const productId = searchParams.get("id"); // Access the product._id
	const product = getProductById(productId); // Get product by Id

	useEffect(() => {
		const savedPage = Cookies.get(COOKIE_NAME);
		if (savedPage) {
			setCurrentPage(parseInt(savedPage, 10));
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			Cookies.set(COOKIE_NAME, currentPage.toString(), { expires: 7 });
		}
	}, [currentPage, isLoading]);

	useEffect(() => {
		const updateItemsPerPage = () => {
			setItemsPerPage(window.innerWidth < 768 ? 10 : 30); // 768px as a breakpoint
		};

		updateItemsPerPage(); // Set initial value
		window.addEventListener("resize", updateItemsPerPage); // Update on resize

		return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup
	}, []);

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

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(reviews.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentReviews = reviews.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

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

	if (isLoading) {
		return <Loader />;
	}

	const handleBack = () => {
		if (router) {
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
						{product && (
							<Image
								src={product?.media[0]}
								width={500}
								height={500}
								alt={product?.productName}
								className="object-cover w-[440px] h-[350px]"
							/>
						)}
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
												<FaStar className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFCE31]" />
											) : isHalfStar ? (
												<FaStarHalfAlt className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFCE31]" />
											) : (
												<FaRegStar className="w-5 h-5 sm:w-6 sm:h-6 text-figure-text dark:text-gray-300" />
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
										<FaStar className="w-5 h-5 sm:w-[30px] sm:h-[30px] text-[#FFCE31]" />
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

				{currentReviews.map((review, index) => (
					<div key={index} className="mb-8">
						<div className="mb-4 sm:mb-[22px] flex sm:items-center gap-4">
							<Avatar className="w-12 h-12 shrink-0">
								<AvatarImage
									src={review?.ImageUrl}
									alt={"User profile picture"}
								/>
								<AvatarFallback className="text-2xl font-libre-franklin tracking-wide">
									<UserRoundCheck size={24} />
								</AvatarFallback>
							</Avatar>
							<div className="flex-1 flex max-sm:flex-col gap-1 sm:gap-3 justify-between items-start flex-wrap">
								<div>
									<h2 className="font-open-sans font-semibold text-sm sm:text-xl sm:leading-[27.24px] text-figure-text mb-[2px] sm:mb-1 dark:text-white">
										{review?.name}
									</h2>
									<p className="font-open-sans font-normal text-xs sm:text-sm leading-[19.07px] text-figure-text dark:text-gray-300">
										{review?.date}
									</p>
								</div>

								{/* Rating display */}
								{review?.rating > 0 && (
									<div className="flex justify-start items-center gap-[2.75px]">
										{[...Array(5)].map((_, i) =>
											i < review.rating ? (
												<FaStar
													key={i}
													className="w-4 h-4 sm:w-6 sm:h-6 text-[#FFCE31]"
												/>
											) : (
												<Star
													key={i}
													className="w-4 h-4 sm:w-6 sm:h-6 text-figure-text dark:text-gray-300"
												/>
											)
										)}
									</div>
								)}
							</div>
						</div>
						<h3 className="ml-2 font-open-sans font-semibold sm:text-xl sm:leading-[27.24px] text-figure-text mb-[10px] dark:text-white">
							{review?.reviewTitle}
						</h3>
						<p className="ml-2 font-open-sans font-normal sm:text-xl sm:leading-[32.68px] text-figure-text dark:text-gray-300">
							{review?.reviewMessage}
						</p>
					</div>
				))}

				{/* The pagination component is only rendered if there is more than one page */}
				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}
			</section>
		</main>
	);
};

export default ReviewsPage;
