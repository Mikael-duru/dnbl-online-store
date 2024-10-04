import { auth } from "@/firebase/firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { useRouter } from "next/navigation";
import React from "react";
import { SiFacebook } from "react-icons/si";

function SignInWithFacebook() {
	// const router = useRouter();

	const handleFacebookLogin = async () => {
		const provider = new FacebookAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			// User signed in
			const user = result.user;
			console.log("User Info:", user);
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
