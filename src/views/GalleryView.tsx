import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'temple' | 'nature' | 'pilgrims' | 'prasadam';
  titleBn: string;
  titleEn: string;
  image: string;
}

export const GalleryView: React.FC = () => {
  const { lang } = useApp();
  const [filter, setFilter] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      category: 'temple',
      titleBn: 'সীতাকুণ্ড শ্রী শ্রী চন্দ্রনাথ ধাম চূড়া',
      titleEn: 'Sitakunda Sri Chandranath Dham Peak',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'g2',
      category: 'temple',
      titleBn: 'কান্তজিউ মন্দির টেরাকোটা স্থাপত্য',
      titleEn: 'Kantajew Temple Terracotta Art',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'g3',
      category: 'pilgrims',
      titleBn: 'সিলেট চৈতন্য ধামে ভক্তিগীতি ও কীর্তন',
      titleEn: 'Devotional Kirtan at Sylhet Chaitanya Dham',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'g4',
      category: 'nature',
      titleBn: 'সাজেক ভ্যালির সকালে মেঘের সমুদ্র',
      titleEn: 'Sea of Clouds at Sajek Valley',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'g5',
      category: 'prasadam',
      titleBn: 'বিশুদ্ধ সাত্ত্বিক নিরামিষ মহাপ্রসাদ আয়োজন',
      titleEn: 'Pure Sattvic Prasadam Arrangement',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'g6',
      category: 'temple',
      titleBn: 'বারাণসী গঙ্গা ঘাটের সান্ধ্য মহতি আরতি',
      titleEn: 'Holy Ganga Aarti at Varanasi Ghats',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const filtered = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'ফটোগ্যালারি', labelEn: 'Photo Gallery' }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
            {lang === 'bn' ? 'তীর্থদর্শন ও ভ্রমণ ফটোগ্যালারি' : 'Pilgrimage Photo Gallery'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-bangla mt-1">
            {lang === 'bn'
              ? 'বিভিন্ন পবিত্র পীঠস্থান, মন্দির ও প্রাকৃতিক ভ্রমণের অবিস্মরণীয় মুহূর্তসমূহ।'
              : 'Sacred moments and scenic wonders captured across our pilgrimage journeys.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'all' ? 'bg-white text-amber-900 shadow-sm' : 'text-stone-600'}`}
          >
            {lang === 'bn' ? 'সকল' : 'All'}
          </button>
          <button
            onClick={() => setFilter('temple')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'temple' ? 'bg-amber-700 text-white shadow-sm' : 'text-stone-600'}`}
          >
            {lang === 'bn' ? 'মন্দির ও ধাম' : 'Temples'}
          </button>
          <button
            onClick={() => setFilter('nature')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'nature' ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-600'}`}
          >
            {lang === 'bn' ? 'প্রকৃতি' : 'Nature'}
          </button>
          <button
            onClick={() => setFilter('prasadam')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filter === 'prasadam' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600'}`}
          >
            {lang === 'bn' ? 'মহাপ্রসাদ' : 'Prasadam'}
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 border border-stone-200"
          >
            <img
              src={item.image}
              alt={item.titleEn}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h4 className="text-sm font-bold font-bangla line-clamp-1">
                {lang === 'bn' ? item.titleBn : item.titleEn}
              </h4>
              <span className="text-[11px] text-amber-300 flex items-center gap-1 mt-0.5 font-medium">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ক্লিক করে বড় দেখুন' : 'Click to enlarge'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 text-sm font-bold flex items-center gap-1"
            >
              <X className="w-6 h-6" />
              <span>{lang === 'bn' ? 'বন্ধ করুন' : 'Close'}</span>
            </button>
            <img
              src={activeImage.image}
              alt={activeImage.titleEn}
              className="max-h-[75vh] w-auto rounded-3xl shadow-2xl object-contain border border-stone-800"
            />
            <p className="text-white text-base font-bold font-bangla mt-4 text-center">
              {lang === 'bn' ? activeImage.titleBn : activeImage.titleEn}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
