import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { TravelPassModal } from '../components/TravelPassModal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  ShieldCheck, 
  CreditCard, 
  Check, 
  X, 
  Users, 
  DollarSign, 
  AlertCircle, 
  Eye, 
  Search, 
  Filter,
  CheckCircle2,
  Trash2,
  Star
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    lang, 
    bookings, 
    updateBookingPaymentStatus, 
    updateBookingStatus, 
    reviews, 
    approveReview, 
    deleteReview, 
    tours, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews' | 'packages'>('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified'>('all');
  const [selectedPassBooking, setSelectedPassBooking] = useState<Booking | null>(null);

  // Stats calculation
  const totalBookingsCount = bookings.length;
  const pendingVerifications = bookings.filter(b => b.paymentStatus === 'Payment Verification Pending').length;
  const verifiedBookings = bookings.filter(b => b.paymentStatus === 'Verified');
  const totalRevenue = verifiedBookings.reduce((sum, b) => sum + b.finalAmount, 0);
  const totalPilgrims = bookings.reduce((sum, b) => sum + b.adultsCount + b.childrenCount, 0);

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    if (statusFilter === 'pending' && b.paymentStatus !== 'Payment Verification Pending') return false;
    if (statusFilter === 'verified' && b.paymentStatus !== 'Verified') return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchId = b.bookingId.toLowerCase().includes(q);
      const matchName = b.leadTravelerName.toLowerCase().includes(q);
      const matchPhone = b.leadMobile.includes(q);
      const matchTrx = b.transactionId.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchTrx) return false;
    }
    return true;
  });

  const handleVerify = (bookingId: string) => {
    updateBookingPaymentStatus(bookingId, 'Verified');
    updateBookingStatus(bookingId, 'Confirmed');
    showToast(lang === 'bn' ? `বুকিং ${bookingId} এর পেমেন্ট অনুমোদিত ও কনফার্ম করা হয়েছে!` : `Booking ${bookingId} verified!`, 'success');
  };

  const handleReject = (bookingId: string) => {
    updateBookingPaymentStatus(bookingId, 'Failed');
    updateBookingStatus(bookingId, 'Cancelled');
    showToast(lang === 'bn' ? `বুকিং ${bookingId} বাতিল করা হয়েছে।` : `Booking ${bookingId} rejected.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div>
        <Breadcrumbs
          items={[
            { labelBn: 'অ্যাডমিন ও অপারেশনাল কন্ট্রোল', labelEn: 'Admin Operations' }
          ]}
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-bangla flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-amber-700" />
              <span>{lang === 'bn' ? 'ম্যানেজমেন্ট ও বুকিং ভেরিফিকেশন পোর্টাল' : 'Operations & Booking Portal'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-bangla">
              {lang === 'bn'
                ? 'সরাসরি বিকাশ ও নগদ Transaction ID যাচাই, টিকিট অনুমোদন ও রিভিউ ম্যানেজমেন্ট।'
                : 'Direct bKash/Nagad TrxID reconciliation, ticket approvals, and feedback management.'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'bookings' ? 'bg-amber-700 text-white shadow' : 'bg-white border border-stone-200 text-stone-700'}`}
            >
              {lang === 'bn' ? `বুকিং তালিকা (${toBnNum(bookings.length)})` : `Bookings (${bookings.length})`}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'reviews' ? 'bg-amber-700 text-white shadow' : 'bg-white border border-stone-200 text-stone-700'}`}
            >
              {lang === 'bn' ? `গ্রাহক রিভিউ (${toBnNum(reviews.length)})` : `Reviews (${reviews.length})`}
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'packages' ? 'bg-amber-700 text-white shadow' : 'bg-white border border-stone-200 text-stone-700'}`}
            >
              {lang === 'bn' ? `প্যাকেজ ইনভেন্টরি (${toBnNum(tours.length)})` : `Packages (${tours.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time KPI Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            {lang === 'bn' ? 'মোট বুকিং' : 'Total Bookings'}
          </span>
          <p className="text-2xl font-bold font-mono text-stone-900">
            {lang === 'bn' ? toBnNum(totalBookingsCount) : totalBookingsCount}
          </p>
        </div>

        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'যাচাই বাকি (Pending)' : 'Pending Verification'}</span>
          </span>
          <p className="text-2xl font-bold font-mono text-amber-900">
            {lang === 'bn' ? toBnNum(pendingVerifications) : pendingVerifications}
          </p>
        </div>

        <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            {lang === 'bn' ? 'অনুমোদিত রাজস্ব' : 'Verified Revenue'}
          </span>
          <p className="text-2xl font-bold font-mono text-emerald-900">
            {formatPrice(totalRevenue, lang)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            {lang === 'bn' ? 'মোট তীর্থযাত্রী' : 'Total Pilgrims'}
          </span>
          <p className="text-2xl font-bold font-mono text-stone-900">
            {lang === 'bn' ? `${toBnNum(totalPilgrims)} জন` : `${totalPilgrims} Pax`}
          </p>
        </div>

      </div>

      {/* TAB 1: BOOKINGS MANAGEMENT */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden space-y-4 p-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'bn' ? 'বুকিং আইডি, নাম, ফোন বা TrxID খুঁজুন...' : 'Search by ID, name, phone, TrxID...'}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'all' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'}`}
              >
                {lang === 'bn' ? 'সকল' : 'All'}
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-700'}`}
              >
                {lang === 'bn' ? 'যাচাই বাকি' : 'Pending'}
              </button>
              <button
                onClick={() => setStatusFilter('verified')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusFilter === 'verified' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700'}`}
              >
                {lang === 'bn' ? 'অনুমোদিত' : 'Verified'}
              </button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs text-stone-500 uppercase font-semibold">
                <tr>
                  <th className="p-3">{lang === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}</th>
                  <th className="p-3">{lang === 'bn' ? 'যাত্রী ও মোবাইল' : 'Traveler & Phone'}</th>
                  <th className="p-3">{lang === 'bn' ? 'ট্যুর ও তারিখ' : 'Tour & Date'}</th>
                  <th className="p-3">{lang === 'bn' ? 'আসন' : 'Seats'}</th>
                  <th className="p-3">{lang === 'bn' ? 'পেমেন্ট ও TrxID' : 'Payment & TrxID'}</th>
                  <th className="p-3">{lang === 'bn' ? 'মূল্য' : 'Amount'}</th>
                  <th className="p-3">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                  <th className="p-3 text-center">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-900 whitespace-nowrap">
                      {b.bookingId}
                    </td>

                    <td className="p-3">
                      <span className="font-bold text-stone-900 block">{b.leadTravelerName}</span>
                      <span className="text-[11px] font-mono text-stone-500">{b.leadMobile}</span>
                    </td>

                    <td className="p-3">
                      <span className="font-semibold text-stone-800 block line-clamp-1">
                        {lang === 'bn' ? b.tourTitleBn : b.tourTitleEn}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {formatBnDate(b.travelDate, lang)}
                      </span>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {b.selectedSeats.join(', ')}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-stone-900 block">{b.paymentMethod}</span>
                        <span className="font-mono font-bold text-stone-700 block text-[11px]">TrxID: {b.transactionId}</span>
                        <span className="text-[10px] text-stone-400 font-mono">From: {b.senderMobile}</span>
                      </div>
                    </td>

                    <td className="p-3 font-bold text-amber-900 whitespace-nowrap">
                      {formatPrice(b.finalAmount, lang)}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        b.paymentStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.paymentStatus === 'Verified' ? (lang === 'bn' ? 'অনুমোদিত' : 'Verified') : (lang === 'bn' ? 'যাচাই বাকি' : 'Pending')}
                      </span>
                    </td>

                    <td className="p-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedPassBooking(b)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                          title={lang === 'bn' ? 'পাস দেখুন' : 'View Pass'}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {b.paymentStatus !== 'Verified' && (
                          <button
                            onClick={() => handleVerify(b.bookingId)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1"
                            title={lang === 'bn' ? 'পেমেন্ট অনুমোদন করুন' : 'Verify'}
                          >
                            <Check className="w-3 h-3" />
                            <span>{lang === 'bn' ? 'অনুমোদন' : 'Verify'}</span>
                          </button>
                        )}

                        {b.bookingStatus !== 'Cancelled' && (
                          <button
                            onClick={() => handleReject(b.bookingId)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700"
                            title={lang === 'bn' ? 'বাতিল করুন' : 'Reject'}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: REVIEWS MODERATION */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? 'গ্রাহকদের রিভিউ অনুমোদন ও মডারেশন' : 'Customer Reviews Moderation'}
          </h3>

          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">{rev.customerName}</span>
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rev.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {rev.approved ? 'Published' : 'Awaiting Approval'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-bangla italic">
                    “{lang === 'bn' ? rev.commentBn : rev.commentEn}”
                  </p>
                  <span className="text-[11px] text-amber-800 font-medium">
                    {lang === 'bn' ? rev.tourTitleBn : rev.tourTitleEn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {!rev.approved && (
                    <button
                      onClick={() => approveReview(rev.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'অনুমোদন করুন' : 'Approve'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600"
                    title={lang === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PACKAGES OVERVIEW */}
      {activeTab === 'packages' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? 'প্যাকেজ ইনভেন্টরি ও আসন পরিসংখ্যান' : 'Tour Packages Inventory'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tours.map((t) => {
              const rem = Math.max(0, t.totalSeats - t.bookedSeats);
              return (
                <div key={t.id} className="p-4 rounded-2xl border border-stone-200 flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-stone-900 line-clamp-1">
                      {lang === 'bn' ? t.titleBn : t.titleEn}
                    </h4>
                    <span className="text-xs text-amber-800 font-bold block">
                      {formatPrice(t.priceAdult, lang)}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {lang === 'bn' ? `বুকড: ${toBnNum(t.bookedSeats)} / মোট ${toBnNum(t.totalSeats)}` : `Booked: ${t.bookedSeats} / Total ${t.totalSeats}`}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    t.status === 'Almost Full' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {lang === 'bn' ? `${toBnNum(rem)} টি আসন বাকি` : `${rem} Left`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Travel Pass Preview Modal */}
      {selectedPassBooking && (
        <TravelPassModal
          booking={selectedPassBooking}
          onClose={() => setSelectedPassBooking(null)}
        />
      )}

    </div>
  );
};
