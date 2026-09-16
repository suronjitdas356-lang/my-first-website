import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, FileText, AlertCircle, RotateCcw } from 'lucide-react';

export const PolicyView: React.FC = () => {
  const { lang } = useApp();
  const [activePolicy, setActivePolicy] = useState<'terms' | 'privacy' | 'refund'>('terms');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'পলিসি ও শর্তাবলী', labelEn: 'Policies & Terms' }
        ]}
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActivePolicy('terms')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activePolicy === 'terms' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          {lang === 'bn' ? 'নিয়ম ও শর্তাবলী (Terms)' : 'Terms & Conditions'}
        </button>

        <button
          onClick={() => setActivePolicy('refund')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activePolicy === 'refund' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          {lang === 'bn' ? 'রিফান্ড ও বাতিল নীতি (Refund)' : 'Cancellation & Refund'}
        </button>

        <button
          onClick={() => setActivePolicy('privacy')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            activePolicy === 'privacy' ? 'bg-amber-700 text-white shadow' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          {lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy)' : 'Privacy Policy'}
        </button>
      </div>

      {/* TERMS & CONDITIONS */}
      {activePolicy === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 font-bangla">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <FileText className="w-6 h-6 text-amber-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'bn' ? 'সাধারণ নিয়ম ও তীর্থযাত্রা আচরণবিধি' : 'Terms & Conditions of Pilgrimage'}
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              {lang === 'bn'
                ? '১. তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলসের মাধ্যমে যেকোনো ট্যুর প্যাকেজ বুকিং করার পূর্বে এই সকল নিয়ম মনোযোগ সহকারে পাঠ করার অনুরোধ জানানো হচ্ছে। বুকিং কনফার্মেশনের অর্থ আপনি এই সকল বিধানে সম্মতি প্রকাশ করেছেন।'
                : '1. By completing a tour booking with Tirthobondhu Tour & Travels, the traveler acknowledges and accepts these official operational terms.'}
            </p>
            <p>
              {lang === 'bn'
                ? '২. পবিত্র তীর্থযাত্রায় সার্বক্ষণিক ধর্মীয় ভাবগাম্ভীর্য, পরিষ্কার-পরিচ্ছন্নতা ও পারস্পরিক সৌহার্দ্য বজায় রাখা আবশ্যক। বাসে বা আবাসিক হোটেলে কোনো প্রকার ধূমপান বা মাদকদ্রব্য গ্রহণ কঠোরভাবে নিষিদ্ধ।'
                : '2. All pilgrims are requested to maintain spiritual decorum and temple hygiene. Smoking or alcohol consumption is strictly forbidden on coaches and hotels.'}
            </p>
            <p>
              {lang === 'bn'
                ? '৩. প্রতিটি তীর্থযাত্রীকে নির্ধারিত ছাড়ার সময়ের অন্তত ৩০ মিনিট পূর্বে পিকআপ পয়েন্টে উপস্থিত থাকতে হবে। সময়ানুবর্তিতা নিশ্চিত করা সকল যাত্রীর যৌথ দায়িত্ব।'
                : '3. Travelers must arrive at the designated pickup point 30 minutes prior to departure.'}
            </p>
            <p>
              {lang === 'bn'
                ? '৪. প্রাকৃতিক দুর্যোগ, রাস্তা অবরোধ বা যেকোনো অপ্রত্যাশিত জাতীয় পরিস্থিতির কারণে রুট বা সময়সূচিতে সামান্য পরিবর্তন হতে পারে, যেখানে যাত্রী সুরক্ষাকেই সর্বোচ্চ অগ্রাধিকার দেওয়া হবে।'
                : '4. In cases of natural calamity or route blockades, tour schedules may be adjusted prioritizing traveler safety.'}
            </p>
          </div>
        </div>
      )}

      {/* REFUND & CANCELLATION */}
      {activePolicy === 'refund' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 font-bangla">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <RotateCcw className="w-6 h-6 text-amber-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'bn' ? 'বুকিং বাতিল ও অর্থ ফেরত (রিফান্ড) পলিসি' : 'Cancellation & Refund Policy'}
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              {lang === 'bn'
                ? 'যাত্রার সুবিধার্থে হোটেল ও বাস আগাম রিজার্ভেশন করতে হয় বিধায় বাতিলকরণ সংক্রান্ত নিচের নিয়মাবলী প্রযোজ্য:'
                : 'Because coach transport and sanctified accommodation are booked in advance, the following policies apply:'}
            </p>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex justify-between font-bold text-stone-900 border-b border-stone-200 pb-1">
                <span>{lang === 'bn' ? 'বাতিলের সময়সীমা' : 'Cancellation Notice'}</span>
                <span>{lang === 'bn' ? 'ফেরতযোগ্য পরিমাণ' : 'Refundable Amount'}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span>{lang === 'bn' ? 'যাত্রার ৭ দিন পূর্বে' : '7+ days before journey'}</span>
                <span className="font-bold text-emerald-700">{lang === 'bn' ? '৮০% অর্থ ফেরত' : '80% Refund'}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span>{lang === 'bn' ? 'যাত্রার ৩ থেকে ৬ দিন পূর্বে' : '3 to 6 days before journey'}</span>
                <span className="font-bold text-amber-700">{lang === 'bn' ? '৫০% অর্থ ফেরত' : '50% Refund'}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-700">
                <span>{lang === 'bn' ? 'যাত্রার ৪৮ ঘণ্টার কম সময়ে' : 'Within 48 hours'}</span>
                <span className="font-bold text-rose-700">{lang === 'bn' ? 'নগদ ফেরত নেই (ভবিষ্যৎ ট্যুরে সমন্বয়যোগ্য)' : 'Non-refundable (Credit adjustment)'}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500">
              {lang === 'bn'
                ? 'অনুমোদিত রিফান্ডের অর্থ আবেদন গ্রহণের ৭ কার্যদিবসের মধ্যে বিকাশ/নগদের মাধ্যমে সরাসরি গ্রাহকের অ্যাকাউন্টে ফেরত প্রদান করা হয়।'
                : 'Approved refunds are disbursed to the customer’s original bKash/Nagad wallet within 7 working days.'}
            </p>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY */}
      {activePolicy === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 font-bangla">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <ShieldCheck className="w-6 h-6 text-amber-700" />
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'bn' ? 'গ্রাহক তথ্য ও গোপনীয়তা নীতি' : 'Pilgrim Data Privacy Policy'}
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>
              {lang === 'bn'
                ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস আপনার ব্যক্তিগত গোপনীয়তাকে সর্বোচ্চ শ্রদ্ধা করে। আমরা আপনার নাম, ফোন নম্বর, জাতীয় পরিচয়পত্র এবং বুকিং রেকর্ড অত্যন্ত নিরাপদভাবে সংরক্ষণ করি।'
                : 'Tirthobondhu Tour & Travels is firmly dedicated to safeguarding your personal data and privacy.'}
            </p>
            <p>
              {lang === 'bn'
                ? 'আমরা কখনোই কোনো তৃতীয় পক্ষের বাণিজ্যিক উদ্দেশ্যে বা বিজ্ঞাপনের জন্য গ্রাহকদের তথ্য বিনিময় বা বিক্রি করি না। আপনার তথ্য শুধুমাত্র ভ্রমণ সমন্বয়, টিকিট প্রদান ও জরুরি যোগাযোগের প্রয়োজনেই ব্যবহৃত হয়।'
                : 'We never sell or distribute passenger data to external marketing vendors. Information is utilized exclusively for travel pass issuance, food management, and emergency contact.'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
