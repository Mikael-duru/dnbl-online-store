import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const imageUrls = [
	{
		id: 1,
		src: "/assets/men-size-conversion.jpeg",
		alt: "Men Sizes Conversion",
	},
	{
		id: 2,
		src: "/assets/women-size-conversion.jpeg",
		alt: "Women Size Conversion",
	},
];

function SizeChart() {
	const [isOpen, setIsOpen] = useState(true);

	const handleCancel = () => {
		setIsOpen(false);
	};

	if (!isOpen) return null; // Don't render anything if modal is closed

	return (
		<div className="fixed inset-0 bg-banner-layer flex justify-center items-center z-50">
			<div className="bg-gray-100 dark:bg-[#2E2E2E] py-6 px-4 rounded-lg mx-4">
				<Carousel>
					<CarouselContent className="flex gap-2 sm:gap-4 lg:gap-5">
						{imageUrls.map((imageUrl) => (
							<div className="shrink-0" key={imageUrl.id}>
								<CarouselItem>
									<Image
										src={imageUrl.src}
										width={374.18}
										height={665}
										alt={imageUrl.alt}
										className="w-[200px] h-auto sm:w-[374.18px] sm:h-[665px] object-cover"
									/>
								</CarouselItem>
							</div>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden" />
					<CarouselNext className="hidden" />
				</Carousel>

				<div className="mt-4 flex justify-between">
					<Link
						href="/size-chart-description"
						className="font-open-sans text-sm xs:text-base text-blue-500 hover:underline"
					>
						How to Take Measurements
					</Link>
					<button
						onClick={handleCancel}
						className="font-open-sans text-base text-red-600 hover:underline"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default SizeChart;
