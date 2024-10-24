"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
	backgroundColor?: string;
	label: string;
	type: string;
	className?: string;
	disabled?: boolean;
	href?: string;
}

const Button: React.FC<ButtonProps> = ({
	backgroundColor = "#919191", // Default color
	label,
	className,
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
			style={{ backgroundColor }}
			className={`flex flex-col justify-center items-center py-4 px-6 gap-2 shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white transition duration-300 ease-in-out hover:bg-btn-gold focus:bg-btn-gold w-full ${className} ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{label}
		</button>
	);
};

export default Button;
