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
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import useCart from "@/lib/hook/useCart";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import toast from "react-hot-toast";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const primaryNavigation = [
	{ title: "Home", link: "/" },
	{ title: "About Us", link: "/about-us" },
	{ title: "Products", link: "/product" },
];

function Header() {
	const [user, setUser] = useState<User | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string>("");
	const router = useRouter();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();
	const cart = useCart();

	useEffect(() => {
		// Set up an authentication state listener
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				// User is signed in; update user state
				setUser(user);

				// Reference to the user's document in Firestore
				const userDocRef = doc(db, "users", user.uid);

				// Listen for real-time updates to the user's document in Firestore
				const unsubscribeDoc = onSnapshot(userDocRef, async (doc) => {
					if (doc.exists()) {
						// Update local state with user data from Firestore
						const userData = doc.data();
						if (userData.isEmailVerified) {
							setUserName(userData.displayName || ""); // Default to empty if not available
							setPhotoURL(userData.photoURL || ""); // Default to empty if not available
							// Remove social data from localStorage after saving
							localStorage.removeItem("GoogleData");
							localStorage.removeItem("FacebookData");
						} else {
							setUser(null);
						}
					} else {
						// User document does not exist; handle new users
						console.error(
							"User document does not exist. Attempting to save new user data."
						);

						try {
							const googleStoredData = localStorage.getItem("GoogleData");
							const facebookStoredData = localStorage.getItem("FacebookData");

							// Parse both Google and Facebook data
							const parsedGoogleData = googleStoredData
								? JSON.parse(googleStoredData)
								: null;
							const parsedFacebookData = facebookStoredData
								? JSON.parse(facebookStoredData)
								: null;

							let userDataToSave = null;

							// Check if Google data matches user UID
							if (parsedGoogleData && parsedGoogleData.id === user.uid) {
								userDataToSave = parsedGoogleData;
							}
							// Check if Facebook data matches user UID
							else if (
								parsedFacebookData &&
								parsedFacebookData.id === user.uid
							) {
								userDataToSave = parsedFacebookData;
							}

							if (userDataToSave) {
								await setDoc(userDocRef, userDataToSave);

								// Remove social data from localStorage after saving
								localStorage.removeItem("GoogleData");
								localStorage.removeItem("FacebookData");

								// Fetch user data from Firestore again to update local state
								const updatedUserDoc = await getDoc(userDocRef);
								if (updatedUserDoc.exists()) {
									const userData = updatedUserDoc.data();
									setUserName(userData.displayName || ""); // Update display name
									setPhotoURL(userData.photoURL || ""); // Update photo URL
								}
							} else {
								console.error("No matching user data found in localStorage"); // Log error if no match found
							}
						} catch (error) {
							// Log any errors that occur during retrieval or saving of user data
							console.error("Error retrieving or saving user data:", error);
						}
					}
				});

				// Clean up the Firestore listener when the component unmounts
				return () => unsubscribeDoc();
			} else {
				// User is signed out; reset state
				setUser(null); // Clear user state
				setUserName(""); // Clear display name
				setPhotoURL(""); // Clear photo URL
			}
		});

		// Clean up the authentication listener when the component unmounts
		return () => unsubscribe();
	}, []); // Empty dependency array means this effect runs once on mount

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			setUserName("");
			setPhotoURL("");
			toast.success("You have signed out.");
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
			} hover:text-[#B47B2B] dark:hover:text-[#B47B2B]`}
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
					width={48}
					height={48}
					alt=""
					className="dark:invert w-8 h-8"
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
						width={200}
						height={199}
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

						{/* Favourites */}
						<li
							className={`font-open-sans text-xl font-normal p-[10px] cursor-pointer ${
								pathname === "/wishlists"
									? "text-[#231867] dark:text-[#B47B2B]"
									: "text-[#292D32] dark:text-white"
							} hover:text-[#B47B2B] dark:hover:text-[#B47B2B]`}
						>
							<Link href={!user ? "/sign-in" : "/wishlists"}>Favourites</Link>
						</li>
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
								className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 hover:text-[#B47B2B] focus:ring-1 focus:ring-[#B47B2B] duration-200 cursor-pointer outline-none border-none"
								onClick={() => router.push("/sign-in")}
							>
								<CircleUserRound className="w-full h-full" />
							</button>
						) : (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									{user && (
										<Avatar
											onClick={closeMenu}
											className="w-12 h-12 rounded-full shrink-0 focus:ring-1 focus:ring-[#B47B2B] duration-200 cursor-pointer"
										>
											<AvatarImage
												src={user?.photoURL || photoURL}
												alt={"User profile picture"}
											/>
											<AvatarFallback className="font-libre-franklin tracking-wide">
												<UserRoundCheck size={24} />
											</AvatarFallback>
										</Avatar>
									)}
								</DropdownMenuTrigger>
								<DropdownMenuContent className="mt-1 mx-4 bg-white dark:bg-[#1E1E1E] dark:border-[#B47B2B] flex flex-col justify-center">
									<DropdownMenuLabel>
										<div className="flex items-center gap-2 px-2 pt-4 pb-3">
											{/* profile picture */}
											{user && (
												<Avatar
													onClick={closeMenu}
													className="w-12 h-12 shrink-0"
												>
													<AvatarImage
														src={user?.photoURL || photoURL}
														alt={"User profile picture"}
													/>
													<AvatarFallback className="font-libre-franklin tracking-wide">
														<UserRoundCheck size={24} />
													</AvatarFallback>
												</Avatar>
											)}

											{/* Name and email */}
											{user && (
												<div className="flex-1 shrink-0">
													<h1 className="font-open-sans font-semibold text-[15px] lg:text-base text-black dark:text-white">
														{user.displayName || userName}
													</h1>
													<p className="font-open-sans font-normal text-sm lg:text-[15px] text-black dark:text-gray-300">
														{user?.email}
													</p>
												</div>
											)}
										</div>
									</DropdownMenuLabel>
									<hr className="dark:border-[#B47B2B]" />
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

						{/* Contact Us */}
						<Link
							href={"/contact-us"}
							className="max-xl:hidden w-[150px] 2xl:w-[200px]"
						>
							<ButtonPrimary
								type="button"
								onClick={closeMenu}
								label="Contact Us"
							/>
						</Link>

						{/* Mobile Nav */}
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
								<DropdownMenuContent className="mt-3 mx-4 bg-white dark:bg-[#1E1E1E] dark:border-[#B47B2B] flex flex-col gap-2 justify-center items-center p-4">
									{primaryNavigation.map(({ title, link }) => (
										<DropdownMenuItem
											key={title}
											className={`font-open-sans text-xl font-normal cursor-pointer px-14 ${
												pathname === link
													? "text-[#231867] dark:text-[#B47B2B]"
													: "text-[#292D32] dark:text-white"
											} hover:text-[#B47B2B] dark:hover:text-[#B47B2B]`}
										>
											<Link href={link} onClick={closeMenu}>
												{title}
											</Link>
										</DropdownMenuItem>
									))}

									{/* Favourites */}
									<DropdownMenuItem
										className={`font-open-sans text-xl font-normal p-[10px] cursor-pointer ${
											pathname === "/wishlists"
												? "text-[#231867] dark:text-[#B47B2B]"
												: "text-[#292D32] dark:text-white"
										} hover:text-[#B47B2B] dark:hover:text-[#B47B2B]`}
									>
										<Link href={!user ? "/sign-in" : "/wishlists"}>
											Favourites
										</Link>
									</DropdownMenuItem>

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
