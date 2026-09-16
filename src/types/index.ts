export type Language = 'bn' | 'en';

export type TourCategory = 'pilgrimage' | 'domestic' | 'international';

export type TourStatus = 'Booking Open' | 'Almost Full' | 'Full' | 'Completed' | 'Cancelled';

export type PaymentStatus = 
  | 'Pending' 
  | 'Payment Verification Pending' 
  | 'Verified' 
  | 'Failed' 
  | 'Refund Processing' 
  | 'Refunded';

export type BookingStatus = 
  | 'Pending' 
  | 'Confirmed' 
  | 'Cancelled' 
  | 'Waitlisted' 
  | 'Completed';

export interface ItineraryDay {
  day: number;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  mealsBn?: string;
  mealsEn?: string;
}

export interface TourPackage {
  id: string;
  code: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  category: TourCategory;
  destinationBn: string;
  destinationEn: string;
  durationBn: string;
  durationEn: string;
  durationDays: number;
  durationNights: number;
  coverImage: string;
  galleryImages: string[];
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  travelDates: string[];
  pickupPointsBn: string[];
  pickupPointsEn: string[];
  vehicleTypeBn: string;
  vehicleTypeEn: string;
  totalSeats: number;
  bookedSeats: number;
  status: TourStatus;
  hotelTypeBn: string;
  hotelTypeEn: string;
  mealPlanBn: string;
  mealPlanEn: string;
  descriptionBn: string;
  descriptionEn: string;
  itinerary: ItineraryDay[];
  includedBn: string[];
  includedEn: string[];
  excludedBn: string[];
  excludedEn: string[];
  specialInstructionsBn: string[];
  specialInstructionsEn: string[];
  discountPercent?: number;
  originalPriceAdult?: number;
  bookingDeadline: string;
  featured?: boolean;
}

export interface TravelerDetail {
  id: string;
  name: string;
  ageType: 'adult' | 'child' | 'infant';
  seatNumber?: string;
  gender?: 'male' | 'female' | 'other';
  checkedIn?: boolean;
  checkInTime?: string;
}

export interface Booking {
  id: string;
  bookingId: string; // e.g. TBTT-2026-00001
  tourId: string;
  tourTitleBn: string;
  tourTitleEn: string;
  destinationBn: string;
  destinationEn: string;
  travelDate: string;
  pickupPoint: string;
  leadTravelerName: string;
  leadMobile: string;
  leadEmail: string;
  address: string;
  emergencyContact: string;
  dietaryPreference: 'vegetarian' | 'sattvic' | 'regular' | 'other';
  specialRequirements?: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  selectedSeats: string[];
  travelers: TravelerDetail[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  couponCode?: string;
  paymentMethod: 'bKash' | 'Nagad';
  paymentNumber: string;
  senderMobile: string;
  transactionId: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  designationEn: string;
  roleCategory: 'founding' | 'director' | 'operational';
  bioBn: string;
  bioEn: string;
  responsibilitiesBn: string;
  responsibilitiesEn: string;
  avatarUrl: string;
  order: number;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  tourTitleBn: string;
  tourTitleEn: string;
  travelDate: string;
  rating: number;
  commentBn: string;
  commentEn: string;
  approved: boolean;
  createdAt: string;
  avatarUrl?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  bookingId?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  messages: {
    sender: 'customer' | 'admin';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minBookingAmount: number;
  expiryDate: string;
  active: boolean;
  descriptionBn: string;
  descriptionEn: string;
}

export interface CustomerNotification {
  id: string;
  titleBn: string;
  titleEn: string;
  messageBn: string;
  messageEn: string;
  type: 'booking' | 'payment' | 'schedule' | 'general';
  timestamp: string;
  read: boolean;
  bookingId?: string;
}

export interface CustomTourRequest {
  id: string;
  name: string;
  mobile: string;
  email: string;
  destination: string;
  travelDate: string;
  durationDays: number;
  travelersCount: number;
  transportPreference: string;
  accommodationType: string;
  foodPreference: string;
  estimatedBudget: string;
  specialRequests?: string;
  status: 'Received' | 'Quoted' | 'Approved' | 'Closed';
  createdAt: string;
}

export interface CorporateBookingRequest {
  id: string;
  organizationName: string;
  contactPerson: string;
  designation: string;
  mobile: string;
  email: string;
  travelerCount: number;
  preferredDestination: string;
  proposedDate: string;
  transportRequired: string;
  accommodationRequired: string;
  notes?: string;
  status: 'Received' | 'Under Review' | 'Quoted' | 'Closed';
  createdAt: string;
}
