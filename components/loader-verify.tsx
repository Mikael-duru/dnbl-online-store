import Image from "next/image";
import React from "react";

function VerifyLoader() {
	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<div className="loader">
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
				<div className="circle"></div>
			</div>
			<p className="headline">Verifying your DNBL account...</p>
			<div className="flex items-center justify-center mb-10 lg:hidden">
				<Image
					src="/assets/logo-black.svg"
					width={60}
					height={60}
					alt="DNBL logo"
					className="dark:invert"
				/>
			</div>
		</div>
	);
}

export default VerifyLoader;
