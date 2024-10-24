import Review from "@/lib/models/Review";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {

        const { productId } = params;

        await connectToDB();

        // Find reviews for the specified productId
        const reviews = await Review.find({ productId });

        if (!reviews.length) {
            return new NextResponse("No reviews found for this product", { status: 404 });
        }

        return NextResponse.json(reviews, { status: 200 });
    } catch (err) {
        console.error("[reviews_GET]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
