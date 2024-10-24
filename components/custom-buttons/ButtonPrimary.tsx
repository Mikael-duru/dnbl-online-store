"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
	maxWidth?: string;
	height?: string;
	label: string;
	type: string;
	disabled?: boolean;
	href?: string; // Optional href prop for navigation
}

const ButtonPrimary: React.FC<ButtonProps> = ({
	maxWidth,
	height,
	label,
	disabled,
	href,
}) => {
	const router = useRouter();

	const handleClick = () => {
		if (href) {
			router.push(href); // Navigate to the provided href
		}
	};

	return (
		<button
			onClick={handleClick}
			style={{ maxWidth, height }}
			className={`
				flex flex-col justify-center items-center p-3 lg:py-4 lg:px-6 gap-2 w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300 ${
					disabled ? "opacity-50 cursor-not-allowed" : ""
				}`}
		>
			{label}
		</button>
	);
};

export default ButtonPrimary;
