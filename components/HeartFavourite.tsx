import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import useWishlistStore from "@/lib/hook/useWishlist";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

interface HeartFavoriteProps {
	product: ProductType;
}

const HeartFavorite = ({ product }: HeartFavoriteProps) => {
	const { wishlistItems, addToWishlist, removeFromWishlist } =
		useWishlistStore();
	const [isLiked, setIsLiked] = useState(false);
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

	// Check if the product is in the wishlist when the component mounts
	useEffect(() => {
		const isProductInWishlist = wishlistItems.some(
			(item) => item._id === product._id
		);
		setIsLiked(isProductInWishlist);
	}, [wishlistItems, product._id]);

	const handleLike = () => {
		if (!user) {
			// Redirect to sign-in page if the user is not authenticated
			router.push("/sign-in");
			return;
		}

		if (isLiked) {
			// Remove from wishlist
			removeFromWishlist(product._id);
			setIsLiked(false);
		} else {
			// Add to wishlist
			addToWishlist(product);
			setIsLiked(true);
		}
	};

	return (
		<button onClick={handleLike}>
			<Heart size={22} fill={isLiked ? "red" : "white"} />
		</button>
	);
};

export default HeartFavorite;

// "use client"

// import { useUser } from "@clerk/nextjs";
// import { Heart } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface HeartFavoriteProps {
//   product: ProductType;
//   updateSignedInUser?: (updatedUser: UserType) => void;
// }

// const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
//   const router = useRouter();
//   const { user } = useUser();

//   const [loading, setLoading] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const getUser = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/users");
//       const data = await res.json();
//       setIsLiked(data.wishlist.includes(product._id));
//       setLoading(false);
//     } catch (err) {
//       console.log("[users_GET]", err);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       getUser();
//     }
//   }, [user]);

//   const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     try {
//       if (!user) {
//         router.push("/sign-in");
//         return;
//       } else {
//         const res = await fetch("/api/users/wishlist", {
//           method: "POST",
//           body: JSON.stringify({ productId: product._id }),
//         });
//         const updatedUser = await res.json();
//         setIsLiked(updatedUser.wishlist.includes(product._id));
//         updateSignedInUser && updateSignedInUser(updatedUser);
//       }
//     } catch (err) {
//       console.log("[wishlist_POST]", err);
//     }
//   };

//   return (
//     <button onClick={handleLike}>
//       <Heart fill={`${isLiked ? "red" : "white"}`} />
//     </button>
//   );
// };

// export default HeartFavorite;
