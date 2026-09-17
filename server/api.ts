import express, { Request, Response } from 'express';
import { db, PaymentRecord, CustomerRecord, AdminNotification } from './db';
import { 
  authenticateAdmin, 
  createAdminSession, 
  destroySession, 
  requireAdmin, 
  AuthenticatedRequest 
} from './auth';
import { Booking, TourPackage } from '../src/types/index';

export const apiRouter = express.Router();

// Middleware
apiRouter.use(express.json());

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================

// Health Check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Public Settings
apiRouter.get('/settings/public', (req: Request, res: Response) => {
  const settings = db.get('settings');
  res.json(settings);
});

// Public Tours (only published tours)
apiRouter.get('/tours', (req: Request, res: Response) => {
  const tours = db.get('tours') || [];
  const published = tours.filter(t => t.published !== false);
  res.json(published);
});

// Public Single Tour
apiRouter.get('/tours/:id', (req: Request, res: Response) => {
  const tours = db.get('tours') || [];
  const tour = tours.find(t => t.id === req.params.id || t.slug === req.params.id);
  if (!tour || tour.published === false) {
    res.status(404).json({ error: 'Tour package not found' });
    return;
  }
  res.json(tour);
});

// Public Customer Booking Submission
apiRouter.post('/bookings', (req: Request, res: Response) => {
  try {
    const data = req.body;
    const leadTravelerName = (data.leadTravelerName || data.customerName || '').trim();
    const leadMobile = (data.leadMobile || data.customerPhone || '').trim();
    const leadEmail = (data.leadEmail || data.customerEmail || '').trim();
    const address = (data.address || data.customerAddress || '').trim();

    if (!data.tourId || !leadTravelerName || !leadMobile || !data.transactionId) {
      res.status(400).json({ error: 'Missing required booking information' });
      return;
    }

    const bookings = db.get('bookings') || [];

    // Duplicate TrxID check
    const cleanTrx = String(data.transactionId).trim().toUpperCase();
    const duplicate = bookings.some(b => b.transactionId.trim().toUpperCase() === cleanTrx);
    if (duplicate) {
      res.status(400).json({ error: 'This Transaction ID (TrxID) has already been submitted. Please check or contact support.' });
      return;
    }

    // Check tour exists
    const tours = db.get('tours') || [];
    const tour = tours.find(t => t.id === data.tourId);
    if (!tour) {
      res.status(404).json({ error: 'Selected tour package was not found.' });
      return;
    }

    // Generate unique sequential booking ID
    const year = '2026';
    const nextNum = bookings.length + 1;
    const bookingId = data.bookingId || `TBTT-${year}-${String(nextNum).padStart(5, '0')}`;

    const totalAmount = Number(data.finalAmount || data.totalAmount || tour.priceAdult);
    const paidAmount = data.paidAmount !== undefined ? Number(data.paidAmount) : 0;
    const dueAmount = totalAmount - paidAmount;

    const newBooking: Booking & { paidAmount: number; dueAmount: number } = {
      id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      bookingId,
      tourId: tour.id,
      tourTitleBn: tour.titleBn,
      tourTitleEn: tour.titleEn,
      destinationBn: tour.destinationBn,
      destinationEn: tour.destinationEn,
      travelDate: data.travelDate || tour.travelDates[0] || '2026-10-15',
      pickupPoint: data.pickupPoint || 'Maniknagar Bishwaroad, Dhaka',
      leadTravelerName,
      leadMobile,
      leadEmail,
      address,
      emergencyContact: data.emergencyContact?.trim() || '',
      dietaryPreference: data.dietaryPreference || 'sattvic',
      specialRequirements: data.specialRequirements || '',
      adultsCount: Number(data.adultsCount) || Number(data.travelersCount) || 1,
      childrenCount: Number(data.childrenCount) || 0,
      infantsCount: Number(data.infantsCount) || 0,
      selectedSeats: Array.isArray(data.selectedSeats) ? data.selectedSeats : [],
      travelers: Array.isArray(data.travelers) ? data.travelers : [],
      totalAmount,
      discountAmount: Number(data.discountAmount) || 0,
      finalAmount: totalAmount,
      paidAmount,
      dueAmount,
      couponCode: data.couponCode || '',
      paymentMethod: data.paymentMethod || 'bKash',
      paymentNumber: data.paymentNumber || '+8801960407018',
      senderMobile: data.senderMobile?.trim() || '',
      transactionId: cleanTrx,
      paymentStatus: 'Payment Verification Pending',
      bookingStatus: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Add to bookings
    bookings.unshift(newBooking);
    db.set('bookings', bookings);

    // Update tour booked seats
    const seatCount = newBooking.selectedSeats.length || newBooking.adultsCount;
    tour.bookedSeats = Math.min(tour.totalSeats, tour.bookedSeats + seatCount);
    if (tour.bookedSeats >= tour.totalSeats) {
      tour.status = 'Full';
    } else if (tour.bookedSeats >= tour.totalSeats * 0.8) {
      tour.status = 'Almost Full';
    }
    db.save();

    // Record Payment
    const payments = db.get('payments') || [];
    const paymentRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      bookingId: newBooking.bookingId,
      customerName: newBooking.leadTravelerName,
      customerPhone: newBooking.leadMobile,
      amount: totalAmount,
      paymentMethod: newBooking.paymentMethod,
      transactionId: cleanTrx,
      senderMobile: newBooking.senderMobile,
      paymentDate: newBooking.createdAt,
      paymentStatus: 'Unpaid',
      notes: 'Initial booking submission - awaiting admin TrxID reconciliation'
    };
    payments.unshift(paymentRecord);
    db.set('payments', payments);

    // Update or create Customer Record
    const customers = db.get('customers') || [];
    const existingCust = customers.find(c => c.phone === newBooking.leadMobile);
    if (existingCust) {
      existingCust.totalBookings += 1;
      if (newBooking.leadEmail && !existingCust.email) existingCust.email = newBooking.leadEmail;
      if (newBooking.address && !existingCust.address) existingCust.address = newBooking.address;
    } else {
      customers.push({
        id: `cust-${Date.now()}`,
        name: newBooking.leadTravelerName,
        phone: newBooking.leadMobile,
        email: newBooking.leadEmail,
        address: newBooking.address,
        totalBookings: 1,
        totalSpent: 0,
        createdAt: newBooking.createdAt
      });
    }
    db.set('customers', customers);

    // Trigger Admin Notification
    const notifications = db.get('notifications') || [];
    notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'নতুন বুকিং পেন্ডিং (New Booking)',
      message: `${newBooking.leadTravelerName} (${newBooking.leadMobile}) ${tour.titleBn} এর জন্য আসন বুক করেছেন। TrxID: ${cleanTrx}`,
      type: 'new_booking',
      read: false,
      createdAt: new Date().toISOString(),
      bookingId: newBooking.bookingId,
      customerName: newBooking.leadTravelerName
    });
    db.set('notifications', notifications);

    res.status(201).json({
      success: true,
      booking: newBooking,
      message: 'Booking submitted successfully and pending payment verification.'
    });
  } catch (err: any) {
    console.error('Booking submission error:', err);
    res.status(500).json({ error: 'Failed to process booking.' });
  }
});

