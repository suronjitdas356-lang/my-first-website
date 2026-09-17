import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { api, ReportData } from '../../services/api';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { 
  TrendingUp, 
  Calendar, 
  Download, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Award, 
  PieChart, 
  Printer 
} from 'lucide-react';

export const AdminReportsTab: React.FC = () => {
  const { lang } = useApp();
  const [range, setRange] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminReports(range, startDate, endDate);
      setReport(data);
    } catch (err) {
      console.error('Failed to load report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, [range]);

  const handleCustomFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      setRange('custom');
      loadReport();
    }
  };

  const handleExportCSV = () => {
    if (!report) return;
    const rows = [
      ['Metric', 'Value'],
      ['Range', report.range],
      ['Total Bookings', report.bookingCount],
      ['Total Gross Revenue (BDT)', report.revenue],
      ['Collected Amount (BDT)', report.paidAmount],
      ['Pending Due (BDT)', report.dueAmount],
      ['Cancelled Bookings', report.cancelledCount],
      [],
      ['Tour Package', 'Bookings Count', 'Revenue (BDT)']
    ];

    report.popularTours.forEach(t => {
      rows.push([`"${t.title.replace(/"/g, '""')}"`, t.count as any, t.revenue as any]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Tirthobondhu_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const r = report || {
    range: 'all',
    bookingCount: 0,
    revenue: 0,
    paidAmount: 0,
    dueAmount: 0,
    cancelledCount: 0,
    popularTours: []
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {lang === 'bn' ? 'রিপোর্টস ও অ্যানালিটিক্স' : 'Financial Reports & Analytics'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'নির্দিষ্ট সময়সীমার আয়, বকেয়া, সফল বুকিং এবং জনপ্রিয় প্যাকেজের সারসংক্ষেপ।' 
              : 'Revenue breakdowns, collection ratios, and top performing pilgrimage packages.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'CSV ডাউনলোড' : 'Export CSV'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-stone-600" />
            <span>{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Date Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', labelBn: 'সকল সময়', labelEn: 'All Time' },
            { id: 'today', labelBn: 'আজকের দিন', labelEn: 'Today' },
            { id: 'week', labelBn: 'এই সপ্তাহ', labelEn: 'This Week' },
            { id: 'month', labelBn: 'এই মাস', labelEn: 'This Month' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setRange(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                range === tab.id
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {lang === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Custom Range Form */}
        <form onSubmit={handleCustomFilterSubmit} className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-200 rounded-xl text-xs text-stone-700"
          />
          <span className="text-xs text-stone-400">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2.5 py-1.5 border border-stone-200 rounded-xl text-xs text-stone-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            {lang === 'bn' ? 'ফিল্টার' : 'Filter'}
          </button>
        </form>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'বুকিং সংখ্যা' : 'Bookings Count'}
          </span>
          <div className="text-2xl font-bold font-sans text-stone-900">
            {lang === 'bn' ? toBnNum(r.bookingCount) : r.bookingCount}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {lang === 'bn' ? `${toBnNum(r.cancelledCount)} টি বাতিলকৃত` : `${r.cancelledCount} cancelled`}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'মোট গ্রস আয়' : 'Gross Revenue'}
          </span>
          <div className="text-2xl font-bold font-sans text-stone-900">
            {formatPrice(r.revenue, lang)}
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {lang === 'bn' ? 'মোট প্যাকেজ মূল্য' : 'Total booking value'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'সংগৃহীত অর্থ' : 'Collected / Paid'}
          </span>
          <div className="text-2xl font-bold font-sans text-emerald-800">
            {formatPrice(r.paidAmount, lang)}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">
            {r.revenue > 0 ? `${Math.round((r.paidAmount / r.revenue) * 100)}% সংগৃহীত` : '0%'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'বকেয়া / পেন্ডিং' : 'Pending / Due'}
          </span>
          <div className="text-2xl font-bold font-sans text-amber-700">
            {formatPrice(r.dueAmount, lang)}
          </div>
          <div className="text-[11px] text-amber-600 mt-1">
            {lang === 'bn' ? 'যাত্রার পূর্বে প্রদেয়' : 'Due before departure'}
          </div>
        </div>
      </div>

      {/* Popular Tours Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-700" />
          <span>{lang === 'bn' ? 'জনপ্রিয় ট্যুর প্যাকেজ ও আয় বন্টন' : 'Popular Tours & Revenue Contribution'}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-y border-stone-200">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">{lang === 'bn' ? 'প্যাকেজের নাম' : 'Tour Package'}</th>
                <th className="py-2.5 px-3">{lang === 'bn' ? 'বুকিং সংখ্যা' : 'Bookings'}</th>
                <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'মোট আয়' : 'Revenue'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {r.popularTours.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-stone-400">
                    {lang === 'bn' ? 'এই সময়সীমায় কোনো বুকিং পাওয়া যায়নি।' : 'No bookings in this period.'}
                  </td>
                </tr>
              ) : (
                r.popularTours.map((t, idx) => (
                  <tr key={t.tourId} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3 px-3 font-bold font-sans text-amber-800">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      {t.title}
                    </td>
                    <td className="py-3 px-3 font-sans font-bold text-stone-800">
                      {lang === 'bn' ? toBnNum(t.count) : t.count}
                    </td>
                    <td className="py-3 px-3 font-bold font-sans text-emerald-800 text-right">
                      {formatPrice(t.revenue, lang)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
