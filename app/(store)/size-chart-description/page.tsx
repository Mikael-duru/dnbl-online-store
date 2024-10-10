"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import ButtonPrimary from "@/components/ButtonPrimary";

const measurements = [
	{
		title: "Neck",
		description:
			"Wrap the tape measure around the base of your neck, parallel to the floor. Leave enough room for comfort.",
		imageUrl: "/assets/measurements/neck.png",
	},
	{
		title: "Chest",
		description:
			"Wrap the tape measure around the chest just under the armpits and across the shoulder blades.",
		imageUrl: "/assets/measurements/waist.png",
	},
	{
		title: "Waist",
		description:
			"Measure around the midsection, above the navel and below the ribcage.",
		imageUrl: "/assets/measurements/chest.png",
	},
	{
		title: "Hips",
		description: "Wrap the tape measure around the widest part of your hips.",
		imageUrl: "/assets/measurements/hips.png",
	},
	{
		title: "Shoulder Width",
		description:
			"Measure from one shoulder tip to the other, spanning across the back.",
		imageUrl: "/assets/measurements/shoulder-width.png",
	},
	{
		title: "Sleeve Length",
		description:
			"Measure from the shoulder down to the wrist with a slight bend in your arm.",
		imageUrl: "/assets/measurements/sleeve-length.png",
	},
	{
		title: "Bicep",
		description:
			"Wrap the tape measure around the bicep, midway between the shoulder and the elbow.",
		imageUrl: "/assets/measurements/bicep.png",
	},
	{
		title: "Wrist",
		description: "Wrap the tape measure around the wrist at the wrist bone.",
		imageUrl: "/assets/measurements/wrist.png",
	},
	{
		title: "Back Length",
		description:
			"Measure from the base of the neck down the spine to the waist or hip level.",
		imageUrl: "/assets/measurements/back-length.png",
	},
	{
		title: "Inseam",
		description: "Measure from the crotch to the ankle along the inner leg.",
		imageUrl: "/assets/measurements/inseam.png",
	},
	{
		title: "Outseam",
		description: "Measure from the waistband to the ankle along the outer leg.",
		imageUrl: "/assets/measurements/outseam.png",
	},
	{
		title: "Thigh",
		description: "Wrap the tape around the thigh, just below the crotch.",
		imageUrl: "/assets/measurements/thigh.png",
	},
	{
		title: "Rise",
		description:
			"Measure from the front waistband through the crotch to the back waistband.",
		imageUrl: "/assets/measurements/rise.png",
	},
];

const SizeChartDescription: React.FC = () => {
	const router = useRouter();

	// Function to go back to the previous page
	const handleBack = () => {
		if (router) {
			router.back(); // Go back to the page from which the user clicked "View More"
		}
	};

	return (
		<main className="bg-white dark:bg-[#121212]">
			<section className="pt-11 px-[5%] 2xl:px-[100px]">
				<h1 className="font-open-sans font-bold text-2xl text-gradient mb-4">
					How to Take Your Measurements
				</h1>
				<p className="font-open-sans font-normal text-black dark:text-white text-base sm:text-lg xl:text-2xl mb-8">
					Taking accurate body measurements is essential for finding the perfect
					fit for your clothes. Here&apos;s a detailed guide on how to measure
					yourself, whether you&apos;re shopping for yourself or a loved one,
					we&apos;ve made it easy to select the size that suits you best.
				</p>

				{/* Size chart images */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-4 pt-4 mb-11 xl:mb-14">
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black dark:text-[#fdae3f] text-lg mb-2">
							Men&apos;s Shirt Chart
						</h2>
						<Image
							src="/assets/men-shirt-chart.jpg"
							width={1080}
							height={1920}
							alt="Men's Shirt Chart"
							className="mx-auto w-[374px] h-[600px] lg:h-[530px] xl:h-[680px]"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black dark:text-[#fdae3f] text-lg mb-2">
							Men&apos;s Trouser Chart
						</h2>
						<Image
							src="/assets/men-trousers-sizes.jpg"
							width={1080}
							height={1920}
							alt="Men's Trouser Size Chart"
							className="mx-auto w-[374px] h-[600px] lg:h-[530px] xl:h-[680px]"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black dark:text-[#fdae3f] text-lg mb-2">
							Women&apos;s Chart
						</h2>
						<Image
							src="/assets/women-size-chart.jpg"
							width={1080}
							height={1920}
							alt="Women's Size Chart"
							className="mx-auto w-[374px] h-[600px] lg:h-[530px] xl:h-[680px]"
						/>
					</div>
				</div>

				{/* Measurement images */}
				<div className="flex items-center justify-center flex-col gap-14 mb-16">
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black dark:text-[#fdae3f] text-xl mb-2">
							Men&apos;s Measurement
						</h2>
						<Image
							src="/assets/men-measurement.jpg"
							width={940}
							height={788}
							alt="Men's Trouser Size Chart"
							className="object-cover aspect-auto"
						/>
					</div>
					<div className="text-center">
						<h2 className="font-open-sans font-semibold text-black dark:text-[#fdae3f] text-xl mb-2">
							Women&apos;s Measurement
						</h2>
						<Image
							src="/assets/women-measurement.jpg"
							width={1080}
							height={905}
							alt="Women's Size Chart"
							className="object-cover aspect-auto w-[940px]"
						/>
					</div>
				</div>

				{/* Size guide information */}
				<div className="mb-16">
					<h2 className="font-open-sans font-bold text-xl text-gradient">
						A Step-by-Step Guide
					</h2>
					<p className="font-open-sans font-normal text-black dark:text-white text-base sm:text-lg pt-4 pb-6">
						<strong>Guide:</strong> To ensure you get the most accurate size,
						follow our step-by-step measurement guide.
					</p>
					<ol className="list-decimal grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-10 lg:gap-x-16 font-open-sans font-normal text-black dark:text-white text-base sm:text-lg">
						{measurements.map((measurement, index) => (
							<li
								key={index}
								className="relative flex flex-col items-start pl-6 border-l-4 border-[#fdae3f] pb-4 max-lg:ml-4"
							>
								<span className="font-semibold text-black dark:text-[#fdae3f]">
									{measurement.title}
								</span>
								<span className="pt-2 pb-4 block">
									<strong>Description:</strong> {measurement.description}
								</span>
								<Image
									src={measurement.imageUrl}
									alt={`${measurement.title} Measurement`}
									width={400}
									height={300}
									className="w-full h-[150px] object-contain"
								/>
								{/* Dots */}
								<div className="absolute -left-[18px] -top-1 w-8 h-8 bg-[#fdae3f]  rounded-full flex items-center justify-center text-base font-open-sans font-bold text-white">
									{index + 1}
								</div>
								<div className="absolute -left-[10px] -bottom-1 w-4 h-4 bg-[#fdae3f] rounded-full"></div>
							</li>
						))}
					</ol>
				</div>

				{/* Fit tips */}
				<div className="mb-16 pl-4">
					<h3 className="font-open-sans font-bold text-black dark:text-white text-lg xl:text-2xl mb-4">
						Fit Tips:
					</h3>
					<ul className="list-disc flex flex-col gap-4 font-open-sans font-normal text-black dark:text-white text-base sm:text-lg xl:text-2xl">
						<li>Prefer a looser fit? Consider sizing up.</li>
						<li>For a more tailored look, stick to your exact measurements.</li>
						<li>
							Different styles may have different fits, so always refer to the
							product&apso;s fit guide.
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
