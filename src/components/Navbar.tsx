import React, { useState } from 'react';
import ribazLogo from '../assets/images/ribaz-logo.png';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toBengaliNumber } from '../utils/formatters';

export type ActivePage = 'home' | 'shop' | 'product' | 'checkout';

interface NavbarProps {
  activePage: ActivePage;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateShop: (searchQuery?: string) => void;
  onNavigateCheckout: () => void;
}

export function Navbar({
  activePage,
  onNavigateHome,
  onNavigateShop,
}: NavbarProps) {
  const { totalItems, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMobileMenuOpen(false);
    onNavigateShop(searchInput.trim());
  };

  const handleNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#153A2B]/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark (single element, single line) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="মেনু খুলুন"
              className="md:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 text-[#153A2B] hover:bg-[#153A2B]/5 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#153A2B]"
            >
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            </button>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#153A2B]"
              aria-label="RIBAZ - রান্নায় শুদ্ধতা"
            >
              <img src={ribazLogo} alt="RIBAZ - রান্নায় শুদ্ধতা" className="h-10 sm:h-12 w-auto object-contain" />
            </a>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            aria-label="প্রধান নেভিগেশন"
            className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#1A241E]/80"
          >
            <button
              type="button"
              onClick={() => onNavigateHome()}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#153A2B] border-[#153A2B]'
                  : 'border-transparent hover:text-[#153A2B] hover:border-[#153A2B]/40'
              }`}
            >
              হোম
            </button>
            <button
              type="button"
              onClick={() => onNavigateShop()}
              className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                activePage === 'shop' || activePage === 'product'
                  ? 'text-[#153A2B] border-[#153A2B]'
                  : 'border-transparent hover:text-[#153A2B] hover:border-[#153A2B]/40'
              }`}
            >
              সকল পণ্য
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('categories')}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-[#153A2B] hover:border-[#153A2B]/40 transition-colors cursor-pointer"
            >
              ক্যাটাগরি
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('about')}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-[#153A2B] hover:border-[#153A2B]/40 transition-colors cursor-pointer"
            >
              আমাদের সম্পর্কে
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome('contact')}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:text-[#153A2B] hover:border-[#153A2B]/40 transition-colors cursor-pointer"
            >
              যোগাযোগ
            </button>
          </nav>

          {/* Zone 3: Search & Cart Primary Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="পণ্য খুঁজুন"
              className="inline-flex items-center justify-center w-11 h-11 text-[#153A2B] hover:bg-[#153A2B]/6 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#153A2B]"
            >
              <Search className="w-[19px] h-[19px]" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={openDrawer}
              aria-label="শপিং কার্ট দেখুন"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 h-10 sm:h-10 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-medium hover:bg-[#0E281D] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153A2B]"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.85} />
              <span className="hidden sm:inline">কার্ট</span>
              <span className="tabular-nums font-semibold bg-[#C88A1E] text-[#FAF8F3] text-xs px-1.5 py-0.5 rounded min-w-[22px] text-center">
                {toBengaliNumber(totalItems)}
              </span>
            </button>
          </div>
        </div>

        {/* Inline expandable search bar */}
        {searchOpen && (
          <div className="border-t border-[#153A2B]/10 bg-[#FAF8F3] px-4 sm:px-6 lg:px-8 py-3">
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-[720px] mx-auto flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#5C665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="পণ্যের নাম লিখুন — যেমন: ১৬ ফোড়ন, লাল চাল, সরিষার তেল, খেজুর..."
                  autoFocus
                  className="w-full h-11 pl-10 pr-4 bg-white border border-[#153A2B]/20 rounded-lg text-sm text-[#1A241E] placeholder:text-[#5C665E]/70 focus:outline-none focus:border-[#153A2B]"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 bg-[#153A2B] text-[#FAF8F3] text-sm font-medium rounded-lg hover:bg-[#0E281D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                খুঁজুন
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="সার্চ বন্ধ করুন"
                className="w-11 h-11 inline-flex items-center justify-center text-[#5C665E] hover:text-[#153A2B] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#0E281D]/45 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 w-[82%] max-w-[320px] bg-[#FAF8F3] h-full flex flex-col justify-between p-6 shadow-2xl border-r border-[#153A2B]/10">
            <div>
            <div className="flex items-center justify-between pb-5 border-b border-[#153A2B]/10">
                <img src={ribazLogo} alt="RIBAZ - রান্নায় শুদ্ধতা" className="h-12 w-auto object-contain" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="মেনু বন্ধ করুন"
                  className="w-11 h-11 inline-flex items-center justify-center text-[#153A2B] rounded-lg hover:bg-[#153A2B]/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleNavClick(() => onNavigateHome())}
                  className="w-full text-left px-3 py-3.5 text-base font-medium text-[#1A241E] hover:bg-[#F2EDE2] rounded-lg transition-colors"
                >
                  হোম
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick(() => onNavigateShop())}
                  className="w-full text-left px-3 py-3.5 text-base font-medium text-[#1A241E] hover:bg-[#F2EDE2] rounded-lg transition-colors"
                >
                  সকল পণ্য
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick(() => onNavigateHome('categories'))}
                  className="w-full text-left px-3 py-3.5 text-base font-medium text-[#1A241E] hover:bg-[#F2EDE2] rounded-lg transition-colors"
                >
                  পণ্যের ক্যাটাগরি
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick(() => onNavigateHome('about'))}
                  className="w-full text-left px-3 py-3.5 text-base font-medium text-[#1A241E] hover:bg-[#F2EDE2] rounded-lg transition-colors"
                >
                  আমাদের সম্পর্কে
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick(() => onNavigateHome('contact'))}
                  className="w-full text-left px-3 py-3.5 text-base font-medium text-[#1A241E] hover:bg-[#F2EDE2] rounded-lg transition-colors"
                >
                  যোগাযোগ
                </button>
              </div>
            </div>

            <div className="pt-5 border-t border-[#153A2B]/10">
              <p className="text-xs text-[#5C665E] mb-3">রান্নায় শুদ্ধতা · প্রাকৃতিক খাদ্যপণ্য</p>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full h-12 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                কার্ট দেখুন ({toBengaliNumber(totalItems)})
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
