import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  TourPackage, 
  Booking, 
  CustomerReview, 
  TeamMember, 
  SupportTicket, 
  Coupon, 
  Language 
} from '../types/index';
import { 
  INITIAL_TOURS, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS, 
  INITIAL_TEAM, 
  INITIAL_COUPONS 
} from '../data/initialData';
import { api, DashboardStats } from '../services/api';
import { CompanySettings, AdminNotification } from '../../server/db';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedTourId: string | null;
  setSelectedTourId: (id: string | null) => void;
  tours: TourPackage[];
  refreshTours: () => Promise<void>;
  addTour: (tour: Partial<TourPackage>) => Promise<void>;
  updateTour: (tour: TourPackage) => Promise<void>;
  deleteTour: (id: string) => Promise<void>;
  bookings: Booking[];
  refreshBookings: () => Promise<void>;
  addBooking: (booking: Booking) => Promise<Booking>;
  updateBooking: (updated: Booking) => Promise<void>;
  verifyPayment: (bookingId: string, verifierName: string) => Promise<void>;
  updateCheckIn: (bookingId: string, travelerId: string, checkedIn: boolean) => void;
  wishlist: string[];
  toggleWishlist: (tourId: string) => void;
  compareList: string[];
  addToCompare: (tourId: string) => void;
  removeFromCompare: (tourId: string) => void;
  clearCompare: () => void;
  team: TeamMember[];
  updateTeamMember: (member: TeamMember) => void;
  reviews: CustomerReview[];
  addReview: (review: { customerName: string; tourTitleBn: string; tourTitleEn: string; rating: number; commentBn: string; commentEn: string; travelDate: string }) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  tickets: SupportTicket[];
  addTicketMessage: (ticketId: string, message: { sender: 'customer' | 'admin'; senderName: string; text: string }) => void;
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt'>) => void;
  coupons: Coupon[];
  activeUser: { name: string; phone: string; email: string; address: string };
  setActiveUser: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string; address: string }>>;
  
  // Admin & Security
  isAdminAuthenticated: boolean;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  adminUser: AdminUser | null;
  adminToken: string | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  adminActiveTab: string;
  setAdminActiveTab: (tab: string) => void;
  adminRole: string;
  setAdminRole: (role: string) => void;
  adminNotifications: AdminNotification[];
  refreshAdminNotifications: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;

  // Settings
  companySettings: CompanySettings | null;
  refreshCompanySettings: () => Promise<void>;
  updateCompanySettings: (settings: Partial<CompanySettings>) => Promise<boolean>;

  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  getNextBookingId: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('tb_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  const [currentView, setCurrentViewState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/')) {
        return 'admin';
      }
      const hash = window.location.hash.replace('#', '');
      if (hash) return hash;
    }
    return 'home';
  });
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const [tours, setTours] = useState<TourPackage[]>(INITIAL_TOURS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tb_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('tb_compare');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [];
  });

  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const [activeUser, setActiveUser] = useState<{ name: string; phone: string; email: string; address: string }>(() => {
    const saved = localStorage.getItem('tb_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return { name: '', phone: '', email: '', address: '' };
  });

  // Admin authentication state
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('tb_admin_token'));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('tb_admin_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return null;
  });
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => !!localStorage.getItem('tb_admin_token'));
  const [adminRole, setAdminRole] = useState<string>('Super Admin');
  const [adminActiveTab, setAdminActiveTab] = useState<string>('dashboard');
  const [adminNotifications, setAdminNotifications] = useState<AdminNotification[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);

  const [toast, setToast] = useState<ToastState | null>(null);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('tb_lang', newLang);
  };

  const setCurrentView = (view: string) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      if (view === 'admin') {
        if (window.location.pathname !== '/admin') {
          window.history.pushState({ view: 'admin' }, '', '/admin');
        }
      } else if (view === 'home') {
        if (window.location.pathname !== '/') {
          window.history.pushState({ view: 'home' }, '', '/');
        }
      } else {
        window.history.pushState({ view }, '', `/#${view}`);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/')) {
        setCurrentViewState('admin');
      } else {
        const hash = window.location.hash.replace('#', '');
        setCurrentViewState(hash || 'home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 4000);
  };

  // Initial data loading from server
  const refreshTours = useCallback(async () => {
    try {
      const data = await api.getPublicTours();
      if (data && data.length) {
        setTours(data);
      }
    } catch (err) {
      console.warn('Could not fetch tours from server, using fallback:', err);
    }
  }, []);

  const refreshCompanySettings = useCallback(async () => {
    try {
      const s = await api.getPublicSettings();
      if (s) setCompanySettings(s);
    } catch (err) {
      console.warn('Could not fetch company settings from server:', err);
    }
  }, []);

  const refreshBookings = useCallback(async () => {
    if (!adminToken) return;
    try {
      const data = await api.getAdminBookings();
      if (data) setBookings(data);
    } catch (err) {
      console.warn('Could not fetch admin bookings:', err);
    }
  }, [adminToken]);

  const refreshAdminNotifications = useCallback(async () => {
    if (!adminToken) return;
    try {
      const data = await api.getAdminNotifications();
      if (data) setAdminNotifications(data);
    } catch (err) {
      console.warn('Could not fetch notifications:', err);
    }
  }, [adminToken]);

  // Load initial data on mount
  useEffect(() => {
    refreshTours();
    refreshCompanySettings();

    // Verify existing admin token if present
    const token = localStorage.getItem('tb_admin_token');
    if (token) {
      api.getMe()
        .then(user => {
          setAdminUser(user);
          setIsAdminMode(true);
        })
        .catch(() => {
          localStorage.removeItem('tb_admin_token');
          localStorage.removeItem('tb_admin_user');
          setAdminToken(null);
          setAdminUser(null);
          setIsAdminMode(false);
        });
    }
  }, [refreshTours, refreshCompanySettings]);

  // Load admin data when adminToken is active
  useEffect(() => {
    if (adminToken) {
      refreshBookings();
      refreshAdminNotifications();
    }
  }, [adminToken, refreshBookings, refreshAdminNotifications]);

  // Save transient user state
  useEffect(() => {
    localStorage.setItem('tb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tb_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('tb_user', JSON.stringify(activeUser));
  }, [activeUser]);

  // Admin login action
  const adminLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const result = await api.login(email, pass);
      if (result.success && result.token) {
        localStorage.setItem('tb_admin_token', result.token);
        localStorage.setItem('tb_admin_user', JSON.stringify(result.user));
        setAdminToken(result.token);
        setAdminUser(result.user);
        setIsAdminMode(true);
        setCurrentView('admin');
        showToast(
          lang === 'bn' ? `স্বাগতম ${result.user.name}!` : `Welcome ${result.user.name}!`,
          'success'
        );
        refreshBookings();
        refreshAdminNotifications();
        return true;
      }
      return false;
    } catch (err: any) {
      showToast(err.message || (lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে।' : 'Login failed.'), 'error');
      return false;
    }
  };

  // Admin logout action
  const adminLogout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('tb_admin_token');
      localStorage.removeItem('tb_admin_user');
      setAdminToken(null);
      setAdminUser(null);
      setIsAdminMode(false);
      setCurrentView('home');
      showToast(
        lang === 'bn' ? 'আপনি সফলভাবে লগআউট করেছেন।' : 'Logged out successfully.',
        'info'
      );
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.warn('Failed to mark notification read:', err);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setAdminNotifications(prev => prev.map(n => ({ ...n, read: true })));
      showToast(lang === 'bn' ? 'সকল নোটিফিকেশন পঠিত হিসেবে চিহ্নিত হয়েছে।' : 'All notifications marked as read.', 'success');
    } catch (err) {
      console.warn('Failed to mark all read:', err);
    }
  };

  const updateCompanySettings = async (settings: Partial<CompanySettings>): Promise<boolean> => {
    try {
      const res = await api.updateAdminSettings(settings);
      if (res.success) {
        setCompanySettings(res.settings);
        showToast(lang === 'bn' ? 'কোম্পানি সেটিংস সফলভাবে আপডেট হয়েছে!' : 'Company settings updated successfully!', 'success');
        return true;
      }
      return false;
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings', 'error');
      return false;
    }
  };

  const addTour = async (tourData: Partial<TourPackage>) => {
    try {
      const res = await api.createTour(tourData);
      if (res.success && res.tour) {
        setTours(prev => [res.tour, ...prev]);
        showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ সফলভাবে যুক্ত হয়েছে!' : 'Tour package added successfully!', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to add tour', 'error');
      throw err;
    }
  };

  const updateTour = async (updated: TourPackage) => {
    try {
      const res = await api.updateTour(updated.id, updated);
      if (res.success) {
        setTours(prev => prev.map(t => t.id === updated.id ? res.tour : t));
        showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ আপডেট করা হয়েছে।' : 'Tour package updated.', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update tour', 'error');
      throw err;
    }
  };

  const deleteTour = async (id: string) => {
    try {
      await api.deleteTour(id);
      setTours(prev => prev.filter(t => t.id !== id));
      showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ অপসারিত হয়েছে।' : 'Tour package removed.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete tour', 'error');
      throw err;
    }
  };

  const getNextBookingId = () => {
    const year = '2026';
    const count = bookings.length + 1;
    const padded = String(count).padStart(5, '0');
    return `TBTT-${year}-${padded}`;
  };

  const addBooking = async (booking: Booking): Promise<Booking> => {
    try {
      const res = await api.submitBooking(booking);
      if (res.success && res.booking) {
        setBookings(prev => [res.booking, ...prev]);
        refreshTours();
        showToast(
          lang === 'bn' ? `বুকিং গ্রহণ করা হয়েছে! বুকিং আইডি: ${res.booking.bookingId}` : `Booking received! ID: ${res.booking.bookingId}`,
          'success'
        );
        return res.booking;
      }
      throw new Error(res.message || 'Booking submission failed');
    } catch (err: any) {
      showToast(err.message || (lang === 'bn' ? 'বুকিং সম্পন্ন করা সম্ভব হয়নি।' : 'Could not complete booking.'), 'error');
      throw err;
    }
  };

  const updateBooking = async (updated: Booking) => {
    try {
      await api.updateBookingStatus(updated.bookingId, {
        bookingStatus: updated.bookingStatus,
        paymentStatus: updated.paymentStatus,
        paidAmount: (updated as any).paidAmount || 0,
        notes: updated.notes
      });
      setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
    } catch (err: any) {
      showToast(err.message || 'Failed to update booking', 'error');
    }
  };

  const verifyPayment = async (bookingId: string, verifierName: string) => {
    try {
      await api.updateBookingStatus(bookingId, {
        bookingStatus: 'Confirmed',
        paymentStatus: 'Verified',
        notes: `Verified by ${verifierName}`
      });
      refreshBookings();
      showToast(
        lang === 'bn' ? `বুকিং ${bookingId} এর পেমেন্ট ভেরিফাই ও বুকিং কনফার্ম করা হয়েছে!` : `Booking ${bookingId} verified & confirmed!`,
        'success'
      );
    } catch (err: any) {
      showToast(err.message || 'Failed to verify payment', 'error');
    }
  };

  const updateCheckIn = (bookingId: string, travelerId: string, checkedIn: boolean) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          travelers: b.travelers.map(tr => {
            if (tr.id === travelerId) {
              return {
                ...tr,
                checkedIn,
                checkInTime: checkedIn ? now : undefined
              };
            }
            return tr;
          })
        };
      }
      return b;
    }));
    showToast(
      lang === 'bn' ? 'যাত্রী চেক-ইন স্ট্যাটাস হালনাগাদ হয়েছে।' : 'Passenger check-in updated.',
      'info'
    );
  };

  const toggleWishlist = (tourId: string) => {
    setWishlist(prev => {
      if (prev.includes(tourId)) {
        showToast(lang === 'bn' ? 'পছন্দের তালিকা থেকে অপসারিত।' : 'Removed from wishlist.', 'info');
        return prev.filter(id => id !== tourId);
      } else {
        showToast(lang === 'bn' ? 'পছন্দের তালিকায় সংরক্ষিত হয়েছে!' : 'Saved to wishlist!', 'success');
        return [...prev, tourId];
      }
    });
  };

  const addToCompare = (tourId: string) => {
    if (compareList.includes(tourId)) return;
    if (compareList.length >= 3) {
      showToast(lang === 'bn' ? 'একসাথে সর্বোচ্চ ৩টি প্যাকেজ তুলনা করা যাবে।' : 'You can compare up to 3 packages at once.', 'error');
      return;
    }
    setCompareList(prev => [...prev, tourId]);
    showToast(lang === 'bn' ? 'তুলনার তালিকায় যুক্ত করা হয়েছে।' : 'Added to comparison list.', 'success');
  };

  const removeFromCompare = (tourId: string) => {
    setCompareList(prev => prev.filter(id => id !== tourId));
  };

  const clearCompare = () => setCompareList([]);

  const updateTeamMember = (member: TeamMember) => {
    setTeam(prev => prev.map(m => m.id === member.id ? member : m));
    showToast(lang === 'bn' ? 'টিম সদস্যের তথ্য আপডেট করা হয়েছে।' : 'Team member details updated.', 'success');
  };

  const addReview = async (reviewData: { customerName: string; tourTitleBn: string; tourTitleEn: string; rating: number; commentBn: string; commentEn: string; travelDate: string }) => {
    try {
      await api.submitReview(reviewData);
      showToast(
        lang === 'bn' 
          ? 'আপনার মতামতের জন্য ধন্যবাদ! অ্যাডমিন পর্যালোচনা শেষে এটি প্রকাশ করা হবে।' 
          : 'Thank you for your review! It will be published upon admin approval.',
        'info'
      );
    } catch {
      showToast('Could not submit review', 'error');
    }
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    showToast(lang === 'bn' ? 'রিভিউটি সফলভাবে পাবলিশ করা হয়েছে।' : 'Review published.', 'success');
  };

  const rejectReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast(lang === 'bn' ? 'রিভিউটি অপসারিত হয়েছে।' : 'Review rejected.', 'info');
  };

  const addTicketMessage = (ticketId: string, message: { sender: 'customer' | 'admin'; senderName: string; text: string }) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: message.sender === 'admin' ? 'In Progress' : t.status,
          messages: [...t.messages, { ...message, timestamp: now }]
        };
      }
      return t;
    }));
  };

  const createTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt'>) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newTkt: SupportTicket = {
      id: `tkt-${Date.now()}`,
      ...ticketData,
      createdAt: now
    };
    setTickets(prev => [newTkt, ...prev]);
    showToast(
      lang === 'bn' ? 'সাপোর্ট টিকিট সফলভাবে তৈরি হয়েছে।' : 'Support ticket created.',
      'success'
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currentView,
        setCurrentView,
        selectedTourId,
        setSelectedTourId,
        tours,
        refreshTours,
        addTour,
        updateTour,
        deleteTour,
        bookings,
        refreshBookings,
        addBooking,
        updateBooking,
        verifyPayment,
        updateCheckIn,
        wishlist,
        toggleWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        team,
        updateTeamMember,
        reviews,
        addReview,
        approveReview,
        rejectReview,
        tickets,
        addTicketMessage,
        createTicket,
        coupons,
        activeUser,
        setActiveUser,
        isAdminAuthenticated: !!adminToken && !!adminUser,
        isAdminMode,
        setIsAdminMode,
        adminUser,
        adminToken,
        adminLogin,
        adminLogout,
        adminActiveTab,
        setAdminActiveTab,
        adminRole,
        setAdminRole,
        adminNotifications,
        refreshAdminNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        companySettings,
        refreshCompanySettings,
        updateCompanySettings,
        toast,
        showToast,
        getNextBookingId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
