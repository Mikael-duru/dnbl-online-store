import { FirebaseError } from "firebase/app";
import { auth, db } from "@/firebase/firebase";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { useRouter  } from "next/navigation";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteUserFromFirestore = async (
  isEmailUser: boolean,
  isGoogleUser: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>,
  password?: string
) => {
  const user = auth?.currentUser;
  if (!user) return;

  try {
    setIsLoading(true);

    // Handle Google user
    if (isGoogleUser) {
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, googleProvider);
      await deleteUser(user);
      await deleteDoc(doc(db, "users", user.uid));
      router.push("/"); // Use router passed as an argument
    }

    // Handle Email user
    if (isEmailUser) {
      if (!password) {
        toast("Please enter your correct password");
        return;
      }
      const userEmail = user.email as string;
      const credential = EmailAuthProvider.credential(userEmail, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      await deleteDoc(doc(db, "users", user.uid));
      router.push("/"); // Use router passed as an argument
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      toast.error(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};
