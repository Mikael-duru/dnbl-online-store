import { products } from '@/store/products';

// GET CATEGORIES FUNCTION
export const categories = Array.from(
	new Set(products?.flatMap(product => product.categories))
);

// Get each product by category
export const getCategoryType = (categoryName: string): string | undefined => {
  return categories?.find(category => category === categoryName);
};

// Filter products by the selected category
export const getFilteredCategoryProducts = (category: string) => {
  return products?.filter(product =>
      product.categories.includes(category)
  );
};


// GET MATERIALS 
export const materials = Array.from(
	new Set(products?.map(product => product.material))
);


// GET SIZES
export const sizes = Array.from(
	new Set(products?.flatMap(product => product.sizes))
);


// Utility function to get product by ID
export const getProductById = (id: any) => {
  return products?.find(product => product._id === id);
};