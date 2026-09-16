import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TourCategory, TourStatus } from '../types';
import { formatPrice, toBnNum } from '../utils/bilingual';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Compass, 
  Heart, 
  Scale, 
  Utensils, 
  Bus, 
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';

interface ToursViewProps {
  initialCategory?: TourCategory;
}

export const ToursView: React.FC<ToursViewProps> = ({ initialCategory }) => {
  const { 
    lang, 
    setCurrentView, 
    setSelectedTourId, 
    tours, 
    wishlist, 
    toggleWishlist, 
    addToCompare 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const filteredTours = useMemo(() => {
    return tours.filter(t => {
      // Category
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

      // Status
      if (statusFilter !== 'all' && t.status !== statusFilter) return false;

      // Price
      if (t.priceAdult > maxPrice) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = t.titleBn.toLowerCase().includes(q) || t.destinationBn.toLowerCase().includes(q);
        const matchEn = t.titleEn.toLowerCase().includes(q) || t.destinationEn.toLowerCase().includes(q);
        if (!matchBn && !matchEn) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceAdult - b.priceAdult;
      if (sortBy === 'price-desc') return b.priceAdult - a.priceAdult;
      if (sortBy === 'duration') return a.durationDays - b.durationDays;
      return 0; // recommended
    });
  }, [tours, categoryFilter, statusFilter, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setSearchQuery('');
    setStatusFilter('all');
    setMaxPrice(50000);
    setSortBy('recommended');
  };

  const handleBook = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('booking');
  };

  const handleView = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('tour-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs & Header */}
      <div>
        <Breadcrumbs 
          items={[
            { labelBn: 'ট্যুর প্যাকেজসমূহ', labelEn: 'Tour Packages' }
          ]} 
        />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
              {categoryFilter === 'pilgrimage' 
                ? (lang === 'bn' ? 'পবিত্র তীর্থযাত্রা প্যাকেজসমূহ' : 'Pilgrimage Tour Packages')
                : categoryFilter === 'domestic'
                ? (lang === 'bn' ? 'অভ্যন্তরীণ পর্যটন প্যাকেজ' : 'Domestic Tour Packages')
                : categoryFilter === 'international'
                ? (lang === 'bn' ? 'আন্তর্জাতিক তীর্থযাত্রা ও ভ্রমণ' : 'International Tour Packages')
                : (lang === 'bn' ? 'সকল ট্যুর প্যাকেজ' : 'All Tour Packages')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-bangla mt-1">
              {lang === 'bn'
                ? `মোট ${toBnNum(filteredTours.length)} টি নির্ধারিত ও নির্ভরযোগ্য প্যাকেজ উপলব্ধ রয়েছে।`
                : `Total ${filteredTours.length} verified packages available for booking.`}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${categoryFilter === 'all' ? 'bg-white text-amber-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              {lang === 'bn' ? 'সকল' : 'All'}
            </button>
            <button
              onClick={() => setCategoryFilter('pilgrimage')}
              className={`px-3 py-1.5 rounded-xl transition-all ${categoryFilter === 'pilgrimage' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              {lang === 'bn' ? 'তীর্থযাত্রা' : 'Pilgrimage'}
            </button>
            <button
              onClick={() => setCategoryFilter('domestic')}
              className={`px-3 py-1.5 rounded-xl transition-all ${categoryFilter === 'domestic' ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              {lang === 'bn' ? 'অভ্যন্তরীণ' : 'Domestic'}
            </button>
            <button
              onClick={() => setCategoryFilter('international')}
              className={`px-3 py-1.5 rounded-xl transition-all ${categoryFilter === 'international' ? 'bg-blue-700 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
            >
              {lang === 'bn' ? 'আন্তর্জাতিক' : 'International'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Tour Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Filter Sidebar Desktop */}
        <aside className="hidden lg:block bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 sticky top-28">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-700" />
              <span>{lang === 'bn' ? 'ফিল্টার ও অনুসন্ধান' : 'Filters'}</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-amber-800 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
            </button>
          </div>

          {/* Search Box */}
          <div>
            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-1.5">
              {lang === 'bn' ? 'নাম বা স্থান খুঁজুন' : 'Search Keyword'}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: সীতাকুণ্ড...' : 'e.g. Sitakunda...'}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-1.5">
              {lang === 'bn' ? 'আসন ও বুকিং স্ট্যাটাস' : 'Availability Status'}
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল স্ট্যাটাস' : 'All Status'}</option>
              <option value="Booking Open">{lang === 'bn' ? 'বুকিং চলছে (Booking Open)' : 'Booking Open'}</option>
              <option value="Almost Full">{lang === 'bn' ? 'প্রায় পরিপূর্ণ (Almost Full)' : 'Almost Full'}</option>
              <option value="Full">{lang === 'bn' ? 'আসন পূর্ণ (Full)' : 'Full'}</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-stone-600 mb-1.5">
              <span>{lang === 'bn' ? 'সর্বোচ্চ বাজেট:' : 'Max Budget:'}</span>
              <span className="text-amber-800 font-bold">{formatPrice(maxPrice, lang)}</span>
            </div>
            <input
              type="range"
              min={3000}
              max={50000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>{formatPrice(3000, lang)}</span>
              <span>{formatPrice(50000, lang)}</span>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider block mb-1.5">
              {lang === 'bn' ? 'সাজানোর ক্রম' : 'Sort Order'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="recommended">{lang === 'bn' ? 'প্রস্তাবিত (Recommended)' : 'Recommended'}</option>
              <option value="price-asc">{lang === 'bn' ? 'কম মূল্য থেকে বেশি' : 'Price: Low to High'}</option>
              <option value="price-desc">{lang === 'bn' ? 'বেশি মূল্য থেকে কম' : 'Price: High to Low'}</option>
              <option value="duration">{lang === 'bn' ? 'দিন অনুযায়ী' : 'Duration'}</option>
            </select>
          </div>

        </aside>

        {/* Tour Cards Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {filteredTours.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-3">
              <Compass className="w-12 h-12 text-stone-300 mx-auto" />
              <h3 className="text-base font-bold text-stone-800 font-bangla">
                {lang === 'bn' ? 'কোনো প্যাকেজ পাওয়া যায়নি' : 'No Tour Packages Match Your Filter'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {lang === 'bn'
                  ? 'অনুসন্ধান বা ফিল্টারের শর্ত পরিবর্তন করে পুনরায় চেষ্টা করুন।'
                  : 'Try resetting your filter parameters or searching with a different keyword.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold"
              >
                {lang === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTours.map((tour) => {
                const isWishlisted = wishlist.includes(tour.id);
                const remainingSeats = Math.max(0, tour.totalSeats - tour.bookedSeats);

                return (
                  <div
                    key={tour.id}
                    className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Cover Image & Badges */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={tour.coverImage}
                        alt={tour.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

                      {/* Status */}
                      <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        tour.status === 'Almost Full'
                          ? 'bg-rose-600 text-white'
                          : tour.status === 'Full'
                          ? 'bg-stone-800 text-stone-300'
                          : 'bg-emerald-600 text-white'
                      }`}>
                        {tour.status === 'Almost Full'
                          ? (lang === 'bn' ? 'প্রায় পরিপূর্ণ' : 'Almost Full')
                          : tour.status === 'Full'
                          ? (lang === 'bn' ? 'আসন পূর্ণ' : 'Full')
                          : (lang === 'bn' ? 'বুকিং চলছে' : 'Booking Open')}
                      </span>

                      {/* Wishlist */}
                      <button
                        onClick={() => toggleWishlist(tour.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-stone-700 hover:text-rose-600 transition-colors shadow"
                        title={lang === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Save to Wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                      </button>

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

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                          {tour.category === 'pilgrimage' 
                            ? (lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage')
                            : tour.category === 'domestic'
                            ? (lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ' : 'Domestic')
                            : (lang === 'bn' ? 'আন্তর্জাতিক' : 'International')}
                        </span>
                        <h3
                          onClick={() => handleView(tour.id)}
                          className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors cursor-pointer font-bangla line-clamp-2 mt-0.5"
                        >
                          {lang === 'bn' ? tour.titleBn : tour.titleEn}
                        </h3>
                        <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed font-bangla">
                          {lang === 'bn' ? tour.descriptionBn : tour.descriptionEn}
                        </p>
                      </div>

                      {/* Pills */}
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        <span className="bg-amber-50 text-amber-900 px-2 py-1 rounded-lg border border-amber-200/60 flex items-center gap-1 font-medium">
                          <Utensils className="w-3 h-3 text-amber-700" />
                          <span>{lang === 'bn' ? 'বিশুদ্ধ প্রসাদ' : 'Prasadam'}</span>
                        </span>
                        <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200 flex items-center gap-1">
                          <Bus className="w-3 h-3 text-stone-500" />
                          <span>{lang === 'bn' ? 'এসি কোচ' : 'AC Coach'}</span>
                        </span>
                        <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-lg border border-stone-200">
                          {lang === 'bn' ? `${toBnNum(remainingSeats)} টি আসন বাকি` : `${remainingSeats} Seats Left`}
                        </span>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 block uppercase">
                            {lang === 'bn' ? 'জনপ্রতি' : 'Per Person'}
                          </span>
                          <span className="text-lg font-bold text-amber-800">
                            {formatPrice(tour.priceAdult, lang)}
                          </span>
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
                            onClick={() => handleView(tour.id)}
                            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
                          >
                            {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
                          </button>
                          <button
                            onClick={() => handleBook(tour.id)}
                            className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                          >
                            {lang === 'bn' ? 'বুকিং' : 'Book'}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
