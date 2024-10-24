"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
	label: string;
	type?: string;
	disabled?: boolean;
	href?: string; // Optional href prop for navigation
}

const ButtonSecondary: React.FC<ButtonProps> = ({ label, href, disabled }) => {
	const router = useRouter();

	const handleClick = () => {
		if (href) {
			router.push(href); // Navigate to the provided href
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={disabled} // Disable the button if disabled prop is true
			className={`
                flex flex-col justify-center items-center py-2 px-3 sm:p-3 2xl:py-4 2xl:px-6 gap-2 w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold border border-gold-text text-gold-text 
                hover:text-white hover:bg-btn-gold duration-300
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
		>
			{label}
		</button>
	);
};

export default ButtonSecondary;
