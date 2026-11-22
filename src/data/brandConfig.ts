import { BrandConfig, PaymentMethodId } from '../types/store';

export const BRAND_CONFIG: BrandConfig = {
  brandNameEn: 'RIBAZ',
  brandNameBn: 'রিবাজ',
  slogan: 'রান্নায় শুদ্ধতা',
  heroTitle: 'প্রকৃতির বিশুদ্ধতা, প্রতিদিনের খাবারে।',
  heroAltTitle: 'আপনার পরিবারের খাবারে, শুদ্ধতার বিশ্বস্ততা।',
  heroSubtitle:
    'মসলা থেকে প্রাকৃতিক খাদ্যপণ্য—আপনার প্রতিদিনের খাবারের জন্য গুণগত মান ও আস্থার প্রতিশ্রুতি নিয়ে রিবাজ।',
  heroImage: '/src/assets/images/hero_ribaz_table_1794986264230.jpg',
  storyImage: '/src/assets/images/story_spice_craft_1794986266589.jpg',
  phoneDisplay: '+৮৮০ ১৭২২-৬৭৩৩৭১',
  whatsappNumber: '8801722673371',
  email: 'hello@ribazfoods.com',
  address: 'ঢাকা, বাংলাদেশ (ঠিকানা পরিবর্তনযোগ্য)',
  facebookUrl: 'https://facebook.com',
  deliveryChargeDhaka: 60,
  deliveryChargeOutside: 120,
  freeDeliveryThreshold: 2000,
  copyrightYear: '২০২৬',
};

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  label: string;
  description: string;
  enabled: boolean;
}

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'cod',
    label: 'ক্যাশ অন ডেলিভারি',
    description: 'পণ্য হাতে পেয়ে ডেলিভারি প্রতিনিধির কাছে নগদ মূল্য পরিশোধ করুন।',
    enabled: true,
  },
  {
    id: 'bkash',
    label: 'বিকাশ পেমেন্ট',
    description: 'শীঘ্রই যুক্ত হবে — সরাসরি অনলাইন পেমেন্ট সুবিধা।',
    enabled: false,
  },
  {
    id: 'nagad',
    label: 'নগদ পেমেন্ট',
    description: 'শীঘ্রই যুক্ত হবে — ডিজিটাল ওয়ালেট পেমেন্ট সুবিধা।',
    enabled: false,
  },
];
