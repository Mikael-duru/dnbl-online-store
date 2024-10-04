"use client";

import React from "react";
import LeftSideBar from "@/components/user-dashboard/LeftSideBar";

function CustomerOrders() {
	return (
		<main className="bg-[#D9D9D9]  dark:bg-[#121212]">
			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				{/* Sidebar Navigation */}
				<LeftSideBar />

				{/* Main content area */}
				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] pt-4 px-4 sm:pr-16 pb-[35px] sm:pl-[38px]">
					<h2 className="pb-6 font-open-sans font-semibold text-2xl leading-[33.6px] text-figure-text dark:text-white">
						My Orders
					</h2>
				</div>
			</div>
		</main>
	);
}

export default CustomerOrders;
