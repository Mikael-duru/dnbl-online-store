type ProductType = {
  _id: string;               // Unique identifier for the product
  media: string[];           // Array of image URLs or paths for the product
  productName: string;       // Name of the product
  newPrice: number;          // Current price of the product
  oldPrice: number;          // Previous price (if any) for showing discounts
  description: string;       // Detailed description of the product
  material: string;          // Material of the product
  categories: string[];      // List of categories, e.g., 'men', 'women', 'children', 'featured', 'trendy'
  sizes: string[];           // Available sizes for the product
  colors: string[];          // Available colors for the product
  createdAt: string;         // Timestamp of when the product was created
  quantity: number;          // Amount of the product that is available
};
