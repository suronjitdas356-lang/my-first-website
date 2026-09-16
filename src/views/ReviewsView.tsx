import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatBnDate } from '../utils/bilingual';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Star, MessageSquare, CheckCircle2, Send, Heart } from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { lang, reviews, addReview, tours, showToast } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [tourId, setTourId] = useState(tours[0]?.id || '');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const approvedReviews = reviews.filter(r => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !comment.trim()) {
      showToast(lang === 'bn' ? 'দয়া করে নাম ও আপনার অভিজ্ঞতা লিখুন।' : 'Please enter your name and comment.', 'error');
      return;
    }

    const selectedTour = tours.find(t => t.id === tourId);

    addReview({
      id: `rev-${Date.now()}`,
      customerName,
      rating,
      tourId,
      tourTitleBn: selectedTour ? selectedTour.titleBn : 'তীর্থযাত্রা ভ্রমণ',
      tourTitleEn: selectedTour ? selectedTour.titleEn : 'Pilgrimage Tour',
      commentBn: comment,
      commentEn: comment,
      createdAt: new Date().toISOString().split('T')[0],
      approved: false // awaits admin review
    });

    setSubmitted(true);
    showToast(
      lang === 'bn' 
        ? 'আপনার মহামূল্যবান মতামতের জন্য ধন্যবাদ! পর্যালোচনার পর এটি প্রকাশিত হবে।' 
        : 'Thank you for your feedback! It will be published after review.',
      'success'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'গ্রাহকদের মতামত ও রিভিউ', labelEn: 'Reviews & Testimonials' }
        ]}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? 'ভক্ত ও তীর্থযাত্রীদের বাস্তব অভিজ্ঞতা' : 'Pilgrim Voices & Testimonials'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-bangla">
          {lang === 'bn'
            ? 'আমাদের সাথে ভ্রমণকারী পুণ্যার্থীদের আন্তরিক অনুভূতি ও মূল্যবান পরামর্শ।'
            : 'Authentic reflections and pilgrimage reviews shared by our respected travelers.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Approved Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {approvedReviews.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-400">
                  {formatBnDate(rev.createdAt, lang)}
                </span>
              </div>

              <p className="text-sm text-stone-700 font-bangla italic leading-relaxed">
                “{lang === 'bn' ? rev.commentBn : rev.commentEn}”
              </p>

              <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                <span className="font-bold text-stone-900">{rev.customerName}</span>
                <span className="text-amber-800 font-medium">
                  {lang === 'bn' ? rev.tourTitleBn : rev.tourTitleEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Submit Review Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4 sticky top-28">
          <h3 className="text-base font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? 'আপনার অভিজ্ঞতা শেয়ার করুন' : 'Write a Review'}
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-emerald-950 font-bangla">
                {lang === 'bn' ? 'রিভিউ সাবমিট হয়েছে!' : 'Review Submitted!'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-700 underline font-semibold"
              >
                {lang === 'bn' ? 'আরেকটি রিভিউ দিন' : 'Submit another'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'কোন ট্যুরে গিয়েছিলেন?' : 'Select Tour'}
                </label>
                <select
                  value={tourId}
                  onChange={(e) => setTourId(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {tours.map(t => (
                    <option key={t.id} value={t.id}>
                      {lang === 'bn' ? t.titleBn : t.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'আপনার রেটিং' : 'Rating'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'আপনার মতামত ও অভিজ্ঞতা *' : 'Your Review *'}
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={lang === 'bn' ? 'খাবার, গাইড ও সামগ্রিক ব্যবস্থাপনা কেমন ছিল?' : 'How was the guide, food and coordination?'}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'রিভিউ সাবমিট করুন' : 'Submit Review'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
