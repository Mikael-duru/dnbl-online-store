"use client";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast"; // Uncomment if using toast notifications

import useCart from "@/lib/hook/useCart";
import ButtonSecondary from "@/components/ButtonSecondary";
import Loader from "@/components/Loader";
import CustomDropdown from "@/components/CustomDropdown";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { store } from "@/lib/store";
import toast from "react-hot-toast";
import RecentlyViewed from "@/components/RecentlyViewedProducts";

const countriesOptions = [
	{ value: "US", label: "USA" },
	{ value: "CA", label: "Canada" },
	{ value: "NG", label: "Nigeria" },
];

const Cart = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const cart = useCart();
	const [country, setCountry] = useState<string>("");
	const [errors, setErrors] = useState<{ country?: string }>({});
	const { currentUser, getUserInfo } = store();

	useEffect(() => {
		setIsLoading(false);
	}, []);

	const total = cart?.cartItems?.reduce(
		(acc, cartItem) => acc + cartItem.item.newPrice * cartItem.quantity,
		0
	);
	const totalRounded = parseFloat(total.toFixed(2));

	// Check authentication state
	// useEffect(() => {
	// 	const unSub = onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			getUserInfo(user?.uid);
	// 		}
	// 	});
	// 	return () => {
	// 		unSub();
	// 	};
	// }, [getUserInfo]);

	const user = auth.currentUser;

	const handleCheckout = async () => {
		// Check if user is signed in
		if (!user) {
			// Show alert or toast notification
			toast.error("You need to be signed in to proceed to checkout.");
			return;
		} else {
			if (!country) {
				setErrors({ country: "Please select a country before proceeding." });
				return;
			}
			setErrors({});
		}

		if (country === "NG") {
			if (cart?.cartItems.length === 0) {
				setErrors({ country: "Please add item to cart." });
			} else {
				router.push("/cart/checkout-page");
			}
		} else if (country === "US" || country === "CA") {
			if (cart?.cartItems.length === 0) {
				setErrors({ country: "Please add item to cart." });
			} else {
				console.log("Calling Stripe API for US or Canada checkout...");
			}
		} else {
			setErrors({ country: "Please select a valid country." });
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className="bg-white dark:bg-[#2E2E2E]">
			<section className="flex gap-20 pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				<div className="w-2/3 max-lg:w-full">
					<p className="font-open-sans font-bold text-lg sm:text-2xl sm:leading-[32.68px] tracking-[-0.02em] text-black dark:text-white">
						Shopping Cart
					</p>

					<hr className="mt-6" />

					{cart?.cartItems?.length === 0 ? (
						<div className="my-14 flex flex-col justify-center items-center gap-8">
							<Image
								src="/assets/empty-cart.png"
								width={200}
								height={200}
								alt="Empty cart"
								className="w-[200px] h-[200px] object-cover"
							/>
							<p className="font-open-sans font-bold text-2xl sm:text-3xl text-center dark:text-white">
								Your cart is <span className="text-red-700">Empty!</span>
							</p>
							<p className="font-open-sans font-normal text-base sm:text-lg text-center max-w-[50ch] text-black dark:text-white">
								Looks like you have not added anything to your cart. Go ahead
								and explore our categories.
							</p>
							<div className="w-[200px] sm:w-[250px] mx-auto">
								<ButtonSecondary
									type="button"
									label="Return to Shop"
									onClick={() => router.push("/product")}
								/>
							</div>
						</div>
					) : (
						<div>
							{cart?.cartItems?.map((cartItem) => (
								<div
									key={cartItem.item._id}
									className="w-full flex max-sm:flex-col max-sm:gap-4 gap-8 hover:bg-gray-100 items-center max-sm:items-start justify-between dark:hover:bg-gray-700 mt-6 sm:-8 rounded-lg"
								>
									<div className="flex items-center sm:w-[380px] shrink-0 ">
										<Image
											src={cartItem.item.media[0]}
											width={100}
											height={100}
											className="rounded-lg w-32 h-32 object-cover"
											alt="product"
										/>
										<div className="flex flex-col gap-1 ml-4">
											<p className="text-small-bold dark:text-white">
												{cartItem.item.productName}
											</p>
											{cartItem.color && (
												<p className="text-small-medium dark:text-white">
													Color: <strong>{cartItem.color}</strong>
												</p>
											)}
											{cartItem.size && (
												<p className="text-small-medium dark:text-white">
													Size: <strong>{cartItem.size}</strong>
												</p>
											)}
											<p className="text-small-medium dark:text-white">
												Price:{" "}
												<strong>
													₦{cartItem.item.newPrice.toLocaleString()}
												</strong>
											</p>
										</div>
									</div>

									<div className="flex-1 flex items-center justify-between gap-10 shrink-0">
										<div className="flex gap-4 items-center">
											<CiSquareMinus
												size={28}
												className={`cursor-pointer ${
													cartItem.quantity === 1
														? "text-grey-500 cursor-not-allowed"
														: "hover:text-red-500"
												}`}
												onClick={() =>
													cartItem.quantity > 1 &&
													cart.decreaseQuantity(cartItem.item._id)
												}
											/>
											<p className="text-body-bold dark:text-white">
												{cartItem.quantity}
											</p>
											<CiSquarePlus
												size={28}
												className="hover:text-green-500 cursor-pointer"
												onClick={() => cart.increaseQuantity(cartItem.item._id)}
											/>
										</div>

										<FaRegTrashAlt
											size={24}
											className="hover:text-red-500 cursor-pointer sm:mr-4"
											onClick={() => cart.removeItem(cartItem.item._id)}
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="w-1/3 max-lg:w-full flex flex-col gap-4 px-4 py-5">
					<p className="text-heading4-bold dark:text-white">
						Summary&nbsp;
						<span>{`(${cart.cartItems.length} ${
							cart.cartItems.length > 1 ? "items" : "item"
						})`}</span>
					</p>

					<hr />

					<div className="flex justify-between text-base font-open-sans font-semibold py-4 dark:text-white">
						<span>Subtotal</span>
						<span>₦{totalRounded.toLocaleString()}</span>
					</div>

					<hr className="mb-4" />
					<form action="">
						{/* Country */}
						<div className="flex flex-col gap-1 mb-4">
							<h2 className="font-open-sans text-base font-medium text-black dark:text-white">
								Country
							</h2>
							<div className="w-full max-w-[250px]">
								<CustomDropdown
									options={countriesOptions}
									selectedOption={country}
									onChange={setCountry}
								/>
								{errors.country && (
									<p className="text-red-600 mt-1">{errors.country}</p>
								)}
							</div>
						</div>
					</form>

					<div className="w-[200px] sm:w-[250px] mx-auto">
						<ButtonSecondary
							type="button"
							label="Proceed to Checkout"
							onClick={handleCheckout}
						/>
					</div>
				</div>
			</section>

			{/* recently viewed */}
			<section className="px-[5%] pb-10 border-t border-t-gold-border">
				<div className="sm:px-6">
					<RecentlyViewed />
				</div>
			</section>
		</main>
	);
};

export default Cart;
