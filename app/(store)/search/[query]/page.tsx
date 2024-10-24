import SearchProducts from "@/components/SearchProducts";
import { getSearchedProducts } from "@/lib/actions/actions";
import { getUniqueCategoriesMaterialsSizes } from "@/lib/actions/filterActions";
import React from "react";

const SearchPage = async ({ params }: { params: { query: string } }) => {
	const searchedProducts = await getSearchedProducts(params.query);

	const decodedQuery = decodeURIComponent(params.query);

	const { uniqueCategories, uniqueMaterials, uniqueSizes } =
		await getUniqueCategoriesMaterialsSizes(); // Filters

	return (
		<SearchProducts
			decodedQuery={decodedQuery}
			products={searchedProducts}
			categories={uniqueCategories}
			materials={uniqueMaterials}
			sizes={uniqueSizes}
		/>
	);
};

export const dynamic = "force-dynamic";

export default SearchPage;
