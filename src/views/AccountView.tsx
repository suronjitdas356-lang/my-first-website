import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { TravelPassModal } from '../components/TravelPassModal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Ticket, 
  ShieldCheck, 
  Clock, 
  Heart, 
  Printer, 
  AlertCircle,
  Compass
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { 
    lang, 
    activeUser, 
    updateActiveUser, 
    bookings, 
    wishlist, 
    tours, 
    setCurrentView, 
    setSelectedTourId, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'wishlist' | 'profile'>('bookings');
  const [selectedPassBooking, setSelectedPassBooking] = useState<Booking | null>(null);

  // Edit Profile States
  const [name, setName] = useState(activeUser.name);
  const [phone, setPhone] = useState(activeUser.phone);
  const [email, setEmail] = useState(activeUser.email);
  const [address, setAddress] = useState(activeUser.address);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateActiveUser({ name, phone, email, address });
    showToast(lang === 'bn' ? 'প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে।' : 'Profile updated successfully.', 'success');
  };

  const wishlistedTours = tours.filter(t => wishlist.includes(t.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'কাস্টমার ড্যাশবোর্ড', labelEn: 'My Account' }
        ]}
      />

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-900 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {activeUser.name ? activeUser.name[0] : 'U'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-stone-900 font-bangla">
                {activeUser.name || (lang === 'bn' ? 'সম্মানিত তীর্থযাত্রী' : 'Honored Pilgrim')}
              </h1>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300">
                {lang === 'bn' ? 'অ্যাক্টিভ গ্রাহক' : 'Active Pilgrim'}
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>{activeUser.phone}</span>
              {activeUser.email && (
                <>
                  <span>•</span>
                  <span>{activeUser.email}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
          >
            {lang === 'bn' ? `আমার বুকিংসমূহ (${toBnNum(bookings.length)})` : `My Bookings (${bookings.length})`}
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'wishlist' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
          >
            {lang === 'bn' ? `পছন্দের তালিকা (${toBnNum(wishlistedTours.length)})` : `Wishlist (${wishlistedTours.length})`}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}`}
          >
            {lang === 'bn' ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}
          </button>
        </div>
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'সকল বুকিং ও ট্রাভেল পাস' : 'All Tour Bookings & Travel Passes'}
            </h2>
            <button
              onClick={() => setCurrentView('tours')}
              className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'নতুন ট্যুর বুক করুন' : 'Book New Tour'}</span>
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Ticket className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700 font-bangla">
                {lang === 'bn' ? 'আপনার কোনো পূর্ববর্তী বা রানিং বুকিং নেই।' : 'You have no bookings yet.'}
              </p>
              <button
                onClick={() => setCurrentView('tours')}
                className="px-5 py-2.5 bg-amber-700 text-white rounded-xl text-xs font-semibold shadow"
              >
                {lang === 'bn' ? 'প্যাকেজসমূহ দেখুন' : 'Explore Packages'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-amber-300 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg">
                        {booking.bookingId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        booking.paymentStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {booking.paymentStatus === 'Verified'
                          ? (lang === 'bn' ? '✓ পেমেন্ট অনুমোদিত' : '✓ Payment Verified')
                          : (lang === 'bn' ? '⏳ পেমেন্ট যাচাই প্রক্রিয়াধীন' : '⏳ Verification Pending')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 font-bangla">
                      {lang === 'bn' ? booking.tourTitleBn : booking.tourTitleEn}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-600">
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">{lang === 'bn' ? 'যাত্রার তারিখ' : 'Date'}</span>
                        <span className="font-semibold text-stone-800">{formatBnDate(booking.travelDate, lang)}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">{lang === 'bn' ? 'আসন নম্বর' : 'Seats'}</span>
                        <span className="font-bold text-amber-900">{booking.selectedSeats.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">{lang === 'bn' ? 'পেমেন্ট মেথড' : 'Method'}</span>
                        <span className="font-medium">{booking.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] uppercase">{lang === 'bn' ? 'মোট পরিশোধ' : 'Amount'}</span>
                        <span className="font-bold text-amber-900">{formatPrice(booking.finalAmount, lang)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSelectedPassBooking(booking)}
                      className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ডিজিটাল ট্রাভেল পাস' : 'View Travel Pass'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-stone-900 font-bangla">
            {lang === 'bn' ? 'পছন্দের সংরক্ষিত ট্যুরসমূহ' : 'My Saved Wishlist'}
          </h2>

          {wishlistedTours.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-700 font-bangla">
                {lang === 'bn' ? 'পছন্দের তালিকায় কোনো ট্যুর যুক্ত করা নেই।' : 'Your wishlist is empty.'}
              </p>
              <button
                onClick={() => setCurrentView('tours')}
                className="px-5 py-2.5 bg-amber-700 text-white rounded-xl text-xs font-semibold shadow"
              >
                {lang === 'bn' ? 'প্যাকেজসমূহ দেখুন' : 'Explore Packages'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistedTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex gap-4 items-center">
                  <img src={tour.coverImage} alt={tour.titleEn} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-bold text-stone-900 font-bangla line-clamp-1">
                      {lang === 'bn' ? tour.titleBn : tour.titleEn}
                    </h4>
                    <p className="text-xs text-amber-800 font-bold">
                      {formatPrice(tour.priceAdult, lang)}
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTourId(tour.id);
                          setCurrentView('tour-detail');
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
                      >
                        {lang === 'bn' ? 'বিস্তারিত' : 'Details'}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTourId(tour.id);
                          setCurrentView('booking');
                        }}
                        className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg"
                      >
                        {lang === 'bn' ? 'বুক করুন' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE SETTINGS */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 max-w-2xl">
          <h2 className="text-lg font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? 'প্রোফাইল তথ্য আপডেট' : 'Profile Settings'}
          </h2>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'ইমেইল' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'ঠিকানা' : 'Address'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors"
            >
              {lang === 'bn' ? 'তথ্য সংরক্ষণ করুন' : 'Save Changes'}
            </button>
          </form>
        </div>
      )}

      {/* Travel Pass Modal */}
      {selectedPassBooking && (
        <TravelPassModal
          booking={selectedPassBooking}
          onClose={() => setSelectedPassBooking(null)}
        />
      )}

    </div>
  );
};
