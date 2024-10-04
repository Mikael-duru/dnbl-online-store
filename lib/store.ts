import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "@/firebase/firebase";

interface UserType {
  firstName: string;
  lastName: string;
  displayName: string;
  emailVerified: boolean;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  email: string;
  photoURL: string;
  id: string;
}

interface StoreType {
  // user
  currentUser: UserType | null;
  isLoading?: boolean;
  getUserInfo: (uid: string) => Promise<void>;
  getUserByEmail: (email: string) => Promise<void>;
}

// Wrapper to use localStorage with the correct type
const localStorageWrapper = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item); // Parse the stored string to an object
    }
    return null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value)); // Store as string
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const store = create<StoreType>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,

      getUserInfo: async (uid: any) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        try {
          if (docSnap.exists()) {
            set({ currentUser: docSnap.data() as UserType, isLoading: false });
          }
        } catch (error) {
          console.log("getUserInfo error", error);
          set({ currentUser: null, isLoading: false });
        }
      },

      getUserByEmail: async (email: any) => {
        const userRef = doc(db, "users", email); // Adjust based on your database structure
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            return set({ currentUser: userDoc.data() as UserType, isLoading: false }); 
        } else {
            throw new Error("getUserByEmail: No user found");
            set({ currentUser: null, isLoading: false });
        }
    },
    }),
    {
      name: "dnbl-storage",
      storage: localStorageWrapper, // Use the wrapped localStorage
    }
  )
);