// Public Customer Reviews
apiRouter.get('/reviews', (req: Request, res: Response) => {
  const reviews = db.get('reviews') || [];
  res.json(reviews.filter(r => r.approved));
});

apiRouter.post('/reviews', (req: Request, res: Response) => {
  const { customerName, tourTitleBn, tourTitleEn, rating, commentBn, commentEn } = req.body;
  if (!customerName || !commentBn) {
    res.status(400).json({ error: 'Name and comment are required' });
    return;
  }
  const reviews = db.get('reviews') || [];
  const newReview = {
    id: `rev-${Date.now()}`,
    customerName,
    tourTitleBn: tourTitleBn || 'তীর্থযাত্রা ভ্রমণ',
    tourTitleEn: tourTitleEn || 'Pilgrimage Tour',
    travelDate: new Date().toISOString().split('T')[0],
    rating: Number(rating) || 5,
    commentBn,
    commentEn: commentEn || commentBn,
    approved: false, // Requires admin review
    createdAt: new Date().toISOString().split('T')[0]
  };
  reviews.unshift(newReview);
  db.set('reviews', reviews);
  res.status(201).json({ success: true, review: newReview });
});

// ==========================================
// 2. ADMIN AUTHENTICATION
// ==========================================

apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const result = authenticateAdmin(email, password);
  if (!result.success || !result.admin) {
    res.status(401).json({ error: result.message || 'Invalid email or password.' });
    return;
  }

  const session = createAdminSession(result.admin);

  res.json({
    success: true,
    token: session.token,
    user: {
      id: result.admin.id,
      name: result.admin.name,
      email: result.admin.email,
      role: result.admin.role
    }
  });
});

