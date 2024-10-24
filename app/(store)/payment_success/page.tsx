"use client";

import Link from "next/link";
import { useEffect } from "react";

import useCart from "@/lib/hook/useCart";

const SuccessfulPayment = () => {
	const cart = useCart();

	useEffect(() => {
		cart.clearCart();
	}, []);

	return (
		<section className="px-[5%] bg-white dark:bg-[#2e2e2e]">
			<div className="min-h-[400px] py-20 sm:py-40 flex flex-col items-center justify-center gap-y-5">
				<h2 className="text-2xl md:text-4xl font-bold dark:text-gold-text text-center">
					Payment Successful
				</h2>

				<h3 className="text-xl md:text-2xl dark:text-[#fdfdfd]">
					Thank you for your purchase
				</h3>

				<p className="text-base dark:text-gray-300 text-center pb-2">
					You can proceed to view your Orders or continue Shopping with us
				</p>

				<div className="flex items-center max-sm:gap-y-6  sm:gap-x-5 max-sm:flex-col">
					<Link href={"/my-account/orders"}>
						<button className="bg-btn-gold text-slate-100 w-52 h-12 rounded-lg text-base font-semibold hover:rounded-full transition-all duration-200 ease-in-out">
							View Orders
						</button>
					</Link>
					<Link href={"/"}>
						<button className="bg-btn-gold text-slate-100 w-52 h-12 rounded-lg text-base font-semibold hover:rounded-full transition-all duration-200 ease-in-out">
							Continue Shopping
						</button>
					</Link>
				</div>

				<p className="text-[11px] dark:text-gray-300 text-center pb-2">
					(To cancel your order, please contact the customer support immediately
					via{" "}
					<Link
						href="mailto:Customersupport@denobleslimited.com"
						className="font-bold text-brown-gold hover:underline inline"
					>
						Email
					</Link>{" "}
					or{" "}
					<Link
						href="https://wa.link/gfswrn"
						className="font-bold text-brown-gold hover:underline inline"
					>
						WhatsApp
					</Link>
					)
				</p>
			</div>
		</section>
	);
};

export default SuccessfulPayment;
