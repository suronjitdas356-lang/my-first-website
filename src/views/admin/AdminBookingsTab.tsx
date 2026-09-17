import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types/index';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { TravelPassModal } from '../../components/TravelPassModal';
import { api } from '../../services/api';
import { 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  Mail, 
  Eye, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  User, 
  MapPin, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  AlertCircle, 
  Download, 
  Edit3,
  ExternalLink
} from 'lucide-react';

interface AdminBookingsTabProps {
  initialSelectedId?: string | null;
}

export const AdminBookingsTab: React.FC<AdminBookingsTabProps> = ({ initialSelectedId }) => {
  const { lang, tours, showToast } = useApp();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [tourFilter, setTourFilter] = useState('all');

  // Selected Booking Modal
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [passBooking, setPassBooking] = useState<Booking | null>(null);

  // Update Status Form State
  const [statusForm, setStatusForm] = useState<{
    bookingStatus: string;
    paymentStatus: string;
    paidAmount: number;
    notes: string;
  }>({
    bookingStatus: 'Pending',
    paymentStatus: 'Unpaid',
    paidAmount: 0,
    notes: ''
  });

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminBookings({
        search,
        bookingStatus: bookingStatusFilter,
        paymentStatus: paymentStatusFilter,
        tourId: tourFilter
      });
      setBookings(data);
      if (initialSelectedId) {
        const found = data.find((b: any) => b.bookingId === initialSelectedId || b.id === initialSelectedId);
        if (found) openBookingModal(found);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [bookingStatusFilter, paymentStatusFilter, tourFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadBookings();
  };

  const openBookingModal = (b: any) => {
    setSelectedBooking(b);
    setStatusForm({
      bookingStatus: b.bookingStatus || 'Pending',
      paymentStatus: b.paymentStatus || 'Unpaid',
      paidAmount: b.paidAmount !== undefined ? b.paidAmount : (b.paymentStatus === 'Verified' ? b.finalAmount : 0),
      notes: b.notes || ''
    });
  };

  const handleSaveStatus = async () => {
    if (!selectedBooking) return;
    try {
      const res = await api.updateBookingStatus(selectedBooking.bookingId, statusForm);
      if (res.success) {
        showToast(
          lang === 'bn' 
            ? `বুকিং ${selectedBooking.bookingId} সফলভাবে হালনাগাদ হয়েছে!` 
            : `Booking ${selectedBooking.bookingId} updated successfully!`,
          'success'
        );
        setSelectedBooking(null);
        loadBookings();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update booking status', 'error');
    }
  };

  // Helper for direct communication
  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('01')) clean = `88${clean}`;
    return clean;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {lang === 'bn' ? 'বুকিং ম্যানেজমেন্ট ও টিকিট অনুমোদন' : 'Booking Management & Verification'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'বিকাশ/নগদ TrxID মিলিয়ে দেখুন, গ্রাহকের সাথে যোগাযোগ করুন ও ডিজিটাল পাস ইস্যু করুন।' 
              : 'Reconcile mobile payment TrxIDs, contact pilgrims, and issue verified passes.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadBookings()}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'রিফ্রেশ' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'bn' ? 'আইডি, নাম, মোবাইল বা TrxID...' : 'Booking ID, name, mobile, TrxID...'}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        {/* Booking Status Filter */}
        <div>
          <select
            value={bookingStatusFilter}
            onChange={(e) => setBookingStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল বুকিং স্ট্যাটাস' : 'All Booking Statuses'}</option>
            <option value="Pending">{lang === 'bn' ? 'পেন্ডিং (Pending)' : 'Pending'}</option>
            <option value="Confirmed">{lang === 'bn' ? 'কনফার্মড (Confirmed)' : 'Confirmed'}</option>
            <option value="Cancelled">{lang === 'bn' ? 'বাতিল (Cancelled)' : 'Cancelled'}</option>
            <option value="Completed">{lang === 'bn' ? 'সম্পন্ন (Completed)' : 'Completed'}</option>
          </select>
        </div>

        {/* Payment Status Filter */}
        <div>
          <select
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল পেমেন্ট অবস্থা' : 'All Payment Statuses'}</option>
            <option value="Payment Verification Pending">{lang === 'bn' ? 'ভেরিফিকেশন পেন্ডিং' : 'Verification Pending'}</option>
            <option value="Paid">{lang === 'bn' ? 'পরিশোধিত (Paid)' : 'Paid / Verified'}</option>
            <option value="Partial">{lang === 'bn' ? 'আংশিক (Partial)' : 'Partial'}</option>
            <option value="Unpaid">{lang === 'bn' ? 'অপরিশোধিত (Unpaid)' : 'Unpaid'}</option>
            <option value="Refunded">{lang === 'bn' ? 'রিফান্ড (Refunded)' : 'Refunded'}</option>
          </select>
        </div>

        {/* Tour Filter */}
        <div>
          <select
            value={tourFilter}
            onChange={(e) => setTourFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল ট্যুর প্যাকেজ' : 'All Tour Packages'}</option>
            {tours.map(t => (
              <option key={t.id} value={t.id}>
                {lang === 'bn' ? t.titleBn : t.titleEn}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'গ্রাহকের তথ্য' : 'Customer Info'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'ট্যুর ও যাত্রা' : 'Tour & Date'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'আসন' : 'Seats'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'পেমেন্ট ও TrxID' : 'Payment & TrxID'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'যোগাযোগ ও অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span>{lang === 'bn' ? 'বুকিং লোড হচ্ছে...' : 'Loading bookings...'}</span>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    {lang === 'bn' ? 'কোনো বুকিং রেকর্ড পাওয়া যায়নি।' : 'No booking records found.'}
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const isPendingVerification = b.paymentStatus === 'Payment Verification Pending';
                  const isConfirmed = b.bookingStatus === 'Confirmed';

                  return (
                    <tr key={b.id || b.bookingId} className="hover:bg-amber-50/40 transition-colors">
                      {/* Booking ID */}
                      <td className="py-3 px-4 font-mono font-bold text-amber-900">
                        <div>{b.bookingId}</div>
                        <div className="text-[10px] text-stone-400 font-sans font-normal">
                          {b.createdAt?.split('T')[0] || '2026-09-16'}
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-900">{b.leadTravelerName}</div>
                        <div className="text-[11px] text-stone-600 font-mono flex items-center gap-1">
                          <span>{b.leadMobile}</span>
                        </div>
                        {b.leadEmail && (
                          <div className="text-[10px] text-stone-400">{b.leadEmail}</div>
                        )}
                      </td>

                      {/* Tour Package & Date */}
                      <td className="py-3 px-3 max-w-[180px]">
                        <div className="font-semibold text-stone-800 line-clamp-1">
                          {lang === 'bn' ? b.tourTitleBn : b.tourTitleEn}
                        </div>
                        <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          <span>{b.travelDate}</span>
                        </div>
                      </td>

                      {/* Seats */}
                      <td className="py-3 px-3">
                        <span className="font-bold text-stone-800 font-sans">
                          {b.selectedSeats?.length || b.adultsCount} {lang === 'bn' ? 'জন' : 'pax'}
                        </span>
                        {b.selectedSeats && b.selectedSeats.length > 0 && (
                          <div className="text-[10px] text-stone-500 font-mono">
                            {b.selectedSeats.join(', ')}
                          </div>
                        )}
                      </td>

                      {/* Payment & TrxID */}
                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-900 font-sans">
                          {formatPrice(b.finalAmount, lang)}
                        </div>
                        <div className="text-[10px] text-stone-600 flex items-center gap-1 font-mono">
                          <span className="font-semibold text-amber-800">{b.paymentMethod}:</span>
                          <span>{b.transactionId}</span>
                        </div>
                        {b.senderMobile && (
                          <div className="text-[10px] text-stone-400">
                            {lang === 'bn' ? 'প্রেরক:' : 'From:'} {b.senderMobile}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.bookingStatus === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.bookingStatus}
                          </span>
                          <div className={`text-[10px] font-semibold ${
                            b.paymentStatus === 'Verified' || b.paymentStatus === 'Paid'
                              ? 'text-emerald-700'
                              : b.paymentStatus === 'Payment Verification Pending'
                              ? 'text-amber-700'
                              : 'text-stone-500'
                          }`}>
                            {b.paymentStatus}
                          </div>
                        </div>
                      </td>

                      {/* Communication & Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Call Button */}
                          <a
                            href={`tel:${b.leadMobile}`}
                            title={lang === 'bn' ? 'গ্রাহককে কল করুন' : 'Call customer'}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>

                          {/* WhatsApp Button */}
                          <a
                            href={`https://wa.me/${getCleanPhone(b.leadMobile)}?text=${encodeURIComponent(`নমস্কার ${b.leadTravelerName}, তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস থেকে যোগাযোগ করা হচ্ছে আপনার বুকিং (${b.bookingId}) প্রসঙ্গে।`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ দিন' : 'WhatsApp customer'}
                            className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>

                          {/* Email Button */}
                          {b.leadEmail && (
                            <a
                              href={`mailto:${b.leadEmail}?subject=${encodeURIComponent(`Tirthobondhu Tour Booking: ${b.bookingId}`)}`}
                              title={lang === 'bn' ? 'ইমেইল পাঠান' : 'Email customer'}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* View Digital Pass */}
                          <button
                            onClick={() => setPassBooking(b)}
                            title={lang === 'bn' ? 'ডিজিটাল ট্রাভেল পাস দেখুন' : 'View Travel Pass'}
                            className="p-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          {/* Manage / Edit Status */}
                          <button
                            onClick={() => openBookingModal(b)}
                            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-900 text-stone-100 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3 h-3 text-amber-400" />
                            <span>{lang === 'bn' ? 'রিভিউ' : 'Review'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details & Status Update Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl border border-stone-300">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
              <div>
                <div className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                  {lang === 'bn' ? 'বুকিং ভেরিফিকেশন ও স্টেটাস আপডেট' : 'Booking Verification & Management'}
                </div>
                <h3 className="text-base font-bold font-mono text-stone-900">
                  {selectedBooking.bookingId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              {/* Customer & Tour Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-200/60">
                <div>
                  <span className="text-stone-500 block">{lang === 'bn' ? 'গ্রাহকের নাম:' : 'Lead Customer:'}</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedBooking.leadTravelerName}</span>
                  <div className="text-stone-600 mt-1 font-mono">{selectedBooking.leadMobile}</div>
                  {selectedBooking.leadEmail && <div className="text-stone-500">{selectedBooking.leadEmail}</div>}
                  {selectedBooking.pickupPoint && (
                    <div className="text-stone-700 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{selectedBooking.pickupPoint}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-stone-500 block">{lang === 'bn' ? 'ট্যুর প্যাকেজ:' : 'Tour Package:'}</span>
                  <span className="font-bold text-stone-900">
                    {lang === 'bn' ? selectedBooking.tourTitleBn : selectedBooking.tourTitleEn}
                  </span>
                  <div className="text-stone-600 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-700" />
                    <span>{selectedBooking.travelDate}</span>
                  </div>
                  <div className="text-stone-700 mt-1">
                    {lang === 'bn' ? 'আসন সংখ্যা:' : 'Seats:'} {selectedBooking.selectedSeats?.join(', ') || `${selectedBooking.adultsCount} person`}
                  </div>
                </div>
              </div>

              {/* Transaction Reconciliation Box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="font-semibold text-stone-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-amber-700" />
                    <span>{lang === 'bn' ? 'পেমেন্ট ট্রানজেকশন তথ্য (TrxID)' : 'Payment & TrxID Verification'}</span>
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    {formatPrice(selectedBooking.finalAmount, lang)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                  <div>
                    <span className="text-[10px] text-stone-500 block">{lang === 'bn' ? 'পদ্ধতি:' : 'Method:'}</span>
                    <span className="font-bold text-stone-800">{selectedBooking.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">{lang === 'bn' ? 'ট্রানজেকশন আইডি:' : 'TrxID:'}</span>
                    <span className="font-bold font-mono text-amber-900 bg-amber-100/80 px-1.5 py-0.5 rounded">
                      {selectedBooking.transactionId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">{lang === 'bn' ? 'প্রেরক নম্বর:' : 'Sender Number:'}</span>
                    <span className="font-mono text-stone-800">{selectedBooking.senderMobile || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`tel:${selectedBooking.leadMobile}`}
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'সরাসরি কল করুন' : 'Call Customer'}</span>
                </a>
                <a
                  href={`https://wa.me/${getCleanPhone(selectedBooking.leadMobile)}?text=${encodeURIComponent(`নমস্কার ${selectedBooking.leadTravelerName}, তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস থেকে যোগাযোগ করা হচ্ছে আপনার বুকিং (${selectedBooking.bookingId}) প্রসঙ্গে।`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ' : 'WhatsApp'}</span>
                </a>
                <button
                  onClick={() => setPassBooking(selectedBooking)}
                  className="px-3 py-2 rounded-xl bg-amber-100 text-amber-900 font-medium flex items-center gap-1.5 hover:bg-amber-200 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'ট্রাভেল পাস দেখুন' : 'Travel Pass'}</span>
                </button>
              </div>

              {/* Status Update Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'বুকিং অবস্থা (Booking Status)' : 'Booking Status'}
                  </label>
                  <select
                    value={statusForm.bookingStatus}
                    onChange={(e) => setStatusForm({ ...statusForm, bookingStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="Pending">Pending (অপেক্ষমাণ)</option>
                    <option value="Confirmed">Confirmed (নিশ্চিত)</option>
                    <option value="Cancelled">Cancelled (বাতিল)</option>
                    <option value="Completed">Completed (সম্পন্ন)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'পেমেন্ট অবস্থা (Payment Status)' : 'Payment Status'}
                  </label>
                  <select
                    value={statusForm.paymentStatus}
                    onChange={(e) => setStatusForm({ ...statusForm, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="Payment Verification Pending">Verification Pending (পেন্ডিং)</option>
                    <option value="Paid">Paid / Verified (পরিশোধিত)</option>
                    <option value="Partial">Partial (আংশিক পরিশোধ)</option>
                    <option value="Unpaid">Unpaid (অপরিশোধিত)</option>
                    <option value="Refunded">Refunded (ফেরত)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গৃহীত অর্থ (Paid Amount - BDT)' : 'Paid Amount (BDT)'}
                  </label>
                  <input
                    type="number"
                    value={statusForm.paidAmount}
                    onChange={(e) => setStatusForm({ ...statusForm, paidAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'অ্যাডমিন নোট / মন্তব্য' : 'Admin Notes'}
                  </label>
                  <input
                    type="text"
                    value={statusForm.notes}
                    onChange={(e) => setStatusForm({ ...statusForm, notes: e.target.value })}
                    placeholder="e.g. Verified by bKash statement on 16 Sep"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-stone-200 flex items-center justify-end gap-3 bg-stone-50 rounded-b-2xl">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium"
              >
                {lang === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleSaveStatus}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-stone-950 font-bold rounded-xl shadow cursor-pointer"
              >
                {lang === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Status Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Travel Pass Modal */}
      {passBooking && (
        <TravelPassModal
          booking={passBooking}
          onClose={() => setPassBooking(null)}
        />
      )}
    </div>
  );
};
