/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { ActivePage, Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { PopularProductsSection } from './components/PopularProductsSection';
import { SpecialSelection } from './components/SpecialSelection';
import { BrandStory } from './components/BrandStory';
import { QualityPillars } from './components/QualityPillars';
import { CulinarySection } from './components/CulinarySection';
import { TrustStrip } from './components/TrustStrip';
import { ShopPage, SortOption } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CategoryId } from './types/store';

function CartToast() {
  const { lastAddedMessage, openDrawer } = useCart();

  if (!lastAddedMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-40 max-w-sm bg-[#153A2B] text-[#FAF8F3] px-4 py-3 rounded-xl shadow-xl border border-white/15 flex items-center justify-between gap-3"
    >
      <div className="flex items-center gap-2.5 text-sm">
        <Check className="w-4 h-4 text-[#D99B26] shrink-0" />
        <span>{lastAddedMessage}</span>
      </div>
      <button
        type="button"
        onClick={openDrawer}
        className="text-xs font-semibold text-[#D99B26] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
      >
        কার্ট দেখুন
      </button>
    </div>
  );
}

function StorefrontApp() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedProductId, setSelectedProductId] = useState<string>('ribaz-16-foron');

  const scrollToSection = (sectionId?: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const navigateHome = (sectionId?: string) => {
    setActivePage('home');
    scrollToSection(sectionId);
  };

  const navigateShop = (queryOrCategory?: string, isCategory = false) => {
    if (isCategory && queryOrCategory) {
      setSelectedCategory(queryOrCategory as CategoryId);
      setSearchQuery('');
    } else if (typeof queryOrCategory === 'string') {
      setSearchQuery(queryOrCategory);
      setSelectedCategory('all');
    }
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCheckout = () => {
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#1A241E]">
      <Navbar
        activePage={activePage}
        onNavigateHome={navigateHome}
        onNavigateShop={(q) => navigateShop(q, false)}
        onNavigateCheckout={navigateCheckout}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero
              onShopNow={() => navigateShop()}
              onViewProducts={() => scrollToSection('popular-products')}
            />
            <CategorySection
              onSelectCategory={(catId) => navigateShop(catId, true)}
            />
            <PopularProductsSection
              onViewProduct={navigateProductDetail}
              onViewAllProducts={() => navigateShop()}
            />
            <SpecialSelection onViewProduct={navigateProductDetail} />
            <BrandStory />
            <QualityPillars />
            <CulinarySection onViewProduct={navigateProductDetail} />
            <TrustStrip />
          </>
        )}

        {activePage === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            onChangeCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            onViewProduct={navigateProductDetail}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage
            key={selectedProductId}
            productId={selectedProductId}
            onBackToShop={() => navigateShop()}
            onViewProduct={navigateProductDetail}
            onOrderDirect={navigateCheckout}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage onBackToShop={() => navigateShop()} />
        )}
      </main>

      <Footer
        onNavigateHome={navigateHome}
        onNavigateShop={() => navigateShop()}
      />

      <CartDrawer
        onCheckout={navigateCheckout}
        onBrowseShop={() => navigateShop()}
      />

      <CartToast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StorefrontApp />
    </CartProvider>
  );
}
