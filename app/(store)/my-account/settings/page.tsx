// "use client";

// import React, { useState, useEffect } from "react";
// import { ChevronRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { auth, db } from "@/firebase/firebase";
// import { deleteDoc, doc } from "firebase/firestore";
// import toast from "react-hot-toast";
// import { onAuthStateChanged } from "firebase/auth";
// import { store } from "@/lib/store";

// import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
// import { ModeToggle } from "@/components/ui/light-and-dark-toggle";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { IoTrashBinSharp } from "react-icons/io5";
// import {
// 	AlertDialog,
// 	AlertDialogAction,
// 	AlertDialogCancel,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// const languages = [
// 	{ code: "en", name: "English" },
// 	// { code: "es", name: "Español" },
// 	// { code: "fr", name: "Français" },
// 	// { code: "de", name: "Deutsch" },
// 	// { code: "it", name: "Italiano" },
// ];

// function Settings() {
// 	const router = useRouter();
// 	const [language, setLanguage] = useState("en");
// 	const { currentUser, getUserInfo } = store();

// 	const handleLanguageChange = (value: any) => {
// 		setLanguage(value);
// 		console.log(`Language changed to ${value}`);
// 	};

// 	useEffect(() => {
// 		const unSub = onAuthStateChanged(auth, (user) => {
// 			getUserInfo(user?.uid);
// 		});
// 		return () => {
// 			unSub();
// 		};
// 	}, [getUserInfo]);

// 	const handleDeleteAccount = async () => {
// 		if (currentUser) {
// 			const userId = currentUser.id;

// 			try {
// 				// Delete user data from Firestore
// 				await deleteDoc(doc(db, "users", userId)); // Adjust the collection name as necessary

// 				// Delete user from Firebase Auth
// 				await deleteAccount();
// 			} catch (error) {
// 				console.error("Error deleting account: ", error);
// 				// Handle errors here (e.g., show an error message)
// 			}
// 		}
// 	};

// 	const deleteAccount = async () => {
// 		const user = auth.currentUser;

// 		if (currentUser) {
// 			if (user) {
// 				console.log(user);
// 				try {
// 					// Delete the user from Firebase Auth
// 					await user?.delete();
// 					console.log("User deleted successfully");

// 					// Redirect to homepage
// 					router.push("/");
// 				} catch (error) {
// 					console.error("Error deleting account: ", error);
// 					// Handle errors
// 					toast.error("Something went wrong!");
// 				}
// 			} else {
// 				console.log("No user is currently authenticated");
// 			}
// 		}
// 	};

// 	return (
// 		<main className="bg-[#D9D9D9] dark:bg-[#121212]">
// 			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
// 				{/* Sidebar Navigation */}
// 				<LeftSideBar />

// 				{/* Main content area */}
// 				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] py-[46px] px-[5%] sm:pt-[46px] xl:pr-[146px] sm:pb-[126px] xl:pl-[74px]">
// 					<h2 className="pb-6 font-open-sans font-semibold text-2xl leading-[33.6px] text-figure-text dark:text-white">
// 						Settings
// 					</h2>

// 					<div className="flex flex-col justify-center gap-4">
// 						{/* Language Preferences */}
// 						<div className="border-b-2 border-black dark:border-white py-[10px]">
// 							<div className="flex gap-3 sm:items-center justify-between">
// 								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
// 									<Image
// 										src="/assets/global.svg"
// 										width={24}
// 										height={24}
// 										alt=""
// 									/>
// 								</div>
// 								<div className="flex-1 flex flex-wrap items-center justify-between gap-3 sm:gap-6">
// 									<p className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text dark:text-white">
// 										Language preferences
// 									</p>
// 									<Select
// 										onValueChange={handleLanguageChange}
// 										defaultValue={language}
// 									>
// 										<SelectTrigger className="w-[140px]">
// 											<SelectValue
// 												placeholder="Select language"
// 												className="font-open-sans font-normal text-base leading-8 tracking-[0.01em] text-figure-text dark:text-white"
// 											/>
// 										</SelectTrigger>
// 										<SelectContent>
// 											{languages.map((lang) => (
// 												<SelectItem key={lang.code} value={lang.code}>
// 													{lang.name}
// 												</SelectItem>
// 											))}
// 										</SelectContent>
// 									</Select>
// 								</div>
// 							</div>
// 						</div>

