import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	return (
		<div className="flex justify-between mt-8">
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="flex justify-center items-center font-roboto uppercase font-bold text-xs sm:text-base tracking-[-0.02rem] leading-[21.79px] mx-1 disabled:opacity-50"
			>
				<ChevronLeft /> Previous Page
			</button>
			<span className="mx-1 font-roboto text-xs sm:text-base leading-[21.79px]">
				{currentPage} / {totalPages}
			</span>
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="flex justify-center items-center font-roboto uppercase font-bold text-xs sm:text-base tracking-[-0.02rem] leading-[21.79px] mx-1 disabled:opacity-50"
			>
				Next page <ChevronRight />
			</button>
		</div>
	);
};

export default Pagination;
