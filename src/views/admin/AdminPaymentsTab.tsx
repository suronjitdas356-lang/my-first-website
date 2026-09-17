import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { PaymentRecord } from '../../../server/db';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { 
  CreditCard, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCcw, 
  DollarSign, 
  Clock, 
  Edit, 
  XCircle, 
  Phone 
} from 'lucide-react';

export const AdminPaymentsTab: React.FC = () => {
  const { lang, showToast } = useApp();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Editing / Verification Modal
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [editStatus, setEditStatus] = useState<string>('Paid');
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editNotes, setEditNotes] = useState<string>('');

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminPayments({
        method: methodFilter,
        status: statusFilter,
        search
      });
      setPayments(data);
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, [methodFilter, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPayments();
  };

  const openVerifyModal = (p: PaymentRecord) => {
    setSelectedPayment(p);
    setEditStatus(p.paymentStatus === 'Unpaid' ? 'Paid' : p.paymentStatus);
    setEditAmount(p.amount);
    setEditNotes(p.notes || '');
  };

  const handleSavePayment = async () => {
    if (!selectedPayment) return;
    try {
      const res = await api.updatePayment(selectedPayment.id, {
        paymentStatus: editStatus,
        amount: editAmount,
        notes: editNotes
      });
      if (res.success) {
        showToast(
          lang === 'bn' 
            ? 'পেমেন্ট স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!' 
            : 'Payment status updated successfully!',
          'success'
        );
        setSelectedPayment(null);
        loadPayments();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update payment', 'error');
    }
  };

  // Summary Metrics
  const totalReceived = payments.filter(p => p.paymentStatus === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter(p => p.paymentStatus === 'Unpaid' || p.paymentStatus === 'Partial').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {lang === 'bn' ? 'পেমেন্ট ও ট্রানজেকশন রিকনসিলিয়েশন' : 'Payment & Transaction Reconciliation'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'বিকাশ, নগদ, ব্যাংক ট্রান্সফার ও ক্যাশ পেমেন্ট ট্র্যাকিং এবং TrxID যাচাই।' 
              : 'Mobile banking, bank deposits, cash reconciliation, and TrxID approvals.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1.5 rounded-xl font-sans">
            {lang === 'bn' ? 'মোট সংগৃহীত: ' : 'Total Verified: '}
            {formatPrice(totalReceived, lang)}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search Field */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'bn' ? 'বুকিং আইডি, TrxID, গ্রাহকের নাম বা মোবাইল...' : 'Booking ID, TrxID, name, mobile...'}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        {/* Method Filter */}
        <div>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল পেমেন্ট মাধ্যম' : 'All Payment Methods'}</option>
            <option value="bKash">bKash (বিকাশ)</option>
            <option value="Nagad">Nagad (নগদ)</option>
            <option value="Bank transfer">Bank Transfer (ব্যাংক ট্রান্সফার)</option>
            <option value="Cash">Cash (অফিস ক্যাশ)</option>
            <option value="Online payment">Online Payment</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল অবস্থা (All Statuses)' : 'All Statuses'}</option>
            <option value="Paid">{lang === 'bn' ? 'পরিশোধিত (Paid)' : 'Paid'}</option>
            <option value="Partial">{lang === 'bn' ? 'আংশিক (Partial)' : 'Partial'}</option>
            <option value="Unpaid">{lang === 'bn' ? 'পেন্ডিং / অপরিশোধিত' : 'Unpaid / Pending'}</option>
            <option value="Refunded">{lang === 'bn' ? 'রিফান্ড (Refunded)' : 'Refunded'}</option>
          </select>
        </div>
      </form>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'গ্রাহক ও ফোন' : 'Customer & Phone'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'পদ্ধতি' : 'Method'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'TrxID / রেফারেন্স' : 'TrxID / Reference'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span>{lang === 'bn' ? 'পেমেন্ট রেকর্ড লোড হচ্ছে...' : 'Loading payments...'}</span>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    {lang === 'bn' ? 'কোনো পেমেন্ট তথ্য পাওয়া যায়নি।' : 'No payment records found.'}
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Booking ID */}
                    <td className="py-3 px-4 font-mono font-bold text-amber-900">
                      {p.bookingId}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-stone-900">{p.customerName}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{p.customerPhone}</div>
                    </td>

                    {/* Method */}
                    <td className="py-3 px-3">
                      <span className="font-semibold text-stone-800 bg-stone-100 px-2 py-0.5 rounded">
                        {p.paymentMethod}
                      </span>
                    </td>

                    {/* TrxID */}
                    <td className="py-3 px-3 font-mono">
                      <span className="bg-amber-50 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-200">
                        {p.transactionId}
                      </span>
                      {p.senderMobile && (
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {lang === 'bn' ? 'প্রেরক:' : 'From:'} {p.senderMobile}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-3 font-bold font-sans text-stone-900">
                      {formatPrice(p.amount, lang)}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.paymentStatus === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.paymentStatus === 'Refunded'
                          ? 'bg-rose-100 text-rose-800'
                          : p.paymentStatus === 'Partial'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.paymentStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openVerifyModal(p)}
                        className="px-2.5 py-1 bg-stone-800 hover:bg-stone-900 text-amber-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        {lang === 'bn' ? 'যাচাই / আপডেট' : 'Verify / Update'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verify / Update Payment Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-300">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  {lang === 'bn' ? 'পেমেন্ট ট্রানজেকশন আপডেট' : 'Payment Transaction Update'}
                </h3>
                <div className="text-xs text-stone-500 font-mono">
                  {selectedPayment.bookingId} • TrxID: {selectedPayment.transactionId}
                </div>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'পেমেন্ট স্ট্যাটাস' : 'Payment Status'}
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                >
                  <option value="Paid">Paid / Verified (পরিশোধিত)</option>
                  <option value="Partial">Partial (আংশিক পরিশোধ)</option>
                  <option value="Unpaid">Unpaid / Pending (পেন্ডিং)</option>
                  <option value="Refunded">Refunded (টাকা ফেরত)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'গৃহীত অর্থ (BDT)' : 'Verified Amount (BDT)'}
                </label>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'মন্তব্য / বিবরণ' : 'Notes / Verification Reference'}
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. bKash Statement reconciled"
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  onClick={handleSavePayment}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl shadow cursor-pointer"
                >
                  {lang === 'bn' ? 'হালনাগাদ করুন' : 'Update Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
