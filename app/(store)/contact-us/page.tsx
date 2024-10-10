"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";

interface FormData {
	name: string;
	email: string;
	phone: string;
	title: string;
	message: string;
}

function ContactUs() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<FormData>();
	const [phone, setPhone] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		data.phone = phone;
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		formData.append("access_key", "process.env.NEXT_PUBLIC_FORM3_ACCESS_KEY");

		const json = JSON.stringify(Object.fromEntries(formData));

		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: json,
			}).then((res) => res.json());

			if (res.success) {
				setIsLoading(false);
				toast.success("Message sent successfully!");
				reset();
				setPhone("");
			} else {
				throw new Error("Form submission failed");
			}
		} catch (error) {
			console.error("Error submitting contact form:", error);
			toast.error("Something went wrong. Please try again.");
		}
	};

	return (
		<main className="bg-white dark:bg-[#1E1E1E]">
			<section className="relative dark:border-b-2 dark:border-b-dark-brown">
				<Image
					src="/assets/contact-us-banner.png"
					alt="Contact Us Banner"
					width={1440}
					height={500}
					className="w-auto h-auto object-cover"
				/>
				<div className="absolute inset-0 bg-banner-layer w-full h-full z-10"></div>
				<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 z-20 text-white font-open-sans font-bold text-[28px] leading-[1px] sm:text-6xl sm:leading-[1px] lg:text-7xl xl:text-8xl xl:leading-[28px]">
					Contact Us
				</h1>
			</section>

			<section className="pt-10 px-[5%] lg:px-[147px] pb-12 sm:pb-[129px] bg-white dark:bg-[#1E1E1E]">
				<h2 className="text-black dark:text-white text-center font-open-sans text-2xl sm:text-[40px] font-semibold leading-normal pb-2">
					Can&apos;t find what you are looking for? Get in touch!
				</h2>
				<p className="text-black dark:text-gray-300 text-center font-open-sans sm:text-2xl font-normal leading-normal pb-[40px]">
					Leave us a message and our support team will get back to you in 24
					hours. You can also use our&nbsp;
					<Link
						href="https://wa.link/gfswrn"
						className="text-brown-gold underline"
					>
						WhatsApp
					</Link>
					&nbsp;platform for a faster response.
				</p>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-6 md:space-y-8"
				>
					<input
						{...register("name", { required: true })}
						className="w-full p-3 xl:py-5 xl:px-4 border-2 border-black dark:border-gray-600 rounded-2xl text-black dark:text-white font-open-sans xl:text-2xl font-normal leading-normal placeholder:text-black dark:placeholder:text-gray-400"
						placeholder="Enter your name"
						aria-label="Enter your name"
					/>
					{errors.name && (
						<span className="text-red-600 font-open-sans text-sm md:text-base pt-1">
							This field is required
						</span>
					)}

					<input
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Please enter a valid email address",
							},
						})}
						className="w-full p-3 xl:py-5 xl:px-4 border-2 border-black dark:border-gray-600 rounded-2xl text-black dark:text-white font-open-sans xl:text-2xl font-normal leading-normal placeholder:text-black dark:placeholder:text-gray-400"
						placeholder="Enter email"
						aria-label="Enter email"
					/>
					{errors.email && (
						<span className="text-red-600 font-open-sans text-sm md:text-base pt-1">
							{errors.email.message}
						</span>
					)}

					<PhoneInput
						country={"us"}
						value={phone}
						onChange={(phone: string) => {
							setPhone(phone);
							setValue("phone", phone);
						}}
						containerClass="w-full border-2 border-black dark:border-gray-600 rounded-2xl text-black dark:text-white xl:text-2xl font-open-sans font-normal leading-normal focus:ring-2 focus:ring-black dark:focus:ring-gray-400"
						inputClass="p-3 xl:py-5 xl:px-4 placeholder:text-black dark:placeholder:text-gray-400"
					/>
					{errors.phone && (
						<span className="text-red-600 font-open-sans text-sm md:text-base pt-1">
							This field is required
						</span>
					)}

					<input
						{...register("title", { required: true })}
						className="w-full p-3 xl:py-5 xl:px-4 border-2 border-black dark:border-gray-600 rounded-2xl text-black dark:text-white font-open-sans xl:text-2xl font-normal leading-normal placeholder:text-black dark:placeholder:text-gray-400"
						placeholder="Title of the message"
						aria-label="Title of the message"
					/>
					{errors.title && (
						<span className="text-red-600 font-open-sans text-sm md:text-base pt-1">
							This field is required
						</span>
					)}

					<textarea
						{...register("message", { required: true })}
						className="w-full p-3 xl:py-6 xl:px-4 border-2 border-black dark:border-gray-600 rounded-2xl text-black dark:text-white font-open-sans xl:text-2xl font-normal leading-normal placeholder:text-black dark:placeholder:text-gray-400"
						rows={4}
						placeholder="Send us your message"
						aria-label="Send us your message"
					/>
					{errors.message && (
						<span className="text-red-600 font-open-sans text-sm md:text-base pt-1">
							This field is required
						</span>
					)}

					<button
						type="submit"
						className="w-full p-3 xl:px-6 xl:py-4 shadow-btn-shadow rounded-lg bg-btn-gradient text-white hover:scale-95 duration-200 text-xl md:text-2xl font-libre-franklin disabled:opacity-50"
						disabled={isLoading}
					>
						{isLoading ? "Submitting..." : "Submit"}
					</button>
				</form>
				<div className="pt-20 flex items-center justify-center flex-col gap-1">
					<Image
						src="/assets/wa-qr-code.png"
						width={300}
						height={300}
						alt="WhatsApp QR code"
						className="max-sm:w-[250px] max-sm:h-[250px] object-contain"
					/>
					<small>Scan WhatsApp QR Code</small>
				</div>
			</section>
		</main>
	);
}

export default ContactUs;
