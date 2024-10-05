"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { store } from "@/lib/store";
import { UserRoundCheck } from "lucide-react";

import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase/firebase";

function UserDashboard() {
	const router = useRouter();
	const { currentUser, getUserInfo } = store();
	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			if (user) {
				getUserInfo(user?.uid);
			}
		});
		return () => {
			unSub();
		};
	}, [getUserInfo]);

	return (
		<main className="bg-[#D9D9D9] dark:bg-[#121212]">
			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				{/* Sidebar Navigation */}
				<LeftSideBar />

				{/* Main content area */}
				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] pt-4 px-4 sm:pr-16 pb-[35px] sm:pl-[38px]">
					{/* User Info */}
					<div className="flex max-sm:flex-col gap-4 justify-between items-start sm:items-center">
						<Avatar className="w-[150px] h-[150px] sm:w-[167px] sm:h-[167px] rounded-full">
							<AvatarImage
								src={currentUser?.photoURL}
								alt={"User profile picture"}
							/>
							<AvatarFallback className="text-7xl font-libre-franklin tracking-wide">
								<UserRoundCheck size={70} />
							</AvatarFallback>
						</Avatar>
						<button
							onClick={() => router.push("/my-account/edit-profile")}
							type="button"
							className="text-[#B47B2B] font-open-sans font-normal text-xl leading-[27.24px] capitalize hover:underline"
						>
							edit information
						</button>
					</div>
					<div className="mt-2 mb-[30px]">
						<h2 className="font-open-sans font-normal text-lg text-black dark:text-white sm:pb-2">
							{currentUser?.displayName}
						</h2>
						<p className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white">
							{currentUser?.email}
						</p>
					</div>

					{/* Form */}
					<form className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						{/* Address */}
						<div>
							<label
								htmlFor="userAddress"
								className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
							>
								Address
							</label>
							<input
								id="userAddress"
								value={currentUser?.address}
								className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none"
								aria-label="User Address"
								readOnly
							/>
						</div>

						{/* City */}
						<div>
							<label
								htmlFor="userCity"
								className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
							>
								City
							</label>
							<input
								id="userCity"
								value={currentUser?.city}
								className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none"
								aria-label="User City"
								readOnly
							/>
						</div>

						{/* Country */}
						<div>
							<label
								htmlFor="userCountry"
								className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
							>
								Country
							</label>
							<input
								id="userCountry"
								value={currentUser?.country}
								className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none"
								aria-label="User Country"
								readOnly
							/>
						</div>

						{/* Phone Number */}
						<div>
							<label
								htmlFor="userPhone"
								className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
							>
								Phone
							</label>
							<input
								id="userPhone"
								type="tel"
								value={currentUser?.phoneNumber}
								className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 outline-none"
								aria-label="User Phone"
								readOnly
							/>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

export default UserDashboard;
