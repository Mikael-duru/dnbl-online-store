type ProductWithTimestamp = ProductType & {
	timestamp: number;
};

const RECENTLY_VIEWED_KEY = "recentlyViewed";
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

export const addToRecentlyViewed = (product: ProductType) => {
	let recentlyViewed: ProductWithTimestamp[] = getRecentlyViewedProducts();

	// Remove the product if it already exists
	recentlyViewed = recentlyViewed.filter((p) => p._id !== product._id);

	// Add the new product to the front of the array with the timestamp
	recentlyViewed.unshift({
		...product,
		timestamp: Date.now(),
	});

	// Limit to the most recent 10 products
	recentlyViewed = recentlyViewed.slice(0, 10);
	console.log("[Stored recently viewed product]", recentlyViewed);

	// Save back to localStorage
	localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
};

export const getRecentlyViewedProducts = (): ProductWithTimestamp[] => {
	const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
	if (!storedProducts) return [];

	const recentlyViewed: ProductWithTimestamp[] = JSON.parse(storedProducts);
	const currentTime = Date.now();

	// Check if all products are older than 3 days
	const allOld = recentlyViewed.every(
		(product) => currentTime - product.timestamp > TWO_DAYS_MS
	);

	if (allOld) {
		// If all products are old, clear the entire list
		localStorage.removeItem(RECENTLY_VIEWED_KEY);
		return [];
	}

	// Filter out products older than 3 days
	const validProducts = recentlyViewed.filter(
		(product) => currentTime - product.timestamp <= TWO_DAYS_MS
	);

	// Update storage if any products were removed
	if (validProducts.length < recentlyViewed.length) {
		localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(validProducts));
	}

	console.log("[Recently viewed product]", validProducts);

	return validProducts;
};

// export const addToRecentlyViewed = (product: ProductType) => {
// 	let recentlyViewed: ProductWithTimestamp[] = getRecentlyViewedProducts();

// 	// Remove the product if it already exists
// 	recentlyViewed = recentlyViewed.filter((p) => p._id !== product._id);

// 	// Add the new product to the front of the array
// 	recentlyViewed.unshift({
// 		...product,
// 		timestamp: Date.now(),
// 	});

// 	// Limit to the most recent 10 products
// 	recentlyViewed = recentlyViewed.slice(0, 10);

// 	// Save back to localStorage
// 	localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
// };

// export const getRecentlyViewedProducts = (): ProductWithTimestamp[] => {
// 	const storedProducts = localStorage.getItem(RECENTLY_VIEWED_KEY);
// 	if (!storedProducts) return [];

// 	const recentlyViewed = JSON.parse(storedProducts);
// 	const currentTime = Date.now();

// 	// Check if all products are older than 3 days
// 	const allOld = recentlyViewed.every(
// 		(product: ProductWithTimestamp) =>
// 			currentTime - product.timestamp > TWO_DAYS_MS
// 	);

// 	if (allOld) {
// 		// If all products are old, clear the entire list
// 		localStorage.removeItem(RECENTLY_VIEWED_KEY);
// 		return [];
// 	}

// 	// Filter out products older than 3 days
// 	const validProducts = recentlyViewed.filter(
// 		(product: ProductWithTimestamp) =>
// 			currentTime - product.timestamp <= TWO_DAYS_MS
// 	);

// 	// Update storage if any products were removed
// 	if (validProducts.length < recentlyViewed.length) {
// 		localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(validProducts));
// 	}

// 	return validProducts;
// };
