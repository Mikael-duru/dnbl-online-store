"use client";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import useCart from "@/lib/hook/useCart";
import ButtonSecondary from "@/components/custom-buttons/ButtonSecondary";
import CustomDropdown from "@/components/CustomDropdown";
import { auth, db } from "@/firebase/firebase";
import { toast } from "react-hot-toast";
import RecentlyViewed from "@/components/RecentlyViewedProducts";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import CartItem from "@/components/CartLists";

const countriesOptions = [
	{ value: "NG", label: "Nigeria" },
	{ value: "US", label: "USA or Canada" },
	// { value: "CA", label: "Canada" },
];

const Cart = () => {
	const [user, setUser] = useState<User | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const router = useRouter();
	const cart = useCart();
	const [country, setCountry] = useState<string>("");
	const [errors, setErrors] = useState<{ country?: string }>({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);

				// Reference to the user's document in Firestore
				const userDocRef = doc(db, "users", user.uid);

				// Listen for real-time updates to the user's document in Firestore
				const unsubscribeDoc = onSnapshot(userDocRef, async (doc) => {
					if (doc.exists()) {
						const userData = doc.data();
						if (userData) {
							setUserName(userData.displayName || "");
						}
					}
				});
				// Clean up the Firestore listener when the component unmounts
				return () => unsubscribeDoc();
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe(); // Cleanup subscription
	}, []);

	const total = cart?.cartItems?.reduce(
		(acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
		0
	);
	const totalRounded = parseFloat(total.toFixed(2));

	const customer = {
		firebaseId: user?.uid,
		email: user?.email,
		name: userName,
	};

	const handleCheckout = async () => {
		// Check if user is signed in
		if (!user) {
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
		} else if (country === "US") {
			if (cart?.cartItems.length === 0) {
				setErrors({ country: "Please add item to cart." });
			} else {
				try {
					if (user) {
						const res = await fetch(
							`${process.env.NEXT_PUBLIC_API_URL}/checkout`,
							{
								method: "POST",
								body: JSON.stringify({ cartItems: cart.cartItems, customer }),
							}
						);
						const data = await res.json();
						window.location.href = data.url;
						console.log(data);
					}
				} catch (err) {
					console.log("[checkout_POST]", err);
				}
			}
		} else {
			setErrors({ country: "Please select a valid country." });
		}
	};

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
									href="/product"
								/>
							</div>
						</div>
					) : (
						<div>
							{cart?.cartItems?.map((cartItem) => (
								<CartItem
									key={cartItem.item._id}
									cartItem={cartItem}
									cart={cart}
								/>
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
						<div className="flex flex-col gap-1 mb-2">
							<h2 className="font-open-sans text-base font-medium text-black dark:text-white">
								Country
							</h2>
							<div className="w-full max-w-[250px]">
								<CustomDropdown
									options={countriesOptions}
									selectedOption={country}
									onChange={setCountry}
								/>
							</div>
						</div>
					</form>

					{errors.country && (
						<p className="text-red-500 text-center">{errors.country}</p>
					)}

					<div className="w-[200px] sm:w-[250px] mx-auto mt-2">
						<button
							type="button"
							onClick={handleCheckout}
							className="flex flex-col justify-center items-center py-2 px-3 sm:p-3 2xl:py-4 2xl:px-6 gap-2 w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold border border-gold-text text-gold-text 
                hover:text-white hover:bg-btn-gold duration-300"
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			</section>

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

export default Cart;
