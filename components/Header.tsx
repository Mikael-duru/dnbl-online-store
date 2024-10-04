"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
	CircleUserRound,
	LogOut,
	UserRound,
	UserRoundCheck,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import useCart from "@/lib/hook/useCart";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const primaryNavigation = [
	{ title: "Home", link: "/" },
	{ title: "About Us", link: "/about-us" },
	{ title: "Products", link: "/product" },
	{ title: "Favourites", link: "/wishlists" },
];

function Header() {
	const [user, setUser] = useState<User | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string>("");
	const [email, setEmail] = useState<string | null>(null);
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const cart = useCart();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);

				const userDoc = await getDoc(doc(db, "users", user.uid));
				if (userDoc.exists()) {
					const userData = userDoc.data();
					setUserName(`${userData.displayName}`);
					setEmail(userData.email);
					setPhotoURL(userData.photoURL);
				}

				// Check if the user's email is verified
				// if (user.emailVerified) {
				// 	try {
				// 		// Retrieve user data from localStorage
				// 		const storedUserData = localStorage.getItem("GoogleUserData");
				// 		if (storedUserData) {
				// 			const parsedUserData = JSON.parse(storedUserData);
				// 			const { firstName, lastName, displayName, photoURL } =
				// 				parsedUserData;

				// 			// Check if the user already exists in Firestore
				// 			const userDoc = await getDoc(doc(db, "users", user.uid));
				// 			if (!userDoc.exists()) {
				// 				// Save user data to Firestore after email verification
				// 				await setDoc(doc(db, "users", user.uid), {
				// 					firstName,
				// 					lastName,
				// 					email: user.email,
				// 					id: user.uid,
				// 					photoURL: photoURL || user.photoURL,
				// 					address: "",
				// 					city: "",
				// 					country: "",
				// 					phoneNumber: "",
				// 					displayName: displayName || "",
				// 				});
				// 			}
				// 		} else {
				// 			console.error("GoogleUserData not found in localStorage");
				// 		}

				// 		// Fetch user data from Firestore
				// 		const userDoc = await getDoc(doc(db, "users", user.uid));
				// 		if (userDoc.exists()) {
				// 			const userData = userDoc.data();
				// 			setUserName(`${userData.displayName}`);
				// 			setEmail(userData.email);
				// 			setPhotoURL(userData.photoURL);
				// 		}
				// 	} catch (error) {
				// 		console.error("Error retrieving or saving user data:", error);
				// 	}
				// }
			}
		});
		// Clean up subscription on unmount
		return () => unsubscribe();
	}, [router]);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success("You have been signed out.");
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	// Close menu on any screen size change
	useEffect(() => {
		const handleResize = () => {
			setIsMenuOpen(false);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Helper function for navigation items
	const NavItem = ({ title, link }: any) => (
		<li
			className={`font-open-sans text-xl font-normal p-[10px] cursor-pointer ${
				pathname === link
					? "text-[#231867] dark:text-[#B47B2B]"
					: "text-[#292D32] dark:text-white"
			} hover:text-[#B47B2B]`}
		>
			<Link href={link} onClick={closeMenu}>
				{title}
			</Link>
		</li>
	);

	// Helper function for icon buttons
	const IconButton = ({ href, iconSrc, notificationCount = null }: any) => (
		<button
			onClick={closeMenu}
			className="relative focus:ring-2 focus:ring-[#B47B2B] outline-none"
		>
			<Link href={href}>
				<Image
					src={iconSrc}
					width={32}
					height={32}
					alt=""
					className="dark:invert"
				/>
				{notificationCount !== null && (
					<span className="w-[16.5px] h-[16.5px] rounded-full p-[4.4px] flex items-center justify-center bg-[#C51818] font-inter text-[11px] text-white absolute top-0 right-0">
						{notificationCount}
					</span>
				)}
			</Link>
		</button>
	);

	return (
		<header className="px-[5%] py-5 2xl:px-[6.25rem] bg-white dark:bg-[#1E1E1E] dark:border-b-2 dark:border-b-dark-brown shadow-header-shadow relative">
			<div className="flex items-center justify-between 2xl:gap-[6.25rem]">
				<Link
					href={"/"}
					className="shrink-0 w-[120px] sm:w-[138px]"
					onClick={closeMenu}
				>
					<Image
						src="/assets/logo-black.svg"
						width={138}
						height={60}
						alt="DNBL logo"
						className="w-[138px] h-[60px] object-contain dark:invert"
					/>
				</Link>

				{/* Navigation for larger screens */}
				<nav className="flex items-center gap-[54px] lg:gap-20 xl:gap-12 2xl:gap-[54px] shrink-0">
					{/* Primary navigation */}
					<ul className="max-xl:hidden flex items-center gap-5">
						{primaryNavigation.map((item) => (
							<NavItem key={item.title} {...item} />
						))}
					</ul>

					{/* Icons Menu */}
					<div className="flex justify-center items-center gap-4 sm:gap-8">
						<ul className="max-sm:hidden flex gap-8">
							<IconButton
								href="/search-products"
								iconSrc="/assets/search-normal.svg"
							/>
							<IconButton
								href="/notice"
								iconSrc="/assets/notification.svg"
								notificationCount={0}
							/>
							<IconButton
								href="/cart"
								iconSrc="/assets/bytesize_cart.svg"
								notificationCount={cart.cartItems.length}
							/>
						</ul>

						{!user ? (
							<button
								className="w-[35px] h-[35px] rounded-full flex items-center justify-center shrink-0 hover:text-[#B47B2B] focus:ring-1 focus:ring-[#B47B2B] duration-200 cursor-pointer outline-none border-none"
								onClick={() => router.push("/sign-in")}
							>
								<CircleUserRound className="w-full h-full" />
							</button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									{photoURL ? (
										<Avatar
											onClick={closeMenu}
											className="w-12 h-12 rounded-full shrink-0 focus:ring-1 focus:ring-[#B47B2B] duration-200 cursor-pointer"
										>
											<AvatarImage
												src={photoURL}
												alt={"User profile picture"}
											/>
										</Avatar>
									) : (
										<Avatar
											onClick={closeMenu}
											className="w-12 h-12 rounded-full shrink-0 focus:ring-1 focus:ring-[#B47B2B] duration-200 cursor-pointer"
										>
											<AvatarFallback className="font-libre-franklin tracking-wide">
												<UserRoundCheck size={24} />
											</AvatarFallback>
										</Avatar>
									)}
								</DropdownMenuTrigger>
								<DropdownMenuContent className="relative top-8 max-sm:right-2 right-10 xl:right-0 bg-white dark:bg-[#1E1E1E] flex flex-col justify-center">
									<DropdownMenuLabel>
										<div className="flex items-center gap-2 px-2 pt-4 pb-3">
											{/* profile picture */}
											{photoURL ? (
												<Avatar
													onClick={closeMenu}
													className="w-12 h-12 shrink-0"
												>
													<AvatarImage
														src={photoURL}
														alt={"User profile picture"}
													/>
												</Avatar>
											) : (
												<Avatar
													onClick={closeMenu}
													className="w-12 h-12 rounded-full shrink-0"
												>
													<AvatarFallback className="font-libre-franklin tracking-wide">
														<UserRoundCheck size={24} />
													</AvatarFallback>
												</Avatar>
											)}

											{/* Name and email */}
											<div className="flex-1 shrink-0">
												{userName && (
													<h1 className="font-open-sans font-semibold text-[15px] lg:text-base text-black dark:text-white">
														{userName}
													</h1>
												)}
												{email && (
													<p className="font-open-sans font-normal text-sm lg:text-[15px] text-black dark:text-gray-300">
														{email}
													</p>
												)}
											</div>
										</div>
									</DropdownMenuLabel>
									<hr />
									<Link href={"/my-account"}>
										<DropdownMenuItem className="cursor-pointer m-3">
											<UserRound className="mr-2 h-4 w-4" />
											<span className="font-open-sans font-normal text-sm text-black dark:text-white">
												Manage Account
											</span>
										</DropdownMenuItem>
									</Link>
									<button onClick={handleLogout}>
										<DropdownMenuItem className="cursor-pointer mx-3 mb-4 text-red-500 dark:text-red-500">
											<LogOut className="mr-2 h-4 w-4" />
											<span className="font-open-sans font-normal text-sm">
												Log out
											</span>
										</DropdownMenuItem>
									</button>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{/* Mobile Nav */}
						<Link href={"/contact-us"} className="max-2xl:hidden w-[200px]">
							<ButtonPrimary
								type="button"
								onClick={closeMenu}
								label="Contact Us"
							/>
						</Link>

						<div className="xl:hidden relative">
							<DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
								<DropdownMenuTrigger asChild>
									<button
										onClick={() => setIsMenuOpen(!isMenuOpen)}
										className="outline-none flex items-center justify-center rounded focus:ring-2 focus:ring-[#B47B2B]"
									>
										<IoMenu size={32} />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="relative top-8 max-sm:right-4 right-10 xl:right-0 bg-white dark:bg-[#1E1E1E] flex flex-col gap-2 justify-center items-center p-4">
									{primaryNavigation.map(({ title, link }) => (
										<DropdownMenuItem
											key={title}
											className={`font-open-sans text-xl font-normal cursor-pointer px-14 ${
												pathname === link
													? "text-[#231867] dark:text-[#B47B2B]"
													: "text-[#292D32] dark:text-white"
											} hover:text-[#B47B2B]`}
										>
											<Link href={link} onClick={closeMenu}>
												{title}
											</Link>
										</DropdownMenuItem>
									))}

									<DropdownMenuItem className="sm:hidden">
										<Link
											href="/cart"
											onClick={closeMenu}
											className="flex items-center gap-2 hover:text-[#B47B2B]"
										>
											<Image
												src="/assets/bytesize_cart.svg"
												width={32}
												height={32}
												alt=""
												className="dark:invert"
											/>
											<span className="font-open-sans text-xl font-normal cursor-pointer text-[#292D32] dark:text-white">
												Cart
											</span>
											{cart.cartItems.length !== null && (
												<span className="font-inter text-xl font-normal text-[#292D32] dark:text-gray-400 text-center tracking-[-0.33px]">
													({cart.cartItems.length})
												</span>
											)}
										</Link>
									</DropdownMenuItem>

									<DropdownMenuItem>
										<Link
											href={"/search-products"}
											className="w-[180px] sm:hidden"
										>
											<ButtonSecondary
												type="button"
												onClick={closeMenu}
												label="Search Products..."
											/>
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default Header;
