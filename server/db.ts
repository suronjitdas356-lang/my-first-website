import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { 
  TourPackage, 
  Booking, 
  CustomerReview, 
  SupportTicket, 
  Coupon 
} from '../src/types/index';
import { 
  INITIAL_TOURS, 
  INITIAL_BOOKINGS, 
  INITIAL_REVIEWS, 
  OFFICIAL_CONTACT 
} from '../src/data/initialData';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'super_admin' | 'manager';
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AdminSession {
  token: string;
  adminId: string;
  email: string;
  role: string;
  createdAt: number;
  expiresAt: number;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank transfer' | 'Cash' | 'Online payment';
  transactionId: string;
  senderMobile?: string;
  paymentDate: string;
  paymentStatus: 'Unpaid' | 'Partial' | 'Paid' | 'Refunded';
  notes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'new_booking' | 'payment_update' | 'booking_status' | 'system';
  read: boolean;
  createdAt: string;
  bookingId?: string;
  customerName?: string;
}

export interface CompanySettings {
  companyNameBn: string;
  companyNameEn: string;
  sloganBn: string;
  sloganEn: string;
  logoUrl: string;
  phones: string[];
  whatsappNumber: string;
  email: string;
  officeAddressBn: string;
  officeAddressEn: string;
  supportHoursBn: string;
  supportHoursEn: string;
  socialLinks: {
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
  bookingRulesBn: string;
  bookingRulesEn: string;
  cancellationPolicyBn: string;
  cancellationPolicyEn: string;
}

export interface DatabaseSchema {
  adminUsers: AdminUser[];
  adminSessions: AdminSession[];
  tours: (TourPackage & { published?: boolean; departureDate?: string; returnDate?: string; meetingPointBn?: string; meetingPointEn?: string })[];
  bookings: (Booking & { paidAmount: number; dueAmount: number })[];
  customers: CustomerRecord[];
  payments: PaymentRecord[];
  notifications: AdminNotification[];
  reviews: CustomerReview[];
  settings: CompanySettings;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, generatedSalt, 64).toString('hex');
  return { hash, salt: generatedSalt };
}

