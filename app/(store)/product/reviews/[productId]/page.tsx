import React from "react";

import { getProductDetails } from "@/lib/actions/actions";
import Reviews from "@/components/Reviews";

const ReviewsPage = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductDetails(params.productId); // Get product by Id

	return <Reviews product={product} />;
};

export const dynamic = "force-dynamic";

export default ReviewsPage;
