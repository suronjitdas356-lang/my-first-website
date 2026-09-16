import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { toBnNum } from '../utils/bilingual';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Scale
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    lang, 
    setLang, 
    currentView, 
    setCurrentView, 
    wishlist, 
    compareList, 
    isAdminMode, 
    setIsAdminMode 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);

  const navigateTo = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setToursDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-900/10">
      {/* Top Notification / Hotline Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 text-xs py-2 px-4 border-b border-amber-800/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Support hours & Address hint */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:text-left">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {lang === 'bn' ? 'সাপোর্ট: সপ্তাহে ৭ দিন | সকাল ৭:০০টা – রাত ১:০০টা' : 'Support: 7 Days/Week | 7:00 AM – 1:00 AM'}
              </span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-stone-300">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{lang === 'bn' ? 'মানিকনগর বিশ্বরোড, ঢাকা-১২০৩' : 'Maniknagar Bishwaroad, Dhaka-1203'}</span>
            </span>
          </div>

          {/* Contact Numbers and Email */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-amber-200">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-sans font-semibold tracking-wide">
                01960407018
              </span>
              <span className="text-amber-500">|</span>
              <span className="font-sans font-semibold tracking-wide">
                01792666308
              </span>
            </div>
            <a 
              href={`mailto:${OFFICIAL_CONTACT.email}`} 
              className="hidden sm:inline-flex items-center gap-1 text-stone-300 hover:text-amber-200 transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>{OFFICIAL_CONTACT.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Official Brand Logo & Slogan */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Visual Emblem */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/20 ring-2 ring-amber-400/40 group-hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <Sparkles className="w-6 h-6 text-amber-200 mx-auto" />
                <span className="text-[9px] font-bold tracking-tighter uppercase font-cinzel text-amber-300 block -mt-1">
                  TBTT
                </span>
              </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors font-bangla">
                  {lang === 'bn' ? 'তীর্থবন্ধু' : 'Tirthobondhu'}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-amber-700 tracking-wide uppercase font-cinzel">
                  Tour & Travels
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium tracking-tight truncate max-w-[210px] sm:max-w-xs font-bangla">
                {lang === 'bn' ? OFFICIAL_CONTACT.sloganBn : OFFICIAL_CONTACT.sloganEn}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-stone-700 font-medium text-sm">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'হোম' : 'Home'}
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'about' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </button>

            {/* Tours Dropdown */}
            <div className="relative" onMouseLeave={() => setToursDropdownOpen(false)}>
              <button
                onMouseEnter={() => setToursDropdownOpen(true)}
                onClick={() => navigateTo('tours')}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${['tours', 'pilgrimage', 'domestic', 'international'].includes(currentView) ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
              >
                <span>{lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tours'}</span>
                <span className="text-xs text-amber-700">▾</span>
              </button>

              {toursDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => navigateTo('tours')}
                    className="w-full text-left px-4 py-2.5 hover:bg-amber-50/60 text-sm font-medium text-stone-800 flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4 text-amber-700" />
                    <span>{lang === 'bn' ? 'সকল প্যাকেজ' : 'All Tour Packages'}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('pilgrimage')}
                    className="w-full text-left px-4 py-2.5 hover:bg-amber-50/60 text-sm font-medium text-amber-900 flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>{lang === 'bn' ? 'তীর্থযাত্রা ভ্রমণ (Pilgrimage)' : 'Pilgrimage Tours'}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('domestic')}
                    className="w-full text-left px-4 py-2.5 hover:bg-amber-50/60 text-sm font-medium text-stone-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1 mr-1"></span>
                    <span>{lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ (Domestic)' : 'Domestic Tourism'}</span>
                  </button>
                  <button
                    onClick={() => navigateTo('international')}
                    className="w-full text-left px-4 py-2.5 hover:bg-amber-50/60 text-sm font-medium text-stone-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 ml-1 mr-1"></span>
                    <span>{lang === 'bn' ? 'আন্তর্জাতিক তীর্থযাত্রা' : 'International Tours'}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('schedule')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'schedule' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'ভ্রমণ সূচি' : 'Schedule'}
            </button>

            <button
              onClick={() => navigateTo('offers')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'offers' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'অফার' : 'Offers'}
            </button>

            <button
              onClick={() => navigateTo('destinations')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'destinations' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'তীর্থস্থান' : 'Pilgrimage Sites'}
            </button>

            <button
              onClick={() => navigateTo('guide')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'guide' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'নির্দেশিকা' : 'Travel Guide'}
            </button>

            <button
              onClick={() => navigateTo('gallery')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'gallery' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'গ্যালারি' : 'Gallery'}
            </button>

            <button
              onClick={() => navigateTo('team')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'team' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'টিম' : 'Team'}
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-2 rounded-lg transition-colors ${currentView === 'contact' ? 'text-amber-800 font-semibold bg-amber-50' : 'hover:text-amber-800 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </button>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-full border border-stone-200">
              <button
                onClick={() => setLang('bn')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${lang === 'bn' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${lang === 'en' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
              >
                EN
              </button>
            </div>

            {/* Compare Badge */}
            {compareList.length > 0 && (
              <button
                onClick={() => navigateTo('compare')}
                className="relative p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
                title={lang === 'bn' ? 'প্যাকেজ তুলনা' : 'Compare Packages'}
              >
                <Scale className="w-5 h-5 text-amber-700" />
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('account')}
              className="relative p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors hidden sm:inline-flex"
              title={lang === 'bn' ? 'পছন্দের তালিকা' : 'Wishlist'}
            >
              <Heart className="w-5 h-5 text-rose-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {lang === 'bn' ? toBnNum(wishlist.length) : wishlist.length}
                </span>
              )}
            </button>

            {/* My Account Button */}
            <button
              onClick={() => navigateTo('account')}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${currentView === 'account' ? 'bg-amber-100 text-amber-900' : 'text-stone-700 hover:bg-stone-100'}`}
              title={lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
            >
              <User className="w-4 h-4 text-amber-800" />
              <span className="hidden md:inline">{lang === 'bn' ? 'অ্যাকাউন্ট' : 'Account'}</span>
            </button>

            {/* Admin Switcher Badge (Operational verification) */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) {
                  navigateTo('admin');
                } else {
                  navigateTo('home');
                }
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                isAdminMode
                  ? 'bg-amber-900 text-amber-100 border-amber-800 shadow-inner'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200'
              }`}
              title={lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড পরীক্ষা' : 'Admin Panel Mode'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden lg:inline">
                {isAdminMode 
                  ? (lang === 'bn' ? 'অ্যাডমিন সক্রিয়' : 'Admin Active') 
                  : (lang === 'bn' ? 'অ্যাডমিন' : 'Admin')}
              </span>
            </button>

            {/* Primary Action Button: Book Now */}
            <button
              onClick={() => navigateTo('tours')}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-amber-200 animate-spin-slow" />
              <span>{lang === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 shadow-2xl space-y-2 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
            <button
              onClick={() => navigateTo('home')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${currentView === 'home' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-stone-700 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'হোম' : 'Home'}
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`p-2.5 text-left text-sm font-medium rounded-lg ${currentView === 'about' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-stone-700 hover:bg-stone-50'}`}
            >
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </button>
            <button
              onClick={() => navigateTo('pilgrimage')}
              className="p-2.5 text-left text-sm font-medium rounded-lg bg-amber-50/50 text-amber-900 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-600" />
              <span>{lang === 'bn' ? 'তীর্থযাত্রা প্যাকেজ' : 'Pilgrimage Tours'}</span>
            </button>
            <button
              onClick={() => navigateTo('domestic')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ' : 'Domestic Tours'}
            </button>
            <button
              onClick={() => navigateTo('international')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'আন্তর্জাতিক ভ্রমণ' : 'International'}
            </button>
            <button
              onClick={() => navigateTo('schedule')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'ভ্রমণ সূচি' : 'Tour Schedule'}
            </button>
            <button
              onClick={() => navigateTo('offers')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'বিশেষ অফার' : 'Special Offers'}
            </button>
            <button
              onClick={() => navigateTo('destinations')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'তীর্থস্থান তথ্য' : 'Pilgrimage Sites'}
            </button>
            <button
              onClick={() => navigateTo('team')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'প্রতিষ্ঠাতা টিম' : 'Founding Team'}
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery'}
            </button>
            <button
              onClick={() => navigateTo('account')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-amber-700" />
              <span>{lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}</span>
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="p-2.5 text-left text-sm font-medium rounded-lg text-stone-700 hover:bg-stone-50"
            >
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact Us'}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => navigateTo('tours')}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold text-center text-sm shadow"
            >
              {lang === 'bn' ? 'প্যাকেজ দেখুন ও বুকিং করুন' : 'View Packages & Book Now'}
            </button>
            <div className="flex justify-between items-center px-1 text-xs text-stone-500 pt-1">
              <span>{lang === 'bn' ? 'জরুরি কল:' : 'Hotline:'}</span>
              <a href="tel:+8801960407018" className="font-semibold text-amber-800">
                +8801960407018
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
