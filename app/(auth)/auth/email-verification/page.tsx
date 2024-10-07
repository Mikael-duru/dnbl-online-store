"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import Button from "@/components/Button";
import {
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Loader from "@/components/Loader";
import { generateOTP } from "@/utils/otp";

const FormSchema = z.object({
	pin: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

function OTPVerification() {
	// const [otp, setOtp] = useState("");
	const [error, setError] = useState("");
	const [resendAttempts, setResendAttempts] = useState(0);
	const [canResend, setCanResend] = useState(false);
	const [resendTimer, setResendTimer] = useState(60);
	const [userId, setUserId] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	useEffect(() => {
		if (!canResend && resendTimer > 0) {
			const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
			return () => clearTimeout(timer);
		} else if (resendTimer === 0) {
			setCanResend(true);
		}
	}, [resendTimer, canResend]);

	useEffect(() => {
		// Reset timer to 10 minutes after reaching the 1-hour cooldown
		if (resendAttempts >= 3) {
			setResendTimer(1800); // 30 mins in seconds
		} else if (resendAttempts > 0) {
			setResendTimer(60); // 10 minutes in seconds after 3 attempts
		} else {
			setResendTimer(60); // Default 60 seconds
		}
	}, [resendAttempts]);

	useEffect(() => {
		// Retrieve the stored user data from session storage
		const storedUserId = sessionStorage.getItem("registrationData");
		// console.log(storedUserId);

		// Redirect user to register, if data is missing
		if (!storedUserId) {
			router.push("/sign-up");
		} else {
			setUserId(storedUserId);
		}

		const fetchUserData = async () => {
			// Check if the user's email is verified
			if (userId) {
				try {
					// Retrieve user data from localStorage
					const storedUserData = localStorage.getItem("registrationData");
					if (storedUserData) {
						const parsedUserData = JSON.parse(storedUserData);
						const {
							firstName,
							lastName,
							email,
							displayName,
							address,
							city,
							country,
							phoneNumber,
							id,
							photoURL,
						} = parsedUserData;

						// Check if the user already exists in Firestore
						const userDoc = await getDoc(doc(db, "users", userId));
						if (!userDoc.exists()) {
							// Save user data to Firestore after email verification
							await setDoc(doc(db, "users", userId), {
								firstName,
								lastName,
								email,
								id,
								photoURL,
								address,
								city,
								country,
								phoneNumber,
								displayName,
							});
						}
					} else {
						console.error("registrationData not found in localStorage");
					}

					// Fetch user data from Firestore
					const userDoc = await getDoc(doc(db, "users", userId));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						setEmail(userData.email);
						setFirstName(userData.firstName);
					}
				} catch (error) {
					console.error("Error retrieving or saving user data:", error);
				}
			}
		};

		fetchUserData();
	}, [userId, router]);

	if (!userId) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loader />
			</div>
		); // Render loading state until the data is retrieved
	}

	const handleVerifyOTP = async (data: z.infer<typeof FormSchema>) => {
		try {
			const userDocRef = doc(db, "users", userId);
			const userDoc = await getDoc(userDocRef);

			if (!userDoc.exists()) {
				setError("User not found.");
				return;
			}

			const userData = userDoc.data();
			const currentOtp = userData.otpCode;
			const otpExpiredAt = userData.otpExpiredAt
				? userData.otpExpiredAt.toDate()
				: null;
			const isOtpValid = otpExpiredAt && otpExpiredAt > new Date();

			// Check if OTP matches and is still valid
			if (data.pin === currentOtp && isOtpValid) {
				await updateDoc(userDocRef, {
					isEmailVerified: true,
					otpCode: "",
					otpExpiredAt: "",
					verifiedAt: serverTimestamp(),
				});

				toast.success("OTP verified successfully!");
				router.push("/sign-in"); // Redirect to sign in after successful verification
				localStorage.removeItem("registrationData"); // Clear registration data from local storage
			} else {
				setError("Invalid or expired OTP.");
			}
		} catch (err) {
			setError("Error verifying OTP. Please try again.");
			console.error("OTP Verification error: ", err);
		}
	};

	const handleResendOtp = async () => {
		if (resendAttempts >= 3) {
			setError("Maximum resend attempts reached. Please wait 1 hour.");
			return;
		}

		const { otp, otpExpiredAt } = generateOTP(); // Generate new OTP

		try {
			const userDocRef = doc(db, "users", userId);
			await updateDoc(userDocRef, {
				otpCode: otp,
				otpExpiredAt: otpExpiredAt,
			});

			const response = await fetch("/api/send", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, email, otp }), // Send the required data
			});

			if (response.status === 200) {
				toast.success("OTP resent successfully! Check your email.");
			}
			console.log("OTP resent successful, OTP sent via email"); // Send OTP via email

			// Increment resend attempts and adjust the resend timer
			const newResendAttempts = resendAttempts + 1;
			setResendAttempts(newResendAttempts);
			setCanResend(false);
			setResendTimer(newResendAttempts >= 3 ? 1800 : 600); // 1 hour for 3 attempts or 10 minutes otherwise
		} catch (err) {
			setError("Error resending OTP.");
			console.error("OTP Resend error: ", err);
		}
	};

	return (
		<section className="flex min-h-screen items-center justify-center bg-white max-2xl:dark:bg-[#2E2E2E]">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white dark:bg-[#2E2E2E] px-[5%] sm:p-5 overflow-hidden">
				{/* Image Container */}
				<div className="relative rounded-3xl max-h-screen overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%] max-lg:mt-5">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full h-[65vh] sm:h-[80vh] object-cover lg:h-auto" // Set height for mobile and auto for larger screens
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

				<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0">
					{/* Heading */}
					<h1 className="heading">Enter verification code</h1>

					{/* Headline */}
					<p className="headline">Please check your email for the code.</p>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleVerifyOTP)}>
							<FormField
								control={form.control}
								name="pin"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<InputOTP
												maxLength={6}
												{...field}
												onChange={(e) => {
													field.onChange(e); // Keep the form state in sync
													setError(""); // Clear the error state when the user types
												}}
											>
												<InputOTPGroup className="gap-2 sm:gap-5 mb-5 justify-self-center">
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<div className="text-center mt-2 mb-4">
											<FormMessage />
										</div>
									</FormItem>
								)}
							/>

							{resendTimer > 0 && (
								<p className="font-fredoka text-base font-light leading-[22.4px] text-black dark:text-gray-100 text-center pt-3">
									Resend OTP in {Math.floor(resendTimer / 60)}:
									{resendTimer % 60}
								</p>
							)}

							<div className="flex items-center justify-center gap-2 mt-5 mb-6">
								<p className="font-libre-franklin font-normal text-base leading-[23.2px]">
									Didn’t get the code?
								</p>
								<button
									type="button"
									onClick={handleResendOtp}
									className={`font-libre-franklin font-medium text-base leading-[23.2px] ${
										canResend ? "text-[#B47B2B]" : "text-gray-300"
									}`}
									disabled={!canResend}
								>
									{!canResend ? "Please wait..." : "Resend"}
								</button>
							</div>

							{error && <p className="text-red-500 text-center">{error}</p>}

							<div className="w-[280px] sm:w-full mx-auto mt-4">
								<Button type="submit" label="Verify OTP" />
							</div>

							<div className="flex items-center justify-center mt-10 lg:hidden">
								<Image
									src="/assets/logo-black.svg"
									width={60}
									height={60}
									alt="DNBL logo"
								/>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</section>
	);
}

export default OTPVerification;
