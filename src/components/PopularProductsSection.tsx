import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

interface PopularProductsSectionProps {
  onViewProduct: (productId: string) => void;
  onViewAllProducts: () => void;
}

export function PopularProductsSection({
  onViewProduct,
  onViewAllProducts,
}: PopularProductsSectionProps) {
  const popularProducts = PRODUCTS.filter((p) => p.isPopular);

  return (
    <section id="popular-products" className="py-16 sm:py-20 bg-[#FAF8F3] border-t border-[#153A2B]/8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#5E432C] mb-1.5">
              গ্রাহকদের পছন্দের সংগ্রহ
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
              জনপ্রিয় পণ্য
            </h2>
          </div>

          <button
            type="button"
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#153A2B] hover:text-[#C88A1E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>সকল পণ্য দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
