import React from "react";
import { UserRoundCheck } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewListProps {
	reviews: ReviewType[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
	return (
		<section className="bg-[#D9D9D9] dark:bg-[#1E1E1E] px-[5%] 2xl:pl-[110px] pt-[31px] lg:pt-16 pb-[30px]">
			<h2 className="font-open-sans font-semibold text-xl xs:text-2xl xs:leading-[32.68px] pb-8 text-black dark:text-white">
				Previous verified reviews ({reviews?.length})
			</h2>

			{reviews?.length > 0 ? (
				reviews.slice(0, 6).map((review, index) => (
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
										{review.date instanceof Date
											? review.date.toLocaleDateString()
											: "Invalid Date"}
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
				))
			) : (
				<p className="font-open-sans font-normal text-base sm:text-lg sm:leading-6 text-figure-text tracking-[-0.02em] text-center dark:text-white">
					No reviews yet.
				</p>
			)}
		</section>
	);
};

export default ReviewList;
