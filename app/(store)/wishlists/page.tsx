"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import Slider from "@/components/Slider";
import useWishlistStore from "@/lib/hook/useWishlist";
import Loader from "@/components/Loader";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import WishListCard from "@/components/WishListCard";
import Pagination from "@/components/Pagination";
import { getFilteredCategoryProducts } from "@/constants/productsStore";
import ButtonPrimary from "@/components/ButtonPrimary";

const ITEMS_PER_PAGE = 10;
const COOKIE_NAME = "currentWishListPage";

function WishList() {
	const router = useRouter();

	// Filter products by the 'trendy' category
	const trendyProducts = getFilteredCategoryProducts("trendy"); // Get all trendy products

	// Hook calls at the top, ensuring they are consistent across renders
	const { wishlistItems, loadWishlist, loading } = useWishlistStore();
	const [currentPage, setCurrentPage] = useState(1);

	// Load wishlist from cookie on mount
	useEffect(() => {
		loadWishlist();
	}, [loadWishlist]);

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

	// Calculate total pages based on the filtered products
	const totalPages = Math.ceil(wishlistItems.length / ITEMS_PER_PAGE);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;

	const currentProducts = wishlistItems.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0);
	};

	// Early return for loading state
	if (loading) {
		return <Loader />; // Ensure this is done before any hooks are conditionally called
	}

	return (
		<main className="bg-wishList-bg dark:bg-[#2E2E2E]">
			{wishlistItems?.length === 0 ? (
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
								onClick={() => router.push("/product")}
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
						You’ve got a great sense of style!
					</h1>
					<p className="mb-4 font-rubik font-medium text-base leading-[18.96px] text-black dark:text-white">
						Favourites ({wishlistItems?.length})
					</p>
					<div className="grid gap-8">
						{currentProducts?.map((wishlistItem) => (
							<WishListCard key={wishlistItem?._id} product={wishlistItem} />
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

			{/* trendy products */}
			{trendyProducts?.length > 0 ? (
				<section className="px-[5%] pb-[94px]">
					<div className="sm:px-6">
						<h2 className="font-open-sans font-semibold sm:text-2xl text-black dark:text-white pb-4 sm:pb-6">
							You might also love one or more of these
						</h2>
						<Slider prods={trendyProducts} />
					</div>
				</section>
			) : null}
		</main>
	);
}

export default WishList;
