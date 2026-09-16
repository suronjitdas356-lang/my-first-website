import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Phone, Mail, Award, Sparkles, UserCheck } from 'lucide-react';

export const TeamView: React.FC = () => {
  const { lang, team } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { labelBn: 'টিম পরিচিতি', labelEn: 'Our Team' }
        ]}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{lang === 'bn' ? 'আমাদের চালিকাশক্তি' : 'Founding Leadership'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-bangla">
          {lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা টিম' : 'Founding Leadership & Pilgrimage Team'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-bangla leading-relaxed">
          {lang === 'bn'
            ? 'সনাতন ভক্তবৃন্দের জন্য একদল নিবেদিতপ্রাণ ও অভিজ্ঞ সেবকের সমন্বয়ে গঠিত তীর্থবন্ধু পরিবার। তীর্থযাত্রীদের নিরাপত্তা, সেবা ও আধ্যাত্মিক সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার।'
            : 'A dedicated team of experienced coordinators committed to the safety, devotion, and sacred satisfaction of every pilgrim.'}
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-4 text-center">
              {/* Photo Avatar Placeholder per prompt specs */}
              <div className="relative mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-700 to-amber-900 text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-amber-300 group-hover:scale-105 transition-transform">
                <span>{member.nameEn.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900 font-bangla">
                  {lang === 'bn' ? member.nameBn : member.nameEn}
                </h3>
                <p className="text-xs font-semibold text-amber-800 font-bangla mt-0.5">
                  {lang === 'bn' ? member.designationBn : member.designationEn}
                </p>
              </div>

              <p className="text-xs text-stone-500 font-bangla leading-relaxed line-clamp-3">
                {lang === 'bn' ? member.bioBn : member.bioEn}
              </p>
            </div>

            {/* Direct Official Contact Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-center gap-3 text-xs text-stone-600">
              <a
                href={`tel:${member.phone}`}
                className="p-2 rounded-xl bg-stone-50 hover:bg-amber-100 text-stone-700 hover:text-amber-900 transition-colors"
                title={member.phone}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="p-2 rounded-xl bg-stone-50 hover:bg-amber-100 text-stone-700 hover:text-amber-900 transition-colors"
                title={member.email}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
