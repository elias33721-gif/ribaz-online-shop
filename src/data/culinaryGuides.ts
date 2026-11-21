import { CulinaryGuide } from '../types/store';

export const CULINARY_GUIDES: CulinaryGuide[] = [
  {
    id: 'guide-biryani-bhuna',
    title: 'ঐতিহ্যবাহী বিরিয়ানি ও গরুর মাংস ভুনা',
    dishType: 'উৎসব ও বিশেষ আয়োজন',
    description:
      'সঠিক অনুপাতের ফোড়ন, খাঁটি মরিচ-হলুদ আর ঘানিভাঙা সরিষার তেলের মেলবন্ধনে তৈরি হয় গভীর স্বাদ ও সুগন্ধি মাংস ও বিরিয়ানি।',
    image: '/src/assets/images/dish_spiced_biryani_1794986268281.jpg',
    prepSummary: 'প্রস্তুতি ও দম: ১ ঘণ্টা ১৫ মিনিট · ৪–৬ জনের পরিবেশন',
    recommendedProductIds: ['ribaz-16-foron', 'ribaz-morich-gura', 'ribaz-dhonia-gura', 'ribaz-shorishar-tel'],
    recipeSteps: [
      'গরুর মাংসে রিবাজ হলুদ গুঁড়া, মরিচ গুঁড়া, ধনিয়া গুঁড়া ও টকদই মাখিয়ে ম্যারিনেট করুন।',
      'হাঁড়িতে রিবাজ ঘানিভাঙা সরিষার তেল ও পেঁয়াজ বেরেস্তা করে রিবাজ ১৬ ফোড়নের সুগন্ধি বাগাড় দিন।',
      'অল্প আঁচে কষিয়ে মাংস ভুনা অথবা দমে বিরিয়ানি প্রস্তুত করুন।',
    ],
  },
  {
    id: 'guide-homestyle-curry',
    title: 'মাছের ঝোল, মুরগির তরকারি ও ঘরোয়া লাল ভাত',
    dishType: 'প্রতিদিনের ঘরোয়া রান্না',
    description:
      'পরিবারের প্রতিদিনের দুপুর ও রাতের খাবারে হালকা অথচ সুস্বাদু মাছের ঝোল, মুরগির কষানো তরকারি ও পুষ্টিকর লাল চালের ভাতের সম্পূর্ণ আয়োজন।',
    image: '/src/assets/images/dish_homestyle_curry_1794986269435.jpg',
    prepSummary: 'প্রস্তুতি: ৪০ মিনিট · পরিবারের প্রতিদিনের আহার',
    recommendedProductIds: ['ribaz-holud-gura', 'ribaz-dhonia-gura', 'ribaz-lal-chal', 'ribaz-shorishar-tel'],
    recipeSteps: [
      'মাছে রিবাজ হলুদ গুঁড়া ও লবণ মাখিয়ে সরিষার তেলে হালকা ভেজে নিন।',
      'পেঁয়াজ ও টমেটোর সঙ্গে রিবাজ ধনিয়া, হলুদ ও মরিচ গুঁড়া কষিয়ে পাতলা ঝোল তৈরি করুন।',
      'গরম রিবাজ লাল চালের ভাতের সঙ্গে পরিবেশন করুন।',
    ],
  },
];
