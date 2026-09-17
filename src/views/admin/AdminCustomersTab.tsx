import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { CustomerRecord } from '../../../server/db';
import { Booking } from '../../types/index';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { 
  Search, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  ArrowUpRight, 
  XCircle, 
  CheckCircle2 
} from 'lucide-react';

export const AdminCustomersTab: React.FC = () => {
  const { lang, showToast } = useApp();
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Customer Details Modal
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [customerBookings, setCustomerBookings] = useState<Booking[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminCustomers(search);
      setCustomers(data);
    } catch (err) {
      console.error('Failed to load customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCustomers();
  };

  const openCustomerDetails = async (c: CustomerRecord) => {
    setSelectedCustomer(c);
    setModalLoading(true);
    try {
      const res = await api.getAdminCustomerDetails(c.id);
      setCustomerBookings(res.bookings || []);
    } catch (err) {
      console.error('Failed to load customer details:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const getCleanPhone = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('01')) clean = `88${clean}`;
    return clean;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {lang === 'bn' ? 'গ্রাহক ও তীর্থযাত্রী ডিরেক্টরি' : 'Customer & Pilgrim Directory'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'নিবন্ধিত তীর্থযাত্রীদের তালিকা, পূর্ববর্তী ভ্রমণ ইতিহাস ও সরাসরি যোগাযোগ।' 
              : 'Registered travelers, complete tour history, and communication channels.'}
          </p>
        </div>

        <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl">
          {lang === 'bn' ? `মোট গ্রাহক: ${toBnNum(customers.length)} জন` : `Total Customers: ${customers.length}`}
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'bn' ? 'গ্রাহকের নাম, ফোন নম্বর, ঠিকানা বা ইমেইল দিয়ে খুঁজুন...' : 'Search by customer name, phone, email, address...'}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold text-xs rounded-xl shadow cursor-pointer"
        >
          {lang === 'bn' ? 'খুঁজুন' : 'Search'}
        </button>
      </form>

      {/* Customer List Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'তীর্থযাত্রী / গ্রাহক' : 'Customer Name'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'ঠিকানা' : 'Address'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'মোট বুকিং' : 'Total Tours'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'মোট খরচ (BDT)' : 'Total Spent'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <span>{lang === 'bn' ? 'গ্রাহকদের তথ্য লোড হচ্ছে...' : 'Loading customers...'}</span>
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    {lang === 'bn' ? 'কোনো গ্রাহকের তথ্য পাওয়া যায়নি।' : 'No customer records found.'}
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-amber-50/40 transition-colors">
                    {/* Name & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0">
                          {c.name.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-stone-900">{c.name}</div>
                          {c.email && (
                            <div className="text-[10px] text-stone-400">{c.email}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-3 font-mono font-semibold text-stone-800">
                      {c.phone}
                    </td>

                    {/* Address */}
                    <td className="py-3 px-3 max-w-[200px] truncate text-stone-600">
                      {c.address || 'N/A'}
                    </td>

                    {/* Total Tours */}
                    <td className="py-3 px-3">
                      <span className="font-bold font-sans text-stone-900 bg-stone-100 px-2 py-0.5 rounded-full">
                        {lang === 'bn' ? toBnNum(c.totalBookings) : c.totalBookings}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="py-3 px-3 font-bold font-sans text-emerald-800">
                      {formatPrice(c.totalSpent, lang)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${c.phone}`}
                          title="Call Customer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${getCleanPhone(c.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Customer"
                          className="p-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openCustomerDetails(c)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-amber-100 text-stone-800 text-[11px] font-medium rounded-lg transition-colors cursor-pointer"
                        >
                          {lang === 'bn' ? 'ইতিহাস' : 'History'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile & Tour History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl border border-stone-300">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-sm">
                  {selectedCustomer.name.substring(0, 1)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    {selectedCustomer.name}
                  </h3>
                  <div className="text-xs text-stone-500 font-mono">
                    {selectedCustomer.phone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs overflow-y-auto max-h-[75vh]">
              {/* Quick Contact & Address */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-500 block">{lang === 'bn' ? 'ইমেইল:' : 'Email:'}</span>
                  <span className="font-semibold text-stone-800">{selectedCustomer.email || 'N/A'}</span>
                  <span className="text-[10px] text-stone-500 block mt-2">{lang === 'bn' ? 'ঠিকানা:' : 'Address:'}</span>
                  <span className="text-stone-800">{selectedCustomer.address || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 block">{lang === 'bn' ? 'মোট ভ্রমণ:' : 'Total Bookings:'}</span>
                  <span className="font-bold text-stone-900 text-sm font-sans">{selectedCustomer.totalBookings}</span>
                  <span className="text-[10px] text-stone-500 block mt-2">{lang === 'bn' ? 'মোট পেমেন্ট পরিশোধ:' : 'Lifetime Value:'}</span>
                  <span className="font-bold font-sans text-emerald-800 text-sm">{formatPrice(selectedCustomer.totalSpent, lang)}</span>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${selectedCustomer.phone}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'কল করুন' : 'Call Customer'}</span>
                </a>
                <a
                  href={`https://wa.me/${getCleanPhone(selectedCustomer.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ' : 'WhatsApp'}</span>
                </a>
              </div>

              {/* Tour Booking History */}
              <div>
                <h4 className="font-bold text-stone-900 mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>{lang === 'bn' ? 'ভ্রমণ বুকিং ইতিহাস' : 'Tour Booking History'}</span>
                </h4>

                {modalLoading ? (
                  <div className="py-6 text-center text-stone-400">
                    <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                    <span>{lang === 'bn' ? 'ইতিহাস লোড হচ্ছে...' : 'Loading history...'}</span>
                  </div>
                ) : customerBookings.length === 0 ? (
                  <div className="py-6 text-center text-stone-400 bg-stone-50 rounded-xl">
                    {lang === 'bn' ? 'কোনো বুকিং পাওয়া যায়নি।' : 'No tour history available.'}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customerBookings.map((b) => (
                      <div key={b.bookingId} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-stone-900 font-mono text-[11px]">
                            {b.bookingId}
                          </div>
                          <div className="text-stone-700 font-medium">
                            {lang === 'bn' ? b.tourTitleBn : b.tourTitleEn}
                          </div>
                          <div className="text-[10px] text-stone-500">
                            {lang === 'bn' ? 'তারিখ:' : 'Date:'} {b.travelDate} • {formatPrice(b.finalAmount, lang)}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.bookingStatus === 'Cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {b.bookingStatus}
                          </span>
                          <div className="text-[10px] text-stone-500 mt-1">
                            {b.paymentStatus}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
