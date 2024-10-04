"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleArrowLeft, UserRoundCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useSearchParams } from "next/navigation"; // For dynamic route params
import { store } from "@/lib/store";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Gallery from "@/components/Gallery";
import ProductInfo from "@/components/ProductInfo";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ButtonPrimary from "@/components/ButtonPrimary";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import { getProductById } from "@/constants/productsStore";
import toast from "react-hot-toast";

interface Review {
	name: string;
	ImageUrl: string;
	date: string;
	rating: any;
	reviewTitle: string;
	reviewMessage: string;
}

const ProductDetail = () => {
	const { currentUser, getUserInfo } = store();
	const router = useRouter();
	const [reviewTitle, setReviewTitle] = useState<string>("");
	const [reviewMessage, setReviewMessage] = useState<string>("");
	const [selectedRating, setSelectedRating] = useState<number>(0);
	const [hoverRating, setHoverRating] = useState<number>(0);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [errors, setErrors] = useState<Partial<Review>>({});
	// const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const searchParams = useSearchParams();
	const productId = searchParams.get("id");
	const product = getProductById(productId);

	useEffect(() => {
		const savedReviews = localStorage.getItem(`reviews-${productId}`);
		if (savedReviews) {
			setReviews(JSON.parse(savedReviews));
		}

		const unSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				getUserInfo(user?.uid);
			}
			// setIsAuthenticated(!!user); // Set authentication status
		});
		return () => {
			unSub();
		};
	}, [productId]);

	if (!product) {
		return <Loader />;
	}

	const ratingFeedback = [
		"I don't like it",
		"It's okay",
		"Good",
		"Very good",
		"I love it",
	];

	const validateForm = (): Partial<Review> => {
		const validationErrors: Partial<Review> = {};
		if (!reviewTitle)
			validationErrors.reviewTitle = "Review title is required.";
		if (!reviewMessage)
			validationErrors.reviewMessage = "Review message is required.";
		if (selectedRating === 0)
			validationErrors.rating = "Please provide a rating.";
		return validationErrors;
	};

	const handleReviewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setReviewTitle(value);

		// Real-time validation
		if (!value) {
			setErrors((prev) => ({
				...prev,
				reviewTitle: "Review title is required.",
			}));
		} else {
			setErrors((prev) => ({ ...prev, reviewTitle: undefined }));
		}
	};

	const handleReviewMessageChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const value = e.target.value;
		setReviewMessage(value);

		// Real-time validation
		if (!value) {
			setErrors((prev) => ({
				...prev,
				reviewMessage: "Review message is required.",
			}));
		} else {
			setErrors((prev) => ({ ...prev, reviewMessage: undefined }));
		}
	};

	const handleRatingClick = (rating: any) => {
		setSelectedRating(rating);

		// Real-time validation for rating
		if (typeof rating !== "number" || rating === 0) {
			setErrors((prev) => ({ ...prev, rating: "Please provide a rating." }));
		} else {
			setErrors((prev) => ({ ...prev, rating: undefined }));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if user is authenticated
		if (!currentUser) {
			toast("Please log in to submit a review.");
			return;
		}

		const validationErrors = validateForm();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			const newReview: Review = {
				name: currentUser?.displayName || "Anonymous",
				ImageUrl: currentUser.photoURL,
				date: new Date().toLocaleDateString(),
				rating: selectedRating,
				reviewTitle,
				reviewMessage,
			};

			const updatedReviews = [newReview, ...reviews];
			setReviews(updatedReviews);
			localStorage.setItem(
				`reviews-${productId}`,
				JSON.stringify(updatedReviews)
			);

			setReviewTitle("");
			setReviewMessage("");
			setSelectedRating(0);
		}
	};

	const handleBack = () => {
		if (router && router.back) {
			router.back();
		}
	};

	return (
		<div>
			<section className="px-[5%] 2xl:pl-[100px] pt-[22px] pb-[45px] bg-product-details-bg dark:bg-[#1E1E1E]">
				<CircleArrowLeft
					size={40}
					className="mt-2 mb-8 cursor-pointer hover:text-[#B47B2B] dark:hover:text-[#B47B2B]"
					onClick={handleBack}
				/>

				<div className="flex justify-center xl:justify-start gap-10 lg:gap-12 xl:gap-16 max-lg:flex-col max-md:items-center">
					<Gallery productMedia={product?.media} />
					<ProductInfo productInfo={product} />
				</div>
			</section>

			<section className="flex flex-col gap-2 pb-[53.52px] bg-white dark:bg-[#2E2E2E]">
				<h2 className="px-[5%] 2xl:pl-[110px] font-open-sans font-semibold text-2xl leading-[32.68px] pt-[31px] pb-[14.56px] text-black dark:text-white uppercase">
					Description
				</h2>
				<Separator className="bg-black dark:bg-gray-600" />
				<p className="px-[5%] 2xl:pl-[110px] pt-[27.3px] font-open-sans font-normal text-base sm:text-2xl sm:leading-[40px] text-black dark:text-white">
					{product?.description}
				</p>
			</section>

			<section className="bg-[#D9D9D9] dark:bg-[#1E1E1E] px-[5%] 2xl:pl-[110px] pt-[31px] lg:pt-16 pb-[30px]">
				<h2 className="font-open-sans font-semibold text-xl xs:text-2xl xs:leading-[32.68px] pb-8 text-black dark:text-white">
					Previous verified reviews ({reviews?.length})
				</h2>

				{reviews?.length > 0 ? (
					reviews.slice(0, 6).map((review, index) => (
						<div key={index} className="mb-8">
							<div className="mb-[22px] flex sm:items-center gap-4">
								{currentUser?.photoURL || review?.ImageUrl ? (
									<Avatar className="w-12 h-12 shrink-0">
										<AvatarImage
											src={currentUser?.photoURL || review?.ImageUrl}
											alt={"User profile picture"}
										/>
									</Avatar>
								) : (
									<Avatar className="w-12 h-12 shrink-0">
										<AvatarFallback className="text-2xl font-libre-franklin tracking-wide">
											<UserRoundCheck size={24} />
										</AvatarFallback>
									</Avatar>
								)}
								<div className="flex-1 flex max-sm:flex-col gap-3 justify-between items-start flex-wrap">
									<div>
										<h2 className="font-open-sans font-semibold text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text mb-[2px] sm:mb-1 dark:text-white">
											{review?.name}
										</h2>
										<p className="font-open-sans font-normal text-sm leading-[19.07px] text-figure-text tracking-[-0.02em] dark:text-white">
											{review?.date}
										</p>
									</div>
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
							<h3 className="font-open-sans font-semibold text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text mb-[10px] dark:text-white">
								{review?.reviewTitle}
							</h3>
							<p className="font-open-sans font-normal text-base sm:text-lg sm:leading-6 text-figure-text tracking-[-0.02em] max-w-[1175px] dark:text-white">
								{review?.reviewMessage}
							</p>
						</div>
					))
				) : (
					<p className="font-open-sans font-normal text-base sm:text-lg sm:leading-6 text-figure-text tracking-[-0.02em] text-center dark:text-white">
						No reviews yet.
					</p>
				)}
			</section>

			<section className="bg-[#F7F7F7] dark:bg-[#2E2E2E] px-[5%] 2xl:pl-[110px] ">
				{reviews?.length > 1 && (
					<button
						onClick={() => router.push(`/product/reviews?id=${productId}`)}
						className="font-open-sans font-semibold text-base sm:text-xl leading-[27.24px] tracking-[-0.02em] text-[#106A5E] underline dark:text-[#106A5E]"
					>
						Show more verified reviews
					</button>
				)}

				<h2 className="font-open-sans font-semibold text-xl xs:text-2xl xs:leading-[32.68px] pt-10 pb-3 sm:pb-6 dark:text-white">
					Write a review
				</h2>

				<form onSubmit={handleSubmit} className="pb-11">
					<div className="grid w-full items-center gap-2 mb-6">
						<Label
							htmlFor="reviewTitle"
							className="font-open-sans font-normal text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text dark:text-white"
						>
							Add a title
						</Label>
						<Input
							type="text"
							id="reviewTitle"
							value={reviewTitle}
							onChange={handleReviewTitleChange}
							// onChange={(e) => setReviewTitle(e.target.value)}
							placeholder="e.g., I love it! It is what I ordered"
							className="py-2 px-4 rounded border-[1.5px] border-old-price-text h-14 font-open-sans text-lg leading-[24.51px] font-normal tracking-[-0.02em] text-figure-text dark:bg-[#444444] dark:text-white focus:border-none outline-none"
						/>
						{errors.reviewTitle && (
							<p className="text-red-500">{errors.reviewTitle}</p>
						)}
					</div>

					<div className="grid w-full gap-2">
						<Label
							htmlFor="reviewMessage"
							className="font-open-sans font-normal text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text dark:text-white"
						>
							Detailed Review
						</Label>
						<Textarea
							value={reviewMessage}
							// onChange={(e) => setReviewMessage(e.target.value)}
							onChange={handleReviewMessageChange}
							placeholder="Comment on your experience."
							id="reviewMessage"
							className="border border-old-price-text py-2 px-4 h-[91px] font-open-sans text-lg leading-[24.51px] font-normal tracking-[-0.02em] text-figure-text dark:bg-[#444444] dark:text-white focus:border-none outline-none"
						/>
						{errors.reviewMessage && (
							<p className="text-red-500">{errors.reviewMessage}</p>
						)}
					</div>

					<div className="my-[39px]">
						<h2 className="font-open-sans font-normal text-xl leading-[27.24px] tracking-[-0.02em] text-figure-text dark:text-white">
							Rate this product
						</h2>

						<h3 className="font-open-sans font-normal text-base tracking-[-0.02em] text-figure-text text-center mt-8 dark:text-white">
							Tap the stars to rate the product
						</h3>
						<div className="flex justify-center items-center gap-[2.75px] mt-4">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									onClick={() => handleRatingClick(i + 1)}
									onMouseEnter={() => setHoverRating(i + 1)}
									onMouseLeave={() => setHoverRating(0)}
									className="cursor-pointer"
								>
									{i + 1 <= (hoverRating || selectedRating) ? (
										<FaStar className="w-6 h-6 cursor-pointer text-[#FFCE31]" />
									) : (
										<Star className="text-gray w-6 h-6" />
									)}
								</div>
							))}
						</div>
						{selectedRating > 0 && (
							<p className="font-open-sans font-normal text-sm text-figure-text text-center pt-4 -mb-4 dark:text-white">
								{ratingFeedback[selectedRating - 1]}
							</p>
						)}
						{errors.rating && (
							<p className="text-red-500 text-center font-open-sans dark:text-red-400">
								{errors.rating}
							</p>
						)}
					</div>

					<div className="w-[200px] sm:w-[400px] mx-auto">
						<ButtonPrimary type="submit" label="Submit Review" />
					</div>
				</form>

				<div className="sm:px-6">
					<RecentlyViewed />
				</div>
			</section>
		</div>
	);
};

export default ProductDetail;
