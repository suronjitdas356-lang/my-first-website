import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api, DashboardStats } from '../../services/api';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Users, 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  PlusCircle, 
  Calendar, 
  Phone, 
  ExternalLink, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';

interface AdminDashboardTabProps {
  onNavigateTab: (tab: string) => void;
  onSelectBooking?: (bookingId: string) => void;
}

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({ onNavigateTab, onSelectBooking }) => {
  const { lang, adminUser } = useApp();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getDashboardStats()
      .then(data => {
        if (mounted) {
          setStats(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to load dashboard stats:', err);
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-stone-500 text-sm">
          {lang === 'bn' ? 'ড্যাশবোর্ড তথ্য লোড হচ্ছে...' : 'Loading dashboard metrics...'}
        </p>
      </div>
    );
  }

  const s = stats || {
    totalTours: 0,
    activeTours: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalCustomers: 0,
    pendingPayments: 0,
    confirmedPayments: 0,
    totalRevenue: 0,
    totalDue: 0,
    unreadNotifications: 0,
    recentBookings: []
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl p-6 text-stone-100 shadow-md border border-amber-800/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'bn' ? 'অপারেশনাল কন্ট্রোল হাব' : 'Live Operations Hub'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            {lang === 'bn' 
              ? `নমস্কার, ${adminUser?.name || 'অ্যাডমিন'}!` 
              : `Welcome, ${adminUser?.name || 'Administrator'}!`}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            {lang === 'bn' 
              ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস-এর আজকের বুকিং, ট্রানজেকশন এবং ট্যুর পরিস্থিতি একনজরে।' 
              : 'Overview of today\'s bookings, payment reconciliations, and tour operations.'}
          </p>
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigateTab('tours')}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নতুন ট্যুর যুক্ত করুন' : 'Add New Tour'}</span>
          </button>
          <button
            onClick={() => onNavigateTab('bookings')}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-stone-700 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>
              {lang === 'bn' ? `পেন্ডিং বুকিং (${toBnNum(s.pendingBookings)})` : `Pending (${s.pendingBookings})`}
            </span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tours */}
        <div 
          onClick={() => onNavigateTab('tours')}
          className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'bn' ? 'মোট ট্যুর প্যাকেজ' : 'Total Tours'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-sans text-stone-900">
              {lang === 'bn' ? toBnNum(s.totalTours) : s.totalTours}
            </span>
            <span className="text-xs text-emerald-600 font-medium">
              {lang === 'bn' ? `${toBnNum(s.activeTours)} সক্রিয়` : `${s.activeTours} Active`}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1">
            <span>{lang === 'bn' ? 'সকল প্যাকেজ দেখুন' : 'Manage packages'}</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-amber-700" />
          </div>
        </div>

        {/* Total Bookings & Pending */}
        <div 
          onClick={() => onNavigateTab('bookings')}
          className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'bn' ? 'মোট বুকিং' : 'Total Bookings'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-sans text-stone-900">
              {lang === 'bn' ? toBnNum(s.totalBookings) : s.totalBookings}
            </span>
            {s.pendingBookings > 0 && (
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {lang === 'bn' ? `${toBnNum(s.pendingBookings)} পেন্ডিং` : `${s.pendingBookings} Pending`}
              </span>
            )}
          </div>
          <div className="mt-2 text-[11px] text-stone-400">
            {lang === 'bn' 
              ? `${toBnNum(s.confirmedBookings)} কনফার্মড | ${toBnNum(s.cancelledBookings)} বাতিল` 
              : `${s.confirmedBookings} Confirmed | ${s.cancelledBookings} Cancelled`}
          </div>
        </div>

        {/* Total Customers */}
        <div 
          onClick={() => onNavigateTab('customers')}
          className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'bn' ? 'নিবন্ধিত গ্রাহক' : 'Total Customers'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-sans text-stone-900">
              {lang === 'bn' ? toBnNum(s.totalCustomers) : s.totalCustomers}
            </span>
            <span className="text-xs text-stone-500">
              {lang === 'bn' ? 'তীর্থযাত্রী' : 'Pilgrims'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-stone-400 flex items-center gap-1">
            <span>{lang === 'bn' ? 'গ্রাহক তথ্য ও ইতিহাস' : 'Customer directory'}</span>
            <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-amber-700" />
          </div>
        </div>

        {/* Confirmed Revenue */}
        <div 
          onClick={() => onNavigateTab('payments')}
          className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm hover:border-amber-400/60 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'bn' ? 'গৃহীত মোট পেমেন্ট' : 'Confirmed Payments'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold font-sans text-emerald-800">
              {formatPrice(s.totalRevenue, lang)}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-medium">
            {lang === 'bn' 
              ? `বকেয়া/পেন্ডিং: ${formatPrice(s.totalDue, lang)}` 
              : `Pending/Due: ${formatPrice(s.totalDue, lang)}`}
          </div>
        </div>
      </div>

      {/* Secondary Row: Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Action Checklist */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{lang === 'bn' ? 'জরুরি পদক্ষেপ' : 'Action Required'}</span>
            </h3>
            {s.pendingBookings > 0 && (
              <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                {lang === 'bn' ? `${toBnNum(s.pendingBookings)} অপেক্ষা করছে` : `${s.pendingBookings} Waiting`}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div 
              onClick={() => onNavigateTab('bookings')}
              className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 hover:bg-amber-100/60 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {lang === 'bn' ? 'পেন্ডিং TrxID যাচাই করুন' : 'Verify Pending TrxIDs'}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    {lang === 'bn' ? `${toBnNum(s.pendingPayments)} টি পেমেন্ট অনুমোদন প্রয়োজন` : `${s.pendingPayments} transactions awaiting check`}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-800" />
            </div>

            <div 
              onClick={() => onNavigateTab('reports')}
              className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-stone-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {lang === 'bn' ? 'আর্থিক রিপোর্ট তৈরি করুন' : 'Generate Financial Report'}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    {lang === 'bn' ? 'দৈনিক ও সাপ্তাহিক আয় বিশ্লেষণ' : 'Daily & weekly revenue analytics'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-700" />
            </div>

            <div 
              onClick={() => onNavigateTab('settings')}
              className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-stone-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {lang === 'bn' ? 'পেমেন্ট নম্বর ও সেটিংস' : 'Hotlines & Payment Settings'}
                  </div>
                  <div className="text-[11px] text-stone-600">
                    {lang === 'bn' ? 'অফিস ঠিকানা, বিকাশ/নগদ নম্বর' : 'Manage numbers, company profile'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-stone-700" />
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>{lang === 'bn' ? 'সাম্প্রতিক বুকিং' : 'Recent Bookings'}</span>
            </h3>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-y border-stone-200">
                <tr>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'গ্রাহক' : 'Customer'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'প্যাকেজ' : 'Tour'}</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'পেমেন্ট' : 'Payment'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {s.recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-stone-400">
                      {lang === 'bn' ? 'কোনো বুকিং পাওয়া যায়নি।' : 'No recent bookings recorded.'}
                    </td>
                  </tr>
                ) : (
                  s.recentBookings.map((b) => (
                    <tr 
                      key={b.id || b.bookingId} 
                      onClick={() => {
                        if (onSelectBooking) onSelectBooking(b.bookingId);
                        onNavigateTab('bookings');
                      }}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-amber-900">
                        {b.bookingId}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-900">{b.leadTravelerName}</div>
                        <div className="text-[10px] text-stone-500">{b.leadMobile}</div>
                      </td>
                      <td className="py-3 px-3 max-w-[150px] truncate text-stone-700">
                        {lang === 'bn' ? b.tourTitleBn : b.tourTitleEn}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-stone-900">{formatPrice(b.finalAmount, lang)}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{b.paymentMethod} • {b.transactionId}</div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.bookingStatus === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.bookingStatus === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
