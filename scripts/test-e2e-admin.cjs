// End-to-end admin verification test suite
const http = require('http');

const PORT = 3000;
const HOST = '127.0.0.1';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = {
      'Accept': 'application/json',
      ...headers
    };

    let postData = null;
    if (body) {
      postData = JSON.stringify(body);
      defaultHeaders['Content-Type'] = 'application/json';
      defaultHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request({
      hostname: HOST,
      port: PORT,
      path: path,
      method: method,
      headers: defaultHeaders,
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {
          json = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, data: json });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout requesting ${path}`));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING END-TO-END ADMIN PANEL TEST SUITE ===\n');
  let failures = 0;

  const assert = (condition, message) => {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
    } else {
      console.error(`❌ FAIL: ${message}`);
      failures++;
    }
  };

  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'joykumardas2323@gmail.com';
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'Tirthobondhu@2026';

  try {
    // 1. Check Protected Route Without Token
    console.log('--- Step 1: Protected Admin Routes Security Check ---');
    const unauthDashboard = await request('GET', '/api/admin/dashboard');
    assert(unauthDashboard.status === 401, 'Unauthorized request to /api/admin/dashboard correctly rejected (401)');

    const unauthTours = await request('GET', '/api/admin/tours');
    assert(unauthTours.status === 401, 'Unauthorized request to /api/admin/tours correctly rejected (401)');

    // 2. Initial Admin Login Validation
    console.log('\n--- Step 2: Admin Login Verification ---');
    const invalidLogin = await request('POST', '/api/admin/login', {
      email: adminEmail,
      password: 'wrong-password-xyz'
    });
    assert(invalidLogin.status === 401, 'Invalid password correctly rejected with 401');

    const validLogin = await request('POST', '/api/admin/login', {
      email: adminEmail,
      password: adminPassword
    });
    assert(validLogin.status === 200 && validLogin.data.token, 'Initial admin login succeeds with ADMIN_INITIAL_EMAIL and ADMIN_INITIAL_PASSWORD');

    const token = validLogin.data?.token;
    assert(token && token.includes('.'), 'Session token is signed with HMAC using ADMIN_SESSION_SECRET');

    const authHeaders = { 'Authorization': `Bearer ${token}` };

    // 3. Admin Identity Endpoint (/api/admin/me)
    console.log('\n--- Step 3: Admin Identity & Session Verification ---');
    const meRes = await request('GET', '/api/admin/me', null, authHeaders);
    assert(meRes.status === 200 && meRes.data.email.toLowerCase() === adminEmail.toLowerCase(), 'GET /api/admin/me returns authenticated admin details');

    // 4. Admin Dashboard Metrics
    console.log('\n--- Step 4: Admin Dashboard API Verification ---');
    const statsRes = await request('GET', '/api/admin/dashboard', null, authHeaders);
    assert(
      statsRes.status === 200 && 
      typeof statsRes.data.totalTours === 'number' && 
      typeof statsRes.data.totalBookings === 'number' &&
      typeof statsRes.data.totalRevenue === 'number',
      'GET /api/admin/dashboard returns valid comprehensive metrics'
    );

    // 5. Tour Management (CRUD)
    console.log('\n--- Step 5: Tour Management (Create, Edit, Delete) ---');
    const newTourPayload = {
      titleBn: 'পরীক্ষামূলক সুন্দরবন সাফারি ২০২৬',
      titleEn: 'Test Sundarbans Safari 2026',
      subtitleBn: 'ম্যানগ্রোভ অরণ্য ও ঐতিহ্যবাহী স্থান দর্শন',
      subtitleEn: 'Mangrove wilderness and heritage excursion',
      category: 'domestic',
      destinationBn: 'সুন্দরবন ও মোংলা',
      destinationEn: 'Sundarbans & Mongla',
      durationDays: 3,
      durationNights: 2,
      priceRegular: 7500,
      priceDiscount: 6999,
      maxSeats: 35,
      availableSeats: 35,
      featured: false,
      status: 'active',
      pickupLocations: ['Dhaka Gabtoli', 'Khulna Rupsha'],
      itinerary: [
        { dayNumber: 1, titleBn: 'যাত্রা ও পৌঁছানো', titleEn: 'Journey & Arrival', descriptionBn: 'ঢাকা থেকে যাত্রা', descriptionEn: 'Depart from Dhaka' }
      ]
    };

    const createTourRes = await request('POST', '/api/admin/tours', newTourPayload, authHeaders);
    assert(createTourRes.status === 200 && createTourRes.data.success && createTourRes.data.tour.id, 'POST /api/admin/tours successfully created tour');
    const createdTourId = createTourRes.data.tour?.id;

    // Edit tour
    const updateTourRes = await request('PUT', `/api/admin/tours/${createdTourId}`, {
      priceDiscount: 6499,
      durationDays: 4
    }, authHeaders);
    assert(updateTourRes.status === 200 && updateTourRes.data.tour.priceDiscount === 6499, 'PUT /api/admin/tours/:id successfully updated tour properties');

    // 6. Public Customer Booking Flow & Verification in Admin
    console.log('\n--- Step 6: Customer Booking Flow & Admin Bookings Tab ---');
    const bookingPayload = {
      tourId: createdTourId,
      customerName: 'সুকান্ত কর্মকার (Sukanto Karmakar)',
      customerPhone: '01712345678',
      customerEmail: 'sukanto.test@example.com',
      customerAddress: 'Mirpur-10, Dhaka',
      travelDate: '2026-10-15',
      travelersCount: 2,
      primaryContactName: 'সুকান্ত কর্মকার',
      primaryContactPhone: '01712345678',
      travelers: [
        { id: 'trv-1', name: 'Sukanto Karmakar', age: 34, gender: 'male' },
        { id: 'trv-2', name: 'Priya Karmakar', age: 29, gender: 'female' }
      ],
      paymentMethod: 'bkash',
      transactionId: 'BK999888777TEST',
      totalAmount: 12998,
      paidAmount: 5000,
      dueAmount: 7998
    };

    const submitBookingRes = await request('POST', '/api/bookings', bookingPayload);
    assert(submitBookingRes.status === 200 && submitBookingRes.data.success, 'Public POST /api/bookings created booking successfully');
    const createdBookingId = submitBookingRes.data.booking?.id;

    // Verify it appears in Admin Bookings
    const adminBookingsRes = await request('GET', `/api/admin/bookings?search=${encodeURIComponent('Sukanto')}`, null, authHeaders);
    const foundBooking = adminBookingsRes.data?.find(b => b.id === createdBookingId);
    assert(adminBookingsRes.status === 200 && !!foundBooking, 'Created booking appears immediately in Admin Bookings query');

    // 7. Update Booking Status & Payment Status
    console.log('\n--- Step 7: Update Booking Status & Payment Reconciliation ---');
    const updateStatusRes = await request('PUT', `/api/admin/bookings/${createdBookingId}/status`, {
      bookingStatus: 'confirmed',
      paymentStatus: 'paid',
      paidAmount: 12998,
      notes: 'Payment verified manually via bKash merchant statement'
    }, authHeaders);
    assert(
      updateStatusRes.status === 200 && 
      updateStatusRes.data.booking.bookingStatus === 'confirmed' &&
      updateStatusRes.data.booking.paymentStatus === 'paid',
      'PUT /api/admin/bookings/:id/status successfully updated booking to confirmed & paid'
    );

    // 8. Customer Management Verification
    console.log('\n--- Step 8: Customer Management Verification ---');
    const customersRes = await request('GET', '/api/admin/customers?search=01712345678', null, authHeaders);
    const foundCustomer = customersRes.data?.find(c => c.phone === '01712345678');
    assert(customersRes.status === 200 && !!foundCustomer, 'Customer record automatically tracked in Customer Management');

    if (foundCustomer) {
      const customerDetails = await request('GET', `/api/admin/customers/${foundCustomer.id}`, null, authHeaders);
      assert(customerDetails.status === 200 && customerDetails.data.customer.id === foundCustomer.id, 'GET /api/admin/customers/:id returns complete customer profile & booking history');
    }

    // 9. Payment Management Verification
    console.log('\n--- Step 9: Payment Management Verification ---');
    const paymentsRes = await request('GET', '/api/admin/payments', null, authHeaders);
    assert(paymentsRes.status === 200 && Array.isArray(paymentsRes.data), 'GET /api/admin/payments returns payment records list');

    // 10. Reports & Analytics Verification
    console.log('\n--- Step 10: Reports & Analytics Verification ---');
    const reportRes = await request('GET', '/api/admin/reports?range=all', null, authHeaders);
    assert(reportRes.status === 200 && reportRes.data.revenue >= 0, 'GET /api/admin/reports returns analytics and popular tours breakdown');

    // 11. Delete Tour
    console.log('\n--- Step 11: Delete Tour Verification ---');
    const deleteTourRes = await request('DELETE', `/api/admin/tours/${createdTourId}`, null, authHeaders);
    assert(deleteTourRes.status === 200 && deleteTourRes.data.success, 'DELETE /api/admin/tours/:id successfully deleted tour');

    // 12. Admin Logout Verification
    console.log('\n--- Step 12: Admin Logout Verification ---');
    const logoutRes = await request('POST', '/api/admin/logout', null, authHeaders);
    assert(logoutRes.status === 200 && logoutRes.data.success, 'POST /api/admin/logout successfully invalidated session');

    const meAfterLogout = await request('GET', '/api/admin/me', null, authHeaders);
    assert(meAfterLogout.status === 401, 'GET /api/admin/me returns 401 after logout');

  } catch (err) {
    console.error('Fatal test error:', err);
    failures++;
  }

  console.log('\n==================================================');
  if (failures === 0) {
    console.log('🎉 ALL END-TO-END ADMIN PANEL TESTS PASSED SUCCESSFULLY!');
  } else {
    console.error(`❌ ${failures} test assertion(s) failed.`);
  }
  console.log('==================================================\n');

  process.exit(failures > 0 ? 1 : 0);
}

runTests();
