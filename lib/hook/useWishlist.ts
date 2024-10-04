import { create } from "zustand";
// import Cookies from "js-cookie";

interface WishlistStore {
  wishlistItems: ProductType[];
  loading: boolean;
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: string) => void;
  loadWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>((set) => ({
  wishlistItems: [],
  loading: true, // Initial loading state set to true
  
  // Load wishlist from Cookies
  loadWishlist: () => {
    set({ loading: true }) // Set loading to true before fetching data
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    set({ wishlistItems: storedWishlist, loading: false }); // Set loading to false once data is fetched
  },

  // Add product to wishlist
  addToWishlist: (product) => {
    set((state) => {
      const updatedWishlist = [product, ...state.wishlistItems];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlistItems: updatedWishlist };
    });
  },

  // Remove product from wishlist
  removeFromWishlist: (productId) => {
    set((state) => {
      const updatedWishlist = state.wishlistItems.filter(
        (item) => item._id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return { wishlistItems: updatedWishlist };
    });
  },
}));

export default useWishlistStore;