apiRouter.post('/admin/logout', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    destroySession(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

apiRouter.get('/admin/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const users = db.get('adminUsers') || [];
  const user = users.find(u => u.id === req.admin?.adminId);
  if (!user) {
    res.status(404).json({ error: 'Admin user not found' });
    return;
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

// ==========================================
// 3. ADMIN DASHBOARD STATS
// ==========================================

apiRouter.get('/admin/dashboard', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const tours = db.get('tours') || [];
  const bookings = db.get('bookings') || [];
  const customers = db.get('customers') || [];
  const notifications = db.get('notifications') || [];

  const totalTours = tours.length;
  const activeTours = tours.filter(t => t.published !== false && t.status !== 'Cancelled' && t.status !== 'Completed').length;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.bookingStatus === 'Pending' || b.paymentStatus === 'Payment Verification Pending').length;
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const cancelledBookings = bookings.filter(b => b.bookingStatus === 'Cancelled').length;

  const totalCustomers = customers.length;
  const pendingPayments = bookings.filter(b => (b.paymentStatus as any) === 'Payment Verification Pending' || (b.paymentStatus as any) === 'Unpaid' || ((b as any).dueAmount || 0) > 0).length;
  const confirmedPayments = bookings.filter(b => (b.paymentStatus as any) === 'Verified' || (b.paymentStatus as any) === 'Paid').length;

  const totalRevenue = bookings.filter(b => b.bookingStatus !== 'Cancelled').reduce((sum, b) => sum + ((b as any).paidAmount || (b.paymentStatus === 'Verified' ? b.finalAmount : 0)), 0);
  const totalDue = bookings.filter(b => b.bookingStatus !== 'Cancelled').reduce((sum, b) => sum + ((b as any).dueAmount || 0), 0);

  const recentBookings = bookings.slice(0, 6);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  res.json({
    totalTours,
    activeTours,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    totalCustomers,
    pendingPayments,
    confirmedPayments,
    totalRevenue,
    totalDue,
    unreadNotifications,
    recentBookings
  });
});

// ==========================================
// 4. ADMIN TOUR MANAGEMENT
// ==========================================

apiRouter.get('/admin/tours', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const tours = db.get('tours') || [];
  res.json(tours);
});

apiRouter.post('/admin/tours', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const data = req.body;
  const priceAdult = Number(data.priceAdult || data.priceRegular || data.priceDiscount || 0);
  if (!data.titleBn || !data.titleEn || priceAdult <= 0) {
    res.status(400).json({ error: 'Title and package price are required' });
    return;
  }

  const tours = db.get('tours') || [];
  const id = `tb-tour-${String(tours.length + 1).padStart(3, '0')}-${Date.now().toString(36)}`;
  const slug = data.slug || data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newTour = {
    ...data,
    id,
    code: data.code || `TB-${tours.length + 1}`,
    slug,
    totalSeats: Number(data.totalSeats || data.maxSeats) || 36,
    bookedSeats: Number(data.bookedSeats) || 0,
    priceAdult,
    priceChild: Number(data.priceChild) || 0,
    priceInfant: Number(data.priceInfant) || 0,
    durationDays: Number(data.durationDays) || 1,
    durationNights: Number(data.durationNights) || 0,
    published: data.published !== false,
    status: data.status || 'Booking Open',
    travelDates: Array.isArray(data.travelDates) && data.travelDates.length ? data.travelDates : [data.departureDate || '2026-10-15'],
    itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
    includedBn: Array.isArray(data.includedBn) ? data.includedBn : [],
    includedEn: Array.isArray(data.includedEn) ? data.includedEn : [],
    excludedBn: Array.isArray(data.excludedBn) ? data.excludedBn : [],
    excludedEn: Array.isArray(data.excludedEn) ? data.excludedEn : []
  };

  tours.unshift(newTour);
  db.set('tours', tours);

  res.status(201).json({ success: true, tour: newTour });
});

