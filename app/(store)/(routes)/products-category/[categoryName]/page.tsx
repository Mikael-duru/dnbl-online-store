import React from "react";
import { getProducts } from "@/lib/actions/actions";
import CategoryList from "@/components/CategoryList";

interface ProductCategoryProps {
	params: {
		categoryName: string;
	};
}

const ProductCategory: React.FC<ProductCategoryProps> = async ({ params }) => {
	const products = await getProducts();

	return (
		<CategoryList categoryName={params.categoryName} products={products} />
	);
};

export const dynamic = "force-dynamic";

export default ProductCategory;
