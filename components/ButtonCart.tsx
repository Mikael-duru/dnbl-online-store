import React from "react";

interface ButtonProps {
	maxWidth?: string;
	height?: string;
	label: string;
	type: string;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

const ButtonCart: React.FC<ButtonProps> = ({
	maxWidth,
	height,
	label,
	className,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			style={{ maxWidth, height }}
			className={`
				flex flex-col justify-center items-center p-3 lg:px-[17.6px] gap-[7.33px] w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300 ${className}`}
		>
			{label}
		</button>
	);
};

export default ButtonCart;