apiRouter.put('/admin/tours/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const tours = db.get('tours') || [];
  const index = tours.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Tour package not found' });
    return;
  }

  const existing = tours[index];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id // protect ID
  };

  tours[index] = updated;
  db.set('tours', tours);

  res.json({ success: true, tour: updated });
});

apiRouter.delete('/admin/tours/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const tours = db.get('tours') || [];
  const filtered = tours.filter(t => t.id !== req.params.id);
  if (filtered.length === tours.length) {
    res.status(404).json({ error: 'Tour package not found' });
    return;
  }
  db.set('tours', filtered);
  res.json({ success: true, message: 'Tour deleted successfully' });
});

// ==========================================
// 5. ADMIN BOOKING MANAGEMENT
// ==========================================

apiRouter.get('/admin/bookings', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const bookings = db.get('bookings') || [];
  const { search, bookingStatus, paymentStatus, travelDate, tourId } = req.query;

  let filtered = [...bookings];

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(b => 
      b.bookingId.toLowerCase().includes(q) ||
      b.leadTravelerName.toLowerCase().includes(q) ||
      b.leadMobile.includes(q) ||
      b.transactionId.toLowerCase().includes(q) ||
      (b.tourTitleBn && b.tourTitleBn.toLowerCase().includes(q)) ||
      (b.tourTitleEn && b.tourTitleEn.toLowerCase().includes(q))
    );
  }

  if (bookingStatus && bookingStatus !== 'all') {
    filtered = filtered.filter(b => b.bookingStatus === bookingStatus);
  }

  if (paymentStatus && paymentStatus !== 'all') {
    filtered = filtered.filter(b => b.paymentStatus === paymentStatus);
  }

  if (travelDate && typeof travelDate === 'string') {
    filtered = filtered.filter(b => b.travelDate === travelDate);
  }

  if (tourId && typeof tourId === 'string') {
    filtered = filtered.filter(b => b.tourId === tourId);
  }

  res.json(filtered);
});

