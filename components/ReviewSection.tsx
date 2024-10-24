"use client";

import React, { useEffect, useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import Loader from "@/components/Loader";
// import toast from "react-hot-toast";

interface ReviewSectionProps {
	productId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchReviews = async () => {
		try {
			console.log(`Fetching reviews for product ID: ${productId}`);

			const response = await fetch(`/api/reviews/${productId}`, {
				method: "GET",
			});

			console.log(`Response status: ${response.status}`);

			const data = await response.json();
			console.log("Fetched data:", data);

			if (!response.ok) {
				throw new Error(
					data.message || `HTTP error! status: ${response.status}`
				);
			}

			if (!Array.isArray(data)) {
				throw new Error("Received data is not an array");
			}

			const formattedReviews = data.map((review) => ({
				...review,
				date: new Date(review.date),
			}));

			setReviews(formattedReviews);
		} catch (err) {
			console.error("Error fetching reviews:", err);
			// setError(
			// 	err.message || "Failed to load reviews. Please try again later."
			// );
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [productId]);

	const handleReviewSubmit = (newReview: ReviewType) => {
		setReviews((prevReviews) => [
			{
				...newReview,
				date: new Date(newReview.date), // Ensure the date is a Date object
			},
			...prevReviews,
		]);
	};

	if (loading) return <Loader />;

	return (
		<div>
			<ReviewList reviews={reviews} />
			<ReviewForm
				productId={productId}
				reviews={reviews}
				onReviewSubmit={handleReviewSubmit}
			/>
		</div>
	);
};

export default ReviewSection;
