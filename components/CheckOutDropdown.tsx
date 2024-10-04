import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react"; // Import icons from Lucide

interface DropdownProps {
	options: { iso2: string; name: string }[];
	selectedOption: string;
	onChange: (value: string) => void;
}

const CheckOutDropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const handleToggle = () => setIsOpen((prev) => !prev);
	const handleOptionClick = (value: string) => {
		onChange(value);
		setIsOpen(false);
		setSearchText(""); // Clear the search text on selection
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

	const filteredOptions = options.filter((option) =>
		option.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const clearSearch = () => setSearchText("");

	return (
		<div className="relative" ref={dropdownRef}>
			<div className="relative" onClick={handleToggle}>
				<input
					type="text"
					className="flex items-center justify-between w-full rounded-lg border border-gold-text py-4 pl-4 pr-3 shadow-sm cursor-pointer focus:ring-1 focus:ring-gold-text focus:border-[#B47B2B] font-libre-franklin font-normal text-sm text-black dark:text-white dark:bg-[#444444] outline-none"
					placeholder="Select Option"
					value={
						options.find((option) => option.name === selectedOption)?.name || ""
					}
					readOnly
				/>
				<ChevronDown
					size={20}
					className="absolute top-4 right-3 text-black dark:text-white"
				/>
			</div>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#2E2E2E] border border-[#B47B2B] dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
					<div className="flex items-center px-4 py-2">
						<input
							type="text"
							className="flex-1 border-none outline-none dark:bg-[#2E2E2E] dark:text-white"
							placeholder="Search..."
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
						{searchText && (
							<X
								size={20}
								className="cursor-pointer text-black dark:text-white"
								onClick={clearSearch}
							/>
						)}
					</div>
					<hr />
					<div className="max-h-60 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option) => (
								<div
									key={option.iso2}
									className="font-libre-franklin font-normal text-sm text-black dark:text-white px-4 py-2 hover:bg-[#B47B2B] hover:text-white dark:hover:bg-gray-600 cursor-pointer"
									onClick={() => handleOptionClick(option.name)}
								>
									{option.name}
								</div>
							))
						) : (
							<div className="font-libre-franklin font-normal text-sm text-black dark:text-white px-4 py-2">
								No options found
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CheckOutDropdown;
