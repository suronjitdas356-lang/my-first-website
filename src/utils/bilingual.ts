import { Language } from '../types';

export const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBnNum(val: number | string): string {
  const str = String(val);
  return str.replace(/\d/g, (d) => bnDigits[Number(d)] ?? d);
}

export function formatPrice(amount: number, lang: Language): string {
  const formatted = amount.toLocaleString('en-US');
  if (lang === 'bn') {
    return `৳ ${toBnNum(formatted)}`;
  }
  return `BDT ${formatted}`;
}

export function formatBnDate(dateStr: string, lang: Language): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const monthsBn = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const monthsEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = d.getDate();
    const monthIdx = d.getMonth();
    const year = d.getFullYear();

    if (lang === 'bn') {
      return `${toBnNum(day)} ${monthsBn[monthIdx]} ${toBnNum(year)}`;
    }
    return `${day} ${monthsEn[monthIdx]} ${year}`;
  } catch {
    return dateStr;
  }
}

export const translations = {
  // Brand
  brandName: {
    bn: 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস',
    en: 'Tirthobondhu Tour & Travels'
  },
  slogan: {
    bn: 'আপনার তীর্থযাত্রা হোক নিরাপদ, সুন্দর ও স্মরণীয়।',
    en: 'May your pilgrimage be safe, beautiful, and memorable.'
  },
  foundedText: {
    bn: 'প্রতিষ্ঠিত: সেপ্টেম্বর ২০২৬',
    en: 'Founded: September 2026'
  },
  businessType: {
    bn: 'তীর্থযাত্রা ও ধর্মীয় ভ্রমণ সেবা | পূর্ণাঙ্গ ট্যুর অ্যান্ড ট্রাভেলস',
    en: 'Pilgrimage & Religious Travel Service | Full-Service Tour & Travels'
  },
  supportHours: {
    bn: 'সপ্তাহে ৭ দিন | সকাল ৭:০০টা – রাত ১:০০টা',
    en: '7 Days a Week | 7:00 AM – 1:00 AM'
  },
  address: {
    bn: '৩৯ নং কাজিরবাগ, মানিকনগর বিশ্বরোড, ঢাকা–১২০৩, বাংলাদেশ',
    en: '39 No. Kazirbagh, Maniknagar Bishwaroad, Dhaka–1203, Bangladesh'
  },

  // Navigation
  nav: {
    home: { bn: 'হোম', en: 'Home' },
    aboutUs: { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
    tours: { bn: 'ট্যুর প্যাকেজ', en: 'Tour Packages' },
    pilgrimage: { bn: 'তীর্থযাত্রা', en: 'Pilgrimage' },
    domestic: { bn: 'অভ্যন্তরীণ ভ্রমণ', en: 'Domestic' },
    international: { bn: 'আন্তর্জাতিক ভ্রমণ', en: 'International' },
    schedule: { bn: 'ভ্রমণ সূচি', en: 'Schedule' },
    offers: { bn: 'বিশেষ অফার', en: 'Offers' },
    travelGuide: { bn: 'ভ্রমণ নির্দেশিকা', en: 'Travel Guide' },
    gallery: { bn: 'ফটো গ্যালারি', en: 'Gallery' },
    ourTeam: { bn: 'আমাদের টিম', en: 'Our Team' },
    contact: { bn: 'যোগাযোগ', en: 'Contact' },
    myAccount: { bn: 'আমার অ্যাকাউন্ট', en: 'My Account' },
    bookNow: { bn: 'এখনই বুক করুন', en: 'Book Now' },
    search: { bn: 'প্যাকেজ খুঁজুন', en: 'Search Packages' },
    wishlist: { bn: 'পছন্দের তালিকা', en: 'Wishlist' },
    compare: { bn: 'তুলনা করুন', en: 'Compare' },
    adminPortal: { bn: 'অ্যাডমিন পোর্টাল', en: 'Admin Portal' },
    customTour: { bn: 'কাস্টম ট্যুর অনুরোধ', en: 'Custom Tour' },
    corporate: { bn: 'প্রাতিষ্ঠানিক বুকিং', en: 'Corporate Booking' },
    destinations: { bn: 'তীর্থস্থান পরিচিতি', en: 'Pilgrimage Sites' },
    accommodation: { bn: 'হোটেল ও থাকার ব্যবস্থা', en: 'Hotels & Stay' },
    transport: { bn: 'পরিবহন সেবা', en: 'Transport Services' },
    faq: { bn: 'সাধারণ জিজ্ঞাসা', en: 'FAQ' },
    reviews: { bn: 'গ্রাহক মতামত', en: 'Customer Reviews' },
    terms: { bn: 'নিয়ম ও শর্তাবলী', en: 'Terms & Conditions' },
    privacy: { bn: 'গোপনীয়তা নীতি', en: 'Privacy Policy' },
    cancellation: { bn: 'বাতিল ও রিফান্ড নীতি', en: 'Cancellation & Refund' }
  },

  // Common CTAs & Labels
  cta: {
    bookNow: { bn: 'এখনই বুক করুন', en: 'Book Now' },
    viewPackage: { bn: 'প্যাকেজ বিস্তারিত দেখুন', en: 'View Package Details' },
    viewSchedule: { bn: 'সময়সূচি দেখুন', en: 'View Schedule' },
    contactUs: { bn: 'যোগাযোগ করুন', en: 'Contact Us' },
    submitBooking: { bn: 'বুকিং নিশ্চিত করুন', en: 'Confirm Booking' },
    filterTours: { bn: 'ফিল্টার করুন', en: 'Filter Tours' },
    resetFilter: { bn: 'রিসেট করুন', en: 'Reset' },
    addToWishlist: { bn: 'পছন্দে যোগ করুন', en: 'Save to Wishlist' },
    savedInWishlist: { bn: 'পছন্দে সংরক্ষিত', en: 'Saved' },
    compareNow: { bn: 'তুলনা করুন', en: 'Compare' },
    downloadPass: { bn: 'ডিজিটাল ট্রাভেল পাস ডাউনলোড', en: 'Download Travel Pass' },
    printInvoice: { bn: 'ইনভয়েস প্রিন্ট করুন', en: 'Print Invoice' },
    joinWaitlist: { bn: 'অপেক্ষমাণ তালিকায় যোগ দিন', en: 'Join Waitlist' }
  },

  // Booking Flow Steps
  booking: {
    step1: { bn: 'তারিখ ও পিকআপ', en: 'Date & Pickup' },
    step2: { bn: 'ভ্রমণকারীর তথ্য', en: 'Traveler Details' },
    step3: { bn: 'আসন নির্বাচন', en: 'Seat Selection' },
    step4: { bn: 'মূল্য সারসংক্ষেপ', en: 'Price Summary' },
    step5: { bn: 'পেমেন্ট ও TrxID', en: 'Payment & TrxID' },
    step6: { bn: 'বুকিং নিশ্চিতকরণ', en: 'Confirmation' },
    leadTraveler: { bn: 'প্রধান ভ্রমণকারীর নাম', en: 'Lead Traveler Full Name' },
    mobileNumber: { bn: 'মোবাইল নম্বর', en: 'Mobile Number' },
    emailAddress: { bn: 'ইমেইল ঠিকানা', en: 'Email Address' },
    fullAddress: { bn: 'পূর্ণ ঠিকানা', en: 'Full Address' },
    emergencyContact: { bn: 'জরুরি যোগাযোগ নম্বর', en: 'Emergency Contact' },
    dietaryPreference: { bn: 'খাবারের পছন্দ', en: 'Dietary Preference' },
    pureVegetarian: { bn: 'বিশুদ্ধ নিরামিষ (সাত্ত্বিক / পূজা উপযোগী)', en: 'Pure Vegetarian (Sattvic / Temple style)' },
    generalFood: { bn: 'সাধারণ খাবার', en: 'Standard Meal' },
    specialDiet: { bn: 'বিশেষ পথ্য / নির্দেশনা', en: 'Special Diet / Instructions' },
    adults: { bn: 'প্রাপ্তবয়স্ক (১২+ বছর)', en: 'Adults (12+ yrs)' },
    children: { bn: 'শিশু (৩-১১ বছর)', en: 'Children (3-11 yrs)' },
    infants: { bn: 'শিশু (০-২ বছর - আসনবিহীন)', en: 'Infants (0-2 yrs - No seat)' },
    selectSeatsPrompt: { bn: 'বাসের আসন নির্বাচন করুন', en: 'Select Your Coach Seats' },
    selectedSeatsLabel: { bn: 'নির্বাচিত আসনসমূহ', en: 'Selected Seats' },
    totalPayable: { bn: 'সর্বমোট প্রদেয় টাকা', en: 'Total Amount Payable' },
    applyCoupon: { bn: 'কুপন কোড ব্যবহার করুন', en: 'Apply Promo Coupon' },
    couponApplied: { bn: 'কুপন সফলভাবে যুক্ত হয়েছে!', en: 'Coupon applied successfully!' },
    invalidCoupon: { bn: 'অকার্যকর কুপন কোড', en: 'Invalid coupon code' }
  },

  // Payment Direct
  payment: {
    chooseMethod: { bn: 'পেমেন্ট মেথড নির্বাচন করুন', en: 'Select Payment Method' },
    bKashDirect: { bn: 'বিকাশ সরাসরি (Send Money)', en: 'bKash Direct (Send Money)' },
    nagadDirect: { bn: 'নগদ সরাসরি (Send Money)', en: 'Nagad Direct (Send Money)' },
    instructionTitle: { bn: 'সরাসরি পেমেন্ট করার নিয়মাবলী:', en: 'Direct Payment Instructions:' },
    instructionStep1: {
      bn: 'আপনার বিকাশ বা নগদ অ্যাপ থেকে "Send Money" অপশনে যান।',
      en: 'Open your bKash or Nagad app and choose the "Send Money" option.'
    },
    instructionStep2: {
      bn: 'নিচের যেকোনো একটি তীর্থবন্ধু অফিশিয়াল নম্বরে মোট টাকা পাঠান:',
      en: 'Send the total amount to any of our official Tirthobondhu numbers below:'
    },
    instructionStep3: {
      bn: 'টাকা পাঠানো সম্পন্ন হলে প্রাপ্ত ফিরতি এসএমএস থেকে Transaction ID (TrxID) কপি করুন।',
      en: 'Copy the Transaction ID (TrxID) received in your confirmation SMS.'
    },
    instructionStep4: {
      bn: 'নিচের বক্সে TrxID এবং প্রেরক মোবাইল নম্বর বসিয়ে "বুকিং নিশ্চিত করুন" বাটনে চাপুন।',
      en: 'Enter the TrxID and Sender Mobile Number below and click "Confirm Booking".'
    },
    securityNotice: {
      bn: 'সতর্কতা: আমরা কখনো আপনার বিকাশ/নগদ পিন (PIN), ওটিপি (OTP) বা পাসওয়ার্ড চাই না। কখনোই কারো সাথে আপনার গোপন পিন শেয়ার করবেন না।',
      en: 'Security Notice: We never ask for your bKash/Nagad PIN, OTP, or Password. Never share your confidential PIN with anyone.'
    },
    enterTrxId: { bn: 'Transaction ID (TrxID) লিখুন', en: 'Enter Transaction ID (TrxID)' },
    enterSenderMobile: { bn: 'যে নম্বর থেকে টাকা পাঠানো হয়েছে', en: 'Sender Mobile Number' },
    statusVerificationPending: {
      bn: 'পেমেন্ট যাচাইকরণ প্রক্রিয়াধীন',
      en: 'Payment Verification Pending'
    }
  }
};
