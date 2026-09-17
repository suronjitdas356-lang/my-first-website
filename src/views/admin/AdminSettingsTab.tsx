import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CompanySettings } from '../../../server/db';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Share2, 
  FileText, 
  Save, 
  Image as ImageIcon, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const { lang, companySettings, refreshCompanySettings, updateCompanySettings, showToast } = useApp();
  const [formData, setFormData] = useState<CompanySettings | null>(null);
  const [phonesStr, setPhonesStr] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    refreshCompanySettings();
  }, [refreshCompanySettings]);

  useEffect(() => {
    if (companySettings) {
      setFormData({ ...companySettings });
      setPhonesStr((companySettings.phones || []).join(', '));
    }
  }, [companySettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    const phonesList = phonesStr.split(',').map(p => p.trim()).filter(Boolean);
    const payload = {
      ...formData,
      phones: phonesList
    };

    try {
      const success = await updateCompanySettings(payload);
      if (success) {
        showToast(
          lang === 'bn' 
            ? 'কোম্পানির সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!' 
            : 'Company profile and settings saved successfully!',
          'success'
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (!formData) {
    return (
      <div className="py-16 text-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-stone-500 text-sm">{lang === 'bn' ? 'সেটিংস লোড হচ্ছে...' : 'Loading settings...'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-700" />
            <span>{lang === 'bn' ? 'কোম্পানি ও অপারেশনাল সেটিংস' : 'Company & Operational Settings'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'অফিসিয়াল নাম, হটলাইন নম্বর, ঠিকানা, বুকিং নিয়মাবলি ও বাতিলকরণ নীতিমালা।' 
              : 'Official business profile, hotlines, WhatsApp, office address, and policies.'}
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-stone-950 font-bold text-xs flex items-center gap-2 shadow transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4 text-stone-950" />
          )}
          <span>{lang === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Changes'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* 1. Brand & Identity */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? '১. ব্র্যান্ড ও পরিচয়' : '1. Brand & Identity'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'কোম্পানির নাম (বাংলা) *' : 'Company Name (Bangla) *'}
              </label>
              <input
                type="text"
                required
                value={formData.companyNameBn}
                onChange={(e) => setFormData({ ...formData, companyNameBn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'কোম্পানির নাম (English) *' : 'Company Name (English) *'}
              </label>
              <input
                type="text"
                required
                value={formData.companyNameEn}
                onChange={(e) => setFormData({ ...formData, companyNameEn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'স্লোগান (বাংলা)' : 'Slogan (Bangla)'}
              </label>
              <input
                type="text"
                value={formData.sloganBn}
                onChange={(e) => setFormData({ ...formData, sloganBn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'স্লোগান (English)' : 'Slogan (English)'}
              </label>
              <input
                type="text"
                value={formData.sloganEn}
                onChange={(e) => setFormData({ ...formData, sloganEn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'অফিসিয়াল লোগো URL (ঐচ্ছিক)' : 'Official Logo URL (Optional)'}
              </label>
              <input
                type="url"
                value={formData.logoUrl || ''}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://... / logo.png"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & Communications */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
            <Phone className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? '২. যোগাযোগ ও হটলাইন' : '2. Communications & Hotlines'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'হটলাইন নম্বরসমূহ (কমা দিয়ে পৃথক করুন) *' : 'Hotline Numbers (comma separated) *'}
              </label>
              <input
                type="text"
                required
                value={phonesStr}
                onChange={(e) => setPhonesStr(e.target.value)}
                placeholder="+8801960407018, +8801792666308, +8801732843174"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'অফিসিয়াল হোয়াটসঅ্যাপ নম্বর *' : 'Official WhatsApp Number *'}
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+8801960407018"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'অফিসিয়াল ইমেইল ঠিকানা *' : 'Official Email Address *'}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="info.tirthobondhutourtravels@gmail.com"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'সাপোর্ট সময়সীমা (বাংলা)' : 'Support Hours (Bangla)'}
              </label>
              <input
                type="text"
                value={formData.supportHoursBn}
                onChange={(e) => setFormData({ ...formData, supportHoursBn: e.target.value })}
                placeholder="৭ দিন/সপ্তাহ, সকাল ৭:০০টা – রাত ১:০০টা"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'অফিস ঠিকানা (বাংলা) *' : 'Office Address (Bangla) *'}
              </label>
              <textarea
                rows={2}
                required
                value={formData.officeAddressBn}
                onChange={(e) => setFormData({ ...formData, officeAddressBn: e.target.value })}
                placeholder="৩৯ নং কাজিরবাগ, মানিকনগর বিশ্বরোড, ঢাকা–১২০৩, বাংলাদেশ"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'অফিস ঠিকানা (English) *' : 'Office Address (English) *'}
              </label>
              <textarea
                rows={2}
                required
                value={formData.officeAddressEn}
                onChange={(e) => setFormData({ ...formData, officeAddressEn: e.target.value })}
                placeholder="39 No. Kazirbagh, Maniknagar Bishwaroad, Dhaka–1203, Bangladesh"
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 3. Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
            <Share2 className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? '৩. সোশ্যাল মিডিয়া ও লিঙ্কস' : '3. Social Media & Links'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Facebook Page</label>
              <input
                type="url"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">YouTube Channel</label>
              <input
                type="url"
                value={formData.socialLinks?.youtube || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, youtube: e.target.value } })}
                placeholder="https://youtube.com/..."
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">WhatsApp Community / Link</label>
              <input
                type="url"
                value={formData.socialLinks?.whatsapp || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, whatsapp: e.target.value } })}
                placeholder="https://wa.me/..."
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* 4. Booking Rules & Cancellation Policy */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-100">
            <FileText className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? '৪. বুকিং নিয়মাবলি ও বাতিলকরণ নীতিমালা' : '4. Booking Rules & Policies'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'বুকিং নিয়মাবলি (বাংলা)' : 'Booking Rules (Bangla)'}
              </label>
              <textarea
                rows={3}
                value={formData.bookingRulesBn}
                onChange={(e) => setFormData({ ...formData, bookingRulesBn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'বুকিং নিয়মাবলি (English)' : 'Booking Rules (English)'}
              </label>
              <textarea
                rows={3}
                value={formData.bookingRulesEn}
                onChange={(e) => setFormData({ ...formData, bookingRulesEn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'বাতিলকরণ ও রিফান্ড নীতিমালা (বাংলা)' : 'Cancellation Policy (Bangla)'}
              </label>
              <textarea
                rows={3}
                value={formData.cancellationPolicyBn}
                onChange={(e) => setFormData({ ...formData, cancellationPolicyBn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {lang === 'bn' ? 'বাতিলকরণ ও রিফান্ড নীতিমালা (English)' : 'Cancellation Policy (English)'}
              </label>
              <textarea
                rows={3}
                value={formData.cancellationPolicyEn}
                onChange={(e) => setFormData({ ...formData, cancellationPolicyEn: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4 text-stone-950" />
            )}
            <span>{lang === 'bn' ? 'সকল পরিবর্তন সংরক্ষণ করুন' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
