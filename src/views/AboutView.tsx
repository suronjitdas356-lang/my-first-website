import React from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Eye, 
  Compass, 
  CheckCircle2, 
  MapPin, 
  Utensils, 
  Bus, 
  Users 
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { lang, setCurrentView } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us' }
        ]}
      />

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === 'bn' ? 'প্রতিষ্ঠিত: সেপ্টেম্বর ২০২৬' : 'Founded: September 2026'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? OFFICIAL_CONTACT.nameBn : OFFICIAL_CONTACT.nameEn}
        </h1>

        <p className="text-base sm:text-xl text-amber-800 font-bangla font-medium italic">
          “{lang === 'bn' ? OFFICIAL_CONTACT.sloganBn : OFFICIAL_CONTACT.sloganEn}”
        </p>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-bangla">
          {lang === 'bn'
            ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস বাংলাদেশের সনাতন ধর্মাবলম্বী পুণ্যার্থী ও সাধারণ ভ্রমণপিপাসুদের জন্য প্রতিষ্ঠিত একটি বিশেষায়িত তীর্থযাত্রা ও দর্শনীয় পর্যটন সেবা প্রতিষ্ঠান। আমাদের লক্ষ্য প্রতিটি ভক্তকে নিরাপদ, সুশৃঙ্খল ও আধ্যাত্মিক ভাবগাম্ভীর্যপূর্ণ পরিবেশে তীর্থদর্শনের পুণ্য অর্জনে সহায়তা করা।'
            : 'Tirthobondhu Tour & Travels is a dedicated pilgrimage and recreational travel organization founded in Bangladesh. Our sacred mission is to provide safe, spiritually uplifting, well-coordinated pilgrimage experiences.'}
        </p>
      </div>

      {/* Mission, Vision & Core Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mission */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-bangla">
            {lang === 'bn' ? 'আমাদের পবিত্র মিশন (Our Mission)' : 'Our Sacred Mission'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-bangla">
            {lang === 'bn'
              ? 'সনাতন ধর্মের পবিত্র পীঠস্থান, ধাম ও ঐতিহাসিক মন্দিরসমূহে পুণ্যার্থীদের যাতায়াত, আবাসন এবং নিরামিষ খাদ্যগ্রহণকে সহজ, ঝামেলামুক্ত ও মর্যাদাপূর্ণ করে তোলা। প্রতিটি পরিবার ও প্রবীণ পুণ্যার্থী যাতে মানসিক প্রশান্তি নিয়ে তীর্থ পরিক্রমা সম্পন্ন করতে পারেন তা নিশ্চিত করা।'
              : 'To make pilgrimage to sacred Peethas, Dhams, and historic temples dignified, hassle-free, and safe. Ensuring every family and senior pilgrim experiences peace of mind and divine contentment.'}
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-bangla">
            {lang === 'bn' ? 'আমাদের রূপকল্প (Our Vision)' : 'Our Vision'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-bangla">
            {lang === 'bn'
              ? 'বাংলাদেশ ও আন্তর্জাতিক মহাতীর্থ দর্শনে সনাতন সম্প্রদায়ের সর্বাধিক বিশ্বস্ত, সহানুভূতিশীল ও মানসম্মত তীর্থযাত্রা ট্রাভেল ব্র্যান্ড হিসেবে প্রতিষ্ঠিত হওয়া; যেখানে সেবা কেবল পেশা নয়, বরং আধ্যাত্মিক সেবা ও পুণ্যকর্ম।'
              : 'To become the most respected, compassionate, and trustworthy pilgrimage brand for Hindu pilgrims across Bangladesh and abroad—where travel coordination is revered as spiritual service.'}
          </p>
        </div>

      </div>

      {/* Core Values Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 font-bangla text-center">
          {lang === 'bn' ? 'আমাদের মূল মূল্যবোধ ও অঙ্গীকার' : 'Our Guiding Principles & Commitments'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-2">
            <Utensils className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-sm text-stone-900 font-bangla">
              {lang === 'bn' ? 'বিশুদ্ধ সাত্ত্বিক আহার' : 'Pure Sattvic Dining'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-bangla">
              {lang === 'bn'
                ? 'যাত্রাকালে শতভাগ পেঁয়াজ-রসুনহীন সাত্ত্বিক মহাপ্রসাদ ও স্বাস্থ্যকর সুস্বাদু নিরামিষ আহারের নিশ্চয়তা।'
                : '100% vegetarian meals honoring temple sanctity and devotion without onion or garlic.'}
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-sm text-stone-900 font-bangla">
              {lang === 'bn' ? 'প্রবীণ ও নারীদের অগ্রাধিকার' : 'Elderly & Women Priority'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-bangla">
              {lang === 'bn'
                ? 'পাহাড়ে ওঠা-নামায় শারীরিক সহায়তা, বাসের সুবিধাজনক আসন এবং সার্বক্ষণিক পরিবারের মতো অভিভাবকত্ব।'
                : 'Priority front coach seating, physical trek assistance, and respectful familial stewardship.'}
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-sm text-stone-900 font-bangla">
              {lang === 'bn' ? 'সম্পূর্ণ স্বচ্ছ হিসাব' : '100% Transparent Billing'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-bangla">
              {lang === 'bn'
                ? 'কোনো প্রকার গোপন চার্জ বা শেষ মুহূর্তে অযাচিত চাঁদা দাবি নেই। সততাই তীর্থবন্ধুর মূল ভিত্তি।'
                : 'Zero hidden fees or unexpected roadside collections. Complete financial transparency.'}
            </p>
          </div>

        </div>
      </div>

      {/* Office & Official Contact */}
      <div className="bg-amber-950 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs text-amber-300 font-bold uppercase tracking-widest">
            {lang === 'bn' ? 'আমাদের প্রধান কার্যালয়' : 'Head Office'}
          </span>
          <h3 className="text-2xl font-bold font-bangla">
            {lang === 'bn' ? OFFICIAL_CONTACT.addressBn : OFFICIAL_CONTACT.addressEn}
          </h3>
          <p className="text-xs text-amber-100 font-bangla">
            {lang === 'bn' ? OFFICIAL_CONTACT.supportHoursBn : OFFICIAL_CONTACT.supportHoursEn}
          </p>
        </div>

        <div className="pt-4 border-t border-amber-900 flex flex-wrap gap-4">
          <button
            onClick={() => setCurrentView('contact')}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
          >
            {lang === 'bn' ? 'যোগাযোগ পেজে যান' : 'Contact Us'}
          </button>
          <button
            onClick={() => setCurrentView('team')}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors"
          >
            {lang === 'bn' ? 'ম্যানেজমেন্ট টিম পরিচিতি' : 'Meet the Team'}
          </button>
        </div>
      </div>

    </div>
  );
};
