import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TourPackage } from '../../types/index';
import { formatPrice, toBnNum } from '../../utils/bilingual';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const AdminToursTab: React.FC = () => {
  const { lang, tours, addTour, updateTour, deleteTour, showToast, setCurrentView, setSelectedTourId } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingTour, setEditingTour] = useState<Partial<TourPackage> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<TourPackage>>({});
  const [itineraryInputs, setItineraryInputs] = useState<{ day: number; titleBn: string; titleEn: string; descBn: string; descEn: string; mealsBn: string }[]>([]);
  const [includedBnStr, setIncludedBnStr] = useState('');
  const [excludedBnStr, setExcludedBnStr] = useState('');

  const openNewTourModal = () => {
    setEditingTour(null);
    setFormData({
      code: `TB-${tours.length + 1}`,
      titleBn: '',
      titleEn: '',
      destinationBn: '',
      destinationEn: '',
      category: 'pilgrimage',
      durationBn: '৩ দিন ২ রাত',
      durationEn: '3 Days 2 Nights',
      durationDays: 3,
      durationNights: 2,
      priceAdult: 8500,
      priceChild: 6500,
      priceInfant: 2000,
      discountPrice: 0,
      totalSeats: 36,
      bookedSeats: 0,
      status: 'Booking Open',
      coverImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
      galleryImages: [],
      travelDates: ['2026-10-15'],
      vehicleTypeBn: 'রিজার্ভ এসি লাক্সারি বাস / কোস্টার',
      vehicleTypeEn: 'Reserved AC Luxury Bus / Coaster',
      hotelTypeBn: '৩ তারকা মানের এসি হোটেল রুম (টুইন শেয়ারিং)',
      hotelTypeEn: '3-Star Standard AC Hotel (Twin Sharing)',
      mealPlanBn: 'বিশুদ্ধ সাত্ত্বিক খাবার (সকাল, দুপুর ও রাত)',
      mealPlanEn: 'Pure Vegetarian / Sattvic Meals',
      descriptionBn: '',
      descriptionEn: '',
      pickupPointsBn: ['মানিকনগর বিশ্বরোড', 'সায়েদাবাদ জনপদ মোড়', 'যাত্রাবাড়ী চৌরাস্তা'],
      pickupPointsEn: ['Maniknagar Bishwaroad', 'Sayedabad', 'Jatrabari'],
      published: true
    });
    setItineraryInputs([
      { day: 1, titleBn: 'ঢাকা হতে যাত্রা ও আগমন', titleEn: 'Departure from Dhaka & Arrival', descBn: 'নির্দিষ্ট পয়েন্ট হতে যাত্রা শুরু। পৌঁছানোর পর হোটেলে বিশ্রাম ও সন্ধ্যায় দর্শন।', descEn: 'Journey commences. Hotel check-in and evening darshan.', mealsBn: 'দুপুরের খাবার ও রাতের প্রসাদ' }
    ]);
    setIncludedBnStr('এসি বাসে ঢাকা-গন্তব্য যাতায়াত\n৩ তারকা মানের হোটেলে রাত্রিযাপন\nদৈনিক ৩ বেলা বিশুদ্ধ সাত্ত্বিক খাবার\nঅভিজ্ঞ গাইড ও সার্বক্ষণিক সেবা\nসকল প্রবেশ ফি ও ট্যাক্স');
    setExcludedBnStr('ব্যক্তিগত খরচ ও কেনাকাটা\nনির্দিষ্ট প্যাকেজের বাইরের খাবার\nব্যক্তিগত পূজা ও বিশেষ অর্ঘ্য ফি\nলন্ড্রি ও রুম সার্ভিস');
    setIsModalOpen(true);
  };

  const openEditTourModal = (t: TourPackage) => {
    setEditingTour(t);
    setFormData({ ...t });
    if (t.itinerary && t.itinerary.length) {
      setItineraryInputs(t.itinerary.map(item => ({
        day: item.day,
        titleBn: item.titleBn,
        titleEn: item.titleEn,
        descBn: item.descBn || '',
        descEn: item.descEn || '',
        mealsBn: item.mealsBn || ''
      })));
    } else {
      setItineraryInputs([
        { day: 1, titleBn: '১ম দিন', titleEn: 'Day 1', descBn: '', descEn: '', mealsBn: '' }
      ]);
    }
    setIncludedBnStr(t.includedBn ? t.includedBn.join('\n') : '');
    setExcludedBnStr(t.excludedBn ? t.excludedBn.join('\n') : '');
    setIsModalOpen(true);
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleBn || !formData.titleEn || !formData.priceAdult) {
      showToast(lang === 'bn' ? 'প্যাকেজের শিরোনাম ও মূল্য আবশ্যক।' : 'Tour title and price are required.', 'error');
      return;
    }

    const payload: Partial<TourPackage> = {
      ...formData,
      includedBn: includedBnStr.split('\n').map(s => s.trim()).filter(Boolean),
      includedEn: includedBnStr.split('\n').map(s => s.trim()).filter(Boolean),
      excludedBn: excludedBnStr.split('\n').map(s => s.trim()).filter(Boolean),
      excludedEn: excludedBnStr.split('\n').map(s => s.trim()).filter(Boolean),
      itinerary: itineraryInputs.map(item => ({
        day: item.day,
        titleBn: item.titleBn,
        titleEn: item.titleEn,
        descBn: item.descBn,
        descEn: item.descEn,
        mealsBn: item.mealsBn,
        mealsEn: item.mealsBn
      }))
    };

    try {
      if (editingTour && editingTour.id) {
        await updateTour({ ...(payload as TourPackage), id: editingTour.id });
      } else {
        await addTour(payload);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      // Toast already shown
    }
  };

  const handleTogglePublish = async (t: TourPackage) => {
    const newStatus = t.published === false ? true : false;
    await updateTour({ ...t, published: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(lang === 'bn' ? 'আপনি কি নিশ্চিতভাবে এই প্যাকেজটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this package?')) {
      await deleteTour(id);
    }
  };

  // Filtering
  const filteredTours = tours.filter(t => {
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchBn = t.titleBn.toLowerCase().includes(q) || t.destinationBn.toLowerCase().includes(q);
      const matchEn = t.titleEn.toLowerCase().includes(q) || t.destinationEn.toLowerCase().includes(q);
      const matchCode = t.code.toLowerCase().includes(q);
      if (!matchBn && !matchEn && !matchCode) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
            {lang === 'bn' ? 'ট্যুর ও প্যাকেজ ইনভেন্টরি ম্যানেজমেন্ট' : 'Tour Packages & Inventory'}
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'নতুন প্যাকেজ যোগ, মূল্য ও আসন সংখ্যা হালনাগাদ, পাবলিশ/ড্রাফট নিয়ন্ত্রণ।' 
              : 'Add, edit, price, seat allocations, and publication control.'}
          </p>
        </div>

        <button
          onClick={openNewTourModal}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 text-stone-950" />
          <span>{lang === 'bn' ? 'নতুন প্যাকেজ তৈরি করুন' : 'Create New Tour'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'bn' ? 'প্যাকেজের নাম, গন্তব্য বা কোড দিয়ে খুঁজুন...' : 'Search by title, destination, or code...'}
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            <option value="all">{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            <option value="pilgrimage">{lang === 'bn' ? 'তীর্থযাত্রা (Pilgrimage)' : 'Pilgrimage'}</option>
            <option value="domestic">{lang === 'bn' ? 'অভ্যন্তরীণ (Domestic)' : 'Domestic'}</option>
            <option value="international">{lang === 'bn' ? 'আন্তর্জাতিক (International)' : 'International'}</option>
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">{lang === 'bn' ? 'প্যাকেজ' : 'Package'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'গন্তব্য ও সময়' : 'Destination & Duration'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'মূল্য' : 'Price'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'আসন সংখ্যা' : 'Seats'}</th>
                <th className="py-3 px-3">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 px-3 text-center">{lang === 'bn' ? 'পাবলিশ' : 'Publish'}</th>
                <th className="py-3 px-4 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    {lang === 'bn' ? 'কোনো ট্যুর প্যাকেজ পাওয়া যায়নি।' : 'No tour packages found.'}
                  </td>
                </tr>
              ) : (
                filteredTours.map((t) => {
                  const availableSeats = Math.max(0, t.totalSeats - t.bookedSeats);
                  const isPublished = t.published !== false;

                  return (
                    <tr key={t.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={t.coverImage} 
                            alt={t.titleEn} 
                            className="w-12 h-10 rounded-lg object-cover border border-stone-200 shrink-0" 
                          />
                          <div>
                            <div className="font-bold text-stone-900 line-clamp-1">
                              {lang === 'bn' ? t.titleBn : t.titleEn}
                            </div>
                            <div className="text-[10px] text-stone-500 font-mono">
                              {t.code} • {t.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-stone-800 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span>{lang === 'bn' ? t.destinationBn : t.destinationEn}</span>
                        </div>
                        <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{lang === 'bn' ? t.durationBn : t.durationEn}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-stone-900 font-sans">
                          {formatPrice(t.priceAdult, lang)}
                        </div>
                        {t.discountPrice && t.discountPrice > 0 ? (
                          <div className="text-[10px] text-emerald-600 font-medium line-through">
                            {formatPrice(t.priceAdult + t.discountPrice, lang)}
                          </div>
                        ) : null}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 font-sans">
                            {lang === 'bn' ? toBnNum(t.bookedSeats) : t.bookedSeats}
                          </span>
                          <span className="text-stone-400">/</span>
                          <span className="text-stone-600 font-sans">
                            {lang === 'bn' ? toBnNum(t.totalSeats) : t.totalSeats}
                          </span>
                        </div>
                        <div className="text-[10px] text-emerald-600">
                          {lang === 'bn' ? `${toBnNum(availableSeats)} খালি` : `${availableSeats} left`}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'Booking Open' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'Almost Full'
                            ? 'bg-amber-100 text-amber-800'
                            : t.status === 'Full'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {t.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleTogglePublish(t)}
                          title={isPublished ? 'Click to Unpublish (Draft)' : 'Click to Publish on Website'}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isPublished 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                              : 'bg-stone-100 border-stone-300 text-stone-400'
                          }`}
                        >
                          {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setSelectedTourId(t.id);
                              setCurrentView('tour-detail');
                            }}
                            title="Preview on website"
                            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openEditTourModal(t)}
                            title="Edit tour"
                            className="p-1.5 text-amber-700 hover:text-amber-900 rounded-lg hover:bg-amber-50 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            title="Delete tour"
                            className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-300">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-2xl">
              <div>
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  {editingTour 
                    ? (lang === 'bn' ? 'ট্যুর প্যাকেজ সম্পাদনা' : 'Edit Tour Package')
                    : (lang === 'bn' ? 'নতুন ট্যুর প্যাকেজ তৈরি' : 'Create New Tour Package')}
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  {formData.code || 'TB-NEW'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveTour} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'প্যাকেজের নাম (বাংলা) *' : 'Tour Title (Bangla) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleBn || ''}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    placeholder="সীতাকুণ্ড চন্দ্রনাথ ধাম ও কৈবল্যধাম তীর্থযাত্রা"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'প্যাকেজের নাম (English) *' : 'Tour Title (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn || ''}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="Sitakunda Chandranath Dham & Kaibalyadham Pilgrimage"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গন্তব্য (বাংলা) *' : 'Destination (Bangla) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destinationBn || ''}
                    onChange={(e) => setFormData({ ...formData, destinationBn: e.target.value })}
                    placeholder="সীতাকুণ্ড ও চট্টগ্রাম"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'গন্তব্য (English) *' : 'Destination (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destinationEn || ''}
                    onChange={(e) => setFormData({ ...formData, destinationEn: e.target.value })}
                    placeholder="Sitakunda & Chittagong"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'ক্যাটাগরি' : 'Category'}
                  </label>
                  <select
                    value={formData.category || 'pilgrimage'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="pilgrimage">তীর্থযাত্রা (Pilgrimage)</option>
                    <option value="domestic">অভ্যন্তরীণ ভ্রমণ (Domestic)</option>
                    <option value="international">আন্তর্জাতিক (International)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'স্ট্যাটাস' : 'Tour Status'}
                  </label>
                  <select
                    value={formData.status || 'Booking Open'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
                  >
                    <option value="Booking Open">Booking Open</option>
                    <option value="Almost Full">Almost Full</option>
                    <option value="Full">Full</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Pricing & Seats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'প্রাপ্তবয়স্ক মূল্য (BDT) *' : 'Adult Price (BDT) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.priceAdult || ''}
                    onChange={(e) => setFormData({ ...formData, priceAdult: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'শিশু মূল্য (BDT)' : 'Child Price (BDT)'}
                  </label>
                  <input
                    type="number"
                    value={formData.priceChild || ''}
                    onChange={(e) => setFormData({ ...formData, priceChild: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'মোট আসন সংখ্যা *' : 'Total Seats *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.totalSeats || 36}
                    onChange={(e) => setFormData({ ...formData, totalSeats: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'বুক করা আসন' : 'Booked Seats'}
                  </label>
                  <input
                    type="number"
                    value={formData.bookedSeats || 0}
                    onChange={(e) => setFormData({ ...formData, bookedSeats: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-sans"
                  />
                </div>
              </div>

              {/* Duration & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'সময়কাল (বাংলা)' : 'Duration (Bangla)'}
                  </label>
                  <input
                    type="text"
                    value={formData.durationBn || ''}
                    onChange={(e) => setFormData({ ...formData, durationBn: e.target.value })}
                    placeholder="৩ দিন ২ রাত"
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'যাত্রার তারিখ (YYYY-MM-DD)' : 'Departure Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.travelDates?.[0] || '2026-10-15'}
                    onChange={(e) => setFormData({ ...formData, travelDates: [e.target.value] })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'কভার ছবির URL' : 'Cover Image URL'}
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'প্যাকেজে অন্তর্ভুক্ত (প্রতি লাইনে একটি)' : 'Included Services (one per line)'}
                  </label>
                  <textarea
                    rows={4}
                    value={includedBnStr}
                    onChange={(e) => setIncludedBnStr(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {lang === 'bn' ? 'প্যাকেজে অন্তর্ভুক্ত নয় (প্রতি লাইনে একটি)' : 'Excluded Services (one per line)'}
                  </label>
                  <textarea
                    rows={4}
                    value={excludedBnStr}
                    onChange={(e) => setExcludedBnStr(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {lang === 'bn' ? 'বিস্তারিত বিবরণ (বাংলা)' : 'Detailed Description (Bangla)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionBn || ''}
                  onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                  placeholder="প্যাকেজের আধ্যাত্মিক মাহাত্ম্য ও বিস্তারিত ভ্রমণ পরিকল্পনা..."
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                />
              </div>

              {/* Publish Checkbox */}
              <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                <input
                  type="checkbox"
                  id="published-toggle"
                  checked={formData.published !== false}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded border-stone-300"
                />
                <label htmlFor="published-toggle" className="font-semibold text-stone-800">
                  {lang === 'bn' ? 'ওয়েবসাইটে দৃশ্যমান রাখুন (Publish Immediately)' : 'Publish immediately on customer website'}
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 font-medium cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-xl shadow cursor-pointer"
                >
                  {editingTour 
                    ? (lang === 'bn' ? 'হালনাগাদ সংরক্ষণ করুন' : 'Save Changes')
                    : (lang === 'bn' ? 'প্যাকেজ তৈরি করুন' : 'Create Tour')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
