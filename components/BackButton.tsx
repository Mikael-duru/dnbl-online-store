"use client";

import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
	const router = useRouter();

	const handleBack = () => {
		if (router) {
			router.back();
		}
	};

	return (
		<CircleArrowLeft
			size={40}
			className="mt-2 mb-8 cursor-pointer hover:text-[#B47B2B] dark:hover:text-[#B47B2B]"
			onClick={handleBack}
		/>
	);
};

export default BackButton;
