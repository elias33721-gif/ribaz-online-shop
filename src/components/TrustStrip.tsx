import { ShoppingCart, Headphones, Truck, FileText, MessageCircle } from 'lucide-react';

const SERVICE_ITEMS = [
  {
    title: 'সহজ অর্ডার',
    description: 'কয়েকটি ধাপেই ঝামেলাহীন অর্ডার ও ক্যাশ অন ডেলিভারি সুবিধা।',
    Icon: ShoppingCart,
  },
  {
    title: 'গ্রাহক সহায়তা',
    description: 'পণ্য ও অর্ডার সংক্রান্ত যেকোনো প্রশ্নে আন্তরিক সহযোগিতা।',
    Icon: Headphones,
  },
  {
    title: 'নির্ভরযোগ্য ডেলিভারি',
    description: 'সারা বাংলাদেশে নিরাপদ প্যাকেজিংয়ে পণ্য পৌঁছে দেওয়ার ব্যবস্থা।',
    Icon: Truck,
  },
  {
    title: 'পণ্যের বিস্তারিত তথ্য',
    description: 'প্রতিটি উপাদান, ওজন, দাম ও সংরক্ষণ নির্দেশিকার স্বচ্ছ উপস্থাপন।',
    Icon: FileText,
  },
  {
    title: 'সহজ যোগাযোগ',
    description: 'ফোন বা WhatsApp-এর মাধ্যমে সরাসরি অর্ডার ও পরামর্শ।',
    Icon: MessageCircle,
  },
];

export function TrustStrip() {
  return (
    <section className="py-14 bg-[#F2EDE2] border-t border-[#153A2B]/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium text-[#5E432C] mb-1">সেবার প্রতিশ্রুতি</p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#153A2B]">
            কেনাকাটা ও ডেলিভারিতে আস্থা
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SERVICE_ITEMS.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="p-5 bg-white rounded-xl border border-[#153A2B]/10 space-y-2.5"
            >
              <Icon className="w-5 h-5 text-[#153A2B]" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold text-[#153A2B]">{title}</h3>
              <p className="text-xs text-[#5C665E] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
