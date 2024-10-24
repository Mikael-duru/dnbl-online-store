import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import admin from "@/lib/firebaseAdmin";

// import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await connectToDB()

    const user = await User.findOne({ firebaseId: userId })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const { productId } = await req.json()

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 })
    }

    const isLiked = user.wishlist.includes(productId)

    if (isLiked) {
      // Dislike
      user.wishlist = user.wishlist.filter((id: string) => id !== productId)
    } else {
      // Like
      user.wishlist.push(productId)
    }

    await user.save()
    
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[wishlist_POST]", err);
    console.error("[wishlist_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";