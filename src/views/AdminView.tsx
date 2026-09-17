import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AdminDashboardTab } from './admin/AdminDashboardTab';
import { AdminToursTab } from './admin/AdminToursTab';
import { AdminBookingsTab } from './admin/AdminBookingsTab';
import { AdminCustomersTab } from './admin/AdminCustomersTab';
import { AdminPaymentsTab } from './admin/AdminPaymentsTab';
import { AdminReportsTab } from './admin/AdminReportsTab';
import { AdminNotificationsTab } from './admin/AdminNotificationsTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';
import { formatBnDate, toBnNum } from '../utils/bilingual';
import { 
  LayoutDashboard, 
  Compass, 
  CalendarCheck, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Star, 
  Bell, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Menu, 
  X, 
  Check, 
  Trash2,
  Lock
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    lang, 
    adminUser, 
    adminLogout, 
    adminNotifications, 
    setCurrentView, 
    reviews, 
    approveReview, 
    deleteReview, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadNotificationsCount = adminNotifications.filter(n => !n.read).length;
  const pendingReviewsCount = reviews.filter(r => !r.isApproved).length;

  const navItems = [
    {
      id: 'dashboard',
      labelBn: 'ড্যাশবোর্ড',
      labelEn: 'Dashboard',
      icon: LayoutDashboard,
      badge: 0
    },
    {
      id: 'tours',
      labelBn: 'ট্যুর প্যাকেজ',
      labelEn: 'Tour Packages',
      icon: Compass,
      badge: 0
    },
    {
      id: 'bookings',
      labelBn: 'বুকিং ও টিকিট',
      labelEn: 'Bookings & Passes',
      icon: CalendarCheck,
      badge: 0
    },
    {
      id: 'customers',
      labelBn: 'গ্রাহক ডিরেক্টরি',
      labelEn: 'Customer Directory',
      icon: Users,
      badge: 0
    },
    {
      id: 'payments',
      labelBn: 'পেমেন্ট ও TrxID',
      labelEn: 'Payments & TrxID',
      icon: CreditCard,
      badge: 0
    },
    {
      id: 'reports',
      labelBn: 'রিপোর্ট ও আয়',
      labelEn: 'Reports & Revenue',
      icon: TrendingUp,
      badge: 0
    },
    {
      id: 'reviews',
      labelBn: 'রিভিউ অনুমোদন',
      labelEn: 'Reviews Moderation',
      icon: Star,
      badge: pendingReviewsCount
    },
    {
      id: 'notifications',
      labelBn: 'নোটিফিকেশন',
      labelEn: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount
    },
    {
      id: 'settings',
      labelBn: 'কোম্পানি সেটিংস',
      labelEn: 'Company Settings',
      icon: Settings,
      badge: 0
    }
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  const handleDashboardBookingSelect = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setActiveTab('bookings');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-stone-900 border-b border-stone-800 text-stone-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-stone-950 shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                <span>{lang === 'bn' ? 'তীর্থবন্ধু অ্যাডমিন পোর্টাল' : 'Tirthobondhu Admin Portal'}</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono">
                  v2.0 PRO
                </span>
              </div>
              <div className="text-[10px] text-stone-400 hidden sm:block">
                39 No. Kazirbagh, Maniknagar Bishwaroad, Dhaka
              </div>
            </div>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Website Button */}
          <button
            onClick={() => setCurrentView('home')}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'View Website'}</span>
          </button>

          {/* Admin User Profile Pill */}
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-stone-800">
            <div className="w-7 h-7 rounded-full bg-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center">
              {adminUser?.name?.substring(0, 1) || 'A'}
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-stone-200 leading-tight">
                {adminUser?.name || 'Admin'}
              </div>
              <div className="text-[10px] text-stone-400 font-mono">
                {adminUser?.role || 'SuperAdmin'}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={adminLogout}
            title={lang === 'bn' ? 'লগআউট করুন' : 'Sign Out'}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold flex items-center gap-1.5 border border-rose-800/40 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-2 sm:px-4 lg:px-6 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-3 sticky top-20 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              {lang === 'bn' ? 'ম্যানেজমেন্ট মেনু' : 'Operations Menu'}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-700 text-white shadow-sm font-bold'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                    <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-amber-900' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {lang === 'bn' ? toBnNum(item.badge) : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-stone-950/70 backdrop-blur-sm flex">
            <div className="w-64 bg-white h-full p-4 flex flex-col shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200">
                <span className="font-bold text-stone-900 text-sm">
                  {lang === 'bn' ? 'অ্যাডমিন মেনু' : 'Admin Navigation'}
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-amber-700 text-white shadow-sm font-bold'
                          : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-stone-500'}`} />
                        <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-stone-200">
                <button
                  onClick={adminLogout}
                  className="w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
          </div>
        )}

        {/* Main Tab Content View */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <AdminDashboardTab
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectBooking={handleDashboardBookingSelect}
            />
          )}

          {activeTab === 'tours' && <AdminToursTab />}

          {activeTab === 'bookings' && (
            <AdminBookingsTab initialSelectedId={selectedBookingId} />
          )}

          {activeTab === 'customers' && <AdminCustomersTab />}

          {activeTab === 'payments' && <AdminPaymentsTab />}

          {activeTab === 'reports' && <AdminReportsTab />}

          {activeTab === 'notifications' && (
            <AdminNotificationsTab
              onSelectBooking={handleDashboardBookingSelect}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
                    {lang === 'bn' ? 'যাত্রী রিভিউ ও প্রতিক্রিয়া অনুমোদন' : 'Pilgrim Reviews Moderation'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    {lang === 'bn' 
                      ? 'ওয়েবসাইটে প্রকাশের পূর্বে তীর্থযাত্রীদের মতামতের সত্যতা যাচাই ও অনুমোদন করুন।' 
                      : 'Audit and approve traveler feedback before displaying publicly.'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm divide-y divide-stone-100 overflow-hidden">
                {reviews.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 text-xs">
                    {lang === 'bn' ? 'কোনো রিভিউ পাওয়া যায়নি।' : 'No reviews recorded.'}
                  </div>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-xs">{r.name}</span>
                          <span className="text-[10px] text-stone-400">({r.location})</span>
                          <div className="flex text-amber-500">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed italic">
                          "{r.comment}"
                        </p>
                        <div className="text-[10px] text-stone-400 font-mono">
                          {r.tourName} • {r.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {r.isApproved ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {lang === 'bn' ? 'অনুমোদিত' : 'Approved'}
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              approveReview(r.id);
                              showToast(lang === 'bn' ? 'রিভিউটি সফলভাবে অনুমোদিত হয়েছে!' : 'Review approved!', 'success');
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'অনুমোদন করুন' : 'Approve'}</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (window.confirm(lang === 'bn' ? 'রিভিউটি মুছে ফেলতে চান?' : 'Delete review?')) {
                              deleteReview(r.id);
                              showToast(lang === 'bn' ? 'রিভিউ মুছে ফেলা হয়েছে।' : 'Review deleted.', 'info');
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && <AdminSettingsTab />}
        </main>
      </div>
    </div>
  );
};
