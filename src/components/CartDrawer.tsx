import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../data/brandConfig';
import { formatTaka, toBengaliNumber } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  onCheckout: () => void;
  onBrowseShop: () => void;
}

export function CartDrawer({ onCheckout, onBrowseShop }: CartDrawerProps) {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal, totalItems } =
    useCart();

  if (!isDrawerOpen) return null;

  const remainingForFree = Math.max(0, BRAND_CONFIG.freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="শপিং কার্ট">
      <div
        className="fixed inset-0 bg-[#0E281D]/45 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <aside className="relative z-10 w-full max-w-[440px] bg-[#FAF8F3] h-full flex flex-col shadow-2xl border-l border-[#153A2B]/10">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#153A2B]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#153A2B]" strokeWidth={1.75} />
            <h2 className="font-serif text-lg font-semibold text-[#153A2B]">
              আপনার শপিং কার্ট ({toBengaliNumber(totalItems)})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="কার্ট বন্ধ করুন"
            className="w-11 h-11 inline-flex items-center justify-center text-[#5C665E] hover:text-[#153A2B] hover:bg-[#F2EDE2] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery info strip */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-[#F2EDE2] border-b border-[#153A2B]/10 text-xs text-[#1A241E]">
            {remainingForFree > 0 ? (
              <span>
                আরও <strong className="tabular-nums font-semibold">{formatTaka(remainingForFree)}</strong> টাকার পণ্য যোগ করলে ফ্রি ডেলিভারি সুবিধা পাবেন।
              </span>
            ) : (
              <span className="font-medium text-[#153A2B]">
                অভিনন্দন! এই অর্ডারে ফ্রি ডেলিভারি প্রযোজ্য হবে।
              </span>
            )}
          </div>
        )}

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#F2EDE2] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#153A2B]/60" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#1A241E] mb-2">
                আপনার কার্টটি বর্তমানে খালি
              </h3>
              <p className="text-sm text-[#5C665E] max-w-xs mb-6 leading-relaxed">
                রিবাজের খাঁটি মসলা, লাল চাল, ঘানিভাঙা সরিষার তেল ও প্রাকৃতিক খাদ্যপণ্য বেছে নিন।
              </p>
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  onBrowseShop();
                }}
                className="px-6 py-3 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-medium hover:bg-[#0E281D] transition-colors cursor-pointer"
              >
                পণ্য দেখুন
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-3.5 p-3.5 bg-white rounded-xl border border-[#153A2B]/10"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F2EDE2] shrink-0">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#1A241E] truncate">{item.name}</h4>
                      <p className="text-xs text-[#5C665E] mt-0.5">
                        পরিমাণ: {item.variantLabel} · একক মূল্য{' '}
                        <span className="tabular-nums">{formatTaka(item.price)}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      aria-label={`${item.name} সরান`}
                      className="w-9 h-9 -mr-1 -mt-1 inline-flex items-center justify-center text-[#5C665E] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-[#153A2B]/15 rounded-lg bg-[#FAF8F3]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity - 1)
                        }
                        aria-label="পরিমাণ কমান"
                        className="w-9 h-9 inline-flex items-center justify-center text-[#153A2B] hover:bg-[#F2EDE2] rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#1A241E]">
                        {toBengaliNumber(item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.variantId, item.quantity + 1)
                        }
                        aria-label="পরিমাণ বাড়ান"
                        className="w-9 h-9 inline-flex items-center justify-center text-[#153A2B] hover:bg-[#F2EDE2] rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#153A2B] tabular-nums">
                      {formatTaka(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#153A2B]/10 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm text-[#5C665E]">
                <span>সর্বমোট পণ্যের মূল্য</span>
                <span className="font-semibold text-[#1A241E] tabular-nums">
                  {formatTaka(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[#5C665E]">
                ডেলিভারি চার্জ চেকআউট ধাপে জেলা অনুযায়ী যোগ হবে।
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                closeDrawer();
                onCheckout();
              }}
              className="w-full h-12 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-semibold hover:bg-[#0E281D] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>চেকআউটে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
