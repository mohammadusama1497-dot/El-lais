export type ProductDTO = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: string;
  compareAtPrice: string | null;
  imageUrl: string;
  badge: string | null;
  rating: string;
  ratingCount: number;
  scent: string;
};

export type LocationDTO = {
  id: number;
  name: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  mapUrl: string | null;
};

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};
