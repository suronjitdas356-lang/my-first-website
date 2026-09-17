import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TourComparisonModal } from './components/TourComparisonModal';
import { CookieBanner } from './components/CookieBanner';

// Views
import { HomeView } from './views/HomeView';
import { ToursView } from './views/ToursView';
import { TourDetailView } from './views/TourDetailView';
import { BookingView } from './views/BookingView';
import { ScheduleView } from './views/ScheduleView';
import { AboutView } from './views/AboutView';
import { TeamView } from './views/TeamView';
import { ContactView } from './views/ContactView';
import { AccountView } from './views/AccountView';
import { AdminView } from './views/AdminView';
import { ReviewsView } from './views/ReviewsView';
import { GalleryView } from './views/GalleryView';
import { FaqView } from './views/FaqView';
import { PolicyView } from './views/PolicyView';
import { AdminLoginView } from './views/admin/AdminLoginView';

import { Phone, MessageCircle, Scale, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { toBnNum } from './utils/bilingual';

const MainAppContent: React.FC = () => {
  const { currentView, compareList, lang, isAdminAuthenticated } = useApp();

  // If in admin mode, show dedicated admin interface without customer chrome
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-stone-100 font-sans selection:bg-amber-500 selection:text-white">
        {isAdminAuthenticated ? <AdminView /> : <AdminLoginView />}
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'tours' && <ToursView />}
        {currentView === 'pilgrimage' && <ToursView initialCategory="pilgrimage" />}
        {currentView === 'domestic' && <ToursView initialCategory="domestic" />}
        {currentView === 'international' && <ToursView initialCategory="international" />}
        {currentView === 'tour-detail' && <TourDetailView />}
        {currentView === 'booking' && <BookingView />}
        {currentView === 'schedule' && <ScheduleView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'team' && <TeamView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'reviews' && <ReviewsView />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'faq' && <FaqView />}
        {currentView === 'policy' && <PolicyView />}
      </main>

      {/* Floating Action Buttons: WhatsApp & Phone Quick Dial */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 print:hidden">
        {/* Compare Floating Button */}
        {compareList.length > 0 && (
          <button
            onClick={() => {}}
            className="w-12 h-12 rounded-full bg-amber-800 text-white shadow-xl flex items-center justify-center relative hover:scale-105 transition-transform"
            title={lang === 'bn' ? 'তুলনা দেখুন' : 'Compare Packages'}
          >
            <Scale className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-stone-950 font-bold text-xs rounded-full flex items-center justify-center">
              {lang === 'bn' ? toBnNum(compareList.length) : compareList.length}
            </span>
          </button>
        )}

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/8801960407018"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:scale-110 hover:bg-emerald-700 transition-all duration-200"
          title={lang === 'bn' ? 'হোয়াটসঅ্যাপে চ্যাট করুন (+8801960407018)' : 'Chat on WhatsApp (+8801960407018)'}
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Call Hotline */}
        <a
          href="tel:+8801960407018"
          className="w-12 h-12 rounded-full bg-amber-700 text-white shadow-xl flex items-center justify-center hover:scale-110 hover:bg-amber-800 transition-all duration-200"
          title={lang === 'bn' ? 'সরাসরি কল করুন (+8801960407018)' : 'Call Hotline (+8801960407018)'}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Tour Comparison Modal */}
      <TourComparisonModal />

      {/* Cookie Consent Banner */}
      <CookieBanner />

      {/* Global Toast Notification */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const ToastContainer: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-top-4 duration-200">
      <div className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
        toast.type === 'success'
          ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/50'
          : toast.type === 'error'
          ? 'bg-rose-950/90 text-rose-100 border-rose-500/50'
          : 'bg-stone-900/90 text-stone-100 border-amber-500/50'
      }`}>
        {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
        {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}

        <div className="text-xs font-bangla flex-1">
          {toast.message}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
