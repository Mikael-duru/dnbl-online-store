
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
        min: 1,
        max: 5,
    },
    reviewTitle: {
        type: String,
        required: true,
    },
    reviewMessage: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;