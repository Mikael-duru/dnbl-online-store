import React from "react";

import { getProducts } from "@/lib/actions/actions";
import { getUniqueCategoriesMaterialsSizes } from "@/lib/actions/filterActions";
import Products from "@/components/Products";

const ProductsPage = async () => {
	const products = await getProducts();
	const { uniqueCategories } = await getUniqueCategoriesMaterialsSizes();

	return <Products products={products} categories={uniqueCategories} />;
};

export const dynamic = "force-dynamic";

export default ProductsPage;