// 						{/* Dark Mode */}
// 						<div className="border-b-2 border-black dark:border-white pb-[10px]">
// 							<div className="flex items-center justify-between">
// 								<div className="flex gap-3 items-center">
// 									<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
// 										<Image
// 											src="/assets/devices.svg"
// 											width={24}
// 											height={24}
// 											alt=""
// 										/>
// 									</div>
// 									<p className="font-open-sans font-normal text-xl leading-8 tracking-[0.01em] text-figure-text dark:text-white">
// 										Dark mode
// 									</p>
// 								</div>
// 								<ModeToggle />
// 							</div>
// 						</div>

// 						{/* Authentication and Security */}
// 						<div className="border-b-2 border-black dark:border-white pb-[10px]">
// 							<div className="flex gap-3 sm:items-center justify-between">
// 								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
// 									<Image
// 										src="/assets/Frame.svg"
// 										width={24}
// 										height={24}
// 										alt=""
// 									/>
// 								</div>
// 								<div
// 									className="flex-1 flex items-center justify-between gap-3 sm:gap-6 cursor-pointer"
// 									onClick={() =>
// 										router.push("/my-account/settings/change-password")
// 									}
// 								>
// 									<p className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text dark:text-white">
// 										Change Password
// 									</p>
// 									<ChevronRight className="w-6 h-6 sm:h-8 sm:w-8" />
// 								</div>
// 							</div>
// 						</div>

// 						{/* Delete Account */}
// 						<div className="border-b-2 border-black dark:border-white pb-[10px]">
// 							<div className="flex gap-3 sm:items-center justify-between">
// 								<div className="w-10 h-10 border rounded-lg bg-black flex justify-center items-center shrink-0">
// 									<IoTrashBinSharp size={24} className="text-[#fdae3f]" />
// 								</div>
// 								<div className="flex-1 flex items-center justify-between gap-3 sm:gap-6">
// 									<AlertDialog>
// 										<AlertDialogTrigger asChild>
// 											<button className="font-open-sans font-normal text-lg sm:text-xl sm:leading-8 tracking-[0.01em] text-figure-text outline-none hover:text-[#F23E3E] dark:text-white dark:hover:text-[#F23E3E]">
// 												Delete account
// 											</button>
// 										</AlertDialogTrigger>
// 										<AlertDialogContent>
// 											<AlertDialogHeader>
// 												<AlertDialogTitle className="font-open-sans font-semibold text-xl sm:text-2xl sm:mb-1 text-figure-text dark:text-white">
// 													Are you absolutely sure?
// 												</AlertDialogTitle>
// 												<AlertDialogDescription className="font-open-sans font-normal text-base sm:text-lg text-figure-text my-4 dark:text-gray-300">
// 													This action cannot be undone. This will permanently
// 													delete your account and remove your data from our
// 													server.
// 												</AlertDialogDescription>
// 											</AlertDialogHeader>
// 											<AlertDialogFooter>
// 												<div className="w-[150px]">
// 													<AlertDialogCancel className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-lighter-black p-[10px] border border-[#F23E3E] rounded-lg focus:ring-1 focus:ring-[#F23E3E] outline-none">
// 														Cancel
// 													</AlertDialogCancel>
// 												</div>
// 												<div className="w-[150px]">
// 													<button onClick={handleDeleteAccount}>
// 														<AlertDialogAction className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-white p-[10px] border border-[#F23E3E] bg-[#F23E3E] outline-none rounded-lg hover:scale-95 duration-300 focus:ring-1 focus:ring-[#F23E3E]">
// 															Continue
// 														</AlertDialogAction>
// 													</button>
// 												</div>
// 											</AlertDialogFooter>
// 										</AlertDialogContent>
// 									</AlertDialog>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</main>
// 	);
// }

// export default Settings;

"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
import { ModeToggle } from "@/components/ui/light-and-dark-toggle";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IoTrashBinSharp } from "react-icons/io5";
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
								<ConfirmDeleteUser />
							</Modal>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Settings;
