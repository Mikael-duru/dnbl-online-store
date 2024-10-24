"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import ButtonPrimary from "@/components/custom-buttons/ButtonPrimary";
import Loader from "@/components/Loader";
import { auth } from "@/firebase/firebase";
import { getProductDetails } from "@/lib/actions/actions";
import Pagination from "@/components/Pagination";
import WishListCard from "@/components/WishListCard";
import { onAuthStateChanged, type User } from "firebase/auth";
import RecentlyViewed from "@/components/RecentlyViewedProducts";

const COOKIE_NAME = "currentWishListPage";

const Wishlist = () => {
	const [loading, setLoading] = useState(true);
	const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
	const [wishlist, setWishlist] = useState<ProductType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10
	const [user, setUser] = useState<User | null>(null);

	// Check authentication state
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe(); // Cleanup subscription
	}, []);

	const getUser = async () => {
		try {
			if (user) {
				const idToken = await user.getIdToken();

				const res = await fetch("/api/users", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${idToken}`,
						"Content-Type": "application/json",
					},
				});
				const data = await res.json();
				setSignedInUser(data);
				setLoading(false);
			} else {
				console.log("User not found");
			}
		} catch (err) {
			console.log("[users_GET", err);
		}
	};

	useEffect(() => {
		if (user) {
			getUser();
		}
	}, [user]);

	console.log(signedInUser);

	useEffect(() => {
		const savedPage = Cookies.get(COOKIE_NAME);
		if (savedPage) {
			setCurrentPage(parseInt(savedPage, 10));
		}
	}, []);

	useEffect(() => {
		if (!loading) {
			Cookies.set(COOKIE_NAME, currentPage.toString(), { expires: 7 });
		}
	}, [currentPage, loading]);

	// Set items per page based on window size
	useEffect(() => {
		const updateItemsPerPage = () => {
			setItemsPerPage(window.innerWidth < 768 ? 10 : 30); // 768px as a breakpoint
		};

		updateItemsPerPage(); // Set initial value
		window.addEventListener("resize", updateItemsPerPage); // Update on resize

		return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup
	}, []);

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(wishlist.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const currentProducts = wishlist.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	const getWishlistProducts = async () => {
		setLoading(true);

		if (!signedInUser) return;

		const wishlistProducts = await Promise.all(
			signedInUser.wishlist.map(async (productId) => {
				const res = await getProductDetails(productId);
				return res;
			})
		);

		setWishlist(wishlistProducts);
		setLoading(false);
	};

	useEffect(() => {
		if (signedInUser) {
			getWishlistProducts();
		}
	}, [signedInUser]);

	const updateSignedInUser = (updatedUser: UserType) => {
		setSignedInUser(updatedUser);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<main className="bg-wishList-bg dark:bg-[#2E2E2E]">
			{wishlist?.length === 0 ? (
				<section className="flex justify-center items-center pt-[147px] pb-[223px]">
					<div className="flex flex-col gap-[14px] text-center">
						<Image
							src="/assets/empty-box.svg"
							width={200}
							height={200}
							alt="Empty box"
							className="object-cover mx-auto"
						/>
						<h2 className="font-open-sans font-bold text-2xl text-gold-text dark:text-white">
							Your Wishlist is Empty
						</h2>
						<p className="font-open-sans font-normal text-base sm:text-xl text-figure-text dark:text-gray-300">
							Explore more and shortlist some items.
						</p>
						<div className="w-[200px] sm:w-[300px] mx-auto mt-5">
							<ButtonPrimary
								type="button"
								label="Continue Shopping"
								href="/product"
							/>
						</div>
					</div>
				</section>
			) : (
				<section
					className={`pt-11 px-[5%] xl:px-[6.25rem] ${
						totalPages > 1 ? "pb-6" : "pb-[94px]"
					} `}
				>
					<h1 className="mb-8 font-open-sans font-semibold text-2xl leading-[32.68px] text-black dark:text-white">
						You&apos;ve got a great sense of style!
					</h1>
					<p className="mb-4 font-rubik font-medium text-base leading-[18.96px] text-black dark:text-white">
						Favourites ({wishlist?.length})
					</p>
					<div className="grid gap-8">
						{currentProducts?.map((wishlist) => (
							<WishListCard
								key={wishlist?._id}
								product={wishlist}
								updateSignedInUser={updateSignedInUser}
							/>
						))}
					</div>
				</section>
			)}

			{/* The pagination component is only rendered if there is more than one page */}
			{totalPages > 1 && (
				<section className="px-[5%] xl:px-[6.25rem] pb-12">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</section>
			)}

			{/* recently viewed */}
			<section className="px-[5%] pb-10">
				<div className="sm:px-6">
					<RecentlyViewed />
				</div>
			</section>
		</main>
	);
};

export const dynamic = "force-dynamic";

export default Wishlist;
