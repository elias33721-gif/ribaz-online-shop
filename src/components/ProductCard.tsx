import { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types/store';
import { useCart } from '../context/CartContext';
import { formatTaka } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleAdd = () => {
    if (!selectedVariant) return;
    addToCart(product, selectedVariant, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group bg-white rounded-xl border border-[#153A2B]/10 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Product Image (4:3 neutral backdrop) */}
      <button
        type="button"
        onClick={() => onViewDetails(product.id)}
        className="block w-full aspect-[4/3] bg-[#F2EDE2] overflow-hidden text-left cursor-pointer"
      >
        <SafeImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed metadata line */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#5E432C] mb-1.5">
            <span>
              {product.categoryLabel} · {product.subcategoryLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(product.id)}
            className="text-left cursor-pointer"
          >
            <h3 className="font-serif text-lg font-semibold text-[#153A2B] group-hover:text-[#5E432C] transition-colors">
              {product.name}
            </h3>
          </button>

          <p className="text-sm text-[#5C665E] leading-relaxed mt-1.5 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-3.5 pt-2">
          {/* Interactive Weight/Pack Selector */}
          <div>
            <span className="block text-xs text-[#5C665E] mb-1.5">ওজন নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((variant) => {
                const isSelected = variant.id === selectedVariant?.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#153A2B] text-[#FAF8F3] border-[#153A2B]'
                        : 'bg-[#FAF8F3] text-[#1A241E] border-[#153A2B]/15 hover:border-[#153A2B]/40'
                    }`}
                  >
                    {variant.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aligned Price Baseline & Actions */}
          <div className="pt-3 border-t border-[#153A2B]/8 flex items-center justify-between gap-2">
            <div>
              <span className="text-xs text-[#5C665E] block">মূল্য</span>
              <span className="text-lg font-bold text-[#153A2B] tabular-nums">
                {selectedVariant ? formatTaka(selectedVariant.price) : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onViewDetails(product.id)}
                aria-label={`${product.name} বিস্তারিত দেখুন`}
                title="বিস্তারিত"
                className="h-10 px-3 inline-flex items-center justify-center gap-1.5 border border-[#153A2B]/20 text-[#153A2B] hover:bg-[#F2EDE2] rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>বিস্তারিত</span>
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className={`h-10 px-3.5 inline-flex items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  justAdded
                    ? 'bg-[#C88A1E] text-[#FAF8F3]'
                    : 'bg-[#153A2B] hover:bg-[#0E281D] text-[#FAF8F3]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>যোগ হয়েছে</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>কার্টে যোগ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
