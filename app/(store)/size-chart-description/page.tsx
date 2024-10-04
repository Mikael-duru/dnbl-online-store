"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import ButtonPrimary from "@/components/ButtonPrimary";

const SizeChartDescription: React.FC = () => {
	const router = useRouter();

	// Function to go back to the previous page
	const handleBack = () => {
		if (router && router.back) {
			router.back(); // Go back to the page from which the user clicked "View More"
		}
	};

	return (
		<main className="bg-white">
			<section className="pt-11 px-[5%] 2xl:px-[100px]">
				<h1 className="font-open-sans font-bold text-2xl text-black mb-4">
					Size Chart
				</h1>
				<p className="font-open-sans font-normal text-black text-base sm:text-lg xl:text-2xl mb-8">
					Ensuring the perfect fit is crucial for comfort and style. Use our
					comprehensive size charts to find the right size for your next
					purchase. Whether you're shopping for yourself or a loved one, we've
					made it easy to select the size that suits you best.
				</p>

				{/* Size chart images */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-4 mb-11">
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black text-2xl md:text-[17px] mb-2">
							Men's Trouser Size Chart
						</h2>
						<Image
							src="/assets/men-trousers-sizes.png"
							width={374}
							height={665}
							alt="Men's Trouser Size Chart"
							className="mx-auto"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black text-2xl md:text-[17px] mb-2">
							Women's Size Chart
						</h2>
						<Image
							src="/assets/women-size-chart.png"
							width={374}
							height={665}
							alt="Women's Size Chart"
							className="mx-auto"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black text-2xl md:text-[17px] mb-2">
							Men's Top Size Chart
						</h2>
						<Image
							src="/assets/men-top-sizes.png"
							width={374}
							height={665}
							alt="Men's Top Size Chart"
							className="mx-auto"
						/>
					</div>
				</div>

				{/* Size guide information */}
				<div className="mb-10">
					<h2 className="font-open-sans font-bold text-2xl text-black mb-4">
						Size Guide
					</h2>
					<p className="font-open-sans font-normal text-black text-base sm:text-lg xl:text-2xl mb-4">
						<strong>Guide:</strong> To ensure you get the most accurate size,
						follow our step-by-step measurement guide.
					</p>
					<ol className="list-decimal list-inside flex flex-col gap-4 font-open-sans font-normal text-black text-base sm:text-lg xl:text-2xl">
						<li>
							Chest/Bust: Measure around the fullest part of your chest/bust,
							keeping the tape horizontal.
						</li>
						<li>
							Waist: Measure around your natural waistline, the narrowest part
							of your torso.
						</li>
						<li>
							Hip: Measure around the fullest part of your hips, keeping the
							tape horizontal.
						</li>
						<li>
							Inseam/Length: Measure from the top of your inner thigh to the
							bottom of your ankle.
						</li>
					</ol>
				</div>

				{/* Fit tips */}
				<div className="mb-16">
					<h3 className="font-open-sans font-bold text-black text-lg xl:text-2xl mb-4">
						Fit Tips:
					</h3>
					<ul className="list-disc list-inside flex flex-col gap-4 font-open-sans font-normal text-black text-base sm:text-lg xl:text-2xl">
						<li>Prefer a looser fit? Consider sizing up.</li>
						<li>For a more tailored look, stick to your exact measurements.</li>
						<li>
							Different styles may have different fits, so always refer to the
							product’s fit guide.
						</li>
					</ul>
				</div>

				{/* Back button to return to the previous page */}
				<div className="w-[225px] pb-24 lg:pb-32">
					<ButtonPrimary
						type="button"
						label="Back to Previous Page"
						onClick={handleBack}
					/>
				</div>
			</section>
		</main>
	);
};

export default SizeChartDescription;
