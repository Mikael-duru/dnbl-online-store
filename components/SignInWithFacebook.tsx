import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { SiFacebook } from "react-icons/si";

import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

function SignInWithFacebook() {
	const router = useRouter();

	const handleFacebookLogin = async () => {
		const provider = new FacebookAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			// User signed in
			const user = result.user;
			// console.log("User Info:", user);
			if (user) {
				// console.log(user); // Log the user object for debugging

				// Extract first name and last name from displayName
				const [firstName, lastName] = user.displayName
					? user.displayName.split(" ")
					: ["", ""];

				// Save user data to Firestore
				await setDoc(doc(db, "users", user.uid), {
					firstName: firstName,
					lastName: lastName,
					email: user.email,
					id: user.uid,
					photoURL: user.photoURL,
					address: "",
					city: "",
					country: "",
					phoneNumber: "",
					displayName: user.displayName || "",
					isEmailVerified: true,
					createdAt: new Date(),
				});

				// Temporary store user data in local storage
				localStorage.setItem(
					"FacebookData",
					JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: user.email,
						id: user.uid,
						photoURL: user.photoURL,
						address: "",
						city: "",
						country: "",
						phoneNumber: "",
						displayName: user.displayName || "",
						isEmailVerified: true,
						createdAt: new Date(),
					})
				);

				router.push("/");
				toast.success(`Welcome ${user.displayName}!`);
			}
		} catch (error) {
			console.error("Error during Facebook login:", error);
		}
	};

	return (
		<button
			className="flex justify-center items-center gap-4 p-4 border-[1.5px] border-gray-border rounded-[6px] text-[#344054] dark:text-gray-300 hover:text-white hover:bg-btn-gold"
			onClick={handleFacebookLogin}
		>
			<SiFacebook className="shrink-0 text-xl text-blue-800" />
			<p className="inline-block font-libre-franklin text-base font-semibold transition duration-200 ease-in-out transform">
				Sign in with Facebook
			</p>
		</button>
	);
}

export default SignInWithFacebook;
