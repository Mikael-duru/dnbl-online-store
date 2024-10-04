import { create } from "zustand";
import toast from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
	item: ProductType;
	quantity: number;
	color?: string;
	size?: string;
}

interface CartStore {
	cartItems: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (idToRemove: string) => void;
	increaseQuantity: (idToIncrease: string) => void;
	decreaseQuantity: (idToDecrease: string) => void;
	clearCart: () => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			cartItems: [],
			addItem: (data: CartItem) => {
				const { item, quantity, color, size } = data;
				const currentItems = get().cartItems;
				const existingItem = currentItems?.find(
					(cartItem) => cartItem?.item._id === item._id
				);

				if (existingItem) {
					let updateMessage = "";

					switch (true) {
						case existingItem?.quantity !== quantity &&
							existingItem?.color !== color &&
							existingItem?.size !== size:
							updateMessage += "quantity, color, and size updated ";
							break;
						case existingItem?.quantity !== quantity &&
							existingItem?.color !== color:
							updateMessage += "quantity and color updated ";
							break;
						case existingItem?.quantity !== quantity &&
							existingItem?.size !== size:
							updateMessage += "quantity and size updated ";
							break;
						case existingItem?.color !== color && existingItem?.size !== size:
							updateMessage += "color and size updated ";
							break;
						case existingItem?.quantity !== quantity:
							updateMessage += "quantity updated ";
							break;
						case existingItem?.color !== color:
							updateMessage += "color updated ";
							break;
						case existingItem?.size !== size:
							updateMessage += "size updated ";
							break;
						default:
							updateMessage = "";
					}

					if (updateMessage) {
						// Update existing item and move it to the beginning
						const newCartItems = currentItems.map((cartItem) =>
							cartItem.item._id === item._id
								? { ...cartItem, quantity, color, size }
								: cartItem
						);
						// Remove the updated item from its original position and add it to the front
						const updatedItem = newCartItems?.find(
							(cartItem) => cartItem.item._id === item._id
						);
						const filteredItems = newCartItems?.filter(
							(cartItem) => cartItem.item._id !== item._id
						);
						set({ cartItems: [updatedItem, ...filteredItems] });
						toast.success(`Item ${updateMessage}`, { icon: "🛒" });
					} else {
						toast("Item already in cart", { icon: "🛒" });
					}
				} else {
					set({
						cartItems: [...currentItems, { item, quantity, color, size }],
					});
					toast.success("Item added to cart", { icon: "🛒" });
				}
			},
			removeItem: (idToRemove: string) => {
				const newCartItems = get().cartItems.filter(
					(cartItem) => cartItem.item._id !== idToRemove
				);
				set({ cartItems: newCartItems });
				toast.success("Item removed from cart");
			},
			increaseQuantity: (idToIncrease: string) => {
				const newCartItems = get().cartItems.map((cartItem) =>
					cartItem.item._id === idToIncrease
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
				set({ cartItems: newCartItems });
				toast.success("Item quantity increased");
			},
			decreaseQuantity: (idToDecrease: string) => {
				const newCartItems = get().cartItems.map((cartItem) =>
					cartItem.item._id === idToDecrease
						? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) } // Prevent going below 1
						: cartItem
				);
				set({ cartItems: newCartItems });
				toast.success("Item quantity decreased");
			},
			clearCart: () => set({ cartItems: [] }),
		}),
		{
			name: "cart-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCart;
