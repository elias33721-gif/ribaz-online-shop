import { ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandConfig';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onShopNow: () => void;
  onViewProducts: () => void;
}

export function Hero({ onShopNow, onViewProducts }: HeroProps) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#102C20] text-[#FAF8F3]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#D99B26] tracking-wide">
              <span>রিবাজ (RIBAZ)</span>
              <span aria-hidden="true">·</span>
              <span>{BRAND_CONFIG.slogan}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[50px] font-bold leading-[1.22] text-[#FAF8F3]">
              {BRAND_CONFIG.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-[#FAF8F3]/85 leading-relaxed max-w-xl">
              {BRAND_CONFIG.heroSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C88A1E] hover:bg-[#B47A16] text-[#FAF8F3] rounded-lg text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99B26]"
              >
                <span>এখনই কেনাকাটা করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onViewProducts}
                className="inline-flex items-center px-6 py-3.5 bg-transparent hover:bg-white/10 text-[#FAF8F3] border border-[#FAF8F3]/30 rounded-lg text-sm sm:text-base font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                আমাদের পণ্য দেখুন
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#FAF8F3]/75">
              <span>গুঁড়া মসলা ও ১৬ ফোড়ন</span>
              <span aria-hidden="true">·</span>
              <span>লাল চাল ও লাল আটা</span>
              <span aria-hidden="true">·</span>
              <span>ঘানিভাঙা সরিষার তেল</span>
              <span aria-hidden="true">·</span>
              <span>প্রাকৃতিক খেজুর</span>
            </div>
          </div>

          {/* Right Atmospheric Visual Frame */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <SafeImage
                src={BRAND_CONFIG.heroImage}
                alt="রিবাজের প্রাকৃতিক মসলা, লাল চাল, ঘানিভাঙা সরিষার তেল ও খেজুর"
                loading="eager"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0E281D]/65 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs sm:text-sm text-[#FAF8F3]/95">
                <span className="font-medium">আপনার পরিবারের খাবারে, শুদ্ধতার বিশ্বস্ততা</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
