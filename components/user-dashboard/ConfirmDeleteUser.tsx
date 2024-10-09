import React from "react";
import { auth } from "@/firebase/firebase";
import { deleteUserFromFirestore } from "@/lib/authentication/DeleteUser";
import Input from "../Input";
import { useRouter } from "next/navigation";
import Loader from "../Loader";

interface ConfirmDeleteUserProps {
	setOpen: (open: boolean) => void; // Add setOpen prop type
}

const ConfirmDeleteUser: React.FC<ConfirmDeleteUserProps> = ({ setOpen }) => {
	const router = useRouter();
	const [password, setPassword] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const isEmailUser = auth?.currentUser?.providerData.some(
		(provider) => provider.providerId === "password"
	);
	const isGoogleUser = auth?.currentUser?.providerData.some(
		(provider) => provider.providerId === "google.com"
	);

	if (isLoading) return <div>Loading...</div>;

	if (isGoogleUser) {
		return (
			<div className="mt-4 text-sm text-gray-500 flex flex-col gap-4">
				<h2 className="font-open-sans font-semibold text-xl sm:text-2xl sm:mb-1 text-figure-text dark:text-white">
					Are you absolutely sure?
				</h2>
				<p className="font-open-sans font-normal text-base sm:text-lg text-figure-text my-4 dark:text-gray-300">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our server.
				</p>
				<div className="mt-4 flex flex-col-reverse gap-5 sm:flex-row justify-center items-center sm:gap-4">
					<div className="w-[150px]">
						<button
							className="w-full text-base leading-[21.79px] font-open-sans font-semibold p-[10px] border border-[#F23E3E] rounded-lg focus:ring-1 focus:ring-[#F23E3E] outline-none"
							onClick={() => setOpen(false)} // Close the modal
						>
							Cancel
						</button>
					</div>
					<div className="w-[150px]">
						<button
							type="button"
							className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-white p-[10px] border border-[#F23E3E] bg-[#F23E3E] outline-none rounded-lg hover:scale-95 duration-300 focus:ring-1 focus:ring-[#F23E3E]"
							onClick={async () => {
								await deleteUserFromFirestore(
									false,
									true,
									setIsLoading,
									router
								);
								setOpen(false);
							}}
						>
							Confirm delete
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (isEmailUser) {
		return (
			<div className="mt-4 flex flex-col gap-4">
				<h2 className="font-open-sans font-semibold text-xl sm:text-2xl sm:mb-1 text-figure-text dark:text-white">
					Are you absolutely sure?
				</h2>
				<p className="font-open-sans font-normal text-base sm:text-lg text-figure-text dark:text-gray-300">
					This action cannot be undone. This will permanently delete your
					account and remove your data from our server.
				</p>
				<p className="text-sm text-gray-500 dark:text-white">
					Please enter your password to delete your account:
				</p>
				<Input
					label="Password"
					name="password"
					value={password}
					onChange={setPassword}
				/>
				<div className="mt-4 flex flex-col-reverse gap-5 sm:flex-row justify-center items-center sm:gap-4">
					<div className="w-[150px]">
						<button
							className="w-full text-base leading-[21.79px] font-open-sans font-semibold p-[10px] border border-[#F23E3E] rounded-lg focus:ring-1 focus:ring-[#F23E3E] outline-none"
							onClick={() => setOpen(false)} // Close the modal
						>
							Cancel
						</button>
					</div>
					<div className="w-[150px]">
						<button
							type="button"
							className="w-full text-base leading-[21.79px] font-open-sans font-semibold text-white p-[10px] border border-[#F23E3E] bg-[#F23E3E] outline-none rounded-lg hover:scale-95 duration-300 focus:ring-1 focus:ring-[#F23E3E]"
							onClick={() =>
								deleteUserFromFirestore(
									true,
									false,
									setIsLoading,
									router,
									password
								)
							}
						>
							Confirm delete
						</button>
					</div>
				</div>
			</div>
		);
	}

	return null; // Ensure the component always returns something
};

export default ConfirmDeleteUser;
