import Link from "next/link";
import { useCalculateRemainingInventory } from "./Inventory";
import Image from "next/image";

const OrderItem = ({ orderItem, cart }: any) => {
	const remainingInventory = useCalculateRemainingInventory(orderItem.product);

	if (!remainingInventory) {
		return null;
	}

	const isOutOfStock = remainingInventory <= 0;

	const quantity = orderItem.quantity;

	return (
		<div
			className="flex max-x:flex-col max-x:gap-3 gap-4"
			key={orderItem?.product._id}
		>
			<div className="rounded-lg bg-white hover:border hover:border-gray-300 overflow-hidden w-32 h-32 shrink-0">
				<Link href={`/product/${orderItem?.product._id}`}>
					<Image
						src={orderItem.product.media[0]}
						alt={orderItem.product.title}
						width={500}
						height={500}
						className="w-32 h-32 object-contain rounded-lg"
					/>
				</Link>
			</div>

			<div className="flex max-sm:flex-col justify-between items-start w-full h-full gap-1">
				<div className="flex flex-col gap-1 justify-between">
					<p className="text-sm leading-[140%] font-bold">
						{orderItem.product.title}
					</p>
					{orderItem.size && (
						<p className="text-sm leading-[140%] font-medium">
							Size:{" "}
							<span className="text-sm leading-[140%] font-bold uppercase">
								{orderItem.size}
							</span>
						</p>
					)}
					{orderItem.color && (
						<p className="text-sm leading-[140%] font-medium">
							Color:{" "}
							<span className="text-sm leading-[140%] font-bold capitalize">
								{orderItem.color}
							</span>
						</p>
					)}
					<p className="text-sm leading-[140%] font-medium">
						QTY:{" "}
						<span className="text-sm leading-[140%] font-bold">
							{orderItem.quantity}
						</span>
					</p>

					<p className="text-sm leading-[140%] font-medium">
						<span className="text-sm leading-[140%] font-bold">
							{Intl.NumberFormat("en-US", {
								style: "currency",
								currency: "NGN",
							}).format(orderItem.product.price)}
						</span>
					</p>
				</div>

				<button
					type="button"
					disabled={isOutOfStock}
					className={`font-rubik font-medium text-sm  text-figure-text dark:text-white hover:text-gold-text flex gap-1 items-center justify-center underline ${
						isOutOfStock ? "cursor-not-allowed" : "cursor-pointer"
					}`}
					onClick={() => {
						cart.addItem({
							item: orderItem.product,
							quantity,
							color: orderItem.color,
							size: orderItem.size,
						});
					}}
				>
					{isOutOfStock ? "Out of Stock" : "Buy Again"}
				</button>
			</div>
		</div>
	);
};

export default OrderItem;
