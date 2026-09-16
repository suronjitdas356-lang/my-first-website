import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  TourPackage, 
  Booking, 
  TeamMember, 
  CustomerReview, 
  SupportTicket, 
  Coupon 
} from '../types';
import { 
  INITIAL_TOURS, 
  FOUNDING_TEAM, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS, 
  INITIAL_TICKETS, 
  INITIAL_COUPONS 
} from '../data/initialData';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedTourId: string | null;
  setSelectedTourId: (id: string | null) => void;
  tours: TourPackage[];
  addTour: (tour: TourPackage) => void;
  updateTour: (tour: TourPackage) => void;
  deleteTour: (id: string) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (booking: Booking) => void;
  verifyPayment: (bookingId: string, verifierName: string) => void;
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
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  adminRole: string;
  setAdminRole: (role: string) => void;
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

  const [currentView, setCurrentViewState] = useState<string>('home');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);

  const [tours, setTours] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('tb_tours');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_TOURS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tb_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return INITIAL_BOOKINGS;
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tb_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return ['tb-tour-001'];
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [team, setTeam] = useState<TeamMember[]>(FOUNDING_TEAM);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const [activeUser, setActiveUser] = useState({
    name: 'দেবাশীষ মুখার্জী',
    phone: '01711223344',
    email: 'debashis.mukherjee@example.com',
    address: 'ওয়ারী, ঢাকা'
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminRole, setAdminRole] = useState<string>('Super Admin');
  const [toast, setToast] = useState<ToastState | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('tb_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('tb_tours', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('tb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const setCurrentView = (view: string) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const addTour = (tour: TourPackage) => {
    setTours(prev => [tour, ...prev]);
    showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ সফলভাবে যুক্ত হয়েছে!' : 'Tour package added successfully!', 'success');
  };

  const updateTour = (updated: TourPackage) => {
    setTours(prev => prev.map(t => t.id === updated.id ? updated : t));
    showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ আপডেট করা হয়েছে।' : 'Tour package updated.', 'success');
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
    showToast(lang === 'bn' ? 'ট্যুর প্যাকেজ অপসারিত হয়েছে।' : 'Tour package removed.', 'info');
  };

  const getNextBookingId = () => {
    const year = '2026';
    const count = bookings.length + 1;
    const padded = String(count).padStart(5, '0');
    return `TBTT-${year}-${padded}`;
  };

  const addBooking = (booking: Booking) => {
    // Check duplicate TrxID
    const duplicate = bookings.some(b => b.transactionId.trim().toUpperCase() === booking.transactionId.trim().toUpperCase());
    if (duplicate) {
      showToast(
        lang === 'bn' ? 'এই Transaction ID ইতিপূর্বে ব্যবহার করা হয়েছে!' : 'This Transaction ID has already been submitted!',
        'error'
      );
      throw new Error('Duplicate Transaction ID');
    }

    setBookings(prev => [booking, ...prev]);

    // Update booked seats count in package
    setTours(prev => prev.map(t => {
      if (t.id === booking.tourId) {
        const newBooked = Math.min(t.totalSeats, t.bookedSeats + booking.selectedSeats.length);
        const newStatus = newBooked >= t.totalSeats ? 'Full' : (newBooked >= t.totalSeats * 0.8 ? 'Almost Full' : t.status);
        return {
          ...t,
          bookedSeats: newBooked,
          status: newStatus
        };
      }
      return t;
    }));

    showToast(
      lang === 'bn' ? `বুকিং গ্রহণ করা হয়েছে! বুকিং আইডি: ${booking.bookingId}` : `Booking received! ID: ${booking.bookingId}`,
      'success'
    );
  };

  const updateBooking = (updated: Booking) => {
    setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  const verifyPayment = (bookingId: string, verifierName: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return {
          ...b,
          paymentStatus: 'Verified',
          bookingStatus: 'Confirmed',
          verifiedAt: now,
          verifiedBy: verifierName
        };
      }
      return b;
    }));
    showToast(
      lang === 'bn' ? `বুকিং ${bookingId} এর পেমেন্ট ভেরিফাই ও বুকিং কনফার্ম করা হয়েছে!` : `Booking ${bookingId} verified & confirmed!`,
      'success'
    );
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

  const addReview = (reviewData: { customerName: string; tourTitleBn: string; tourTitleEn: string; rating: number; commentBn: string; commentEn: string; travelDate: string }) => {
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      approved: false, // Per prompt rules: customer reviews require admin approval before publication!
      createdAt: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
    showToast(
      lang === 'bn' 
        ? 'আপনার মতামতের জন্য ধন্যবাদ! অ্যাডমিন পর্যালোচনা শেষে এটি প্রকাশ করা হবে।' 
        : 'Thank you for your review! It will be published upon admin approval.',
      'info'
    );
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
        addTour,
        updateTour,
        deleteTour,
        bookings,
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
        isAdminMode,
        setIsAdminMode,
        adminRole,
        setAdminRole,
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
