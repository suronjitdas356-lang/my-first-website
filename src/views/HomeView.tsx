import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Heart, 
  Scale, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Utensils, 
  Bus, 
  Headphones, 
  ChevronRight 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    lang, 
    setCurrentView, 
    setSelectedTourId, 
    tours, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    addToCompare, 
    team, 
    reviews, 
    coupons 
  } = useApp();

  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchDestination, setSearchDestination] = useState<string>('');

  const handleBookTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('booking');
  };

  const handleViewTour = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('tour-detail');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('tours');
  };

  const pilgrimageTours = tours.filter(t => t.category === 'pilgrimage');
  const domesticTours = tours.filter(t => t.category === 'domestic');
  const internationalTours = tours.filter(t => t.category === 'international');

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-stone-950 overflow-hidden">
        {/* Background Image with Deep Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80" 
            alt="Pilgrimage & Sacred Mountain" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40"></div>
          <div className="absolute inset-0 bg-radial-gradient from-amber-600/10 via-transparent to-stone-950/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <div className="max-w-3xl space-y-6">
            
            {/* Spiritual Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{lang === 'bn' ? 'বিশ্বস্ত তীর্থযাত্রা ও দর্শনীয় ভ্রমণ সেবা' : 'Trusted Pilgrimage & Spiritual Travel'}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-bangla tracking-tight leading-tight text-white drop-shadow-sm">
                {lang === 'bn' ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস' : 'Tirthobondhu Tour & Travels'}
              </h1>
              <p className="text-lg sm:text-2xl text-amber-300 font-bangla font-medium italic drop-shadow">
                “{lang === 'bn' ? OFFICIAL_CONTACT.sloganBn : OFFICIAL_CONTACT.sloganEn}”
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-bangla max-w-2xl">
              {lang === 'bn'
                ? 'সীতাকুণ্ড চন্দ্রনাথ ধাম, সিলেট শ্রী চৈতন্য ধাম, কান্তজিউ মন্দির, সুগন্ধা শক্তিপীঠ থেকে শুরু করে ভারতের কাশী-বারাণসী ও অযোধ্যা। শতভাগ বিশুদ্ধ নিরামিষ আহার, অভিজ্ঞ গাইড ও পরিবারের সর্বোচ্চ নিরাপত্তা।'
                : 'From Sitakunda Chandranath Dham, Sylhet Chaitanya Dham to sacred Kashi-Varanasi and Ayodhya. Complete with 100% pure vegetarian meals, seasoned coordinators, and family safety.'}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentView('tours')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-900/40 hover:shadow-xl transition-all duration-200 flex items-center gap-2 active:scale-95"
              >
                <Compass className="w-5 h-5 text-amber-200" />
                <span>{lang === 'bn' ? 'প্যাকেজসমূহ দেখুন' : 'Explore Packages'}</span>
              </button>

              <button
                onClick={() => setCurrentView('schedule')}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>{lang === 'bn' ? 'ভ্রমণ সময়সূচি' : 'View Schedule'}</span>
              </button>
            </div>

            {/* Quick Feature Pillars */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300">
              <div className="flex items-center gap-1.5 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'bn' ? 'বিশুদ্ধ সাত্ত্বিক আহার' : 'Pure Sattvic Meals'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'bn' ? 'প্রবীণদের বিশেষ যত্ন' : 'Elderly Care'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                <Bus className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'bn' ? 'আরামদায়ক এসি পরিবহন' : 'AC Luxury Coach'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800">
                <Headphones className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'bn' ? '৭ দিন সাপোর্ট' : '7 Days Support'}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Quick Category Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 p-4 sm:p-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Category Select */}
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'ভ্রমণের ধরণ' : 'Tour Type'}
              </label>
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">{lang === 'bn' ? 'সকল প্যাকেজ' : 'All Tours'}</option>
                <option value="pilgrimage">{lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage Tours'}</option>
                <option value="domestic">{lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ' : 'Domestic Tours'}</option>
                <option value="international">{lang === 'bn' ? 'আন্তর্জাতিক ভ্রমণ' : 'International Tours'}</option>
              </select>
            </div>

            {/* Destination Search */}
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'পছন্দের গন্তব্য' : 'Destination'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  placeholder={lang === 'bn' ? 'সীতাকুণ্ড, সিলেট, দিনাজপুর...' : 'Search destination...'}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Date Hint */}
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'যাত্রার সময়' : 'Travel Period'}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <div className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-stone-700">
                  {lang === 'bn' ? 'অক্টোবর – ডিসেম্বর ২০২৬' : 'October – Dec 2026'}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:pt-5">
              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow transition-all flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-amber-200" />
                <span>{lang === 'bn' ? 'ট্যুর প্যাকেজ খুঁজুন' : 'Find Tours'}</span>
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* 3. Popular Pilgrimage Tours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-800 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'bn' ? 'পবিত্র তীর্থ পরিক্রমা' : 'Sacred Pilgrimage'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'জনপ্রিয় তীর্থযাত্রা প্যাকেজসমূহ' : 'Popular Pilgrimage Tours'}
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('pilgrimage')}
            className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group"
          >
            <span>{lang === 'bn' ? 'সকল তীর্থযাত্রা দেখুন' : 'View All Pilgrimage Tours'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pilgrimageTours.slice(0, 3).map((tour) => {
            const isWishlisted = wishlist.includes(tour.id);
            const remainingSeats = Math.max(0, tour.totalSeats - tour.bookedSeats);

            return (
              <div 
                key={tour.id}
                className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={tour.coverImage} 
                    alt={tour.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                    tour.status === 'Almost Full'
                      ? 'bg-rose-600 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {tour.status === 'Almost Full' 
                      ? (lang === 'bn' ? 'প্রায় পরিপূর্ণ' : 'Almost Full') 
                      : (lang === 'bn' ? 'বুকিং চলছে' : 'Booking Open')}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(tour.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors shadow"
                    title={lang === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>

                  {/* Destination & Duration Bottom overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white text-xs">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'bn' ? tour.destinationBn : tour.destinationEn}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-stone-900/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>{lang === 'bn' ? tour.durationBn : tour.durationEn}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      onClick={() => handleViewTour(tour.id)}
                      className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer font-bangla line-clamp-2"
                    >
                      {lang === 'bn' ? tour.titleBn : tour.titleEn}
                    </h3>
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {lang === 'bn' ? tour.descriptionBn : tour.descriptionEn}
                    </p>
                  </div>

                  {/* Inclusions summary pills */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-stone-600">
                    <span className="bg-amber-50 text-amber-900 px-2 py-1 rounded-lg border border-amber-200/60 flex items-center gap-1 font-medium">
                      <Utensils className="w-3 h-3 text-amber-700" />
                      <span>{lang === 'bn' ? 'বিশুদ্ধ প্রসাদ' : 'Prasadam'}</span>
                    </span>
                    <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200 flex items-center gap-1">
                      <Bus className="w-3 h-3 text-stone-500" />
                      <span>{lang === 'bn' ? 'এসি বাস' : 'AC Coach'}</span>
                    </span>
                    <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200">
                      {lang === 'bn' ? `${toBnNum(remainingSeats)} টি আসন খালি` : `${remainingSeats} Seats Left`}
                    </span>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block uppercase">
                        {lang === 'bn' ? 'জনপ্রতি শুরু' : 'Starting From'}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-amber-800">
                          {formatPrice(tour.priceAdult, lang)}
                        </span>
                        {tour.originalPriceAdult && (
                          <span className="text-xs text-stone-400 line-through">
                            {formatPrice(tour.originalPriceAdult, lang)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addToCompare(tour.id)}
                        className="p-2 rounded-xl text-stone-500 hover:text-amber-800 hover:bg-amber-50 border border-stone-200 transition-colors"
                        title={lang === 'bn' ? 'তুলনা করুন' : 'Compare'}
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleBookTour(tour.id)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                      >
                        {lang === 'bn' ? 'বুক করুন' : 'Book Now'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Why Choose Tirthobondhu? (Core Values & Pillars) */}
      <section className="bg-gradient-to-b from-stone-900 to-amber-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'আমাদের দায়বদ্ধতা ও অঙ্গীকার' : 'Our Commitment'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-bangla">
              {lang === 'bn' ? 'কেন বেছে নেবেন তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস?' : 'Why Choose Tirthobondhu Tour & Travels?'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-bangla">
              {lang === 'bn'
                ? 'ভক্তবৃন্দের ভাবগাম্ভীর্য, মর্যাদা ও পূর্ণ সন্তুষ্টির সঙ্গে নিরাপদ ভ্রমণের সর্বোচ্চ নিশ্চয়তা।'
                : 'Highest assurance of safe travel respecting devotional sanctity, dignity, and absolute satisfaction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? '১০০% বিশুদ্ধ নিরামিষ ও সাত্ত্বিক আহার' : '100% Pure Vegetarian & Sattvic Meals'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'তীর্থযাত্রায় খাবার প্রস্তুত ও পরিবেশনে ধর্মীয় বিধি ও পবিত্রতা নিশ্চিত করা হয়। সুস্বাদু সাত্ত্বিক ভোগ ও পুষ্টিকর খাবার সরবরাহ করা হয়।'
                  : 'Strict vegetarian preparation observing temple purity standards. Hygienic, nourishing, and spiritually uplifting dining.'}
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? 'প্রবীণ ও নারীদের বিশেষ সুরক্ষা ও যত্ন' : 'Special Elderly & Family Pilgrim Care'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'বয়োজ্যেষ্ঠ পুণ্যার্থীদের জন্য বাসের সামনের সারির আসন, পাহাড় আরোহণে ডুলি/সহযোগী ব্যবস্থা এবং সার্বক্ষণিক মানবিক উপস্থিতি।'
                  : 'Front coach seat allocation, dedicated assistance for temple treks, and gentle compassionate support for seniors.'}
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? 'স্বচ্ছ হিসাব ও কোনো গোপন খরচ নেই' : 'Transparent Pricing & No Hidden Charges'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'প্যাকেজের অন্তর্ভুক্ত ও বহির্ভূত প্রতিটি বিষয় লিখিতভাবে উল্লেখ থাকে। যাত্রা পথে কোনো অনাকাঙ্ক্ষিত অতিরিক্ত চাঁদা দাবি করা হয় না।'
                  : 'Explicit inclusions and exclusions in written form. Absolute zero surprise expenses during the journey.'}
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? 'অভিজ্ঞ ও নিবেদিত তীর্থ সমন্বয়ক' : 'Experienced Pilgrimage Tour Guides'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'প্রতিটি তীর্থস্থানের পৌরাণিক ইতিহাস, মাহাত্ম্য ও পুজো-পদ্ধতি সম্পর্কে অভিজ্ঞ সমন্বয়ক সার্বক্ষণিক পাশে থাকেন।'
                  : 'Knowledgeable guides proficient in scriptural history, local sacred folklore, and authentic temple rituals.'}
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Bus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? 'প্রথম শ্রেণির নিরাপদ যানবাহন ও আবাসন' : 'Comfortable AC Transport & Quality Lodging'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'যথাযথ রক্ষণাবেক্ষণকৃত এসি পর্যটক বাস ও স্বনামধন্য হোটেল/আশ্রমে পরিবারের জন্য নিরাপদ ও পরিচ্ছন্ন কক্ষ ব্যবস্থা।'
                  : 'Fully air-conditioned tourist transport and verified safe, clean family accommodations at sacred hubs.'}
              </p>
            </div>

            <div className="bg-stone-900/80 border border-stone-800 p-6 rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white font-bangla">
                {lang === 'bn' ? 'সপ্তাহে ৭ দিন সার্বক্ষণিক গ্রাহক সেবা' : '7 Days a Week Dedicated Customer Support'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {lang === 'bn'
                  ? 'সকাল ৭:০০টা থেকে রাত ১:০০টা পর্যন্ত যেকোনো তথ্য, আসন বুকিং বা বিশেষ সহায়তার জন্য সরাসরি ফোনে যোগাযোগ।'
                  : 'Direct telephone inquiry available from 7:00 AM to 1:00 AM daily for guidance and emergency coordination.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Domestic & International Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Domestic Feature Box */}
          <div className="bg-gradient-to-br from-emerald-950 to-stone-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10 space-y-3">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {lang === 'bn' ? 'পাহাড় ও প্রকৃতির কোল' : 'Scenic Bangladesh'}
              </span>
              <h3 className="text-2xl font-bold font-bangla">
                {lang === 'bn' ? 'অভ্যন্তরীণ দর্শনীয় ভ্রমণ' : 'Domestic Scenic Tourism'}
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-md font-bangla">
                {lang === 'bn'
                  ? 'সাজেক ভ্যালির মেঘের রাজ্য, খাগড়াছড়ির সবুজ পাহাড়, কক্সবাজার সমুদ্র সৈকত কিংবা সুন্দরবনের ম্যানগ্রোভ ইকো ট্যুর।'
                  : 'Cloud kingdom of Sajek Valley, verdant hills of Khagrachari, Cox’s Bazar sea beach, and tranquil eco tours.'}
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => setCurrentView('domestic')}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'bn' ? 'অভ্যন্তরীণ ট্যুর প্যাকেজ দেখুন' : 'Explore Domestic Tours'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
                alt="Domestic" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* International Feature Box */}
          <div className="bg-gradient-to-br from-amber-950 to-stone-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[320px]">
            <div className="relative z-10 space-y-3">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                {lang === 'bn' ? 'সীমানা পেরিয়ে তীর্থদর্শন' : 'Across Borders'}
              </span>
              <h3 className="text-2xl font-bold font-bangla">
                {lang === 'bn' ? 'ভারত ও আন্তর্জাতিক মহাতীর্থ' : 'India & International Pilgrimage'}
              </h3>
              <p className="text-xs text-amber-100/80 leading-relaxed max-w-md font-bangla">
                {lang === 'bn'
                  ? 'বারাণসীর শ্রী কাশী বিশ্বনাথ জ্যোতির্লিঙ্গ, অযোধ্যা শ্রী রাম মন্দির, প্রয়াগরাজ সঙ্গম ও নেপাল পশুপতিনাথ ধাম।'
                  : 'Sacred Kashi Vishwanath Jyotirlinga, Ayodhya Sri Ram Temple, Prayagraj Sangam, and holy Nepal shrines.'}
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => setCurrentView('international')}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'bn' ? 'আন্তর্জাতিক প্যাকেজ দেখুন' : 'Explore International Tours'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-30 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80" 
                alt="International" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. Founding Team Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'আমাদের চালিকাশক্তি' : 'Leadership'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা টিম' : 'Founding Leadership Team'}
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('team')}
            className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group"
          >
            <span>{lang === 'bn' ? 'সম্পূর্ণ টিম পরিচিতি' : 'View Full Team'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.slice(0, 4).map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm text-center flex flex-col items-center space-y-3"
            >
              {/* Profile Avatar Placeholder (Per prompt instructions) */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-900 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300">
                {member.nameEn.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 font-bangla">
                  {lang === 'bn' ? member.nameBn : member.nameEn}
                </h4>
                <p className="text-xs text-amber-700 font-medium font-bangla mt-0.5">
                  {lang === 'bn' ? member.designationBn : member.designationEn}
                </p>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed font-bangla line-clamp-2">
                {lang === 'bn' ? member.bioBn : member.bioEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Special Offers & Festival Promos */}
      {coupons.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-amber-900/60 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-200 border border-amber-500/30">
                {lang === 'bn' ? 'সীমিত সময়ের অফার' : 'Limited-Time Privilege'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-bangla">
                {lang === 'bn' ? 'প্রথম বুকিংয়ে ৫% বিশেষ ছাড়!' : 'Get 5% Special Discount on First Booking!'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 max-w-xl font-bangla">
                {lang === 'bn'
                  ? 'বুকিং এর সময় প্রোমো কোড TIRTHA2026 ব্যবহার করুন এবং নিশ্চিত ছাড় উপভোগ করুন।'
                  : 'Use promo code TIRTHA2026 during checkout to receive your special welcome discount.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
              <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-bold">
                {lang === 'bn' ? 'কুপন কোড' : 'Promo Code'}
              </span>
              <span className="text-xl sm:text-2xl font-mono font-bold tracking-widest text-amber-300 block py-1">
                TIRTHA2026
              </span>
              <button
                onClick={() => setCurrentView('tours')}
                className="mt-2 w-full py-2 px-4 bg-white text-amber-900 hover:bg-amber-50 rounded-xl font-bold text-xs shadow transition-colors"
              >
                {lang === 'bn' ? 'এখনই ব্যবহার করুন' : 'Apply Now'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 8. Direct bKash & Nagad Payment Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? '১০০% নিরাপদ ও স্বচ্ছ পেমেন্ট নীতি' : 'Safe & Transparent Payment Policy'}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 font-bangla">
                {lang === 'bn' ? 'অফিসিয়াল বিকাশ ও নগদ সরাসরি পেমেন্ট ব্যবস্থা' : 'Official Direct bKash & Nagad Payment'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-bangla max-w-2xl">
                {lang === 'bn'
                  ? 'আমরা কোনো গোপন পিন বা ওটিপি চাই না। আমাদের অনুমোদিত ৩টি নম্বরে Send Money করে Transaction ID সাবমিট করুন। পেমেন্ট ভেরিফাইয়ের সাথে সাথে আপনার ডিজিটাল ট্রাভেল পাস তৈরি হবে।'
                  : 'We never request secret PIN or OTP. Complete Send Money to our 3 official numbers and enter your TrxID for instant verifiable Digital Travel Pass.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-stone-800">
              <span className="bg-pink-100 text-pink-900 px-3 py-1.5 rounded-xl border border-pink-200">
                bKash: 01960407018
              </span>
              <span className="bg-orange-100 text-orange-900 px-3 py-1.5 rounded-xl border border-orange-200">
                Nagad: 01792666308
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verified Customer Reviews Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'ভক্ত ও পুণ্যার্থীদের অনুভূতি' : 'Pilgrim Voices'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'গ্রাহকদের বাস্তব অভিজ্ঞতা ও মতামত' : 'Verified Customer Testimonials'}
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('reviews')}
            className="text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group"
          >
            <span>{lang === 'bn' ? 'সকল রিভিউ ও আপনার মতামত দিন' : 'View All & Submit Review'}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.filter(r => r.approved).slice(0, 2).map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-400">
                  {formatBnDate(rev.createdAt, lang)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-bangla italic leading-relaxed">
                “{lang === 'bn' ? rev.commentBn : rev.commentEn}”
              </p>

              <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900">{rev.customerName}</span>
                <span className="text-amber-800 font-medium truncate max-w-[200px]">
                  {lang === 'bn' ? rev.tourTitleBn : rev.tourTitleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
