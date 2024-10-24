"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useState } from "react";
import useCart from "@/lib/hook/useCart";
import ButtonCart from "./custom-buttons/ButtonCart";
import { useCalculateRemainingInventory } from "./Inventory";

const ProductItemDetail = ({ product }: { product: ProductType }) => {
	const router = useRouter();
	const [selectedColor, setSelectedColor] = useState<string>(
		product?.colors[0]
	);
	const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0]);
	const [quantity, setQuantity] = useState<number>(1);
	const cart = useCart();

	const remainingInventory = useCalculateRemainingInventory(product);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	return (
		<div className="sm:flex sm:gap-6">
			<div className="max-sm:pt-6">
				<Image
					src={product?.media[0]}
					alt={product?.title}
					width={300}
					height={500}
					className="w-full h-[260px] sm:w-[280px] sm:h-[370px] xl:h-[340px] object-cover rounded-lg cursor-pointer"
				/>
			</div>

			<div className="flex-1 max-sm:pt-4 text-start">
				<div>
					<h3 className="text-lg font-semibold text-black dark:text-white font-rubik">
						{product?.title}
					</h3>

					<p className="font-open-sans text-xs text-figure-text font-medium dark:text-gray-300 my-[5.87px] capitalize">
						{product?.category}
					</p>

					{product?.oldPrice ? (
						<p className="text-base font-bold font-open-sans text-figure-text dark:text-white flex items-baseline gap-[5.47px] my-2">
							₦{product.price.toLocaleString()}
							<span className="line-through font-bold text-xs lg:text-sm text-old-price-text">
								₦{product.oldPrice.toLocaleString()}
							</span>
						</p>
					) : (
						<p className="text-sm lg:text-base font-bold font-open-sans text-figure-text dark:text-white my-2">
							₦{product.price.toLocaleString()}
						</p>
					)}

					{product?.colors.length > 0 && (
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-4">
							<p className="font-open-sans font-semibold text-sm lg:text-base text-black dark:text-white">
								Available Colors:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.colors.map((color, index) => (
									<div
										key={index}
										className={`w-[35px] h-[35px] rounded-lg cursor-pointer hover:border-black ${
											selectedColor === color
												? "border-2 border-black"
												: "border"
										}`}
										style={{ backgroundColor: color }}
										onClick={() => setSelectedColor(color)}
									></div>
								))}
							</div>
						</div>
					)}

					{product?.sizes.length > 0 && (
						<div className="flex max-sm:flex-col gap-2 sm:items-center sm:gap-4 mb-4">
							<p className="font-open-sans font-semibold text-sm lg:text-base text-black dark:text-white">
								Available Sizes:
							</p>
							<div className="flex gap-2 flex-wrap">
								{product.sizes.map((size, index) => (
									<p
										key={index}
										className={`w-[35px] h-[35px] bg-old-price-text border-2 hover:border-black rounded-lg cursor-pointer font-semibold text-sm tracking-[-0.6%] overflow-hidden uppercase ${
											selectedSize === size && "border-0"
										}`}
										onClick={() => setSelectedSize(size)}
									>
										<span
											className={`p-[8px] lg:p-[10px] w-full h-full flex items-center justify-center ${
												selectedSize === size
													? "bg-black text-white"
													: "text-black dark:bg-white"
											}`}
										>
											{size}
										</span>
									</p>
								))}
							</div>
						</div>
					)}

					{/* Button to toggle SizeChart visibility */}
					<button
						onClick={() => router.push("/size-chart-description")}
						className="border-none outline-none font-open-sans text-black dark:text-white font-normal text-sm underline"
					>
						View Size Chart
					</button>
				</div>

				{/* Quantity */}
				{!isOutOfStock && (
					<div className="flex items-center gap-4 mt-5">
						<p className="font-open-sans font-semibold text-sm lg:text-base text-black dark:text-white">
							Quantity:
						</p>

						<div className="flex gap-3 items-center">
							<CiSquareMinus
								size={28}
								className="hover:text-red-500 cursor-pointer"
								onClick={() => quantity > 1 && setQuantity(quantity - 1)}
							/>

							<p className="font-rubik font-normal text-xl text-black dark:text-white">
								{quantity}
							</p>

							<button
								disabled={remainingInventory === quantity}
								onClick={() => setQuantity(quantity + 1)}
							>
								<CiSquarePlus
									size={28}
									className={`hover:text-green-500 cursor-pointer ${
										remainingInventory === quantity &&
										"cursor-not-allowed hover:text-red-500"
									}`}
								/>
							</button>
						</div>
					</div>
				)}

				{isOutOfStock ? (
					<p className="text-sm font-medium text-black dark:text-gray-300 font-rubik pt-4">
						Status: <span className="text-red-500">Out of Stock</span>
					</p>
				) : (
					<p className="text-sm font-medium text-black dark:text-gray-300 font-rubik pt-4">
						Status: <span className="text-green-500">In Stock</span>
						{remainingInventory <= 10 && (
							<span className="text-red-500 font-rubik pl-1 text-sm tracking-[0.06em]">
								({remainingInventory} left!)
							</span>
						)}
					</p>
				)}

				<div className="w-full mt-4 sm:mt-6">
					<ButtonCart
						type="button"
						disabled={isOutOfStock}
						className={`${
							isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"
						}`}
						label="Add To Cart"
						onClick={() => {
							cart.addItem({
								item: product,
								quantity,
								color: selectedColor,
								size: selectedSize,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductItemDetail;
