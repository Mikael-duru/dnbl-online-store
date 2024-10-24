import { connectToDB } from "@/lib/mongoDB";
import admin from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import Review from "@/lib/models/Review";

export const POST = async (req: NextRequest) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    // Verify the token and get the user's UID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const { productId, name, ImageUrl, rating, reviewTitle, reviewMessage } =
      await req.json();

    // Validate required fields
    if (
      !productId ||
      !name ||
      !ImageUrl ||
      rating === undefined ||
      !reviewTitle ||
      !reviewMessage
    ) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new review
    const newReview = await Review.create({
      productId,
      name,
      ImageUrl,
      rating,
      reviewTitle,
      reviewMessage,
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (err) {
    console.error("[review_POST]", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const dynamic = "force-dynamic";