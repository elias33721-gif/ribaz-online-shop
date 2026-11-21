import { useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CategoryId } from '../types/store';
import { toBengaliNumber } from '../utils/formatters';
import { ProductCard } from './ProductCard';

export type SortOption = 'popular' | 'new' | 'price-asc' | 'price-desc';

interface ShopPageProps {
  selectedCategory: CategoryId | 'all';
  onChangeCategory: (category: CategoryId | 'all') => void;
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  sortBy: SortOption;
  onChangeSort: (sort: SortOption) => void;
  onViewProduct: (productId: string) => void;
}

export function ShopPage({
  selectedCategory,
  onChangeCategory,
  searchQuery,
  onChangeSearch,
  sortBy,
  onChangeSort,
  onViewProduct,
}: ShopPageProps) {
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.englishName.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.subcategoryLabel.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });

    const sorted = [...list];
    sorted.sort((a, b) => {
      const aMin = Math.min(...a.variants.map((v) => v.price));
      const bMin = Math.min(...b.variants.map((v) => v.price));

      if (sortBy === 'price-asc') return aMin - bMin;
      if (sortBy === 'price-desc') return bMin - aMin;
      if (sortBy === 'new') return Number(b.isNew) - Number(a.isNew);
      return Number(b.isPopular) - Number(a.isPopular);
    });

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  const resetFilters = () => {
    onChangeCategory('all');
    onChangeSearch('');
    onChangeSort('popular');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F3] min-h-[70vh]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-8 border-b border-[#153A2B]/10 mb-8 space-y-3">
          <p className="text-xs sm:text-sm font-medium text-[#5E432C]">
            রিবাজ অনলাইন শপ
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#153A2B]">
                {activeCategoryObj ? activeCategoryObj.name : 'সকল প্রাকৃতিক খাদ্যপণ্য'}
              </h1>
              {activeCategoryObj && (
                <p className="text-sm text-[#5C665E] mt-2 max-w-2xl">
                  {activeCategoryObj.description}
                </p>
              )}
            </div>
            <p className="text-sm text-[#5C665E] tabular-nums">
              মোট {toBengaliNumber(filteredProducts.length)}টি পণ্য পাওয়া গেছে
            </p>
          </div>
        </div>

        {/* Search, Category Filter & Sort Toolbar */}
        <div className="space-y-5 mb-10">
          <div className="flex flex-col md:flex-row gap-3.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#5C665E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="পণ্যের নাম বা ধরন দিয়ে খুঁজুন (যেমন: ১৬ ফোড়ন, হলুদ, লাল চাল)..."
                className="w-full h-11 pl-10 pr-10 bg-white border border-[#153A2B]/15 rounded-lg text-sm text-[#1A241E] placeholder:text-[#5C665E]/70 focus:outline-none focus:border-[#153A2B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onChangeSearch('')}
                  aria-label="সার্চ মুছুন"
                  className="w-9 h-9 absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-[#5C665E] hover:text-[#153A2B] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-[#5E432C]" />
              <label htmlFor="shop-sort" className="text-xs font-medium text-[#5C665E] whitespace-nowrap">
                সাজান:
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => onChangeSort(e.target.value as SortOption)}
                className="h-11 px-3.5 bg-white border border-[#153A2B]/15 rounded-lg text-sm text-[#1A241E] focus:outline-none focus:border-[#153A2B] cursor-pointer"
              >
                <option value="popular">জনপ্রিয় পণ্য</option>
                <option value="new">নতুন পণ্য</option>
                <option value="price-asc">মূল্য: কম থেকে বেশি</option>
                <option value="price-desc">মূল্য: বেশি থেকে কম</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onChangeCategory('all')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#153A2B] text-[#FAF8F3] border-[#153A2B]'
                  : 'bg-white text-[#1A241E] border-[#153A2B]/15 hover:border-[#153A2B]/40'
              }`}
            >
              সকল পণ্য
            </button>
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onChangeCategory(category.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#153A2B] text-[#FAF8F3] border-[#153A2B]'
                      : 'bg-white text-[#1A241E] border-[#153A2B]/15 hover:border-[#153A2B]/40'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#153A2B]/10 p-12 text-center space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#153A2B]">
              এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <p className="text-sm text-[#5C665E] max-w-md mx-auto">
              অনুগ্রহ করে অন্য কোনো নাম দিয়ে খুঁজুন অথবা সকল ক্যাটাগরি নির্বাচন করুন। নতুন প্রাকৃতিক পণ্য শীঘ্রই যুক্ত করা হবে।
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#153A2B] text-[#FAF8F3] rounded-lg text-sm font-medium hover:bg-[#0E281D] transition-colors cursor-pointer"
            >
              সব ফিল্টার মুছুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
