import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, toBnNum } from '../utils/bilingual';
import { X, Check, Minus, Compass, Trash2 } from 'lucide-react';

export const TourComparisonModal: React.FC = () => {
  const { 
    lang, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    tours, 
    setCurrentView, 
    setSelectedTourId 
  } = useApp();

  if (compareList.length === 0) return null;

  const comparedTours = tours.filter(t => compareList.includes(t.id));

  const handleBook = (tourId: string) => {
    setSelectedTourId(tourId);
    setCurrentView('booking');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in duration-200">
        
        {/* Header */}
        <div className="bg-amber-950 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg font-bangla">
              {lang === 'bn' ? 'ট্যুর প্যাকেজ তুলনা' : 'Tour Packages Comparison'}
            </h3>
            <p className="text-xs text-amber-300">
              {lang === 'bn'
                ? `নির্বাচিত ${toBnNum(comparedTours.length)} টি প্যাকেজের বৈশিষ্ট্য তুলনা করুন`
                : `Comparing ${comparedTours.length} selected packages`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-stone-300 hover:text-white flex items-center gap-1 bg-stone-800/80 px-2.5 py-1.5 rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'তালিকা মুছুন' : 'Clear All'}</span>
            </button>
            <button
              onClick={clearCompare}
              className="p-1 rounded-lg text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-stone-200">
                <th className="p-3 text-xs font-semibold text-stone-500 uppercase tracking-wider w-40">
                  {lang === 'bn' ? 'বৈশিষ্ট্য' : 'Feature'}
                </th>
                {comparedTours.map(t => (
                  <th key={t.id} className="p-3 text-center w-1/3 min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(t.id)}
                        className="absolute -top-2 -right-2 p-1 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200"
                        title={lang === 'bn' ? 'তুলনা থেকে সরান' : 'Remove'}
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <img 
                        src={t.coverImage} 
                        alt={t.titleEn} 
                        className="w-full h-24 object-cover rounded-xl shadow-sm mb-2"
                      />
                      <h4 className="text-sm font-bold text-stone-900 line-clamp-2">
                        {lang === 'bn' ? t.titleBn : t.titleEn}
                      </h4>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              
              {/* Category */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'ধরণ' : 'Category'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-900 text-[11px]">
                      {t.category === 'pilgrimage' ? (lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage') : (lang === 'bn' ? 'পর্যটন' : 'Tourism')}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Destination */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'গন্তব্য' : 'Destination'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center font-medium text-stone-800">
                    {lang === 'bn' ? t.destinationBn : t.destinationEn}
                  </td>
                ))}
              </tr>

              {/* Duration */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'সময়কাল' : 'Duration'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center font-medium text-stone-800">
                    {lang === 'bn' ? t.durationBn : t.durationEn}
                  </td>
                ))}
              </tr>

              {/* Price Adult */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'প্রাপ্তবয়স্ক মূল্য' : 'Adult Price'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center text-sm font-bold text-amber-800">
                    {formatPrice(t.priceAdult, lang)}
                  </td>
                ))}
              </tr>

              {/* Transport Vehicle */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'পরিবহন ব্যবস্থা' : 'Transport'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center text-stone-700">
                    {lang === 'bn' ? t.vehicleTypeBn : t.vehicleTypeEn}
                  </td>
                ))}
              </tr>

              {/* Hotel & Stay */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'আবাসন ব্যবস্থা' : 'Accommodation'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center text-stone-700">
                    {lang === 'bn' ? t.hotelTypeBn : t.hotelTypeEn}
                  </td>
                ))}
              </tr>

              {/* Food */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'খাবার' : 'Meal Plan'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center text-stone-700">
                    {lang === 'bn' ? t.mealPlanBn : t.mealPlanEn}
                  </td>
                ))}
              </tr>

              {/* Available Seats */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'উপলব্ধ আসন' : 'Available Seats'}
                </td>
                {comparedTours.map(t => {
                  const rem = Math.max(0, t.totalSeats - t.bookedSeats);
                  return (
                    <td key={t.id} className="p-3 text-center font-bold text-stone-800">
                      {lang === 'bn' ? `${toBnNum(rem)} টি আসন বাকি` : `${rem} Seats Left`}
                    </td>
                  );
                })}
              </tr>

              {/* Book Action */}
              <tr>
                <td className="p-3 font-semibold text-stone-600">
                  {lang === 'bn' ? 'বুকিং' : 'Action'}
                </td>
                {comparedTours.map(t => (
                  <td key={t.id} className="p-3 text-center">
                    <button
                      onClick={() => handleBook(t.id)}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-sm transition-colors text-xs flex items-center justify-center gap-1"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}</span>
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
