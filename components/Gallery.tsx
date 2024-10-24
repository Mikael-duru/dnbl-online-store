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
				className="max-sm:w-[300px] w-full h-[200px] sm:h-[350px] shadow-xl object-contain border border-black bg-[#fdfdfd] dark:border-[#B47B2B]"
			/>
			<div className="flex gap-2 lg:gap-3 overflow-auto">
				{productMedia.map((image, index) => (
					<Image
						key={index}
						src={image}
						height={150}
						width={150}
						alt="product"
						className={`w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-lg object-contain bg-[#fdfdfd] cursor-pointer ${
							mainImage === image
								? "border-2 border-black dark:border-[#B47B2B]"
								: ""
						}`}
						onClick={() => setMainImage(image)}
					/>
				))}
			</div>
		</div>
	);
};

export default Gallery;
