"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

interface HeartFavoriteProps {
	product: ProductType;
	updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
	const router = useRouter();
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

	const [loading, setLoading] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

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
				setLoading(true);

				const data = await res.json();
				setIsLiked(data.wishlist.includes(product._id));
				setLoading(false);
			} else {
				console.log("Wishlist User not found");
			}
		} catch (err) {
			console.log("[users_GET]", err);
		}
	};

	useEffect(() => {
		if (user) {
			getUser();
		}
	}, [user]);

	const handleLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// e.preventDefault();
		e.stopPropagation();

		try {
			if (!user) {
				router.push("/sign-in");
				return;
			} else {
				const idToken = await user.getIdToken();

				const res = await fetch("/api/users/wishlist", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${idToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ productId: product._id }),
				});
				const updatedUser = await res.json();
				setIsLiked(updatedUser.wishlist.includes(product._id));
				if (updateSignedInUser) {
					updateSignedInUser(updatedUser);
				}
			}
		} catch (err) {
			console.log("[wishlist_POST]", err);
		}
	};

	return (
		<button onClick={handleLike}>
			<Heart size={24} fill={isLiked ? "red" : "white"} />
		</button>
	);
};

export default HeartFavorite;
