import { getProducts } from "./actions";

export const getUniqueCategoriesMaterialsSizes = async () => {
	const products: ProductType[] = await getProducts();

	// const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
	const uniqueCategories = Array.from(
		new Set(
			products.map((product) => product.category.trim().toLowerCase()) // Normalize category
		)
	);

	const uniqueMaterials = Array.from(
		new Set(
			products
				.filter((product) => product.material) // Filter out products with no material
				.map((product) => product.material.trim().toLowerCase()) // Normalize materials
		)
	);

	const uniqueSizes = Array.from(
		new Set(
			products.flatMap((product) => product.sizes)
				.map(size => size.trim().toLocaleUpperCase()) // Normalize sizes
		)
	);

	return {
		uniqueCategories,
		uniqueMaterials,
		uniqueSizes,
	};
};
