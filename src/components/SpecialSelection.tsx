import { ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatTaka } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface SpecialSelectionProps {
  onViewProduct: (productId: string) => void;
}

export function SpecialSelection({ onViewProduct }: SpecialSelectionProps) {
  const { addToCart } = useCart();
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  return (
    <section className="py-16 sm:py-20 bg-[#F2EDE2] border-y border-[#153A2B]/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#5E432C] mb-1.5">
              রিবাজের সিগনেচার সংগ্রহ
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
              রিবাজের বিশেষ নির্বাচন
            </h2>
          </div>
          <p className="text-sm text-[#5C665E] max-w-md">
            বাঙালির ঐতিহ্যবাহী স্বাদ ও দৈনন্দিন পুষ্টির কথা মাথায় রেখে বিশেষ যত্নে প্রস্তুত তিনটি অনন্য পণ্য।
          </p>
        </div>

        <div className="space-y-8">
          {featuredProducts.map((product, index) => {
            const primaryVariant = product.variants[1] ?? product.variants[0];
            const isReversed = index % 2 === 1;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#153A2B]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                <div
                  className={`lg:col-span-6 bg-[#FAF8F3] ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="h-full min-h-[260px] sm:min-h-[320px]">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full lg:h-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="text-xs font-medium text-[#5E432C]">
                    ০{index + 1}. {product.categoryLabel} · {product.subcategoryLabel}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
                    {product.name}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5C665E] leading-relaxed">
                    {product.fullDescription}
                  </p>

                  <p className="text-xs text-[#5E432C] pt-1">
                    উৎস ও প্রস্তুতি: {product.originNote}
                  </p>

                  <div className="pt-4 border-t border-[#153A2B]/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#5C665E] block">
                        জনপ্রিয় প্যাক ({primaryVariant.label})
                      </span>
                      <span className="text-xl font-bold text-[#153A2B] tabular-nums">
                        {formatTaka(primaryVariant.price)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => addToCart(product, primaryVariant, 1)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3] rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>কার্টে যোগ করুন</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewProduct(product.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#153A2B]/20 hover:bg-[#FAF8F3] text-[#153A2B] rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>বিস্তারিত</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
