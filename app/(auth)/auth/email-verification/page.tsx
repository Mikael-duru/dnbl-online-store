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
	const [error, setError] = useState("");
	const [resendAttempts, setResendAttempts] = useState(0);
	const [canResend, setCanResend] = useState(false);
	const [resendTimer, setResendTimer] = useState(60);
	const [userId, setUserId] = useState("");
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			pin: "",
		},
	});

	// On mount, retrieve resendAttempts and resendTimer from sessionStorage
	useEffect(() => {
		const storedAttempts = sessionStorage.getItem("resendAttempts");
		const storedTimer = sessionStorage.getItem("resendTimer");
		const storedStartTime = sessionStorage.getItem("startTime");

		// Parse values from sessionStorage and set state
		if (storedAttempts) {
			setResendAttempts(JSON.parse(storedAttempts));
		}

		if (storedTimer && storedStartTime) {
			const initialCountdown = JSON.parse(storedTimer);
			const startTime = JSON.parse(storedStartTime);

			const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
			const remainingTime = initialCountdown - elapsedTime;

			if (remainingTime > 0) {
				setResendTimer(remainingTime);
				setCanResend(false); // Disable resend button during countdown
			} else {
				setResendTimer(0);
				setCanResend(true); // Enable resend button after countdown
			}
		} else {
			// First-time visit: Set initial countdown to 60 seconds
			setResendTimer(60);
			setCanResend(false);
			const startTime = Date.now();
			sessionStorage.setItem("startTime", JSON.stringify(startTime));
		}
	}, []);

	// Update sessionStorage whenever resendAttempts changes
	useEffect(() => {
		sessionStorage.setItem("resendAttempts", JSON.stringify(resendAttempts));
	}, [resendAttempts]);

	// Timer logic to update resendTimer and canResend
	useEffect(() => {
		if (!canResend && resendTimer > 0) {
			const timer = setInterval(() => {
				setResendTimer((prev) => {
					if (prev <= 1) {
						clearInterval(timer);
						setCanResend(true);
						return 0;
					}
					sessionStorage.setItem("resendTimer", JSON.stringify(prev - 1));
					return prev - 1;
				});
			}, 1000);
			return () => clearInterval(timer);
		} else if (resendTimer === 0) {
			setCanResend(true); // Allow resend when timer hits 0
		}
	}, [resendTimer, canResend]);

	useEffect(() => {
		const storedUserId = sessionStorage.getItem("userId");
		// console.log("storedUserId:", storedUserId);
		if (!storedUserId) {
			router.push("/sign-up");
		} else {
			setUserId(storedUserId);
		}

		const confirmUserData = async () => {
			if (userId) {
				const userDoc = await getDoc(doc(db, "users", userId));
				if (!userDoc.exists()) {
					try {
						const storedUserData = localStorage.getItem("registrationData");
						if (storedUserData) {
							const parsedUserData = JSON.parse(storedUserData);
							await setDoc(doc(db, "users", userId), parsedUserData);
						}
					} catch (error) {
						console.error("Error retrieving or saving user data:", error);
					}
				}
			}
		};

		confirmUserData();
	}, [userId]);

	if (!userId) {
		return <Loader />;
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
			const otpExpiredAt = userData.otpExpiredAt?.toDate();
			const isOtpValid = otpExpiredAt && otpExpiredAt > new Date();

			if (data.pin === currentOtp && isOtpValid) {
				await updateDoc(userDocRef, {
					isEmailVerified: true,
					otpCode: "",
					otpExpiredAt: "",
					verifiedAt: serverTimestamp(),
				});

				toast.success("OTP verified successfully!");
				router.push("/sign-in");
				localStorage.removeItem("registrationData");
				sessionStorage.removeItem("userId");
				sessionStorage.removeItem("UserEmail");
				sessionStorage.removeItem("userFirstName");
			} else {
				setError("Invalid or expired OTP.");
			}
		} catch (err) {
			setError("Error verifying OTP. Please try again.");
			// console.error("OTP Verification error: ", err);
		}
	};

	const handleResendOtp = async () => {
		if (resendAttempts >= 3) {
			setError("Maximum resend attempts reached. Please wait 15 minutes.");
			setResendTimer(15 * 60); // Set timer to 15 minutes for further resends
			setCanResend(false);
			const startTime = Date.now();
			sessionStorage.setItem("startTime", JSON.stringify(startTime));
			return;
		}

		const email = sessionStorage.getItem("UserEmail");
		const firstName = sessionStorage.getItem("userFirstName");
		const { otp, otpExpiredAt } = generateOTP(); // Generate new OTP

		try {
			const userDocRef = doc(db, "users", userId);
			await updateDoc(userDocRef, {
				otpCode: otp,
				otpExpiredAt: otpExpiredAt,
			});

			// console.log("Sending request to /api/send");
			// console.log("new otp:", otp);
			// console.log("email:", email);
			// console.log("firstName:", firstName);
			const response = await fetch("/api/send", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, email, otp }),
			});

			// console.log("Response status:", response.status);
			// console.log("Response headers:", response.headers);

			const responseData = await response.json();
			// console.log("Response data:", responseData);

			if (response.ok) {
				// Increment the resend attempts
				setResendAttempts((prev) => prev + 1);

				// Reset timer to 60 seconds after a resend
				setResendTimer(60);
				setCanResend(false);
				const startTime = Date.now();
				sessionStorage.setItem("startTime", JSON.stringify(startTime));
				toast.success(
					"OTP resent successfully! \n Check your email for the code."
				);
				// console.log("OTP resent successful, OTP sent via email");
			} else {
				toast.error(`Failed to send OTP: ${responseData.error}`);
				// console.error("Failed to send OTP:", responseData.error);
			}
		} catch (error) {
			toast.error("An error occurred while sending OTP");
			// console.error("Error sending OTP:", error);
		}
	};

	return (
		<section className="flex min-h-screen items-center justify-center bg-white max-2xl:dark:bg-[#2E2E2E]">
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-[133px] w-full justify-center items-center xl:justify-start bg-white dark:bg-[#2E2E2E] px-[5%] sm:p-5 overflow-hidden">
				<div className="relative rounded-3xl max-h-screen overflow-hidden max-w-full md:max-w-[50%] lg:max-w-[50%] max-lg:mt-5">
					<Image
						src="/assets/signIn-banner.png"
						alt="DNBL Fashion"
						width={700}
						height={984}
						className="max-w-full h-[65vh] sm:h-[80vh] object-cover lg:h-auto"
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
					<h1 className="heading">Enter verification code</h1>
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
													field.onChange(e);
													setError("");
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
									{resendTimer % 60 < 10
										? `0${resendTimer % 60}`
										: resendTimer % 60}
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
