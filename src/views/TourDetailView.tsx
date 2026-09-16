import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Bus, 
  Utensils, 
  Hotel, 
  ShieldCheck, 
  Check, 
  X, 
  AlertCircle, 
  Heart, 
  Scale, 
  Compass, 
  ArrowLeft,
  Share2
} from 'lucide-react';

export const TourDetailView: React.FC = () => {
  const { 
    lang, 
    setCurrentView, 
    selectedTourId, 
    tours, 
    wishlist, 
    toggleWishlist, 
    addToCompare, 
    showToast 
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const tour = tours.find(t => t.id === selectedTourId) || tours[0];

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p>{lang === 'bn' ? 'ট্যুর প্যাকেজ পাওয়া যায়নি।' : 'Tour package not found.'}</p>
        <button
          onClick={() => setCurrentView('tours')}
          className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold"
        >
          {lang === 'bn' ? 'সকল প্যাকেজ দেখুন' : 'View All Packages'}
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(tour.id);
  const remainingSeats = Math.max(0, tour.totalSeats - tour.bookedSeats);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === 'bn' ? 'লিংকটি কপি করা হয়েছে!' : 'Link copied to clipboard!', 'success');
    }
  };

  const handleBookNow = () => {
    setCurrentView('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Navigation & Breadcrumbs */}
      <div>
        <Breadcrumbs
          items={[
            { labelBn: 'ট্যুর প্যাকেজ', labelEn: 'Tour Packages', view: 'tours' },
            { labelBn: tour.titleBn, labelEn: tour.titleEn }
          ]}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <button
            onClick={() => setCurrentView('tours')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'সকল প্যাকেজে ফিরে যান' : 'Back to All Tours'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(tour.id)}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-rose-600 shadow-sm transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{isWishlisted ? (lang === 'bn' ? 'সংরক্ষিত' : 'Saved') : (lang === 'bn' ? 'পছন্দ' : 'Wishlist')}</span>
            </button>

            <button
              onClick={() => addToCompare(tour.id)}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-amber-800 shadow-sm transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Scale className="w-4 h-4" />
              <span>{lang === 'bn' ? 'তুলনা' : 'Compare'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-amber-800 shadow-sm transition-colors"
              title={lang === 'bn' ? 'শেয়ার করুন' : 'Share'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Sticky Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                {tour.category === 'pilgrimage' 
                  ? (lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage Tour')
                  : tour.category === 'domestic'
                  ? (lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ' : 'Domestic Tour')
                  : (lang === 'bn' ? 'আন্তর্জাতিক মহাতীর্থ' : 'International')}
              </span>
              <span className={`px-3 py-1 rounded-full text-white ${
                tour.status === 'Almost Full' ? 'bg-rose-600' : 'bg-emerald-600'
              }`}>
                {tour.status === 'Almost Full' ? (lang === 'bn' ? 'প্রায় পরিপূর্ণ' : 'Almost Full') : (lang === 'bn' ? 'বুকিং চলছে' : 'Booking Open')}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla leading-tight">
              {lang === 'bn' ? tour.titleBn : tour.titleEn}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>{lang === 'bn' ? tour.destinationBn : tour.destinationEn}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{lang === 'bn' ? tour.durationBn : tour.durationEn}</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">
                <Bus className="w-4 h-4 text-stone-500" />
                <span>{lang === 'bn' ? tour.vehicleTypeBn : tour.vehicleTypeEn}</span>
              </span>
            </div>
          </div>

          {/* Photo Gallery & Hero Image */}
          <div className="space-y-3">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
              <img
                src={tour.galleryImages[activeImageIndex] || tour.coverImage}
                alt={tour.titleEn}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {tour.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tour.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImageIndex === idx ? 'border-amber-600 ring-2 ring-amber-400' : 'border-stone-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tour Overview Description */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
              {lang === 'bn' ? 'ট্যুর সংক্ষিপ্ত বিবরণ ও মাহাত্ম্য' : 'Tour Overview & Significance'}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-bangla">
              {lang === 'bn' ? tour.descriptionBn : tour.descriptionEn}
            </p>

            {/* Inclusions Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60">
                <Utensils className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-xs font-bold text-stone-900 block font-bangla">
                  {lang === 'bn' ? 'আহার পরিকল্পনা' : 'Meal Plan'}
                </span>
                <p className="text-[11px] text-stone-600 font-bangla mt-0.5">
                  {lang === 'bn' ? tour.mealPlanBn : tour.mealPlanEn}
                </p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60">
                <Hotel className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-xs font-bold text-stone-900 block font-bangla">
                  {lang === 'bn' ? 'আবাসন ব্যবস্থা' : 'Accommodation'}
                </span>
                <p className="text-[11px] text-stone-600 font-bangla mt-0.5">
                  {lang === 'bn' ? tour.hotelTypeBn : tour.hotelTypeEn}
                </p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60">
                <ShieldCheck className="w-5 h-5 text-amber-700 mb-1" />
                <span className="text-xs font-bold text-stone-900 block font-bangla">
                  {lang === 'bn' ? 'গাইড ও সেবা' : 'Guide & Care'}
                </span>
                <p className="text-[11px] text-stone-600 font-bangla mt-0.5">
                  {lang === 'bn' ? 'সার্বক্ষণিক অভিজ্ঞ সমন্বয়ক' : 'Dedicated tour coordinator'}
                </p>
              </div>
            </div>
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
              {lang === 'bn' ? 'দিনভিত্তিক ভ্রমণ পরিকল্পনা (Itinerary)' : 'Day-by-Day Detailed Itinerary'}
            </h2>

            <div className="space-y-6">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-2xl bg-amber-700 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {lang === 'bn' ? toBnNum(day.day) : day.day}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-bangla">
                      {lang === 'bn' ? day.titleBn : day.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-bangla">
                      {lang === 'bn' ? day.descBn : day.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included & Excluded Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Included */}
            <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200/70 space-y-3">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 font-bangla">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'প্যাকেজের অন্তর্ভুক্ত সেবাসমূহ' : 'Included Services'}</span>
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                {(lang === 'bn' ? tour.includedBn : tour.includedEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-200/70 space-y-3">
              <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2 font-bangla">
                <X className="w-4 h-4 text-rose-600" />
                <span>{lang === 'bn' ? 'প্যাকেজ বহির্ভূত খরচ' : 'Excluded Expenses'}</span>
              </h3>
              <ul className="space-y-2 text-xs text-stone-700">
                {(lang === 'bn' ? tour.excludedBn : tour.excludedEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Special Instructions & Devotional Guidelines */}
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200 space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 font-bangla">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>{lang === 'bn' ? 'জরুরি নির্দেশনা ও সতর্কতা' : 'Important Guidelines'}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside font-bangla">
              {(lang === 'bn' ? tour.specialInstructionsBn : tour.specialInstructionsEn).map((inst, idx) => (
                <li key={idx}>{inst}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right Col: Sticky Booking Information Card */}
        <div className="space-y-6 sticky top-28">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-900/10 shadow-xl space-y-6">
            
            {/* Price Header */}
            <div>
              <span className="text-xs text-stone-500 uppercase font-bold tracking-wider block">
                {lang === 'bn' ? 'প্যাকেজ মূল্য (প্রতি জন)' : 'Package Price (Per Person)'}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-amber-800">
                  {formatPrice(tour.priceAdult, lang)}
                </span>
                {tour.originalPriceAdult && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(tour.originalPriceAdult, lang)}
                  </span>
                )}
              </div>
              <div className="text-xs text-stone-500 mt-1 flex justify-between">
                <span>{lang === 'bn' ? 'শিশু (৩-১১ বছর):' : 'Child (3-11 yrs):'}</span>
                <span className="font-semibold text-stone-800">{formatPrice(tour.priceChild, lang)}</span>
              </div>
            </div>

            {/* Travel Dates List */}
            <div className="space-y-2 border-t border-stone-100 pt-4">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                {lang === 'bn' ? 'আসন্ন যাত্রার তারিখসমূহ' : 'Upcoming Departure Dates'}
              </span>
              <div className="space-y-1.5">
                {tour.travelDates.map((date, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl text-xs text-stone-800 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{formatBnDate(date, lang)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat Availability Tracker */}
            <div className="border-t border-stone-100 pt-4 space-y-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-stone-600">{lang === 'bn' ? 'আসন পরিসংখ্যান:' : 'Seat Status:'}</span>
                <span className="text-amber-800 font-bold">
                  {lang === 'bn' 
                    ? `${toBnNum(remainingSeats)} টি আসন খালি (মোট ${toBnNum(tour.totalSeats)})` 
                    : `${remainingSeats} Left (Total ${tour.totalSeats})`}
                </span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-amber-600 h-2.5 rounded-full" 
                  style={{ width: `${(tour.bookedSeats / tour.totalSeats) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Pickup Points */}
            <div className="border-t border-stone-100 pt-4 space-y-2">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                {lang === 'bn' ? 'পিকআপ স্থানসমূহ' : 'Pickup Locations'}
              </span>
              <div className="space-y-1 text-xs text-stone-600">
                {(lang === 'bn' ? tour.pickupPointsBn : tour.pickupPointsEn).map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>{lang === 'bn' ? 'এখনই বুক করুন (Book Now)' : 'Proceed to Book Now'}</span>
            </button>

            <p className="text-[11px] text-center text-stone-500 font-bangla">
              {lang === 'bn'
                ? 'বিকাশ ও নগদ সরাসরি মাধ্যমে তাৎক্ষণিক আসন নিশ্চিতকরণ।'
                : 'Instant seat selection with direct bKash & Nagad confirmation.'}
            </p>

          </div>

          {/* Hotline Box */}
          <div className="bg-amber-950 text-amber-100 rounded-3xl p-6 text-center space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'সরাসরি তথ্য ও সহায়তা' : 'Direct Helpline'}
            </span>
            <div className="text-sm font-bold font-mono space-y-0.5">
              <a href="tel:+8801960407018" className="block hover:text-white">+8801960407018</a>
              <a href="tel:+8801792666308" className="block hover:text-white">+8801792666308</a>
            </div>
            <p className="text-[10px] text-stone-400">
              {lang === 'bn' ? 'সকাল ৭:০০টা – রাত ১:০০টা পর্যন্ত' : 'Available 7:00 AM – 1:00 AM'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
