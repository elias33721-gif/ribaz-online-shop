import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CategoryId } from '../types/store';
import { toBengaliNumber } from '../utils/formatters';
import { SafeImage } from './SafeImage';

interface CategorySectionProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategorySection({ onSelectCategory }: CategorySectionProps) {
  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#FAF8F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-[#5E432C] mb-1.5">
              সাজানো সংগ্রহ
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#153A2B]">
              পণ্যের ক্যাটাগরি
            </h2>
          </div>
          <p className="text-sm text-[#5C665E] max-w-md">
            ছবি দেখে বেছে নিন আপনার প্রয়োজনীয় বিভাগ—মসলা, লাল চাল, ঘানিভাঙা সরিষার তেল, লাল আটা, খেজুর ও অন্যান্য প্রাকৃতিক খাদ্যপণ্য।
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {CATEGORIES.map((category, index) => {
            const productCount = PRODUCTS.filter(
              (p) => p.categoryId === category.id
            ).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className="group text-left bg-white rounded-xl border border-[#153A2B]/10 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#153A2B]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#153A2B] cursor-pointer"
              >
                <div className="w-full aspect-[4/3] bg-[#F2EDE2] overflow-hidden">
                  <SafeImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-3.5 sm:p-5 w-full flex-1 flex flex-col justify-between gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#5E432C] tabular-nums">
                      <span>০{toBengaliNumber(index + 1)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{toBengaliNumber(productCount)}টি পণ্য</span>
                    </div>

                    <h3 className="font-serif text-[15px] sm:text-xl font-semibold text-[#153A2B] leading-snug group-hover:text-[#5E432C] transition-colors">
                      {category.name}
                    </h3>

                    <p className="hidden sm:block text-sm text-[#5C665E] leading-relaxed">
                      {category.description}
                    </p>

                    <p className="text-[11px] sm:text-xs text-[#5C665E] sm:text-[#5E432C] leading-relaxed line-clamp-2">
                      {category.subcategories.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 border-t border-[#153A2B]/8 flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-[#153A2B] group-hover:text-[#C88A1E] transition-colors">
                    <span>পণ্য দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
