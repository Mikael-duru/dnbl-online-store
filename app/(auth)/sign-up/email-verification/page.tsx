"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { CircleCheckBig } from "lucide-react";
import VerifyLoader from "@/components/loader-verify";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // Import your Firebase auth instance
import ButtonPrimary from "@/components/ButtonPrimary";
import { store } from "@/lib/store";

function AccountVerification() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const { currentUser, getUserByEmail } = store();
	const searchParams = useSearchParams();

	useEffect(() => {
		const verifyUser = async () => {
			const mode = searchParams.get("mode");
			const code = searchParams.get("oobCode");
			const email = sessionStorage.getItem("registrationData");

			if (mode === "verifyEmail" && code) {
				try {
					// Verify the email using the oobCode
					await applyActionCode(auth, code);

					getUserByEmail(email); // Fetch user info from your store
					if (currentUser) {
						console.log(currentUser?.emailVerified);
						setIsVerified(true);
						setLoading(false);
					}
				} catch (error) {
					console.error("Error verifying account:", error);
					setErrorMessage("Verification failed. Please try again.");
				} finally {
					setLoading(false);
				}
			} else {
				setErrorMessage("Invalid verification link.");
				setLoading(false);
			}
		};

		verifyUser();
	}, [searchParams]);

	const handleResendVerification = async () => {
		try {
			const user = auth.currentUser;
			if (user) {
				await sendEmailVerification(user);
				setErrorMessage("Verification email resent. Please check your inbox.");
			} else {
				setErrorMessage(
					"User not authenticated. Cannot resend verification email."
				);
			}
		} catch (error) {
			console.error("Error resending verification email:", error);
			setErrorMessage("Failed to resend verification email.");
		}
	};

	return (
		<section className="flex min-h-screen items-center justify-center bg-white max-2xl:dark:bg-[#2E2E2E] shrink-0">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white dark:bg-[#2E2E2E] sm:p-5 text-center sm:text-start">
				<div className="max-lg:hidden relative rounded-3xl overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%]">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full w-auto object-cover bg-blend-multiply"
					/>
					<div className="absolute inset-0 bg-sign-in-layer"></div>
					<Image
						src="/assets/white-logo.png"
						alt="DNBL Fashion"
						width={196}
						height={88}
						className="max-xl:w-[26%] absolute top-7 left-4 md:left-[28px] z-10"
					/>
				</div>

				{loading ? (
					<div className="flex-1 w-full max-w-full md:max-w-[400px] flex items-center justify-center h-full">
						<VerifyLoader />
					</div>
				) : (
					<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0 relative">
						{isVerified ? (
							<>
								<div className="flex items-center justify-center mb-10">
									<CircleCheckBig
										size={128}
										className="text-center text-green-500"
									/>
								</div>

								<h1 className="heading">
									Hello! {currentUser?.firstName || "User"}
								</h1>
								<h2 className="text-green-500 text-sm sm:text-base font-libre-franklin text-center font-normal pt-2 pb-5">
									Your email has been verified
								</h2>
								<p className="text-green-500 text-sm sm:text-base font-libre-franklin text-center font-normal pt-2 pb-5">
									You can now sign in to your DNBL account.
								</p>

								<div className="w-[280px] sm:w-full mx-auto">
									<Button
										type="submit"
										label="Sign In"
										onClick={() => router.push("/sign-in")}
									/>
								</div>
							</>
						) : (
							<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0 relative">
								<h1 className="heading text-red-500">
									Verification Unsuccessful
								</h1>
								<p className="text-sm sm:text-base font-libre-franklin text-center font-normal pt-2 ">
									{errorMessage}
								</p>
								<div className="mt-4">
									<ButtonPrimary
										type="button"
										label="Resend Verification Email"
										onClick={handleResendVerification}
									/>
								</div>
							</div>
						)}

						<div className="flex items-center justify-center mt-10 lg:hidden">
							<Image
								src="/assets/logo-black.svg"
								width={70}
								height={70}
								alt="DNBL logo"
								className="dark:invert"
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default AccountVerification;
