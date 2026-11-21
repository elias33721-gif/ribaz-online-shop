import { Phone, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { BRAND_CONFIG } from '../data/brandConfig';

interface FooterProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateShop: (categoryId?: string) => void;
}

export function Footer({ onNavigateHome, onNavigateShop }: FooterProps) {
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'আসসালামু আলাইকুম, আমি রিবাজ (RIBAZ) থেকে পণ্য সম্পর্কে জানতে চাই।'
  )}`;

  return (
    <footer id="contact" className="bg-[#0E281D] text-[#FAF8F3] pt-16 pb-10 border-t border-[#153A2B]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F3]">
              {BRAND_CONFIG.brandNameEn}{' '}
              <span className="font-normal text-[#D99B26]">{BRAND_CONFIG.brandNameBn}</span>
            </div>
            <p className="text-sm font-medium text-[#D99B26]">{BRAND_CONFIG.slogan}</p>
            <p className="text-sm text-[#FAF8F3]/75 leading-relaxed max-w-md">
              রিবাজ একটি প্রাকৃতিক খাদ্যপণ্য ও খাঁটি মসলার ব্র্যান্ড। বাছাইকৃত মসলা, লাল চাল,
              ঘানিভাঙা সরিষার তেল, লাল আটা এবং প্রাকৃতিক খেজুর আপনার পরিবারের প্রতিদিনের রান্নায় আনে
              শুদ্ধতা ও আস্থা।
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#FAF8F3] tracking-wide">প্রয়োজনীয় লিংক</h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F3]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateHome()}
                  className="hover:text-[#D99B26] transition-colors cursor-pointer"
                >
                  হোম
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateShop()}
                  className="hover:text-[#D99B26] transition-colors cursor-pointer"
                >
                  সকল পণ্য
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateHome('categories')}
                  className="hover:text-[#D99B26] transition-colors cursor-pointer"
                >
                  পণ্য ক্যাটাগরি
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateHome('about')}
                  className="hover:text-[#D99B26] transition-colors cursor-pointer"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateHome('culinary')}
                  className="hover:text-[#D99B26] transition-colors cursor-pointer"
                >
                  রান্নার অনুপ্রেরণা
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-semibold text-[#FAF8F3] tracking-wide">যোগাযোগ</h3>
            <div className="space-y-3 text-sm text-[#FAF8F3]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99B26] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#153A2B] hover:bg-[#1E4F3B] border border-white/15 rounded-lg text-sm font-medium text-[#FAF8F3] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D99B26]" />
                <span>WhatsApp-এ যোগাযোগ</span>
              </a>
              <a
                href={BRAND_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-sm font-medium text-[#FAF8F3] transition-colors"
              >
                <span>Facebook পেজ</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#FAF8F3]/70" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF8F3]/60">
          <p>
            © {BRAND_CONFIG.copyrightYear} {BRAND_CONFIG.brandNameEn} ({BRAND_CONFIG.brandNameBn}) — সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p>{BRAND_CONFIG.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
