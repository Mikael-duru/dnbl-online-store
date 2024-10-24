import React from "react";
import Image from "next/image";

import ButtonPrimary from "../custom-buttons/ButtonPrimary";

const HomeBanner = () => {
	return (
		<section className="relative">
			<Image
				src="/assets/home-banner.png"
				alt="Home Banner"
				width={1440}
				height={721}
				className="w-auto h-auto object-cover"
			/>
			<div className="absolute inset-0 bg-banner-layer flex flex-col items-center justify-center">
				<div className="w-[320px] xs:w-[400px] sm:w-[630px] lg:w-[921px] text-center">
					<h1 className="text-text-gray dark:text-white font-poppins-black font-black text-lg xs:text-2xl leading-[120%] sm:text-3xl md:text-[35.5px] lg:text-5xl lg:leading-[56px] tracking-[-0.96px] pb-[1.5%] xs:pb-4">
						Connecting the Nigerian&nbsp;
						<span className="text-brown-gold">Diaspora</span> with&nbsp;
						<span className="text-brown-gold">Elegance</span> and&nbsp;
						<span className="text-brown-gold">Pride</span>
					</h1>

					<p className="text-white dark:text-gray-300 font-open-sans text-xs sm:text-xl lg:text-[28px] lg:leading-[40px] font-normal tracking-[-0.56px] pb-[5%] sm:pb-[38px]">
						Celebrate Your Heritage in Style with Premium Quality Products.
						Embrace Elegance and Sophistication.
					</p>

					<div className="w-[200px] sm:w-[400px] mx-auto">
						<ButtonPrimary
							type="button"
							label="Explore products"
							href="/product"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomeBanner;
