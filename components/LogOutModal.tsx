import React from "react";
import Image from "next/image";

function LogOutModal() {
	return (
		<div className="h-full flex items-center justify-center flex-col">
			<Image
				src="/assets/logout.png"
				width={80}
				height={80}
				alt=""
				className="w-20 h-20"
			/>
			<h2 className="font-open-sans font-normal text-xl sm:text-2xl sm:leading-[31.2px] text-figure-text dark:text-white my-4">
				Are you sure you want to log out?
			</h2>
		</div>
	);
}

export default LogOutModal;
