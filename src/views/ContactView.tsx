import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { lang, showToast } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(lang === 'bn' ? 'সাধারণ তীর্থযাত্রা তথ্য' : 'General Pilgrimage Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast(lang === 'bn' ? 'দয়া করে প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(
      lang === 'bn' 
        ? 'ধন্যবাদ! আপনার বার্তাটি গৃহীত হয়েছে। দ্রুতই আমাদের প্রতিনিধি যোগাযোগ করবেন।' 
        : 'Thank you! Your message has been received. Our representative will contact you soon.',
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'যোগাযোগ ও হেল্পডেস্ক', labelEn: 'Contact & Support' }
        ]}
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? 'যোগাযোগ ও সার্বক্ষণিক সহায়তা' : 'Contact & Support Desk'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-bangla">
          {lang === 'bn'
            ? 'যেকোনো তীর্থযাত্রা তথ্য, কাস্টম পারিবারিক গ্রুপ ট্যুর কিংবা আসন বুকিং সংক্রান্ত সহায়তায় আমরা প্রস্তুত।'
            : 'Get in touch for pilgrimage inquiries, custom family tours, or booking support.'}
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Address */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-900 font-bangla">
            {lang === 'bn' ? 'প্রধান কার্যালয়' : 'Head Office'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-bangla">
            {lang === 'bn' ? OFFICIAL_CONTACT.addressBn : OFFICIAL_CONTACT.addressEn}
          </p>
          <span className="text-[11px] text-amber-800 font-semibold block">
            {lang === 'bn' ? 'কমলাপুর বা সায়েদাবাদ থেকে মাত্র ৫ মিনিট' : '5 mins from Kamalapur / Sayedabad'}
          </span>
        </div>

        {/* Hotlines */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-900 font-bangla">
            {lang === 'bn' ? 'হটলাইন ও হোয়াটসঅ্যাপ' : 'Hotlines & WhatsApp'}
          </h3>
          <div className="space-y-1 text-xs font-mono font-bold text-stone-800">
            {OFFICIAL_CONTACT.phones.map((p) => (
              <a 
                key={p} 
                href={`tel:${p}`} 
                className="block hover:text-amber-800 transition-colors"
              >
                {p}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 font-bangla">
            {lang === 'bn' ? OFFICIAL_CONTACT.supportHoursBn : OFFICIAL_CONTACT.supportHoursEn}
          </p>
        </div>

        {/* Email */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-stone-900 font-bangla">
            {lang === 'bn' ? 'অফিসিয়াল ইমেইল' : 'Official Email'}
          </h3>
          <a
            href={`mailto:${OFFICIAL_CONTACT.email}`}
            className="text-xs font-semibold text-amber-900 hover:underline block break-all"
          >
            {OFFICIAL_CONTACT.email}
          </a>
          <p className="text-[11px] text-stone-500 leading-relaxed font-bangla">
            {lang === 'bn'
              ? 'গ্রুপ বুকিং বা কর্পোরেট ভ্রমণের বিস্তারিত বিবরণ ইমেইলে পাঠাতে পারেন।'
              : 'Feel free to send group requirements and inquiries via email.'}
          </p>
        </div>

      </div>

      {/* Inquiry Form & Direct Direction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? 'বার্তা পাঠান বা কাস্টম ট্যুর রিকোয়েস্ট করুন' : 'Send Message or Request Custom Tour'}
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-emerald-950 font-bangla">
                {lang === 'bn' ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h4>
              <p className="text-xs text-emerald-800 font-bangla">
                {lang === 'bn'
                  ? 'আমাদের সাপোর্ট টিম অতি দ্রুত আপনার প্রদত্ত মোবাইল নম্বরে যোগাযোগ করবে।'
                  : 'Our support desk will call you shortly.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
              >
                {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'bn' ? 'নাম লিখুন' : 'Full name'}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'বিষয় / উদ্দেশ্য' : 'Subject'}
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option>{lang === 'bn' ? 'সাধারণ তীর্থযাত্রা তথ্য' : 'General Pilgrimage Info'}</option>
                    <option>{lang === 'bn' ? 'পারিবারিক / কাস্টম গ্রুপ ট্যুর' : 'Custom Group Tour'}</option>
                    <option>{lang === 'bn' ? 'পেমেন্ট ও ভেরিফিকেশন সহায়তা' : 'Payment Verification Support'}</option>
                    <option>{lang === 'bn' ? 'প্রবীণ যাত্রীদের বিশেষ সেবা' : 'Elderly Pilgrim Special Care'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                  {lang === 'bn' ? 'আপনার বার্তা বা চাহিদা বিস্তারিত লিখুন *' : 'Your Detailed Message *'}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'bn' ? 'কতজন যাত্রী, পছন্দের তারিখ বা অন্য যেকোনো তথ্য...' : 'Number of travelers, preferred date, requirements...'}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Submit Inquiry'}</span>
              </button>
            </form>
          )}

        </div>

        {/* Office Direction Guide Card */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              {lang === 'bn' ? 'যাতায়াত ও অবস্থান নির্দেশিকা' : 'Office Direction Guide'}
            </span>
            <h3 className="text-lg font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'অফিসে সরাসরি আসার সহজ উপায়' : 'How to Reach Head Office'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-bangla">
              {lang === 'bn'
                ? 'আমাদের অফিস ঢাকা মানিকনগর বিশ্বরোডের কাজিরবাগে অবস্থিত। গুলিস্তান, মতিঝিল, যাত্রাবাড়ী কিংবা সায়েদাবাদ থেকে সরাসরি বাস বা সিএনজিতে মানিকনগর বিশ্বরোড মোড়ে নেমে মাত্র ২ মিনিট হেঁটে ৩৯ নং ভবনে পৌঁছানো যায়।'
                : 'Located at Kazirbagh, Maniknagar Bishwaroad, Dhaka. Just 2 minutes walking distance from Maniknagar bus stand.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'সরাসরি অফিসে এসে বুকিংয়ের সুবিধা' : 'In-Person Booking Service'}</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-bangla">
              {lang === 'bn'
                ? 'আপনি চাইলে সরাসরি আমাদের প্রধান কার্যালয়ে এসে এক কাপ চা সহযোগে পরিচালকদের সাথে কথা বলে বাসের আসন পছন্দ করে বুকিং সম্পন্ন করতে পারেন।'
                : 'You are warmly welcomed to visit our office, meet our directors, and confirm your pilgrimage seats in person.'}
            </p>
          </div>

          <div className="bg-emerald-600 text-white p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold block">{lang === 'bn' ? 'হোয়াটসঅ্যাপে তাৎক্ষণিক চ্যাট' : 'WhatsApp Support'}</span>
              <span className="text-sm font-mono font-bold">+8801960407018</span>
            </div>
            <a
              href="https://wa.me/8801960407018"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white text-emerald-800 font-bold rounded-xl text-xs shadow hover:bg-emerald-50 transition-colors"
            >
              {lang === 'bn' ? 'চ্যাট করুন' : 'Chat Now'}
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
