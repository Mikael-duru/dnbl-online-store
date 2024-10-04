"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	CircleUserRound,
	ShoppingBag,
	// Heart,
	// BellRing,
	Settings,
	LogOut,
} from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import LogOutModal from "../LogOutModal";
import toast from "react-hot-toast";

const userNavigation = [
	{
		icon: <CircleUserRound size={24} />,
		title: "Profile",
		link: "/my-account",
	},
	{
		icon: <CircleUserRound size={24} />,
		title: "Edit Profile",
		link: "/my-account/edit-profile",
	},
	{
		icon: <ShoppingBag size={24} />,
		title: "My Orders",
		link: "/my-account/orders",
	},
	// {
	// 	icon: <Heart size={24} />,
	// 	title: "Wishlist",
	// 	link: "/my-account/favourites",
	// },
	// {
	// 	icon: <BellRing size={24} />,
	// 	title: "Notification",
	// 	link: "/notification",
	// },
	{
		icon: <Settings size={24} />,
		title: "Change Password",
		link: "/my-account/settings/change-password",
	},
	{
		icon: <Settings size={24} />,
		title: "Settings",
		link: "/my-account/settings",
	},
];

function UserDashboard() {
	const router = useRouter();
	const pathname = usePathname();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success("You have been signed out.");
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	// Helper function for navigation items
	const NavItem = ({ icon, title, link }: any) => (
		<Link href={link}>
			<li
				className={`flex items-center gap-6 font-open-sans text-lg leading-[28.8px] font-normal p-[10px] cursor-pointer ${
					pathname === link ||
					(pathname === "/my-account/edit-profile" && title === "Profile") ||
					(pathname === "/my-account/settings/change-password" &&
						title === "Settings")
						? "bg-black text-white"
						: "text-[#141414] dark:text-white"
				} hover:bg-black hover:text-white`}
			>
				<span>{icon}</span>
				{title}
			</li>
		</Link>
	);

	return (
		<main>
			<div className="w-[286px] max-lg:w-full flex flex-col gap-4 py-4 px-[10px] bg-white dark:bg-[#1E1E1E] shadow-sm">
				<div className="flex items-center justify-between">
					<h1 className="font-open-sans font-semibold text-xl text-black dark:text-white">
						My Account
					</h1>
					<CiMenuKebab
						className="cursor-pointer lg:hidden"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					/>
				</div>
				{/* Dropdown for smaller screens */}
				<nav
					className={`overflow-hidden transition-max-height duration-300 ease-in-out pt-[10px] lg:hidden ${
						isDropdownOpen ? "max-h-80" : "max-h-0"
					}`}
				>
					<ul className="flex flex-col gap-4">
						{userNavigation
							.filter(
								(item) =>
									item.title !== "Edit Profile" &&
									item.title !== "Change Password"
							)
							.map((item) => (
								<NavItem key={item.title} {...item} />
							))}

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<div className="font-open-sans font-normal text-lg leading-[28.8px] cursor-pointer p-[10px] text-red-500 flex items-center gap-6">
									<LogOut size={24} />
									<span>Log out</span>
								</div>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<LogOutModal />
								</AlertDialogHeader>
								<AlertDialogFooter>
									<div className="w-[150px]">
										<AlertDialogCancel className="w-full text-base leading-[21.79px] font-open-sans font-semibold p-[10px] border border-[#F23E3E] rounded-lg focus:ring-1 focus:ring-[#F23E3E] outline-none">
											Cancel
										</AlertDialogCancel>
									</div>
									<div className="w-[150px]">
										<button onClick={handleLogout} className="w-full">
											<AlertDialogAction className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-white p-[10px] border border-[#F23E3E] bg-[#F23E3E] outline-none rounded-lg hover:scale-95 duration-300 focus:ring-1 focus:ring-[#F23E3E]">
												Log Out
											</AlertDialogAction>
										</button>
									</div>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</ul>
				</nav>

				{/* Large screen menu */}
				<nav className="max-lg:hidden">
					<ul className="flex-col gap-4 flex pt-[10px]">
						{userNavigation
							.filter(
								(item) =>
									item.title !== "Edit Profile" &&
									item.title !== "Change Password"
							)
							.map((item) => (
								<NavItem key={item.title} {...item} />
							))}

						<AlertDialog>
							<AlertDialogTrigger asChild>
								<div className="font-open-sans font-normal text-lg leading-[28.8px] cursor-pointer p-[10px] text-red-500 flex items-center gap-6">
									<LogOut size={24} />
									<span>Log out</span>
								</div>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<LogOutModal />
								</AlertDialogHeader>
								<AlertDialogFooter>
									<div className="w-[150px]">
										<AlertDialogCancel className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-lighter-black p-[10px] border border-[#F23E3E] rounded-lg focus:ring-1 focus:ring-[#F23E3E] outline-none">
											Cancel
										</AlertDialogCancel>
									</div>
									<div className="w-[150px]">
										<button onClick={handleLogout} className="w-full">
											<AlertDialogAction className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-white p-[10px] border border-[#F23E3E] bg-[#F23E3E] outline-none rounded-lg hover:scale-95 duration-300 focus:ring-1 focus:ring-[#F23E3E]">
												Log Out
											</AlertDialogAction>
										</button>
									</div>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</ul>
				</nav>
			</div>
		</main>
	);
}

export default UserDashboard;
