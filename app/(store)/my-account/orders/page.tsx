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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

	const handleLanguageChange = (value: any) => {
		setLanguage(value);
		console.log(`Language changed to ${value}`);
	};

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

export default Settings;
