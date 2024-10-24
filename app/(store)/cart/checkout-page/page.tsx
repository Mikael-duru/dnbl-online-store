"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { State } from "country-state-city";
import { RiWhatsappFill } from "react-icons/ri";

import useCart from "@/lib/hook/useCart";
import CheckOutDropdown from "@/components/CheckOutDropdown";

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	streetAddress?: string;
	state?: string;
	city?: string;
	submit?: string;
}

const CheckOut: React.FC = () => {
	const cart = useCart();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [streetAddress, setStreetAddress] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [errors, setErrors] = useState<FormErrors>({});
	const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
	const [orderMessage, setOrderMessage] = useState<string>("");
	const [showToast, setShowToast] = useState<boolean>(false);

	const total = cart.cartItems.reduce(
		(acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
		0
	);
	const totalRounded = parseFloat(total.toFixed(2));

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		if (!firstName.trim()) newErrors.firstName = "First name is required.";
		if (!lastName.trim()) newErrors.lastName = "Last name is required.";
		if (!email.trim()) {
			newErrors.email = "Email is required.";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = "Email format is invalid.";
		}
		if (!phone.trim()) newErrors.phone = "Phone number is required.";
		if (!streetAddress.trim()) newErrors.streetAddress = "Address is required.";
		if (!state) newErrors.state = "State is required.";
		if (!city.trim()) newErrors.city = "City is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCheckout = async () => {
		setHasAttemptedSubmit(true);
		if (!validateForm()) return;

		try {
			const orderDetails = cart?.cartItems
				.map(
					(item) =>
						`${item.item.title} x ${item.quantity} - ₦${(
							item.item.price * item.quantity
						).toLocaleString()}`
				)
				.join("\n");

			const message =
				`*Name:* ${firstName} ${lastName}\n` +
				`*Email:* ${email}\n` +
				`*Phone Number:* ${phone}\n` +
				`*Delivery Address:* ${streetAddress}, ${city}, ${state} State, Nigeria\n` +
				`*Order Details:*\n${orderDetails}\n` +
				`*Total:* ₦${totalRounded.toLocaleString()}\n` +
				`\n` +
				`I would like to complete my order from your online store.\n`;

			setOrderMessage(message);

			const whatsappUrl = `https://wa.me/${
				process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
			}?text=${encodeURIComponent(message)}`;

			window.open(whatsappUrl, "_blank", "noopener,noreferrer");
		} catch (error) {
			console.error("Error processing order:", error);
			setErrors({
				...errors,
				submit:
					"An error occurred while processing your order. Please try again.",
			});
		}
	};

	const copyToClipboard = () => {
		setHasAttemptedSubmit(true);
		if (!validateForm()) return;

		navigator.clipboard.writeText(orderMessage).then(() => {
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		});
	};

	const resetPage = () => {
		cart.clearCart();
		resetForm();
	};

	const resetForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPhone("");
		setStreetAddress("");
		setState("");
		setCity("");
		setErrors({});
		setHasAttemptedSubmit(false);
		setOrderMessage("");
	};

	useEffect(() => {
		if (hasAttemptedSubmit) {
			validateForm();
		}
	}, [firstName, lastName, email, phone, streetAddress, state, city]);

	const renderInput = (
		id: string,
		label: string,
		value: string,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
		error?: string
	) => (
		<div className="flex flex-col gap-1 mb-4">
			<label
				htmlFor={id}
				className="font-open-sans text-base font-medium text-black dark:text-white"
			>
				{label}
			</label>
			<input
				type="text"
				id={id}
				value={value}
				onChange={onChange}
				className={`w-full max-w-[424px] rounded-lg border ${
					error ? "border-red-500" : "border-gold-text"
				} py-[15px] px-4 shadow-sm font-libre-franklin font-normal text-sm text-black dark:text-white dark:bg-[#444] outline-none`}
				required
			/>
			{error && <p className="text-red-600 mt-1">{error}</p>}
		</div>
	);

	return (
		<div className="flex gap-20 pt-10 pb-16 px-[190px] max-lg:flex-col max-2xl:px-[5%] bg-white dark:bg-[#2E2E2E]">
			<div className="w-2/3 max-xl:w-full">
				<p className="font-open-sans font-bold text-lg sm:text-2xl tracking-[-0.02em] text-black dark:text-white">
					Delivery Information
				</p>

				<form className="mt-6" onSubmit={(e) => e.preventDefault()}>
					{renderInput(
						"firstName",
						"First Name",
						firstName,
						(e) => setFirstName(e.target.value),
						errors.firstName
					)}
					{renderInput(
						"lastName",
						"Last Name",
						lastName,
						(e) => setLastName(e.target.value),
						errors.lastName
					)}
					{renderInput(
						"email",
						"Email",
						email,
						(e) => setEmail(e.target.value),
						errors.email
					)}
					{renderInput(
						"phone",
						"Phone Number",
						phone,
						(e) => setPhone(e.target.value),
						errors.phone
					)}

					{/* Street Address */}
					<div className="flex flex-col gap-1 mb-4">
						<label
							htmlFor="streetAddress"
							className="font-open-sans text-base font-medium text-black dark:text-white"
						>
							Delivery Address
						</label>
						<textarea
							id="streetAddress"
							value={streetAddress}
							onChange={(e) => setStreetAddress(e.target.value)}
							className={`w-full max-w-[424px] rounded-lg border ${
								errors.streetAddress ? "border-red-500" : "border-gold-text"
							} py-[15px] px-4 shadow-sm font-libre-franklin font-normal text-sm text-black dark:text-white dark:bg-[#444] outline-none`}
							required
						></textarea>
						{errors.streetAddress && (
							<p className="text-red-600 mt-1">{errors.streetAddress}</p>
						)}
					</div>

					{/* State */}
					<div className="flex flex-col gap-1 mb-4">
						<h2 className="font-open-sans text-base font-medium text-black dark:text-white">
							State
						</h2>
						<div className="w-full max-w-[424px]">
							<CheckOutDropdown
								options={State?.getStatesOfCountry("NG").map((stateOption) => ({
									iso2: stateOption.isoCode,
									name: stateOption.name,
								}))}
								selectedOption={state}
								onChange={setState}
							/>
							{errors.state && (
								<p className="text-red-600 mt-1">{errors.state}</p>
							)}
						</div>
					</div>

					{renderInput(
						"city",
						"City",
						city,
						(e) => setCity(e.target.value),
						errors.city
					)}
				</form>

				<p className="text-black dark:text-white font-semibold mt-4">
					<span className="text-red-600">*</span> Delivery is within 5-7 working
					days
				</p>
			</div>

			{/* Order Summary Section */}
			<div className="w-[600px] max-xl:w-full flex flex-col gap-4 bg-gray-100 rounded-lg px-4 py-6 dark:bg-gray-800">
				<div className="flex mb-6 justify-between">
					<p className="text-small-bold flex items-center justify-center dark:text-white">
						Summary&nbsp;
						<span>{`(${cart?.cartItems?.length} ${
							cart.cartItems.length > 1 ? "items" : "item"
						})`}</span>
					</p>

					<Image
						src="/assets/logo-black.svg"
						width={80}
						height={70}
						alt="DNBL logo"
						className="dark:invert"
					/>
				</div>

				<div className="flex flex-col gap-4 text-body-semibold dark:text-white">
					<div>
						<table className="min-w-full divide-y divide-gray-200 text-sm">
							<thead className="ltr:text-left rtl:text-right">
								<tr>
									<th className="whitespace-nowrap py-2 text-black dark:text-white text-left text-sm sm:text-base">
										{`${cart?.cartItems?.length > 1 ? "Products" : "Product"}`}
									</th>
									<th className="whitespace-nowrap py-2 text-black dark:text-white text-sm sm:text-base">
										{`${
											cart?.cartItems?.length > 1 ? "Quantities" : "Quantity"
										}`}
									</th>
									<th className="whitespace-nowrap py-2 text-black dark:text-white text-right text-sm sm:text-base">
										Price
									</th>
								</tr>
							</thead>

							<tbody>
								{cart?.cartItems?.map((cartItem) => (
									<tr key={cartItem.item._id}>
										<td className="whitespace-wrap py-2 font-medium text-black dark:text-white font-open-sans text-left text-sm sm:text-base">
											{cartItem.item.title}
										</td>
										<td className="whitespace-nowrap py-2 text-light-black dark:text-white font-open-sans text-center text-sm sm:text-base">
											{cartItem.quantity}
										</td>
										<td className="whitespace-nowrap py-2 text-light-black dark:text-white font-open-sans text-right text-sm sm:text-base">
											₦
											{(
												cartItem.item.price * cartItem.quantity
											).toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<hr className="dark:border-gray-600" />

				<div className="flex justify-between text-base font-open-sans font-semibold dark:text-white">
					<span>Subtotal</span>
					<span>₦{totalRounded.toLocaleString()}</span>
				</div>

				<hr className="mb-4 dark:border-gray-600" />

				<div className="w-[250px] mx-auto mt-4">
					<button
						className="flex justify-center items-center p-3 2xl:py-4 2xl:px-6 gap-3 w-full shadow-btn-shadow rounded-lg text-base font-libre-franklin font-semibold border border-gold-text text-gold-text duration-300 cursor-pointer hover:scale-95 dark:shadow-lg"
						type="button"
						onClick={handleCheckout}
					>
						<RiWhatsappFill size={30} className="text-green-500" /> Order on
						WhatsApp
					</button>
				</div>

				{/* Copy Order button */}
				<div className="mt-4 text-center">
					<button
						onClick={copyToClipboard}
						className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 dark:shadow-lg`}
					>
						Copy Order to Clipboard
					</button>
				</div>

				{/* Toast Notification */}
				{showToast && (
					<div className="w-[280px] sm:w-[320px] fixed top-10 left-[50%] -translate-x-[50%] bg-white text-base sm:text-lg text-green-600 text-center px-4 py-2 rounded shadow-lg transition-opacity duration-300">
						Order details copied to clipboard!
					</div>
				)}

				<p className="mt-5 text-center text-sm font-libre-franklin px-4 lg:text-white">
					Click to{" "}
					<span
						className="font-semibold text-gold-text hover:underline duration-300 cursor-pointer"
						onClick={resetPage}
					>
						Clear Your Cart
					</span>
					, If you have completed your order.
				</p>
			</div>
		</div>
	);
};

export default CheckOut;
