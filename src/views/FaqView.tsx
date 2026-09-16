import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';

interface FAQItem {
  id: string;
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
  category: string;
}

export const FaqView: React.FC = () => {
  const { lang, setCurrentView } = useApp();
  const [openId, setOpenId] = useState<string>('faq1');

  const faqs: FAQItem[] = [
    {
      id: 'faq1',
      category: 'booking',
      questionBn: 'কীভাবে তীর্থবন্ধু ওয়েবসাইটে অনলাইন বুকিং সম্পন্ন করব?',
      questionEn: 'How do I complete online tour booking on Tirthobondhu?',
      answerBn: 'খুবই সহজ: হোমপেজ বা ট্যুরস তালিকা থেকে আপনার পছন্দের প্যাকেজ বেছে নিন → ‘বুক করুন’ বাটনে ক্লিক করে যাত্রার তারিখ ও বাসের পিকআপ পয়েন্ট সিলেক্ট করুন → যাত্রীর নাম, মোবাইল ও বাসের সিট নম্বর নির্বাচন করুন → এরপর অফিশিয়াল বিকাশ বা নগদ নম্বরে Send Money করে Transaction ID সাবমিট করলেই আপনার ডিজিটাল ট্রাভেল পাস তৈরি হয়ে যাবে।',
      answerEn: 'Select your preferred tour package → Choose travel date & pickup point → Provide traveler details and pick your bus seats on the interactive plan → Send Money to our official bKash/Nagad number and submit your TrxID. Your verifiable Digital Travel Pass is generated immediately.'
    },
    {
      id: 'faq2',
      category: 'food',
      questionBn: 'যাত্রার সময় খাবারের মান ও পবিত্রতা কেমন থাকে?',
      questionEn: 'What are the food quality and purity standards during pilgrimage?',
      answerBn: 'আমাদের প্রতিটি তীর্থযাত্রায় শতভাগ খাঁটি নিরামিষ ও সাত্ত্বিক আহার সরবরাহ করা হয়। পেঁয়াজ-রসুন সম্পূর্ণ বর্জিত এবং স্থানীয় প্রতিষ্ঠিত মন্দির বা বিশ্বস্ত ক্যাটারিং দ্বারা পরম শ্রদ্ধায় প্রস্তুতকৃত ভোগ/প্রসাদ পরিবেশন করা হয়।',
      answerEn: 'All pilgrimage tours strictly feature 100% pure vegetarian and Sattvic meals (free from onion and garlic). Freshly prepared hygienic Prasad sourced from sanctified temple kitchens.'
    },
    {
      id: 'faq3',
      category: 'elderly',
      questionBn: 'প্রবীণ বা বয়োজ্যেষ্ঠ পুণ্যার্থীদের জন্য কী ধরনের বিশেষ ব্যবস্থা রয়েছে?',
      questionEn: 'What special arrangements exist for elderly pilgrims?',
      answerBn: 'বয়োজ্যেষ্ঠ তীর্থযাত্রীদের জন্য বাসের সামনের সারির আসন (সারি A ও B) অগ্রাধিকার ভিত্তিতে বরাদ্দ করা হয়। চন্দ্রনাথ বা দুর্গম পাহাড়ি মন্দিরে ওঠার ক্ষেত্রে সহযোগী/ডুলির ব্যবস্থা এবং সার্বক্ষণিক মানবিক সেবা প্রদানে আমাদের অভিজ্ঞ গাইডরা পাশে থাকেন।',
      answerEn: 'Front coach rows (Rows A & B) are reserved on priority for elderly travelers. For steep climbs like Chandranath, trek guides and palanquin/doli arrangements are provided with loving care.'
    },
    {
      id: 'faq4',
      category: 'payment',
      questionBn: 'বিকাশ বা নগদ পাঠানোর পর কীভাবে নিশ্চিত হব আমার আসন বুক হয়েছে?',
      questionEn: 'How will I know my seat is confirmed after sending bKash/Nagad payment?',
      answerBn: 'টাকা পাঠানোর পর আপনি ওয়েবসাইটে TrxID সাবমিট করলেই স্ক্রিনে আপনার ইউনিক বুকিং আইডি (যেমন: TBTT-2026-00001) সহ ডিজিটাল ট্রাভেল পাস দেখতে পাবেন। আমাদের অ্যাকাউন্টস টিম TrxID মিলিয়ে ভেরিফাই করবে এবং আপনার মোবাইলে নিশ্চিতকরণ এসএমএস/কল যাবে।',
      answerEn: 'Upon entering your TrxID on the booking form, you instantly receive your unique Booking ID (e.g., TBTT-2026-00001) and digital pass. Our team reconciles the transaction and confirms via SMS/phone call.'
    },
    {
      id: 'faq5',
      category: 'cancellation',
      questionBn: 'কোনো কারণে যাত্রা বাতিল করতে চাইলে রিফান্ড পলিসি কী?',
      questionEn: 'What is the cancellation and refund policy if travel plans change?',
      answerBn: 'যাত্রার ৭ দিন পূর্বে জানালে মোট মূল্যের ৮০% রিফান্ড করা হয়। ৩ থেকে ৬ দিন পূর্বে জানালে ৫০% রিফান্ড যোগ্য। যাত্রার ৪৮ ঘণ্টার মধ্যে বাতিল করলে কোনো নগদ রিফান্ড প্রযোজ্য নয়, তবে বিশেষ বিবেচনায় পরবর্তী যেকোনো ট্যুরে আসন অ্যাডজাস্ট করার সুযোগ থাকে।',
      answerEn: 'Cancellations 7+ days prior receive an 80% refund. 3-6 days prior receive 50%. Cancellations within 48 hours are non-refundable, though credit adjustment for a future tour may be accommodated.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'সাধারণ জিজ্ঞাসা (FAQ)', labelEn: 'FAQ' }
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা ও উত্তর' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-bangla">
          {lang === 'bn'
            ? 'তীর্থযাত্রা বুকিং, পরিবহন, আহার ও অন্যান্য প্রয়োজনীয় তথ্যাবলী।'
            : 'Answers to your common queries regarding pilgrimage booking, food, and safety.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : faq.id)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-stone-50 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-stone-900 font-bangla flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>{lang === 'bn' ? faq.questionBn : faq.questionEn}</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-amber-700 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed font-bangla animate-in fade-in duration-200">
                  {lang === 'bn' ? faq.answerBn : faq.answerEn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have question CTA */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 text-center space-y-3">
        <h3 className="text-base font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? 'আপনার অন্য কোনো প্রশ্ন আছে কি?' : 'Still have more questions?'}
        </h3>
        <p className="text-xs text-stone-600 font-bangla max-w-md mx-auto">
          {lang === 'bn'
            ? 'আমাদের কাস্টমার কেয়ার প্রতিনিধির সাথে সরাসরি কথা বলতে এখনই কল করুন।'
            : 'Speak directly with our pilgrimage travel advisors.'}
        </p>
        <button
          onClick={() => setCurrentView('contact')}
          className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          <span>{lang === 'bn' ? 'আমাদের হেল্পডেস্কে যোগাযোগ করুন' : 'Contact Support Desk'}</span>
        </button>
      </div>

    </div>
  );
};
