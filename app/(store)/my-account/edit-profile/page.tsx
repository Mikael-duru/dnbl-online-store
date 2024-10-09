"use client";

import React, { useEffect, useState } from "react";
import { UserRoundCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import type { User } from "firebase/auth";
import { MdPhotoLibrary } from "react-icons/md";

import LeftSideBar from "@/components/user-dashboard/LeftSideBar";
import ButtonPrimary from "@/components/ButtonPrimary";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import uploadFile from "@/lib/upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EditProfile() {
	const [user, setUser] = useState<User | null>(null);
	const [userName, setUserName] = useState<string | null>(null);
	const [userPhotoURL, setUserPhotoURL] = useState<string>("");
	const router = useRouter();
	const [photoURL, setPhotoURL] = useState({
		file: null,
		url: "",
	});
	const [formData, setFormData] = useState({
		address: "",
		city: "",
		country: "",
		phoneNumber: "",
	});
	const [initialValues, setInitialValues] = useState(formData);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);

				try {
					const userDoc = await getDoc(doc(db, "users", user.uid));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						setUserName(userData.displayName);
						setUserPhotoURL(userData.photoURL);

						// Set formData with existing user data
						setFormData({
							address: userData.address || "",
							city: userData.city || "",
							country: userData.country || "",
							phoneNumber: userData.phoneNumber || "",
						});

						// Set initial values for comparison during edits
						setInitialValues({
							address: userData.address || "",
							city: userData.city || "",
							country: userData.country || "",
							phoneNumber: userData.phoneNumber || "",
						});
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			} else {
				setUser(null);
				// Reset form data if user is logged out
				setFormData({
					address: "",
					city: "",
					country: "",
					phoneNumber: "",
				});
				setInitialValues(formData);
			}
		});

		// Clean up subscription on unmount
		return () => unsubscribe();
	}, []);

	const handlePhotoURL = (e: any) => {
		if (e.target.files[0]) {
			setPhotoURL({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (user) {
				const updates: Record<string, any> = {};

				// Only add fields that have changed
				if (formData.address !== initialValues.address)
					updates.address = formData.address;
				if (formData.city !== initialValues.city) updates.city = formData.city;
				if (formData.country !== initialValues.country)
					updates.country = formData.country;
				if (formData.phoneNumber !== initialValues.phoneNumber)
					updates.phoneNumber = formData.phoneNumber;

				let imageUrl = null;
				if (photoURL && photoURL?.file) {
					imageUrl = await uploadFile(photoURL.file);
					if (imageUrl) updates.photoURL = imageUrl; // Add avatar only if it was successfully uploaded
				}

				// Only update the document if there are any changes
				if (Object.keys(updates).length > 0) {
					await updateDoc(doc(db, "users", user.uid), updates);
					console.log("User data updated successfully");

					// Clear the form fields
					setFormData({
						address: "",
						city: "",
						country: "",
						phoneNumber: "",
					});
				}
			} else {
				console.log("No current user found!");
			}
		} catch (error) {
			console.error("Error updating user document:", error);
		}
	};

	const handleBack = () => {
		if (router && router.back) {
			router.back();
		}
	};

	return (
		<main className="bg-[#D9D9D9] dark:bg-[#121212]">
			{/* {isLoading ? (
				<Loader />
			) : ( */}
			<div className="flex gap-[30px] pt-10 pb-16 px-[100px] max-lg:flex-col max-2xl:px-[5%]">
				{/* Sidebar Navigation */}
				<LeftSideBar />

				{/* Main content area */}
				<div className="w-3/4 max-lg:w-full bg-white dark:bg-[#1E1E1E] shadow-sm rounded-[10px] pt-4 px-4 sm:pr-16 pb-[35px] sm:pl-[38px] relative">
					<IoClose
						className="absolute top-10 right-8 sm:top-[86px] sm:right-14 text-3xl mb-8 cursor-pointer hover:text-[#B47B2B]"
						onClick={handleBack}
					/>

					{/* User Info */}
					<div className="mb-[30px]">
						<Avatar className="w-[150px] h-[150px] sm:w-[167px] sm:h-[167px] rounded-full cursor-pointer">
							{user || photoURL?.url ? (
								<>
									<AvatarImage
										src={photoURL?.url || userPhotoURL}
										alt={"User profile picture"}
									/>
									<AvatarFallback className="text-7xl font-libre-franklin tracking-wide">
										<UserRoundCheck size={70} />
									</AvatarFallback>
								</>
							) : (
								<div className="w-[150px] h-[150px] sm:w-[167px] sm:h-[167px] rounded-full cursor-pointer border-8">
									<MdPhotoLibrary className="mx-auto h-full w-[60%] text-gray-500" />
								</div>
							)}
						</Avatar>

						<div className="mt-4 flex items-center mb-1 text-sm leading-6 text-gray-400">
							<label htmlFor="file-upload" className="pl-6">
								<span
									key="file-upload-span"
									className="relative cursor-pointer rounded-md px-2 py-1 bg-btn-gold font-semibold text-gray-200 text-base hover:bg-[#f3a63b]"
								>
									Upload a file
								</span>
								<input
									type="file"
									name="file-upload"
									id="file-upload"
									className="sr-only"
									onChange={handlePhotoURL}
								/>
							</label>
						</div>
						<p className="text-sm leading-5 text-gray-400 pt-1">
							PNG, JPG, GIF up to 10MB
						</p>

						{user && (
							<div className="mt-4">
								<h2 className="font-open-sans font-normal text-lg text-black dark:text-white sm:pb-2">
									{user?.displayName || userName}
								</h2>
								<p className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white">
									{user?.email}
								</p>
							</div>
						)}
					</div>

					{/* Form */}
					<form onSubmit={handleEdit}>
						<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
							{/* Address */}
							<div>
								<label
									htmlFor="userAddress"
									className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
								>
									Address
								</label>
								<input
									id="userAddress"
									name="address" // Add name attribute
									value={formData.address} // Bind to state
									onChange={handleInputChange} // Handle input changes
									className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-[#B47B2B] focus:border-none outline-none"
									placeholder="Enter Address"
									aria-label="Enter Address"
								/>
							</div>
							{/* City */}
							<div>
								<label
									htmlFor="userCity"
									className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
								>
									City
								</label>
								<input
									id="userCity"
									name="city" // Add name attribute
									value={formData.city} // Bind to state
									onChange={handleInputChange} // Handle input changes
									className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-[#B47B2B] focus:border-none outline-none"
									placeholder="Enter City"
									aria-label="Enter City"
								/>
							</div>
							{/* Country */}
							<div>
								<label
									htmlFor="userCountry"
									className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
								>
									Country
								</label>
								<input
									id="userCountry"
									name="country" // Add name attribute
									value={formData.country} // Bind to state
									onChange={handleInputChange} // Handle input changes
									className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-[#B47B2B] focus:border-none outline-none"
									placeholder="Enter Country"
									aria-label="User Country"
								/>
							</div>
							{/* Phone Number */}
							<div>
								<label
									htmlFor="userPhone"
									className="font-open-sans font-normal text-base leading-[28px] text-black dark:text-white mb-3"
								>
									Phone
								</label>
								<input
									id="userPhone"
									name="phoneNumber" // Add name attribute
									type="tel"
									value={formData.phoneNumber} // Bind to state
									onChange={handleInputChange} // Handle input changes
									className="w-full pt-2 px-4 pb-8 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-[#1E1E1E] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-[#B47B2B] focus:border-none outline-none"
									placeholder="Enter Phone"
									aria-label="User Phone"
								/>
							</div>
						</div>

						<div className="w-[200px] sm:w-[400px] mt-10 mx-auto">
							<ButtonPrimary type="submit" label="Update Profile" />
						</div>
					</form>
				</div>
			</div>
			{/* )} */}
		</main>
	);
}

export default EditProfile;
