import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Import the icon from Lucide

interface DropdownProps {
	options: { value: string; label: string }[];
	selectedOption: string;
	onChange: (value: string) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleToggle = () => setIsOpen((prev) => !prev);
	const handleOptionClick = (value: string) => {
		onChange(value);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Include a default option in the options array
	const defaultOption = { value: "all", label: "Select an option" };
	const allOptions = [defaultOption, ...options];

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="flex items-center justify-between w-full px-2 py-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer focus:ring-1 focus:ring-gold-text focus:border-[#B47B2B] dark:bg-[#444444] dark:text-white"
				onClick={handleToggle}
			>
				<span className="font-libre-franklin font-normal text-sm text-black dark:text-white">
					{allOptions.find((option) => option.value === selectedOption)
						?.label || defaultOption.label}
				</span>
				<ChevronDown size={16} className="text-black dark:text-white" />
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#2E2E2E] border border-[#B47B2B] dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
					<div className="max-h-36 overflow-y-auto">
						{allOptions.map((option) => (
							<div
								key={option.value}
								className="font-libre-franklin font-normal text-sm text-black dark:text-white px-4 py-2 hover:bg-[#B47B2B] hover:text-white dark:hover:bg-gray-600 cursor-pointer"
								onClick={() => handleOptionClick(option.value)}
							>
								{option.label}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomDropdown;
