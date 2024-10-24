"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
	CircleUserRound,
	ShoppingBag,
	// Heart,
	// BellRing,
	Settings,
} from "lucide-react";
import { CiMenuKebab } from "react-icons/ci";

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
	const pathname = usePathname();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
						className="cursor-pointer lg:hidden text-black dark:text-white text-xl"
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
					</ul>
				</nav>
			</div>
		</main>
	);
}

export default UserDashboard;
