"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ButtonPrimary from "@/components/ButtonPrimary";

const EmptyInbox = () => {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center pt-24 pb-36 sm:pt-[147px] sm:pb-[223px] bg-white dark:bg-[#2E2E2E]">
			<Image
				src="/assets/bell-empty.png"
				width={250}
				height={250}
				alt="Empty box"
				className="object-cover mx-auto invert dark:invert-0"
			/>
			<h2 className="font-open-sans font-semibold text-2xl text-gold-text text-center -mt-4 mb-2">
				Your inbox is empty!
			</h2>
			<p className="font-open-sans font-normal text-base sm:text-xl text-figure-text text-center  dark:text-white">
				We&apos;ll notify you when there&apos;s a new message.
			</p>

			<div className="flex justify-center mt-10">
				<div className="w-[200px] sm:w-[350px]">
					<ButtonPrimary
						type="button"
						label="Continue Shopping"
						onClick={() => router.push("/product")}
					/>
				</div>
			</div>
		</div>
	);
};

export default EmptyInbox;
