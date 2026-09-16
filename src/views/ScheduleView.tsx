import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Calendar, MapPin, Clock, Compass, Filter, CheckCircle2 } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { lang, tours, setCurrentView, setSelectedTourId } = useApp();

  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Flatten upcoming tour departures
  const schedules = tours.flatMap(tour => 
    tour.travelDates.map((date, idx) => ({
      key: `${tour.id}-${idx}`,
      tourId: tour.id,
      titleBn: tour.titleBn,
      titleEn: tour.titleEn,
      category: tour.category,
      destinationBn: tour.destinationBn,
      destinationEn: tour.destinationEn,
      durationBn: tour.durationBn,
      durationEn: tour.durationEn,
      date,
      priceAdult: tour.priceAdult,
      totalSeats: tour.totalSeats,
      bookedSeats: tour.bookedSeats,
      status: tour.status,
      vehicleBn: tour.vehicleTypeBn,
      vehicleEn: tour.vehicleTypeEn
    }))
  ).filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterMonth !== 'all' && !item.date.startsWith(filterMonth)) return false;
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleBook = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs & Header */}
      <div>
        <Breadcrumbs
          items={[
            { labelBn: 'ভ্রমণ সময়সূচি', labelEn: 'Tour Schedule' }
          ]}
        />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'আসন্ন তীর্থযাত্রা ও ভ্রমণ সময়সূচি' : 'Upcoming Pilgrimage & Tour Schedule'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-bangla mt-1">
              {lang === 'bn'
                ? 'আপনার সুবিধাজনক তারিখে আসন নিশ্চিত করতে সময়সূচি দেখে সরাসরি বুকিং করুন।'
                : 'Select your preferred departure date and reserve seats in advance.'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল মাস' : 'All Months'}</option>
              <option value="2026-10">{lang === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026'}</option>
              <option value="2026-11">{lang === 'bn' ? 'নভেম্বর ২০২৬' : 'November 2026'}</option>
              <option value="2026-12">{lang === 'bn' ? 'ডিসেম্বর ২০২৬' : 'December 2026'}</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">{lang === 'bn' ? 'সকল ধরণের ট্যুর' : 'All Categories'}</option>
              <option value="pilgrimage">{lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage Tours'}</option>
              <option value="domestic">{lang === 'bn' ? 'অভ্যন্তরীণ ভ্রমণ' : 'Domestic Tours'}</option>
              <option value="international">{lang === 'bn' ? 'আন্তর্জাতিক মহাতীর্থ' : 'International'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead className="bg-stone-50 border-b border-stone-200 text-xs text-stone-500 uppercase font-semibold">
              <tr>
                <th className="p-4">{lang === 'bn' ? 'যাত্রার তারিখ' : 'Departure Date'}</th>
                <th className="p-4">{lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Package'}</th>
                <th className="p-4">{lang === 'bn' ? 'গন্তব্য' : 'Destination'}</th>
                <th className="p-4">{lang === 'bn' ? 'সময়কাল' : 'Duration'}</th>
                <th className="p-4">{lang === 'bn' ? 'জনপ্রতি মূল্য' : 'Price'}</th>
                <th className="p-4">{lang === 'bn' ? 'আসন অবস্থা' : 'Availability'}</th>
                <th className="p-4 text-center">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {schedules.map((item) => {
                const rem = Math.max(0, item.totalSeats - item.bookedSeats);

                return (
                  <tr key={item.key} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-4 font-bold text-stone-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{formatBnDate(item.date, lang)}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-stone-900 font-bangla block line-clamp-1">
                        {lang === 'bn' ? item.titleBn : item.titleEn}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {lang === 'bn' ? item.vehicleBn : item.vehicleEn}
                      </span>
                    </td>

                    <td className="p-4 font-medium text-stone-700 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{lang === 'bn' ? item.destinationBn : item.destinationEn}</span>
                      </div>
                    </td>

                    <td className="p-4 font-medium text-stone-700 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{lang === 'bn' ? item.durationBn : item.durationEn}</span>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-amber-900 whitespace-nowrap">
                      {formatPrice(item.priceAdult, lang)}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        item.status === 'Almost Full'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {lang === 'bn' ? `${toBnNum(rem)} টি আসন খালি` : `${rem} Seats Left`}
                      </span>
                    </td>

                    <td className="p-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleBook(item.tourId)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold shadow-sm transition-all"
                      >
                        {lang === 'bn' ? 'বুকিং' : 'Book'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
