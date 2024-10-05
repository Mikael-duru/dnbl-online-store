"use client";

import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
	const [mainImage, setMainImage] = useState(productMedia[0]);

	return (
		<div className="flex flex-col gap-[21.83px] w-full sm:max-w-[400px]">
			<Image
				src={mainImage}
				width={555}
				height={500}
				alt="product"
				className="w-full h-[250px] sm:h-[330px] shadow-xl object-cover border border-black"
			/>
			<div className="flex gap-2 lg:gap-3 overflow-auto">
				{productMedia.map((image, index) => (
					<Image
						key={index}
						src={image}
						height={150}
						width={150}
						alt="product"
						className={`w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-lg object-cover cursor-pointer ${
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
