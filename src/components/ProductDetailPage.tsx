import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Check, Sprout, Archive } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatTaka, toBengaliNumber } from '../utils/formatters';
import { SafeImage } from './SafeImage';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onBackToShop: () => void;
  onViewProduct: (id: string) => void;
  onOrderDirect: () => void;
}

export function ProductDetailPage({
  productId,
  onBackToShop,
  onViewProduct,
  onOrderDirect,
}: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];

  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleDirectOrder = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
    onOrderDirect();
  };

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Breadcrumb */}
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5E432C] hover:text-[#153A2B] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল পণ্যে ফিরে যান</span>
        </button>

        {/* Contiguous Purchase Module (PDP) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sticky Image Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2EDE2] border border-[#153A2B]/10">
              <SafeImage
                src={product.image}
                alt={product.name}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Purchase Details */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#153A2B]/10 p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-[#153A2B]/10 pb-5">
              <p className="text-xs font-medium text-[#5E432C]">
                {product.categoryLabel} · {product.subcategoryLabel} · কোড: {selectedVariant.sku}
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-[#153A2B] tabular-nums pt-1">
                {formatTaka(selectedVariant.price)}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#1A241E]/85 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Variant / Weight Selection */}
            <div className="space-y-2.5">
              <label className="block text-sm font-semibold text-[#153A2B]">
                ওজন / প্যাকেজ নির্বাচন করুন
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const active = variant.id === selectedVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#153A2B] text-[#FAF8F3] border-[#153A2B]'
                          : 'bg-[#FAF8F3] text-[#1A241E] border-[#153A2B]/15 hover:border-[#153A2B]/40'
                      }`}
                    >
                      <span>{variant.label}</span>
                      <span className="ml-2 opacity-80 tabular-nums">
                        ({formatTaka(variant.price)})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Action CTAs */}
            <div className="space-y-3.5 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center border border-[#153A2B]/20 rounded-lg bg-[#FAF8F3]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="পরিমাণ কমান"
                    className="w-11 h-11 inline-flex items-center justify-center text-[#153A2B] hover:bg-[#F2EDE2] rounded-l-lg cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-11 text-center text-base font-semibold tabular-nums text-[#1A241E]">
                    {toBengaliNumber(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="পরিমাণ বাড়ান"
                    className="w-11 h-11 inline-flex items-center justify-center text-[#153A2B] hover:bg-[#F2EDE2] rounded-r-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm text-[#5C665E]">
                  মোট মূল্য:{' '}
                  <strong className="text-[#153A2B] text-base tabular-nums">
                    {formatTaka(selectedVariant.price * quantity)}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`h-12 px-5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    addedFeedback
                      ? 'bg-[#C88A1E] text-[#FAF8F3]'
                      : 'bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3]'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>কার্টে যোগ হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>কার্টে যোগ করুন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDirectOrder}
                  className="h-12 px-5 rounded-lg text-sm font-semibold border border-[#153A2B] text-[#153A2B] hover:bg-[#F2EDE2] transition-colors cursor-pointer"
                >
                  সরাসরি অর্ডার করুন
                </button>
              </div>
            </div>

            {/* Product Details: Origin, Storage, Culinary Uses */}
            <div className="pt-5 border-t border-[#153A2B]/10 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Sprout className="w-4 h-4 text-[#5E432C] shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-[#153A2B] block">উৎস ও প্রস্তুতি</span>
                  <span className="text-[#5C665E]">{product.originNote}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Archive className="w-4 h-4 text-[#5E432C] shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-[#153A2B] block">সংরক্ষণ নির্দেশিকা</span>
                  <span className="text-[#5C665E]">{product.storageNote}</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="font-semibold text-[#153A2B] block mb-1.5">
                  কোন রান্নায় উপযোগী
                </span>
                <p className="text-[#5E432C]">{product.culinaryUses.join(' · ')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-12 border-t border-[#153A2B]/10">
          <h2 className="font-serif text-2xl font-bold text-[#153A2B] mb-8">
            রিবাজের অন্যান্য পণ্য
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