function getInitialDatabase(): DatabaseSchema {
  const initialAdminPass = process.env.ADMIN_INITIAL_PASSWORD || 'admin123456';
  const initialAdminEmail = (process.env.ADMIN_INITIAL_EMAIL || 'admin@tirthobondhu.com').toLowerCase().trim();
  const { hash, salt } = hashPassword(initialAdminPass);

  const initialAdmin: AdminUser = {
    id: 'admin-001',
    name: 'শ্রী দীপঙ্কর চন্দ্র দাস (Managing Director)',
    email: initialAdminEmail,
    passwordHash: hash,
    salt,
    role: 'super_admin',
    createdAt: new Date().toISOString(),
    lastLoginAt: null
  };

  // Convert initial tours
  const tours = INITIAL_TOURS.map(t => ({
    ...t,
    published: true,
    departureDate: t.travelDates[0] || '2026-10-15',
    returnDate: t.travelDates[0] ? new Date(new Date(t.travelDates[0]).getTime() + t.durationDays * 86400000).toISOString().split('T')[0] : '2026-10-18',
    meetingPointBn: 'মানিকনগর বিশ্বরোড বাস কাউন্টার, ঢাকা',
    meetingPointEn: 'Maniknagar Bishwaroad Bus Counter, Dhaka'
  }));

  // Convert initial bookings
  const bookings = INITIAL_BOOKINGS.map(b => {
    const isVerified = b.paymentStatus === 'Verified';
    const paid = isVerified ? b.finalAmount : 0;
    const due = isVerified ? 0 : b.finalAmount;
    return {
      ...b,
      paidAmount: paid,
      dueAmount: due,
      bookingStatus: isVerified ? ('Confirmed' as const) : ('Pending' as const),
      paymentStatus: isVerified ? ('Verified' as const) : ('Payment Verification Pending' as const)
    };
  });

  // Extract initial customers
  const customers: CustomerRecord[] = bookings.map(b => ({
    id: `cust-${b.id}`,
    name: b.leadTravelerName,
    phone: b.leadMobile,
    email: b.leadEmail,
    address: b.address,
    totalBookings: 1,
    totalSpent: b.paidAmount,
    createdAt: b.createdAt
  }));

  // Extract initial payments
  const payments: PaymentRecord[] = bookings.map(b => ({
    id: `pay-${b.id}`,
    bookingId: b.bookingId,
    customerName: b.leadTravelerName,
    customerPhone: b.leadMobile,
    amount: b.paidAmount > 0 ? b.paidAmount : b.finalAmount,
    paymentMethod: b.paymentMethod,
    transactionId: b.transactionId,
    senderMobile: b.senderMobile,
    paymentDate: b.createdAt,
    paymentStatus: b.paymentStatus === 'Verified' ? 'Paid' : 'Unpaid',
    verifiedBy: b.verifiedBy,
    verifiedAt: b.verifiedAt
  }));

  const notifications: AdminNotification[] = [
    {
      id: 'notif-init-1',
      title: 'নতুন বুকিং পেন্ডিং',
      message: 'শ্রী দেবাশীষ মুখার্জী সীতাকুণ্ড চন্দ্রনাথ ধাম প্যাকেজের জন্য বুকিং জমা দিয়েছেন।',
      type: 'new_booking',
      read: false,
      createdAt: new Date().toISOString(),
      bookingId: bookings[0]?.bookingId || 'TBTT-2026-00001',
      customerName: 'শ্রী দেবাশীষ মুখার্জী'
    }
  ];

  const settings: CompanySettings = {
    companyNameBn: 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস',
    companyNameEn: 'Tirthobondhu Tour & Travels',
    sloganBn: '“আপনার তীর্থযাত্রা হোক নিরাপদ, সুন্দর ও স্মরণীয়।”',
    sloganEn: '“May your pilgrimage be safe, blessed and memorable.”',
    logoUrl: '',
    phones: [...OFFICIAL_CONTACT.phones],
    whatsappNumber: '+8801960407018',
    email: OFFICIAL_CONTACT.email,
    officeAddressBn: OFFICIAL_CONTACT.addressBn,
    officeAddressEn: OFFICIAL_CONTACT.addressEn,
    supportHoursBn: OFFICIAL_CONTACT.supportHoursBn,
    supportHoursEn: OFFICIAL_CONTACT.supportHoursEn,
    socialLinks: {
      facebook: 'https://facebook.com/tirthobondhutourtravels',
      youtube: 'https://youtube.com',
      whatsapp: 'https://wa.me/8801960407018'
    },
    bookingRulesBn: 'যাত্রার নির্ধারিত সময়ের ৩০ মিনিট পূর্বে নির্দিষ্ট পিকআপ পয়েন্টে উপস্থিত থাকতে হবে। আসন বণ্টন নিশ্চিত টিকিট অনুযায়ী সম্পন্ন হবে।',
    bookingRulesEn: 'Travelers must report to the pickup point 30 minutes prior to departure. Seat allocation will follow the confirmed ticket pass.',
    cancellationPolicyBn: 'যাত্রার ৭ দিন পূর্বে জানালে ৮০% এবং ৩ দিন পূর্বে জানালে ৫০% রিফান্ড যোগ্য। ৪৮ ঘণ্টার মধ্যে বাতিল করলে নগদ অর্থ ফেরতযোগ্য নয়।',
    cancellationPolicyEn: 'Cancellations 7+ days prior receive 80% refund; 3-6 days receive 50%. Cancellations within 48 hours are non-refundable.'
  };

  return {
    adminUsers: [initialAdmin],
    adminSessions: [],
    tours,
    bookings,
    customers,
    payments,
    notifications,
    reviews: INITIAL_REVIEWS,
    settings
  };
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
    this.saveData(this.data);
  }

  private load(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all required top-level keys exist
        const initial = getInitialDatabase();
        const initialAdmin = initial.adminUsers[0];
        let adminUsers: AdminUser[] = parsed.adminUsers || [];
        
        if (!adminUsers.length) {
          adminUsers = [initialAdmin];
        } else {
          // Keep initial admin user synced with current environment variables
          const adminIdx = adminUsers.findIndex((u: AdminUser) => u.id === 'admin-001' || u.email.toLowerCase() === initialAdmin.email.toLowerCase());
          if (adminIdx >= 0) {
            adminUsers[adminIdx] = {
              ...adminUsers[adminIdx],
              email: initialAdmin.email,
              passwordHash: initialAdmin.passwordHash,
              salt: initialAdmin.salt
            };
          } else {
            adminUsers.unshift(initialAdmin);
          }
        }

        return {
          ...initial,
          ...parsed,
          adminUsers,
          settings: { ...initial.settings, ...(parsed.settings || {}) }
        };
      } catch (err) {
        console.error('Error reading db.json, reinitializing from defaults:', err);
      }
    }
    const initial = getInitialDatabase();
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema) {
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  }

  public save() {
    this.saveData(this.data);
  }

  public get<K extends keyof DatabaseSchema>(key: K): DatabaseSchema[K] {
    return this.data[key];
  }

  public set<K extends keyof DatabaseSchema>(key: K, value: DatabaseSchema[K]) {
    this.data[key] = value;
    this.save();
  }

  public raw(): DatabaseSchema {
    return this.data;
  }
}

export const db = new Database();
