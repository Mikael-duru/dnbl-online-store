"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoTrashBinSharp } from "react-icons/io5";

import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
import { ModeToggle } from "@/components/ui/light-and-dark-toggle";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ConfirmDeleteUser from "@/components/user-dashboard/ConfirmDeleteUser";
import Modal from "@/components/modal/modal";

const languages = [
	{ code: "en", name: "English" },
	// { code: "es", name: "Español" },
	// { code: "fr", name: "Français" },
	// { code: "de", name: "Deutsch" },
	// { code: "it", name: "Italiano" },
];

function Settings() {
	const router = useRouter();
	const [language, setLanguage] = useState("en");
	const [open, setOpen] = useState(false);

	const handleLanguageChange = (value: any) => {
		setLanguage(value);
		console.log(`Language changed to ${value}`);
	};

	return (
		<main className="bg-[#D9D9D9] dark:bg-[#121212]">
			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				{/* Sidebar Navigation */}
				<LeftSideBar />

				{/* Main content area */}
				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] py-[46px] px-[5%] sm:pt-[46px] xl:pr-[146px] sm:pb-[126px] xl:pl-[74px]">
					<h2 className="pb-6 font-open-sans font-semibold text-2xl leading-[33.6px] text-figure-text dark:text-white">
						Settings
					</h2>

					<div className="flex flex-col justify-center gap-4">
						{/* Language Preferences */}
						<div className="border-b-2 border-black dark:border-white py-[10px]">
							<div className="flex gap-3 sm:items-center justify-between">
								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
									<Image
										src="/assets/global.svg"
										width={24}
										height={24}
										alt=""
									/>
								</div>
								<div className="flex-1 flex flex-wrap items-center justify-between gap-3 sm:gap-6">
									<p className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text dark:text-white">
										Language preferences
									</p>
									<Select
										onValueChange={handleLanguageChange}
										defaultValue={language}
									>
										<SelectTrigger className="w-[140px]">
											<SelectValue
												placeholder="Select language"
												className="font-open-sans font-normal text-base leading-8 tracking-[0.01em] text-figure-text dark:text-white"
											/>
										</SelectTrigger>
										<SelectContent>
											{languages.map((lang) => (
												<SelectItem key={lang.code} value={lang.code}>
													{lang.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>

						{/* Dark Mode */}
						<div className="border-b-2 border-black dark:border-white pb-[10px]">
							<div className="flex items-center justify-between">
								<div className="flex gap-3 items-center">
									<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
										<Image
											src="/assets/devices.svg"
											width={24}
											height={24}
											alt=""
										/>
									</div>
									<p className="font-open-sans font-normal text-xl leading-8 tracking-[0.01em] text-figure-text dark:text-white">
										Dark mode
									</p>
								</div>
								<ModeToggle />
							</div>
						</div>

						{/* Authentication and Security */}
						<div className="border-b-2 border-black dark:border-white pb-[10px]">
							<div className="flex gap-3 sm:items-center justify-between">
								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
									<Image
										src="/assets/Frame.svg"
										width={24}
										height={24}
										alt=""
									/>
								</div>
								<div
									className="flex-1 flex items-center justify-between gap-3 sm:gap-6 cursor-pointer"
									onClick={() =>
										router.push("/my-account/settings/change-password")
									}
								>
									<p className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text dark:text-white">
										Change Password
									</p>
									<ChevronRight className="w-6 h-6 sm:h-8 sm:w-8" />
								</div>
							</div>
						</div>

						{/* Delete Account */}
						<div className="border-b-2 border-black dark:border-white pb-[10px]">
							<div className="flex gap-3 sm:items-center justify-start">
								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
									<IoTrashBinSharp size={24} className="text-[#fdae3f]" />
								</div>
								<button
									className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text outline-none hover:text-[#F23E3E] dark:text-white dark:hover:text-[#F23E3E]"
									onClick={() => setOpen(!open)}
								>
									Delete account
								</button>
							</div>
							<Modal open={open} setOpen={setOpen}>
								<ConfirmDeleteUser setOpen={setOpen} />
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Settings;
