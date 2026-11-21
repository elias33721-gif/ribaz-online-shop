import { BRAND_CONFIG } from '../data/brandConfig';
import { SafeImage } from './SafeImage';

export function BrandStory() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF8F3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-[#153A2B]/10 bg-[#F2EDE2]">
              <SafeImage
                src={BRAND_CONFIG.storyImage}
                alt="প্রাকৃতিক মসলা, সরিষা দানা ও ঐতিহ্যবাহী পেষণ পদ্ধতি"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs sm:text-sm font-medium text-[#5E432C]">
              আমাদের সম্পর্কে · {BRAND_CONFIG.slogan}
            </p>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#153A2B] leading-[1.28]">
              শুদ্ধতার গল্প, রিবাজের পথচলা।
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#1A241E]/85 leading-relaxed">
              <p>
                খাবার শুধু ক্ষুধা নিবারণের মাধ্যম নয়; খাবারের স্বাদ, গুণমান ও উপাদানের প্রতি যত্ন
                একটি পরিবারের প্রতিদিনের আনন্দের অংশ।
              </p>
              <p>
                রিবাজ সেই যত্ন ও আস্থাকে গুরুত্ব দিয়ে মসলা এবং বাছাইকৃত খাদ্যপণ্য গ্রাহকের কাছে
                পৌঁছে দিতে চায়।
              </p>
              <p>
                আমাদের লক্ষ্য হলো প্রতিদিনের রান্নায় ভালো মানের উপকরণ ব্যবহারের অভিজ্ঞতাকে আরও সহজ ও
                আনন্দময় করা।
              </p>
            </div>

            <div className="pt-4 border-t border-[#153A2B]/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-[#5E432C]">
              <span>প্রাকৃতিক উপাদান</span>
              <span aria-hidden="true">·</span>
              <span>ঐতিহ্য ও আধুনিকতার সমন্বয়</span>
              <span aria-hidden="true">·</span>
              <span>পারিবারিক আহারের বিশ্বস্ত সঙ্গী</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
