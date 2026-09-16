import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, setCurrentView, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast(lang === 'bn' ? 'দয়া করে একটি সঠিক ইমেইল দিন।' : 'Please provide a valid email.', 'error');
      return;
    }
    showToast(
      lang === 'bn' 
        ? 'ধন্যবাদ! তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস নিউজলেটার সফলভাবে সাবস্ক্রাইব হয়েছে।' 
        : 'Thank you! You have subscribed to our pilgrimage travel newsletter.',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t-4 border-amber-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white ring-2 ring-amber-500/40">
                <Sparkles className="w-6 h-6 text-amber-200" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-bangla tracking-tight">
                  {lang === 'bn' ? OFFICIAL_CONTACT.nameBn : OFFICIAL_CONTACT.nameEn}
                </h3>
                <p className="text-xs text-amber-400 font-cinzel font-semibold tracking-wider uppercase">
                  Pilgrimage & Religious Travel Service
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed font-bangla italic">
              “{lang === 'bn' ? OFFICIAL_CONTACT.sloganBn : OFFICIAL_CONTACT.sloganEn}”
            </p>

            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'bn'
                ? 'প্রতিষ্ঠিত: সেপ্টেম্বর ২০২৬। তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস ভক্ত ও পুণ্যার্থীদের জন্য নিবেদিত একটি পূর্ণাঙ্গ ও নির্ভরযোগ্য তীর্থযাত্রা ও দর্শনীয় ভ্রমণ সংস্থা।'
                : 'Founded: September 2026. Dedicated pilgrimage and comprehensive travel agency committed to safe, spiritually uplifting, and memorable experiences.'}
            </p>

            {/* Official Social Media Links */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-stone-300 block uppercase tracking-wider">
                {lang === 'bn' ? 'অফিসিয়াল সোশ্যাল মিডিয়া' : 'Official Social Media'}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={OFFICIAL_CONTACT.social.facebookPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 border border-blue-700/40 text-blue-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook Page</span>
                </a>
                <a
                  href={OFFICIAL_CONTACT.social.facebookGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 border border-indigo-700/40 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook Group</span>
                </a>
                <a
                  href={OFFICIAL_CONTACT.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>TikTok</span>
                </a>
              </div>

              {/* Reserved channel placeholders as required by prompt */}
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-stone-500">
                <span className="bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                  Instagram (Reserved)
                </span>
                <span className="bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                  YouTube (Reserved)
                </span>
                <span className="bg-stone-900/80 px-2 py-0.5 rounded border border-stone-800">
                  Telegram (Reserved)
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-600 pl-2">
              {lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'হোম পেজ' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'আমাদের পরিচিতি ও লক্ষ্য' : 'About Tirthobondhu'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('team')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা টিম' : 'Founding Leadership Team'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('schedule')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'আসন্ন ভ্রমণ ক্যালেন্ডার' : 'Upcoming Tour Calendar'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('destinations')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'পবিত্র তীর্থস্থান পরিচিতি' : 'Pilgrimage Destinations'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('accommodation')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'হোটেল ও থাকার ব্যবস্থা' : 'Hotels & Ashram Stay'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('transport')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'পরিবহন ও আসন ব্যবস্থা' : 'Transport Services'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('custom-tour')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'কাস্টম ট্যুর রিকোয়েস্ট' : 'Custom Tour Request'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('corporate')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'প্রাতিষ্ঠানিক ও গ্রুপ বুকিং' : 'Corporate / Group Tours'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tour Categories & Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-600 pl-2">
              {lang === 'bn' ? 'ট্যুর ও গ্রাহক সেবা' : 'Tours & Support'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('pilgrimage')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'ধর্মীয় তীর্থযাত্রা প্যাকেজ' : 'Pilgrimage Packages'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('domestic')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'অভ্যন্তরীণ পর্যটন' : 'Domestic Tourism'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('international')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'আন্তর্জাতিক তীর্থযাত্রা' : 'International Pilgrimage'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('offers')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'বিশেষ ছাড় ও উৎসব অফার' : 'Special & Festival Offers'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('reviews')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'গ্রাহকদের বাস্তব রিভিউ' : 'Verified Reviews'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('faq')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'সচরাচর জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('account')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'আমার বুকিং ও ই-টিকেট' : 'My Bookings & E-Tickets'}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-amber-400 transition-colors">
                  {lang === 'bn' ? 'গ্রাহক অনুসন্ধান কেন্দ্র' : 'Inquiry / Support Center'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact, Office & Google Maps Placeholder */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-amber-600 pl-2">
              {lang === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}
            </h4>

            <div className="text-xs space-y-2 text-stone-300 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-bangla">
                  {lang === 'bn' ? OFFICIAL_CONTACT.addressBn : OFFICIAL_CONTACT.addressEn}
                </span>
              </div>

              {/* Google Maps Button Placeholder (Per prompt rule: create button without inventing fake URL) */}
              <div className="pt-1">
                <button
                  onClick={() => showToast(lang === 'bn' ? 'অফিসিয়াল গুগল ম্যাপস লোকেশন শীঘ্রই যুক্ত করা হচ্ছে।' : 'Official Google Maps location placeholder. Direct address: 39 No. Kazirbagh, Maniknagar Bishwaroad, Dhaka-1203', 'info')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-900/50 text-[11px] font-medium transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'Google Maps-এ দেখুন' : 'View on Google Maps'}</span>
                </button>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-bangla">
                  {lang === 'bn' ? OFFICIAL_CONTACT.supportHoursBn : OFFICIAL_CONTACT.supportHoursEn}
                </span>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:+8801960407018" className="block hover:text-amber-400">+8801960407018</a>
                  <a href="tel:+8801792666308" className="block hover:text-amber-400">+8801792666308</a>
                  <a href="tel:+8801732843174" className="block hover:text-amber-400">+8801732843174</a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a href={`mailto:${OFFICIAL_CONTACT.email}`} className="break-all hover:text-amber-400">
                  {OFFICIAL_CONTACT.email}
                </a>
              </div>

              {/* WhatsApp Integration Reservation Area */}
              <div className="pt-2">
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-[11px] text-emerald-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {lang === 'bn'
                      ? 'WhatsApp Business ইন্টিগ্রেশন অঞ্চল সংরক্ষিত।'
                      : 'WhatsApp Business integration area reserved.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Direct Payment Guarantee */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-b border-stone-800">
          <div>
            <h5 className="text-sm font-semibold text-white mb-1">
              {lang === 'bn' ? 'ট্যুর আপডেট ও পবিত্র তীর্থযাত্রার নোটিফিকেশন পান' : 'Get Tour Updates & Pilgrimage Notifications'}
            </h5>
            <p className="text-xs text-stone-400">
              {lang === 'bn' 
                ? 'নতুন তীর্থযাত্রার তারিখ এবং বিশেষ ছাড়ের তথ্য সবার আগে জানতে সাবস্ক্রাইব করুন।' 
                : 'Subscribe to receive the earliest schedule announcements and seasonal travel privileges.'}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={lang === 'bn' ? 'আপনার ইমেইল অ্যাড্রেস লিখুন' : 'Enter your email address'}
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
            >
              {lang === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button onClick={() => setCurrentView('terms')} className="hover:text-amber-400">
              {lang === 'bn' ? 'নিয়ম ও শর্তাবলী' : 'Terms & Conditions'}
            </button>
            <span className="text-stone-700">•</span>
            <button onClick={() => setCurrentView('privacy')} className="hover:text-amber-400">
              {lang === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <span className="text-stone-700">•</span>
            <button onClick={() => setCurrentView('cancellation')} className="hover:text-amber-400">
              {lang === 'bn' ? 'বাতিল ও রিফান্ড পলিসি' : 'Cancellation & Refund'}
            </button>
          </div>

          <div className="text-center md:text-right font-bangla">
            <p>
              {lang === 'bn' 
                ? '© ২০২৬ তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।' 
                : '© 2026 Tirthobondhu Tour & Travels. All Rights Reserved.'}
            </p>
            <p className="text-[11px] text-stone-500 mt-0.5">
              {lang === 'bn'
                ? 'বিকাশ ও নগদ সরাসরি মাধ্যমে নিরাপদ ও স্বচ্ছ পেমেন্ট সিস্টেম।'
                : 'Safe & transparent direct payment system via bKash and Nagad.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
