"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
	const [mainImage, setMainImage] = useState(productMedia[0]);

	return (
		<div className="flex flex-col gap-[21.83px] w-full sm:max-w-[500px]">
			<Image
				src={mainImage}
				width={555}
				height={500}
				alt="product"
				className="w-full h-[230px] sm:h-[400px] shadow-xl object-cover border border-black"
			/>
			<div className="flex gap-4 lg:gap-[16.38px] overflow-auto">
				{productMedia.map((image, index) => (
					<Image
						key={index}
						src={image}
						height={200}
						width={200}
						alt="product"
						className={`w-[85px] h-[90px] sm:w-[120px] sm:h-[125px] rounded-lg object-cover cursor-pointer ${
							mainImage === image ? "border-2 border-black" : ""
						}`}
						onClick={() => setMainImage(image)}
					/>
				))}
			</div>
		</div>
	);
};

export default Gallery;
