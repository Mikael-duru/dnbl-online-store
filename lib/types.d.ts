type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  sizes: [string];
  colors: [string];
  material: string;
  price: number; 
  oldPrice: number;
  cost: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

type UserType = {
  firebaseId: string;
  wishlist: [string];
  orders: [string];
  createdAt: string;
  updatedAt: string;
};

type ReviewType = {
  productId: string;
  name: string;
  ImageUrl: string;
  date: Date;
  rating: number;
  reviewTitle: string;
  reviewMessage: string;
};

type OrderType = {
  shippingAddress: object;
  _id: string;
  customerFirebaseId: string;
  products: [OrderItemType]
  shippingRate: string;
  totalAmount: number;
  status: string;
}

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
}