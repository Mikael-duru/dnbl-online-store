import React from "react";
import Image from "next/image";

interface FeatureProps {
	iconUrl: string;
	iconWidth: number;
	iconHeight: number;
	title: string;
	description: string;
}

const Feature: React.FC<FeatureProps> = ({
	iconUrl,
	iconWidth,
	iconHeight,
	title,
	description,
}) => (
	<div className="flex flex-col items-center px-2 py-[39px] bg-white dark:bg-[#2E2E2E] rounded-lg shadow-incentives-shadow sm:w-[312px]">
		<div className="mb-4">
			<Image
				src={iconUrl}
				width={iconWidth}
				height={iconHeight}
				alt=""
				className="w-auto h-auto"
			/>
		</div>
		<h3 className="font-open-sans font-semibold text-2xl leading-[40px] text-blue-black dark:text-white mb-4">
			{title}
		</h3>
		<p className="font-open-sans font-normal text-lg leading-[24px] text-center text-black dark:text-gray-300">
			{description}
		</p>
	</div>
);

const WhyChooseUs: React.FC = () => {
	const features = [
		{
			iconUrl: "/assets/hand-shake.svg",
			iconWidth: 120,
			iconHeight: 114.85,
			title: "Quality Materials",
			description:
				"We are committed to providing our customers with only the highest quality wears",
		},
		{
			iconUrl: "/assets/user-group-plus.svg",
			iconWidth: 91,
			iconHeight: 112.43,
			title: "Client-Centered",
			description:
				"Our customers are our top priority, and we are committed to providing exceptional customer service.",
		},
		{
			iconUrl: "/assets/user-group-plus.svg",
			iconWidth: 91,
			iconHeight: 112.43,
			title: "Wide Selection",
			description:
				"With hundreds of styles to choose from, we have something for everyone.",
		},
		{
			iconUrl: "/assets/user-group-plus.svg",
			iconWidth: 91,
			iconHeight: 112.43,
			title: "Discounted Price",
			description:
				"We understand that purchasing quality footwear can be expensive, which is why we offer regular discounts on our products.",
		},
	];

	return (
		<div className="flex gap-16 2xl:gap-[82px] relative justify-center">
			<div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10 xl:gap-x-5 xl:gap-y-[30px]">
				{features.map((feature, index) => (
					<Feature key={index} {...feature} />
				))}
			</div>
			<div className="relative max-xl:hidden">
				<div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden xl:h-[450px] xl:w-[450px] 2xl:h-[514px] 2xl:w-[514px] relative top-[56px] z-10">
					<Image
						src="/assets/happy-customer.jpeg"
						alt="Happy customer"
						width={700}
						height={700}
						className="w-full h-auto object-cover rounded-full z-10"
					/>
				</div>
			</div>
		</div>
	);
};

export default WhyChooseUs;