apiRouter.put('/admin/bookings/:id/status', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { bookingStatus, paymentStatus, paidAmount, notes } = req.body;
  const bookings = db.get('bookings') || [];
  const booking = bookings.find(b => b.id === req.params.id || b.bookingId === req.params.id);

  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  if (bookingStatus) booking.bookingStatus = bookingStatus;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  if (paidAmount !== undefined) {
    booking.paidAmount = Number(paidAmount);
    booking.dueAmount = Math.max(0, booking.finalAmount - booking.paidAmount);
  }
  if (notes !== undefined) booking.notes = notes;

  if (paymentStatus === 'Verified' || paymentStatus === 'Paid') {
    booking.verifiedAt = new Date().toISOString();
    booking.verifiedBy = req.admin?.email || 'Admin';
    if (!booking.paidAmount || booking.paidAmount === 0) {
      booking.paidAmount = booking.finalAmount;
      booking.dueAmount = 0;
    }
  }

  // Update corresponding payment record
  const payments = db.get('payments') || [];
  const pay = payments.find(p => p.bookingId === booking.bookingId);
  if (pay) {
    if (paymentStatus === 'Paid' || paymentStatus === 'Verified') {
      pay.paymentStatus = 'Paid';
      pay.amount = booking.paidAmount;
      pay.verifiedBy = req.admin?.email;
      pay.verifiedAt = new Date().toISOString();
    } else if (paymentStatus === 'Refunded') {
      pay.paymentStatus = 'Refunded';
    } else if (paymentStatus === 'Partial') {
      pay.paymentStatus = 'Partial';
      pay.amount = booking.paidAmount;
    }
  }

  // If status is confirmed/cancelled, notify
  const notifications = db.get('notifications') || [];
  notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `বুকিং আপডেট: ${booking.bookingId}`,
    message: `${booking.leadTravelerName} এর বুকিং স্ট্যাটাস ${booking.bookingStatus} এবং পেমেন্ট ${booking.paymentStatus} করা হয়েছে।`,
    type: 'booking_status',
    read: false,
    createdAt: new Date().toISOString(),
    bookingId: booking.bookingId,
    customerName: booking.leadTravelerName
  });
  db.set('notifications', notifications);

  db.save();

  res.json({ success: true, booking });
});

// ==========================================
// 6. ADMIN CUSTOMER MANAGEMENT
// ==========================================

apiRouter.get('/admin/customers', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const customers = db.get('customers') || [];
  const bookings = db.get('bookings') || [];
  const { search } = req.query;

  // Recalculate stats dynamically from real bookings
  const enriched = customers.map(c => {
    const custBookings = bookings.filter(b => b.leadMobile === c.phone);
    const totalSpent = custBookings.filter(b => b.bookingStatus !== 'Cancelled').reduce((sum, b) => sum + (b.paidAmount || 0), 0);
    return {
      ...c,
      totalBookings: custBookings.length,
      totalSpent
    };
  });

  let results = enriched;
  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    results = results.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.address && c.address.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

apiRouter.get('/admin/customers/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const customers = db.get('customers') || [];
  const customer = customers.find(c => c.id === req.params.id || c.phone === req.params.id);
  if (!customer) {
    res.status(404).json({ error: 'Customer not found' });
    return;
  }

  const bookings = db.get('bookings') || [];
  const customerBookings = bookings.filter(b => b.leadMobile === customer.phone);

  res.json({
    customer,
    bookings: customerBookings
  });
});

// ==========================================
// 7. ADMIN PAYMENT MANAGEMENT
// ==========================================

apiRouter.get('/admin/payments', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const payments = db.get('payments') || [];
  const { method, status, search } = req.query;

  let filtered = [...payments];

  if (method && method !== 'all') {
    filtered = filtered.filter(p => p.paymentMethod === method);
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(p => p.paymentStatus === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.bookingId.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.customerPhone.includes(q) ||
      p.transactionId.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

apiRouter.put('/admin/payments/:id', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const payments = db.get('payments') || [];
  const pay = payments.find(p => p.id === req.params.id || p.transactionId === req.params.id);
  if (!pay) {
    res.status(404).json({ error: 'Payment record not found' });
    return;
  }

  const { paymentStatus, amount, notes } = req.body;
  if (paymentStatus) pay.paymentStatus = paymentStatus;
  if (amount !== undefined) pay.amount = Number(amount);
  if (notes !== undefined) pay.notes = notes;
  pay.verifiedBy = req.admin?.email;
  pay.verifiedAt = new Date().toISOString();

  // Sync back with booking
  const bookings = db.get('bookings') || [];
  const booking = bookings.find(b => b.bookingId === pay.bookingId);
  if (booking) {
    if (paymentStatus === 'Paid') {
      booking.paymentStatus = 'Verified';
      booking.paidAmount = pay.amount;
      booking.dueAmount = Math.max(0, booking.finalAmount - booking.paidAmount);
      booking.verifiedAt = pay.verifiedAt;
      booking.verifiedBy = pay.verifiedBy;
    } else if (paymentStatus === 'Refunded') {
      booking.paymentStatus = 'Refunded';
      booking.bookingStatus = 'Cancelled';
    }
  }

  db.save();
  res.json({ success: true, payment: pay });
});

// ==========================================
// 8. ADMIN NOTIFICATIONS
// ==========================================

apiRouter.get('/admin/notifications', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const notifications = db.get('notifications') || [];
  res.json(notifications);
});

apiRouter.put('/admin/notifications/:id/read', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const notifications = db.get('notifications') || [];
  const notif = notifications.find(n => n.id === req.params.id);
  if (notif) {
    notif.read = true;
    db.save();
  }
  res.json({ success: true });
});

