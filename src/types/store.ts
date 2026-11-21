export type CategoryId =
  | 'spices'
  | 'rice'
  | 'oil'
  | 'flour-grains'
  | 'dates'
  | 'natural-foods';

export type PaymentMethodId = 'cod' | 'bkash' | 'nagad';

export interface ProductVariant {
  id: string;
  label: string;
  weightGramsOrMl: number;
  price: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  categoryId: CategoryId;
  categoryLabel: string;
  subcategoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  variants: ProductVariant[];
  originNote: string;
  storageNote: string;
  culinaryUses: string[];
  isPopular: boolean;
  isFeatured: boolean;
  isNew: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  englishName: string;
  description: string;
  subcategories: string[];
  image: string;
  displayOrder: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CulinaryGuide {
  id: string;
  title: string;
  dishType: string;
  description: string;
  image: string;
  prepSummary: string;
  recommendedProductIds: string[];
  recipeSteps: string[];
  videoUrl?: string;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  division: string;
  district: string;
  address: string;
  note: string;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethodId;
  status: 'confirmed' | 'pending' | 'processing' | 'delivered';
}

export interface BrandConfig {
  brandNameEn: string;
  brandNameBn: string;
  slogan: string;
  heroTitle: string;
  heroAltTitle: string;
  heroSubtitle: string;
  heroImage: string;
  storyImage: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  address: string;
  facebookUrl: string;
  deliveryChargeDhaka: number;
  deliveryChargeOutside: number;
  freeDeliveryThreshold: number;
  copyrightYear: string;
}
