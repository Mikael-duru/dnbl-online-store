"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail } from "lucide-react";
// import { sendPasswordResetEmail } from "firebase/auth";

import ButtonPrimary from "@/components/ButtonPrimary";
// import { auth } from "@/firebase/firebase";
// import toast from "react-hot-toast";

function ForgetPassword() {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({ email: "" });
	// const router = useRouter();

	const validateEmail = (email: string) => {
		return /\S+@\S+\.\S+/.test(email);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value;
		setEmail(newEmail);
		setErrors((prevErrors) => ({
			...prevErrors,
			email: newEmail
				? validateEmail(newEmail)
					? ""
					: "Invalid email format"
				: "Email is required",
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			email: email
				? validateEmail(email)
					? ""
					: "Invalid email format"
				: "Email is required",
		};

		setErrors(newErrors);

		if (!newErrors.email) {
			// sendPasswordResetEmail(auth, email)
			// 	.then(() => {
			// 		toast.success("Check your email");
			// 		// router.push("")
			// 		console.log("Code sent");
			// 	})
			// 	.catch((error) => {
			// 		const errCode = error.code;
			// 		console.log(errCode);
			// 		// Submit form
			// 	});
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

				<div className="flex-1 w-full max-w-full md:max-w-[400px] px-4 md:px-0 max-lg:mt-8">
					{/* Heading */}
					<h1 className="heading">Forgot Password</h1>

					{/* Headline */}
					<p className="headline">
						Provide your email to receive a reset code.
					</p>

					<form onSubmit={handleSubmit}>
						<div className="mb-6">
							{/* Email field */}
							<label htmlFor="email" className="label-heading">
								Email Address
							</label>
							<div className="relative">
								<input
									type="email"
									id="email"
									className={`w-full p-4 border ${
										errors.email ? "border-error" : "border-gold-border"
									} rounded-md text-[#101928] dark:text-white placeholder:text-[#98A2B3] dark:placeholder:text-gray-400 text-sm leading-[20.3px] focus:outline-none focus:ring-2 focus:ring-gold-border`}
									placeholder="Enter your email"
									value={email}
									onChange={handleEmailChange}
								/>
								<span className="absolute inset-y-0 right-0 pr-[18px] flex items-center">
									<Mail className="text-gray-light w-5 h-5" />
								</span>
							</div>
							{errors.email && (
								<p className="mt-2 text-error dark:text-red-500 text-sm">
									{errors.email}
								</p>
							)}
						</div>

						<ButtonPrimary type="button" label="Send Code" />

						<div className="flex items-center justify-center mt-10 lg:hidden">
							<Image
								src="/assets/logo-black.svg"
								width={60}
								height={60}
								alt="DNBL logo"
								className="dark:invert"
							/>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default ForgetPassword;
