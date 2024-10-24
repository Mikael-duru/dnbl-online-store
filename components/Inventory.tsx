"use client";

import { auth } from "@/firebase/firebase";
import { getOrders } from "@/lib/actions/actions";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

// Custom hook to calculate remaining inventory for a product
export const useCalculateRemainingInventory = (product: any): number | null => {
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [loading, setLoading] = useState(true);
	const [remainingInventory, setRemainingInventory] = useState<number | null>(
		null
	);

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
					console.log("Get orders error:", err);
				}
			} else {
				console.log("No user is signed in");
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (!loading) {
			// Calculate total ordered quantity
			const totalOrdered = orders.reduce((total, order) => {
				const productInOrder = order.products.find(
					(item: OrderItemType) => item.product._id === product._id
				);
				return total + (productInOrder?.quantity || 0);
			}, 0);

			// Calculate remaining inventory
			const remaining = product.quantity - totalOrdered;
			setRemainingInventory(remaining);
		}
	}, [orders, loading, product]);

	return remainingInventory;
};
