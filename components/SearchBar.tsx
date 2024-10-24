"use client";

import React, { useState, useEffect } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SearchBar = () => {
	const [queries, setQueries] = useState<string>("");
	const [recentSearches, setRecentSearches] = useState<string[]>([]);
	const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
	const router = useRouter();

	// Load recent searches from cookies on mount
	useEffect(() => {
		const storedRecentSearches = Cookies.get("recentSearches");
		if (storedRecentSearches) {
			setRecentSearches(JSON.parse(storedRecentSearches));
		}
	}, []);

	const handleSearchButtonClick = () => {
		const query = queries.trim();

		if (query) {
			// Save the search term to recent searches
			const updatedRecentSearches = [
				query,
				...recentSearches.filter((term) => term !== query),
			].slice(0, 5);
			setRecentSearches(updatedRecentSearches);
			Cookies.set("recentSearches", JSON.stringify(updatedRecentSearches), {
				expires: 7,
			});

			// Navigate to the search results page
			router.push(`/search/${query}`);
			setQueries("");
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearchButtonClick();
		}
	};

	const handleRecentSearchClick = (term: string) => {
		setQueries(term);
		setShowRecentSearches(false);
	};

	const handleDeleteRecentSearch = (term: string) => {
		const updatedRecentSearches = recentSearches.filter(
			(search) => search !== term
		);
		setRecentSearches(updatedRecentSearches);
		Cookies.set("recentSearches", JSON.stringify(updatedRecentSearches));
	};

	const handleClearAllRecentSearches = () => {
		setRecentSearches([]);
		Cookies.remove("recentSearches");
	};

	return (
		<div className="flex items-center gap-4">
			<div className="inline-flex w-full md:w-[350px] 2xl:w-[450px] relative">
				<input
					type="text"
					onChange={(e) => setQueries(e.target.value)}
					value={queries}
					onKeyDown={handleKeyPress}
					onFocus={() => setShowRecentSearches(true)}
					onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
					placeholder="Search for products..."
					className="w-full flex-1 rounded-[10px] text-black dark:text-white bg-white dark:bg-[#444444] placeholder:text-lighter-gray dark:placeholder:text-white placeholder:font-medium shadow-sm ring-1 ring-inset ring-[#B57C2C] dark:ring-[#B57C2C] placeholder:text-base placeholder:tracking-[0.6px] focus:ring-1 focus:ring-[#B57C2C] p-3 outline-none"
				/>
				{queries && (
					<IoClose
						size={24}
						onClick={() => setQueries("")}
						className="absolute top-3 right-[14px] text-lighter-gray dark:text-white hover:text-error cursor-pointer duration-200"
					/>
				)}
			</div>
			<button
				type="button"
				onClick={handleSearchButtonClick}
				className="flex flex-col justify-center items-center p-3 gap-2 shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold text-white bg-btn-gold hover:scale-95 duration-300"
			>
				<IoSearchOutline size={24} className="text-white" />
			</button>

			{showRecentSearches && recentSearches.length > 0 && (
				<div className="absolute top-12 lg:top-16 z-10 w-[88%] md:w-[350px] 2xl:w-[450px] bg-white dark:bg-[#444444] border border-gray-300 dark:border-gray-600 rounded-lg mt-7 shadow-lg">
					<div className="flex justify-between p-2">
						<span className="font-semibold text-sm">Recent Searches</span>
						<button
							onClick={handleClearAllRecentSearches}
							className="text-sm text-red-500 hover:underline"
						>
							Clear All
						</button>
					</div>
					<ul>
						{recentSearches.map((term, index) => (
							<li
								key={index}
								className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
								onClick={() => handleRecentSearchClick(term)}
							>
								<span className="text-black dark:text-white">{term}</span>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteRecentSearch(term);
									}}
									className="text-gray-500 hover:text-red-500"
								>
									<IoClose size={16} />
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SearchBar;
