import { Sprout, PackageCheck, HeartHandshake } from 'lucide-react';

const PILLARS = [
  {
    number: '০১',
    title: 'বাছাইকৃত পণ্য',
    description: 'পণ্যের ধরন ও মানের প্রতি গুরুত্ব দিয়ে নির্বাচন। প্রতিটি মসলা, চাল, তেল ও শস্য সচেতনভাবে যাচাই করে সংগ্রহ করা হয়।',
    Icon: Sprout,
  },
  {
    number: '০২',
    title: 'যত্নসহকারে প্রস্তুতি',
    description: 'পণ্য প্রস্তুত, সংরক্ষণ ও প্যাকেজিংয়ে যত্নশীলতা। প্রাকৃতিক ঘ্রাণ ও গুণাগুণ অক্ষুণ্ণ রাখতে প্রতিটি ধাপ পরিচ্ছন্নভাবে সম্পন্ন হয়।',
    Icon: PackageCheck,
  },
  {
    number: '০৩',
    title: 'গ্রাহকের আস্থা',
    description: 'বিশ্বস্ততা ও সন্তোষজনক সেবা প্রদানের গুরুত্ব। পরিবারের প্রতিদিনের রান্নায় নির্ভরযোগ্য অভিজ্ঞতাই আমাদের মূল অঙ্গীকার।',
    Icon: HeartHandshake,
  },
];

export function QualityPillars() {
  return (
    <section className="py-16 sm:py-20 bg-[#153A2B] text-[#FAF8F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs sm:text-sm font-medium text-[#D99B26] mb-2">
            গুণগত মান ও বিশ্বাস
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
            স্বাদে ঐতিহ্য, গুণে আস্থা।
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map(({ number, title, description, Icon }) => (
            <div
              key={number}
              className="p-6 sm:p-7 rounded-xl bg-[#0E281D] border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#D99B26]">
                  {number}
                </span>
                <Icon className="w-5 h-5 text-[#D99B26]" strokeWidth={1.75} />
              </div>

              <h3 className="font-serif text-xl font-semibold text-[#FAF8F3]">{title}</h3>

              <p className="text-sm text-[#FAF8F3]/78 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
