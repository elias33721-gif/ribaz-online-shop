import { useState } from 'react';
import { ShoppingBag, UtensilsCrossed, Check } from 'lucide-react';
import { CULINARY_GUIDES } from '../data/culinaryGuides';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatTaka } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface CulinarySectionProps {
  onViewProduct: (productId: string) => void;
}

export function CulinarySection({ onViewProduct }: CulinarySectionProps) {
  const { addToCart } = useCart();
  const [activeGuideId, setActiveGuideId] = useState(CULINARY_GUIDES[0].id);
  const [bundleAddedId, setBundleAddedId] = useState<string | null>(null);

  const activeGuide =
    CULINARY_GUIDES.find((g) => g.id === activeGuideId) ?? CULINARY_GUIDES[0];

  const linkedProducts = PRODUCTS.filter((p) =>
    activeGuide.recommendedProductIds.includes(p.id)
  );

  const handleAddAllRecommended = () => {
    linkedProducts.forEach((product) => {
      const defaultVariant = product.variants[0];
      if (defaultVariant) {
        addToCart(product, defaultVariant, 1);
      }
    });
    setBundleAddedId(activeGuide.id);
    window.setTimeout(() => setBundleAddedId(null), 1800);
  };

  return (
    <section id="culinary" className="py-16 sm:py-20 bg-[#FAF8F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#5E432C] mb-1.5">
              রান্নার অনুপ্রেরণা
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
              রিবাজের মসলায় রান্না হোক আরও সুস্বাদু।
            </h2>
          </div>

          {/* Interactive Recipe Tabs */}
          <div className="inline-flex flex-wrap gap-2 p-1 bg-[#F2EDE2] rounded-lg border border-[#153A2B]/10">
            {CULINARY_GUIDES.map((guide) => {
              const active = guide.id === activeGuide.id;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setActiveGuideId(guide.id)}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#153A2B] text-[#FAF8F3]'
                      : 'text-[#1A241E]/80 hover:text-[#153A2B]'
                  }`}
                >
                  {guide.dishType}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#153A2B]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Dish Photograph */}
          <div className="lg:col-span-6 bg-[#F2EDE2]">
            <div className="h-full min-h-[280px] sm:min-h-[380px]">
              <SafeImage
                src={activeGuide.image}
                alt={activeGuide.title}
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>

          {/* Dish Story & Linked RIBAZ Products */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#5E432C]">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{activeGuide.prepSummary}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#153A2B]">
                {activeGuide.title}
              </h3>

              <p className="text-sm text-[#5C665E] leading-relaxed">
                {activeGuide.description}
              </p>

              {/* Extensible Recipe Steps */}
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-semibold text-[#153A2B]">রান্নার মূল ধাপ</h4>
                <ol className="space-y-1.5 text-sm text-[#1A241E]/85">
                  {activeGuide.recipeSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-xs font-semibold text-[#C88A1E] mt-0.5 tabular-nums">
                        ০{i + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Linked RIBAZ Products */}
            <div className="pt-5 border-t border-[#153A2B]/10 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-[#153A2B]">
                  এই রান্নায় ব্যবহৃত রিবাজ পণ্য
                </h4>
                <button
                  type="button"
                  onClick={handleAddAllRecommended}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {bundleAddedId === activeGuide.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>সব পণ্য যোগ হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>সব উপকরণ কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {linkedProducts.map((product) => {
                  const defaultVariant = product.variants[0];
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#FAF8F3] border border-[#153A2B]/10"
                    >
                      <button
                        type="button"
                        onClick={() => onViewProduct(product.id)}
                        className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-md overflow-hidden bg-[#F2EDE2] shrink-0">
                          <SafeImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#153A2B] truncate hover:underline">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-[#5C665E] tabular-nums">
                            {defaultVariant.label} · {formatTaka(defaultVariant.price)}
                          </p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(product, defaultVariant, 1)}
                        aria-label={`${product.name} কার্টে যোগ করুন`}
                        className="w-9 h-9 rounded-md bg-white border border-[#153A2B]/15 hover:border-[#153A2B] text-[#153A2B] inline-flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
