import Link from "next/link";
import { useCalculateRemainingInventory } from "./Inventory";
import Image from "next/image";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import HeartFavorite from "./HeartFavourite";

const CartItem = ({ cartItem, cart }: any) => {
	const remainingInventory = useCalculateRemainingInventory(cartItem.item);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	return (
		<div
			key={cartItem.item._id}
			className="w-full flex max-sm:flex-col max-sm:gap-4 gap-8 hover:bg-gray-100 items-center max-sm:items-start justify-between dark:hover:bg-gray-700 mt-6 sm:-8 rounded-lg"
		>
			<div className="flex sm:w-[380px] shrink-0">
				<Link href={`/product/${cartItem.item._id}`}>
					<Image
						src={cartItem.item.media[0]}
						width={100}
						height={100}
						className="rounded-lg w-32 h-32 object-contain bg-[#fdfdfd]"
						alt="product"
					/>
				</Link>
				<div className="flex flex-col gap-1 ml-4">
					<p className="text-small-bold dark:text-white">
						{cartItem.item.title}
					</p>
					{cartItem.color && (
						<p className="text-small-medium dark:text-white">
							Color: <strong>{cartItem.color}</strong>
						</p>
					)}
					{cartItem.size && (
						<p className="text-small-medium dark:text-white">
							Size: <strong>{cartItem.size}</strong>
						</p>
					)}
					<p className="text-small-medium dark:text-white">
						Price: <strong>₦{cartItem.item.price.toLocaleString()}</strong>
					</p>

					{isOutOfStock ? (
						<p className="text-sm font-medium text-black dark:text-gray-300 font-rubik">
							<span className="text-red-500">Out of Stock</span>
						</p>
					) : (
						<p className="text-sm font-medium text-black dark:text-gray-300 font-rubik">
							<span className="text-green-500">In Stock</span>
							{remainingInventory <= 10 && (
								<span className="text-red-500 font-rubik pl-1 text-xs tracking-[0.06em]">
									({remainingInventory} left!)
								</span>
							)}
						</p>
					)}
				</div>
			</div>

			<div className="flex-1 flex items-center justify-between gap-10 shrink-0">
				{isOutOfStock ? (
					<>
						<HeartFavorite product={cartItem.item} />
					</>
				) : (
					<div className="flex gap-4 items-center">
						<CiSquareMinus
							size={28}
							className={`cursor-pointer ${
								cartItem.quantity === 1
									? "text-grey-500 cursor-not-allowed"
									: "hover:text-red-500"
							}`}
							onClick={() =>
								cartItem.quantity > 1 &&
								cart.decreaseQuantity(cartItem.item._id)
							}
						/>
						<p className="text-body-bold dark:text-white">
							{cartItem.quantity}
						</p>

						<button
							disabled={
								isOutOfStock || remainingInventory === cartItem.quantity
							}
							onClick={() => cart.increaseQuantity(cartItem.item._id)}
						>
							<CiSquarePlus
								size={28}
								className={`hover:text-green-500 cursor-pointer ${
									isOutOfStock ||
									(remainingInventory === cartItem.quantity &&
										"cursor-not-allowed hover:text-red-500")
								}`}
							/>
						</button>
					</div>
				)}

				<FaRegTrashAlt
					size={24}
					className="hover:text-red-500 cursor-pointer sm:mr-4"
					onClick={() => cart.removeItem(cartItem.item._id)}
				/>
			</div>
		</div>
	);
};

export default CartItem;