apiRouter.put('/admin/notifications/mark-all-read', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const notifications = db.get('notifications') || [];
  notifications.forEach(n => { n.read = true; });
  db.save();
  res.json({ success: true, message: 'All notifications marked as read' });
});

// ==========================================
// 9. ADMIN REPORTS
// ==========================================

apiRouter.get('/admin/reports', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const { range, startDate, endDate } = req.query;
  const bookings = db.get('bookings') || [];
  const now = new Date();

  let filtered = [...bookings];

  if (range === 'today') {
    const todayStr = now.toISOString().split('T')[0];
    filtered = filtered.filter(b => b.createdAt.startsWith(todayStr));
  } else if (range === 'week') {
    const oneWeekAgo = new Date(now.getTime() - 7 * 86400000);
    filtered = filtered.filter(b => new Date(b.createdAt) >= oneWeekAgo);
  } else if (range === 'month') {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    filtered = filtered.filter(b => new Date(b.createdAt) >= startOfMonth);
  } else if (range === 'custom' && startDate && endDate) {
    filtered = filtered.filter(b => {
      const bDate = b.createdAt.split('T')[0];
      return bDate >= String(startDate) && bDate <= String(endDate);
    });
  }

  const bookingCount = filtered.length;
  const validBookings = filtered.filter(b => b.bookingStatus !== 'Cancelled');
  const revenue = validBookings.reduce((sum, b) => sum + b.finalAmount, 0);
  const paidAmount = validBookings.reduce((sum, b) => sum + (b.paidAmount || (b.paymentStatus === 'Verified' ? b.finalAmount : 0)), 0);
  const dueAmount = validBookings.reduce((sum, b) => sum + (b.dueAmount || 0), 0);
  const cancelledCount = filtered.filter(b => b.bookingStatus === 'Cancelled').length;

  // Popular tours breakdown
  const tourCounts: Record<string, { title: string; count: number; revenue: number }> = {};
  filtered.forEach(b => {
    if (!tourCounts[b.tourId]) {
      tourCounts[b.tourId] = {
        title: b.tourTitleBn || b.tourTitleEn,
        count: 0,
        revenue: 0
      };
    }
    tourCounts[b.tourId].count += 1;
    if (b.bookingStatus !== 'Cancelled') {
      tourCounts[b.tourId].revenue += b.finalAmount;
    }
  });

  const popularTours = Object.entries(tourCounts)
    .map(([tourId, data]) => ({ tourId, ...data }))
    .sort((a, b) => b.count - a.count);

  res.json({
    range: range || 'all',
    bookingCount,
    revenue,
    paidAmount,
    dueAmount,
    cancelledCount,
    popularTours
  });
});

// ==========================================
// 10. ADMIN SETTINGS
// ==========================================

apiRouter.get('/admin/settings', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const settings = db.get('settings');
  res.json(settings);
});

apiRouter.put('/admin/settings', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  const current = db.get('settings');
  const updated = {
    ...current,
    ...req.body
  };
  db.set('settings', updated);
  res.json({ success: true, settings: updated });
});
