import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from "@/lib/config/dnbl-online-shop-firebase-adminsdk-znp7z-aac774cd4b.json";

if (!admin.apps.length) {
  const credentials = serviceAccount as ServiceAccount; // Type assertion
  console.log(credentials)
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });
}

export default admin;