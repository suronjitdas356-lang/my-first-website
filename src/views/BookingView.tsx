import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking, TravelerDetail } from '../types';
import { formatPrice, formatBnDate, toBnNum } from '../utils/bilingual';
import { OFFICIAL_CONTACT } from '../data/initialData';
import { SeatSelector } from '../components/SeatSelector';
import { TravelPassModal } from '../components/TravelPassModal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Armchair, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Tag
} from 'lucide-react';

export const BookingView: React.FC = () => {
  const { 
    lang, 
    setCurrentView, 
    selectedTourId, 
    tours, 
    addBooking, 
    coupons, 
    activeUser, 
    getNextBookingId, 
    showToast 
  } = useApp();

  const tour = tours.find(t => t.id === selectedTourId) || tours[0];

  // Booking Flow Steps: 1: Tour & Date, 2: Travelers & Seats, 3: Payment & TrxID, 4: Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form States
  const [travelDate, setTravelDate] = useState<string>(tour?.travelDates[0] || '2026-10-09');
  const [pickupPoint, setPickupPoint] = useState<string>(tour?.pickupPointsBn[0] || 'মানিকনগর বিশ্বরোড');
  
  const [leadName, setLeadName] = useState<string>(activeUser.name || '');
  const [leadMobile, setLeadMobile] = useState<string>(activeUser.phone || '');
  const [leadEmail, setLeadEmail] = useState<string>(activeUser.email || '');
  const [address, setAddress] = useState<string>(activeUser.address || '');
  const [emergencyContact, setEmergencyContact] = useState<string>('01819223344');
  const [dietaryPreference, setDietaryPreference] = useState<'vegetarian' | 'sattvic' | 'regular' | 'other'>('sattvic');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');

  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [infantsCount, setInfantsCount] = useState<number>(0);

  const totalSeatsNeeded = adultsCount + childrenCount;
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['A1']);

  // Coupons
  const [couponInput, setCouponInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [paymentNumber, setPaymentNumber] = useState<string>('+8801960407018');
  const [senderMobile, setSenderMobile] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Completed Booking State for Pass Modal
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);
  const [showPassModal, setShowPassModal] = useState<boolean>(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!tour) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p>{lang === 'bn' ? 'ট্যুর প্যাকেজ নির্বাচন করুন।' : 'Please select a tour package first.'}</p>
        <button
          onClick={() => setCurrentView('tours')}
          className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold"
        >
          {lang === 'bn' ? 'প্যাকেজসমূহ দেখুন' : 'Explore Packages'}
        </button>
      </div>
    );
  }

  // Calculate Prices
  const baseTotal = (adultsCount * tour.priceAdult) + (childrenCount * tour.priceChild);
  const finalPayable = Math.max(0, baseTotal - discountAmount);

  // Handle seat toggles
  const handleSeatToggle = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(prev => prev.filter(s => s !== seat));
    } else {
      if (selectedSeats.length >= totalSeatsNeeded) {
        showToast(
          lang === 'bn' 
            ? `আপনি ইতিমধ্যে ${toBnNum(totalSeatsNeeded)} টি আসন নির্বাচন করেছেন। প্রয়োজনে আগের কোনো আসন বাদ দিন।` 
            : `You have already selected ${totalSeatsNeeded} seats.`,
          'info'
        );
        return;
      }
      setSelectedSeats(prev => [...prev, seat]);
    }
  };

  // Handle Coupon Apply
  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const found = coupons.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.active);
    if (!found) {
      showToast(lang === 'bn' ? 'অকার্যকর কুপন কোড।' : 'Invalid coupon code.', 'error');
      return;
    }
    if (baseTotal < found.minBookingAmount) {
      showToast(
        lang === 'bn' 
          ? `এই কুপনের জন্য সর্বনিম্ন বুকিং মূল্য ৳${found.minBookingAmount}` 
          : `Minimum booking amount for this coupon is BDT ${found.minBookingAmount}`,
        'error'
      );
      return;
    }

    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = Math.round((baseTotal * found.discountValue) / 100);
    } else {
      discount = found.discountValue;
    }

    setDiscountAmount(discount);
    setAppliedCoupon(found.code);
    showToast(lang === 'bn' ? 'কুপন সফলভাবে যুক্ত হয়েছে!' : 'Coupon applied successfully!', 'success');
  };

  const handleCopyNumber = (num: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num);
      setCopiedNumber(num);
      showToast(lang === 'bn' ? 'নম্বরটি কপি করা হয়েছে!' : 'Number copied!', 'success');
      setTimeout(() => setCopiedNumber(null), 3000);
    }
  };

  // Step 1 to Step 2 Validation
  const handleProceedToStep2 = () => {
    if (!travelDate) {
      showToast(lang === 'bn' ? 'যাত্রার তারিখ নির্বাচন করুন।' : 'Please select travel date.', 'error');
      return;
    }
    if (!pickupPoint) {
      showToast(lang === 'bn' ? 'পিকআপ স্থান নির্বাচন করুন।' : 'Please select pickup point.', 'error');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 to Step 3 Validation
  const handleProceedToStep3 = () => {
    if (!leadName.trim()) {
      showToast(lang === 'bn' ? 'ভ্রমণকারীর নাম প্রদান করুন।' : 'Please provide lead traveler name.', 'error');
      return;
    }
    if (!leadMobile.trim() || leadMobile.length < 11) {
      showToast(lang === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।' : 'Please provide valid 11-digit mobile number.', 'error');
      return;
    }
    if (selectedSeats.length !== totalSeatsNeeded) {
      showToast(
        lang === 'bn' 
          ? `দয়া করে মোট ${toBnNum(totalSeatsNeeded)} টি আসন নির্বাচন সম্পন্ন করুন (বর্তমানে ${toBnNum(selectedSeats.length)} টি নির্বাচিত)।` 
          : `Please select exactly ${totalSeatsNeeded} seats.`,
        'error'
      );
      return;
    }
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Booking Submission
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderMobile.trim() || senderMobile.length < 11) {
      showToast(lang === 'bn' ? 'যে নম্বর থেকে টাকা পাঠানো হয়েছে তা লিখুন।' : 'Please enter sender mobile number.', 'error');
      return;
    }

    if (!transactionId.trim() || transactionId.length < 6) {
      showToast(lang === 'bn' ? 'সঠিক Transaction ID (TrxID) লিখুন।' : 'Please enter valid Transaction ID (TrxID).', 'error');
      return;
    }

    if (!agreeTerms) {
      showToast(lang === 'bn' ? 'নিয়ম ও শর্তাবলীতে সম্মতি প্রদান করুন।' : 'Please agree to terms and conditions.', 'error');
      return;
    }

    const nextId = getNextBookingId();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const travelersList: TravelerDetail[] = selectedSeats.map((seat, idx) => ({
      id: `tr-${Date.now()}-${idx}`,
      name: idx === 0 ? leadName : `${leadName} (যাত্রী ${idx + 1})`,
      ageType: idx < adultsCount ? 'adult' : 'child',
      seatNumber: seat,
      checkedIn: false
    }));

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      bookingId: nextId,
      tourId: tour.id,
      tourTitleBn: tour.titleBn,
      tourTitleEn: tour.titleEn,
      destinationBn: tour.destinationBn,
      destinationEn: tour.destinationEn,
      travelDate,
      pickupPoint,
      leadTravelerName: leadName,
      leadMobile,
      leadEmail: leadEmail || 'N/A',
      address: address || 'Dhaka',
      emergencyContact,
      dietaryPreference,
      specialRequirements,
      adultsCount,
      childrenCount,
      infantsCount,
      selectedSeats,
      travelers: travelersList,
      totalAmount: baseTotal,
      discountAmount,
      finalAmount: finalPayable,
      couponCode: appliedCoupon || undefined,
      paymentMethod,
      paymentNumber,
      senderMobile,
      transactionId: transactionId.trim().toUpperCase(),
      paymentStatus: 'Payment Verification Pending',
      bookingStatus: 'Pending',
      createdAt: now
    };

    try {
      addBooking(newBooking);
      setCompletedBooking(newBooking);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Duplicate error handled inside context
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Breadcrumbs */}
      <div>
        <Breadcrumbs
          items={[
            { labelBn: 'ট্যুর প্যাকেজ', labelEn: 'Tour Packages', view: 'tours' },
            { labelBn: tour.titleBn, labelEn: tour.titleEn, view: 'tour-detail' },
            { labelBn: 'অনলাইন বুকিং', labelEn: 'Booking' }
          ]}
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-bangla mt-2">
          {lang === 'bn' ? 'অনলাইন ট্যুর বুকিং ও পেমেন্ট' : 'Online Tour Booking & Payment'}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-bangla">
          {lang === 'bn' 
            ? 'সহজ ও নিরাপদ প্রক্রিয়া: তথ্য প্রদান → আসন নির্বাচন → বিকাশ/নগদ পেমেন্ট → তাৎক্ষণিক কনফার্মেশন।' 
            : 'Smooth & secure process: Details → Seat selection → Direct payment → Verifiable Travel Pass.'}
        </p>
      </div>

      {/* Booking Steps Progress Indicator */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs font-semibold">
        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 1 
            ? 'bg-amber-700 text-white border-amber-800 shadow' 
            : currentStep > 1 
            ? 'bg-amber-50 text-amber-900 border-amber-300' 
            : 'bg-stone-50 text-stone-400 border-stone-200'
        }`}>
          <span className="block text-[10px] uppercase font-bold tracking-wider">Step 1</span>
          <span>{lang === 'bn' ? 'তারিখ ও পিকআপ' : 'Date & Pickup'}</span>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 2 
            ? 'bg-amber-700 text-white border-amber-800 shadow' 
            : currentStep > 2 
            ? 'bg-amber-50 text-amber-900 border-amber-300' 
            : 'bg-stone-50 text-stone-400 border-stone-200'
        }`}>
          <span className="block text-[10px] uppercase font-bold tracking-wider">Step 2</span>
          <span>{lang === 'bn' ? 'যাত্রী ও আসন নির্বাচন' : 'Travelers & Seats'}</span>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          currentStep === 3 
            ? 'bg-amber-700 text-white border-amber-800 shadow' 
            : currentStep === 4 
            ? 'bg-emerald-600 text-white border-emerald-700 shadow' 
            : 'bg-stone-50 text-stone-400 border-stone-200'
        }`}>
          <span className="block text-[10px] uppercase font-bold tracking-wider">Step 3</span>
          <span>{lang === 'bn' ? 'পেমেন্ট ও নিশ্চিতকরণ' : 'Payment & Pass'}</span>
        </div>
      </div>

      {/* Selected Tour Summary Ribbon */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <img src={tour.coverImage} alt={tour.titleEn} className="w-14 h-14 rounded-2xl object-cover" />
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
              {tour.category === 'pilgrimage' ? (lang === 'bn' ? 'পবিত্র তীর্থযাত্রা' : 'Pilgrimage') : (lang === 'bn' ? 'পর্যটন' : 'Tourism')}
            </span>
            <h4 className="text-sm font-bold text-stone-900 font-bangla line-clamp-1">
              {lang === 'bn' ? tour.titleBn : tour.titleEn}
            </h4>
            <div className="flex items-center gap-3 text-xs text-stone-500 mt-0.5">
              <span>{lang === 'bn' ? tour.destinationBn : tour.destinationEn}</span>
              <span>•</span>
              <span>{lang === 'bn' ? tour.durationBn : tour.durationEn}</span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] text-stone-400 block uppercase">
            {lang === 'bn' ? 'প্রাপ্তবয়স্ক জনপ্রতি' : 'Per Adult'}
          </span>
          <span className="text-lg font-bold text-amber-800">
            {formatPrice(tour.priceAdult, lang)}
          </span>
        </div>
      </div>

      {/* STEP 1: Date & Pickup */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-stone-900 font-bangla border-b border-stone-100 pb-3">
            {lang === 'bn' ? '১. যাত্রার তারিখ ও পিকআপ পয়েন্ট নির্বাচন করুন' : '1. Select Travel Date & Pickup Point'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Travel Date */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                {lang === 'bn' ? 'নির্ধারিত যাত্রার তারিখ' : 'Departure Date'}
              </label>
              <div className="space-y-2">
                {tour.travelDates.map((date) => (
                  <label
                    key={date}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      travelDate === date 
                        ? 'border-amber-600 bg-amber-50/60 shadow-sm' 
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="travelDate"
                        value={date}
                        checked={travelDate === date}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="accent-amber-700 w-4 h-4"
                      />
                      <span className="text-sm font-bold text-stone-900">
                        {formatBnDate(date, lang)}
                      </span>
                    </div>
                    <span className="text-xs text-amber-800 font-medium">
                      {lang === 'bn' ? 'আসন উপলব্ধ' : 'Seats Available'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pickup Point */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-2">
                {lang === 'bn' ? 'পিকআপ স্থান (বাসে ওঠার স্থান)' : 'Boarding / Pickup Point'}
              </label>
              <div className="space-y-2">
                {(lang === 'bn' ? tour.pickupPointsBn : tour.pickupPointsEn).map((pt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      pickupPoint === pt 
                        ? 'border-amber-600 bg-amber-50/60 shadow-sm' 
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pickupPoint"
                        value={pt}
                        checked={pickupPoint === pt}
                        onChange={(e) => setPickupPoint(e.target.value)}
                        className="accent-amber-700 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm font-medium text-stone-900">
                        {pt}
                      </span>
                    </div>
                    <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  </label>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleProceedToStep2}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'পরবর্তী ধাপ: যাত্রী ও আসন' : 'Next: Travelers & Seats'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Travelers Information & Interactive Seat Selection */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? '২. ভ্রমণকারীর তথ্য ও বাসের আসন নির্বাচন' : '2. Traveler Information & Seat Selection'}
            </h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'তারিখ পরিবর্তন' : 'Change Date'}</span>
            </button>
          </div>

          {/* Passenger Count Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'bn' ? 'প্রাপ্তবয়স্ক (১২+ বছর)' : 'Adults (12+ yrs)'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono">{lang === 'bn' ? toBnNum(adultsCount) : adultsCount}</span>
                <button
                  type="button"
                  onClick={() => setAdultsCount(adultsCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'bn' ? 'শিশু (৩-১১ বছর - আসনযুক্ত)' : 'Children (3-11 yrs)'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono">{lang === 'bn' ? toBnNum(childrenCount) : childrenCount}</span>
                <button
                  type="button"
                  onClick={() => setChildrenCount(childrenCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {lang === 'bn' ? 'শিশু (০-২ বছর - আসনবিহীন)' : 'Infants (0-2 yrs)'}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInfantsCount(Math.max(0, infantsCount - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  -
                </button>
                <span className="text-base font-bold font-mono">{lang === 'bn' ? toBnNum(infantsCount) : infantsCount}</span>
                <button
                  type="button"
                  onClick={() => setInfantsCount(infantsCount + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-stone-300 font-bold text-stone-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Lead Traveler Details Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'প্রধান ভ্রমণকারীর নাম *' : 'Lead Traveler Full Name *'}
              </label>
              <input
                type="text"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder={lang === 'bn' ? 'পূর্ণ নাম লিখুন' : 'Enter full name'}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'মোবাইল নম্বর (১১ ডিজিট) *' : 'Mobile Number (11 Digits) *'}
              </label>
              <input
                type="tel"
                value={leadMobile}
                onChange={(e) => setLeadMobile(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
              </label>
              <input
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'জরুরি যোগাযোগ নম্বর *' : 'Emergency Contact *'}
              </label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'পূর্ণ ঠিকানা' : 'Full Address'}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={lang === 'bn' ? 'বাড়ি নং, রাস্তা, এলাকা, জেলা' : 'House, Road, Area, District'}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'খাবারের পছন্দ (Dietary Preference)' : 'Dietary Preference'}
              </label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="sattvic">{lang === 'bn' ? 'বিশুদ্ধ সাত্ত্বিক নিরামিষ (পেঁয়াজ-রসুনহীন/মন্দির ভোগ)' : 'Pure Sattvic Vegetarian (No Onion/Garlic)'}</option>
                <option value="vegetarian">{lang === 'bn' ? 'সাধারণ নিরামিষ আহার' : 'Standard Vegetarian'}</option>
                <option value="regular">{lang === 'bn' ? 'নিয়মিত খাবার' : 'Regular'}</option>
              </select>
            </div>

            {/* Special notes */}
            <div>
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                {lang === 'bn' ? 'প্রবীণ সহায়তা বা বিশেষ রিকোয়েস্ট' : 'Elderly Support / Special Request'}
              </label>
              <input
                type="text"
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder={lang === 'bn' ? 'যেমন: প্রবীণ তীর্থযাত্রী রয়েছেন' : 'e.g., senior citizen companion'}
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Interactive Seat Selector Component */}
          <div className="pt-4">
            <SeatSelector
              totalCapacity={tour.totalSeats}
              alreadyBookedSeats={['A3', 'A4', 'C1', 'C2', 'D4']}
              selectedSeats={selectedSeats}
              maxSeats={totalSeatsNeeded}
              onSeatToggle={handleSeatToggle}
            />
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
            >
              {lang === 'bn' ? 'পূর্ববর্তী' : 'Back'}
            </button>
            <button
              type="button"
              onClick={handleProceedToStep3}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'পরবর্তী ধাপ: পেমেন্ট ও TrxID' : 'Next: Payment & TrxID'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Price Summary, Direct bKash/Nagad Instructions, TrxID Submission */}
      {currentStep === 3 && (
        <form onSubmit={handleConfirmBooking} className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Cols: Payment Instructions & Transaction ID Input */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h3 className="text-base font-bold text-stone-900 font-bangla flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <span>{lang === 'bn' ? '৩. সরাসরি পেমেন্ট ও Transaction ID প্রদান' : '3. Direct Payment & Transaction ID'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আসন পরিবর্তন' : 'Change Seats'}</span>
                </button>
              </div>

              {/* Method Selection (bKash / Nagad) */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  {lang === 'bn' ? 'পেমেন্ট মেথড নির্বাচন করুন (Send Money)' : 'Select Payment Gateway / Method'}
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('bKash');
                      setPaymentNumber('+8801960407018');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'bKash' 
                        ? 'border-pink-600 bg-pink-50/60 shadow-sm' 
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-sm font-bold text-pink-700 block">bKash (বিকাশ)</span>
                    <span className="text-[11px] text-stone-500 font-medium">সরাসরি Send Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentMethod('Nagad');
                      setPaymentNumber('+8801792666308');
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      paymentMethod === 'Nagad' 
                        ? 'border-orange-600 bg-orange-50/60 shadow-sm' 
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-sm font-bold text-orange-700 block">Nagad (নগদ)</span>
                    <span className="text-[11px] text-stone-500 font-medium">সরাসরি Send Money</span>
                  </button>
                </div>
              </div>

              {/* Official Numbers Box with Copy Buttons */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                <span className="text-xs font-semibold text-stone-800 uppercase tracking-wider block">
                  {lang === 'bn' 
                    ? `তীর্থবন্ধু অফিশিয়াল ${paymentMethod} নম্বরসমূহ (যেকোনো একটিতে পাঠান):` 
                    : `Official ${paymentMethod} Direct Numbers (Send Money to any):`}
                </span>

                <div className="space-y-2">
                  {OFFICIAL_CONTACT.phones.map((phone) => (
                    <div 
                      key={phone}
                      className="bg-white p-3 rounded-xl border border-stone-200 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-mono font-bold text-sm text-stone-900 tracking-wide">{phone}</span>
                        <span className="text-[10px] text-stone-500">
                          {paymentMethod === 'bKash' ? '(Personal / Send Money)' : '(Personal / Send Money)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(phone)}
                        className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 transition-colors flex items-center gap-1 font-semibold"
                      >
                        {copiedNumber === phone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">{lang === 'bn' ? 'কপি হয়েছে' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-stone-500" />
                            <span>{lang === 'bn' ? 'কপি' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Warning */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950 font-bangla">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">
                    {lang === 'bn' ? 'নিরাপত্তা বার্তা:' : 'Confidentiality Warning:'}
                  </p>
                  <p>
                    {lang === 'bn'
                      ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস কখনোই আপনার বিকাশ বা নগদ পিন (PIN), ওটিপি (OTP) কিংবা পাসওয়ার্ড জানতে চায় না। কখনোই কারো সাথে গোপন তথ্য শেয়ার করবেন না।'
                      : 'We never ask for your confidential PIN, OTP or password. Never disclose payment secrets.'}
                  </p>
                </div>
              </div>

              {/* Transaction ID & Sender Mobile Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'যে নম্বর থেকে টাকা পাঠিয়েছেন *' : 'Sender Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    value={senderMobile}
                    onChange={(e) => setSenderMobile(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block mb-1">
                    {lang === 'bn' ? 'Transaction ID (TrxID) *' : 'Transaction ID (TrxID) *'}
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g. BK9X77A102"
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 font-bangla">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-amber-700 w-4 h-4 rounded mt-0.5"
                    required
                  />
                  <span>
                    {lang === 'bn'
                      ? 'আমি তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলসের নিয়ম ও শর্তাবলী এবং রিফান্ড পলিসি পড়ে সম্মত হয়েছি।'
                      : 'I have read and agree to the Terms & Conditions and Cancellation/Refund Policy.'}
                  </span>
                </label>
              </div>

            </div>

            {/* Right Col: Price Summary & Promo Code */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider border-b border-stone-100 pb-3">
                {lang === 'bn' ? 'মূল্য সারসংক্ষেপ' : 'Price Summary'}
              </h4>

              {/* Items */}
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>{lang === 'bn' ? `প্রাপ্তবয়স্ক (${toBnNum(adultsCount)} জন)` : `Adults (${adultsCount})`}</span>
                  <span className="font-semibold text-stone-800">{formatPrice(adultsCount * tour.priceAdult, lang)}</span>
                </div>

                {childrenCount > 0 && (
                  <div className="flex justify-between">
                    <span>{lang === 'bn' ? `শিশু (${toBnNum(childrenCount)} জন)` : `Children (${childrenCount})`}</span>
                    <span className="font-semibold text-stone-800">{formatPrice(childrenCount * tour.priceChild, lang)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-1 border-t border-stone-100">
                  <span>{lang === 'bn' ? 'মোট আসন সংখ্যা:' : 'Total Seats:'}</span>
                  <span className="font-bold text-amber-900">{selectedSeats.join(', ')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>{lang === 'bn' ? 'কুপন ছাড়:' : 'Coupon Discount:'}</span>
                    <span>- {formatPrice(discountAmount, lang)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-3 border-t-2 border-stone-200 text-sm font-bold text-stone-950">
                  <span>{lang === 'bn' ? 'সর্বমোট প্রদেয় টাকা:' : 'Total Amount Payable:'}</span>
                  <span className="text-amber-800 text-base">{formatPrice(finalPayable, lang)}</span>
                </div>
              </div>

              {/* Coupon Form */}
              <div className="border-t border-stone-100 pt-4 space-y-2">
                <label className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                  {lang === 'bn' ? 'প্রোমো বা ডিসকাউন্ট কুপন' : 'Promo / Discount Code'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="TIRTHA2026"
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
                  >
                    {lang === 'bn' ? 'প্রয়োগ' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-200" />
                <span>{lang === 'bn' ? 'বুকিং নিশ্চিত করুন (Confirm)' : 'Confirm Tour Booking'}</span>
              </button>

            </div>

          </div>

        </form>
      )}

      {/* STEP 4: Instant Confirmation & Digital Travel Pass */}
      {currentStep === 4 && completedBooking && (
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500/40 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center ring-4 ring-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 font-bangla">
              {lang === 'bn' ? 'বুকিং সফলভাবে সম্পন্ন হয়েছে!' : 'Booking Submitted Successfully!'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-bangla">
              {lang === 'bn'
                ? 'আপনার পেমেন্ট ট্রানজেকশন সফলভাবে রেকর্ড করা হয়েছে। অ্যাকাউন্টস টিম ট্রানজেকশন ভেরিফাই করছে।'
                : 'Your booking details and Transaction ID have been recorded. Our finance desk is verifying payment.'}
            </p>
          </div>

          {/* Booking ID Plate */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-md mx-auto">
            <span className="text-xs text-stone-500 block uppercase font-bold">
              {lang === 'bn' ? 'আপনার ইউনিক বুকিং আইডি' : 'Your Unique Booking ID'}
            </span>
            <span className="text-2xl font-mono font-bold text-amber-900 tracking-wider">
              {completedBooking.bookingId}
            </span>
            <p className="text-[11px] text-amber-800 mt-1">
              {lang === 'bn'
                ? 'স্ট্যাটাস: পেমেন্ট যাচাই প্রক্রিয়াধীন (Payment Verification Pending)'
                : 'Status: Payment Verification Pending'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
            <button
              onClick={() => setShowPassModal(true)}
              className="px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'bn' ? 'ডিজিটাল ট্রাভেল পাস ও ই-টিকেট দেখুন' : 'View Digital Travel Pass'}</span>
            </button>

            <button
              onClick={() => setCurrentView('account')}
              className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-2xl text-xs sm:text-sm font-semibold transition-colors"
            >
              {lang === 'bn' ? 'আমার অ্যাকাউন্টে যান' : 'Go to My Account'}
            </button>
          </div>

          {/* Pass Modal */}
          {showPassModal && (
            <TravelPassModal
              booking={completedBooking}
              onClose={() => setShowPassModal(false)}
            />
          )}

        </div>
      )}

    </div>
  );
};
