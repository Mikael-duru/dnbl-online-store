import admin from "@/lib/firebaseAdmin";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token and get the user's UID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid; // This is your user's UID

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }

    await connectToDB()

     // Find the user in the database
    let user = await User.findOne({ firebaseId: userId })

    // Create a new user if not found
    if (!user) {
      user = await User.create({ firebaseId: userId })
      console.log("New user created:", user);
      // await user.save()
    }

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[users_GET]", err)
    console.error("[users_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";