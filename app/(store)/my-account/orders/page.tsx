"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";

import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
import { getOrders } from "@/lib/actions/actions";
import { auth } from "@/firebase/firebase";
import { Separator } from "@/components/ui/separator";
import ButtonPrimary from "@/components/custom-buttons/ButtonPrimary";
import OrderItem from "@/components/OrderList";
import useCart from "@/lib/hook/useCart";

const CustomerOrders = () => {
	const [orders, setOrders] = useState([]);
	const cart = useCart();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				try {
					// Get the ID token
					const idToken = await user.getIdToken();

					const response = await fetch("/api/verify-auth", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ idToken }),
					});

					if (!response.ok) {
						throw new Error("Failed to verify authentication");
					}

					const data = await response.json();

					// Verify the token and get the user ID
					const userId = data.userId;

					// Fetch orders with the verified user ID
					const fetchedOrders = await getOrders(userId);
					setOrders(fetchedOrders);
				} catch (err) {
					console.log("Get orders:", err);
				}
			} else {
				console.log("No user is signed in");
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return (
		<main className="bg-[#D9D9D9]  dark:bg-[#121212]">
			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				{/* Sidebar Navigation */}
				<LeftSideBar />

				{/* Main content area */}
				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] pt-4 px-4 sm:pr-16 pb-[35px] sm:pl-[38px]">
					<h2 className="pb-2 font-open-sans font-semibold text-2xl leading-[33.6px] text-figure-text dark:text-white">
						My Orders
					</h2>

					<Separator className="mt-4 mb-7 bg-gray-400" />

					{!orders || orders.length === 0 ? (
						<div className="my-5 text-center">
							<h3 className="font-open-sans font-bold text-xl text-gold-text dark:text-white">
								You have no orders yet.
							</h3>
							<div className="w-[200px] sm:w-[300px] mx-auto mt-5">
								<ButtonPrimary
									type="button"
									label="Continue Shopping"
									href="/product"
								/>
							</div>
						</div>
					) : (
						<section className="font-open-sans">
							<h2 className="text-xl sm:text-2xl font-bold">Order details</h2>
							<p className="text-gray-600 dark:text-gray-300">
								Total Orders:{" "}
								<span className="text-black font-semibold dark:text-white">
									{orders.length}
								</span>
							</p>
							<div className="flex flex-col gap-2">
								{orders?.map((order: OrderType) => (
									<Disclosure as="div" key={order._id} className="pt-6">
										{({ open }) => (
											<>
												<dt>
													<DisclosureButton className="flex w-full items-center justify-between text-left text-gray-900 dark:text-gray-400">
														<span className="text-sm sm:text-base font-semibold sm:leading-7">
															Order Id:{" "}
															<span className="font-normal">{order._id}</span>
														</span>
														<span className="ml-2">
															{open ? (
																<FaMinus className="text-sm" />
															) : (
																<FaPlus className="text-sm" />
															)}
														</span>
													</DisclosureButton>
												</dt>
												<DisclosurePanel as="dd" className="mt-5 ">
													<div className="flex flex-col gap-2 bg-[#f4f4f480] dark:bg-[#3e3e3e] p-3 sm:p-5 border border-gray-200">
														<p className="text-sm sm:text-base font-semibold">
															Your order{" "}
															<span className="text-gold-text">
																#{order?._id.substring(0, 18)}...
															</span>{" "}
															will be with you in 5 - 7 working days.
														</p>
														<div className="flex flex-col gap-1">
															<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
																Order Item Count:{" "}
																<span className="text-black dark:text-white font-medium">
																	{order?.products?.length}
																</span>
															</p>
															<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
																Payment Method:{" "}
																<span className="text-black dark:text-white font-medium">
																	Paid by Stripe
																</span>
															</p>
															<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
																Order Amount:{" "}
																<span className="text-black dark:text-white font-medium">
																	{Intl.NumberFormat("en-US", {
																		style: "currency",
																		currency: "NGN",
																	}).format(order.totalAmount)}
																</span>
															</p>
															<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
																Status:{" "}
																<span
																	className={`font-medium ${
																		order?.status === "Cancelled"
																			? "text-red-600"
																			: order?.status === "Delivered"
																			? "text-green-600"
																			: order?.status === "Shipped"
																			? "text-[#B47B2B]"
																			: "text-blue-black dark:text-gray-300"
																	}`}
																>
																	{order?.status}
																</span>
															</p>
														</div>
														<div className="flex flex-col gap-6 font-inter">
															{order.products.map(
																(orderItem: OrderItemType) => (
																	<OrderItem
																		key={orderItem.product._id}
																		orderItem={orderItem}
																		cart={cart}
																	/>
																)
															)}
														</div>
													</div>
												</DisclosurePanel>
											</>
										)}
									</Disclosure>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</main>
	);
};

export const dynamic = "force-dynamic";

export default CustomerOrders;
