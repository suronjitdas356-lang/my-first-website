import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { lang } = useApp();
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isAccepted = localStorage.getItem('tb_cookie_accepted');
    if (!isAccepted) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tb_cookie_accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-stone-900/95 text-stone-200 border border-amber-900/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-white">
            {lang === 'bn' ? 'গোপনীয়তা ও কুকি সম্মতি' : 'Privacy & Cookie Consent'}
          </p>
          <p className="text-stone-400 leading-relaxed">
            {lang === 'bn'
              ? 'আমরা তীর্থবন্ধু ওয়েবসাইটে আপনার ভ্রমণ বুকিং ও অ্যাকাউন্ট সুবিধা নিশ্চিত করতে আবশ্যকীয় লোকাল কুকি ব্যবহার করি। কোনো তথ্য তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।'
              : 'We use necessary cookies and storage to maintain your booking session and user preferences securely.'}
          </p>
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              {lang === 'bn' ? 'সম্মত আছি (Accept)' : 'Accept'}
            </button>
            <button
              onClick={() => setAccepted(true)}
              className="px-2.5 py-1.5 text-stone-400 hover:text-stone-200 text-xs"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
