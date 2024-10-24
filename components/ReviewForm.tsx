"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { onAuthStateChanged, type User } from "firebase/auth";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "@/firebase/firebase";
import ButtonPrimary from "@/components/custom-buttons/ButtonPrimary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
	productId: string;
	reviews: ReviewType[];
	onReviewSubmit: (newReview: ReviewType) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
	productId,
	reviews,
	onReviewSubmit,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string>("");
	const [reviewTitle, setReviewTitle] = useState<string>("");
	const [reviewMessage, setReviewMessage] = useState<string>("");
	const [selectedRating, setSelectedRating] = useState<number>(0);
	const [hoverRating, setHoverRating] = useState<number>(0);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// User authentication state
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				const userDocRef = doc(db, "users", user.uid);
				const unsubscribeDoc = onSnapshot(userDocRef, (doc) => {
					if (doc.exists()) {
						const userData = doc.data();
						setUserName(userData.displayName || "");
						setPhotoURL(userData.photoURL || "");
					}
				});
				return () => unsubscribeDoc();
			}
		});
		return () => unsubscribe();
	}, []);

	const ratingFeedback = [
		"I don't like it",
		"It's okay",
		"Good",
		"Very good",
		"I love it",
	];

	// Real-time validation functions
	const validateTitle = (value: string) => {
		if (!value) {
			setErrors((prev) => ({
				...prev,
				reviewTitle: "Review title is required.",
			}));
		} else {
			setErrors((prev) => {
				const { reviewTitle, ...rest } = prev;
				return rest; // Remove error for this field
			});
		}
	};

	const validateMessage = (value: string) => {
		if (!value) {
			setErrors((prev) => ({
				...prev,
				reviewMessage: "Review message is required.",
			}));
		} else {
			setErrors((prev) => {
				const { reviewMessage, ...rest } = prev;
				return rest; // Remove error for this field
			});
		}
	};

	const validateRating = (rating: number) => {
		if (rating === 0) {
			setErrors((prev) => ({ ...prev, rating: "Please provide a rating." }));
		} else {
			setErrors((prev) => {
				const { rating, ...rest } = prev;
				return rest; // Remove error for this field
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Final validation before submission
		validateTitle(reviewTitle);
		validateMessage(reviewMessage);
		validateRating(selectedRating);

		if (Object.keys(errors).length === 0) {
			const newReview = {
				productId,
				name: userName || "Anonymous",
				ImageUrl: photoURL || "",
				rating: selectedRating,
				reviewTitle,
				reviewMessage,
			};

			try {
				if (!user) {
					toast("Please log in to submit a review.");
					return;
				}

				const idToken = await user.getIdToken();
				const response = await fetch(`/api/reviews`, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${idToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newReview),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to submit review");
				}

				const submittedReview = await response.json();
				onReviewSubmit(submittedReview);
				toast.success("Review submitted successfully!");

				// Reset form
				setReviewTitle("");
				setReviewMessage("");
				setSelectedRating(0);
			} catch (error) {
				console.error("Error submitting review:", error);
				toast.error(`Failed to submit review, Please try again.`);
			}
		}
	};

	return (
		<section className="bg-[#F7F7F7] dark:bg-[#2E2E2E] px-[5%] 2xl:pl-[110px] ">
			{reviews?.length > 6 && (
				<Link
					href={`/product/reviews/${productId}`}
					className="font-open-sans font-semibold text-base sm:text-xl leading-[27.24px] tracking-[-0.02em] text-[#106A5E] underline dark:text-[#106A5E]"
				>
					Show more verified reviews
				</Link>
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
						onChange={(e) => {
							setReviewTitle(e.target.value);
							validateTitle(e.target.value); // Real-time validation
						}}
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
						onChange={(e) => {
							setReviewMessage(e.target.value);
							validateMessage(e.target.value); // Real-time validation
						}}
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
								onClick={() => {
									setSelectedRating(i + 1);
									validateRating(i + 1); // Real-time validation
								}}
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
		</section>
	);
};

export default ReviewForm;
