import { TourPackage, Booking, CustomerReview } from '../types/index';
import { CompanySettings, AdminNotification, CustomerRecord, PaymentRecord } from '../../server/db';

const API_BASE = '/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('tb_admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export interface DashboardStats {
  totalTours: number;
  activeTours: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalCustomers: number;
  pendingPayments: number;
  confirmedPayments: number;
  totalRevenue: number;
  totalDue: number;
  unreadNotifications: number;
  recentBookings: (Booking & { paidAmount: number; dueAmount: number })[];
}

export interface ReportData {
  range: string;
  bookingCount: number;
  revenue: number;
  paidAmount: number;
  dueAmount: number;
  cancelledCount: number;
  popularTours: { tourId: string; title: string; count: number; revenue: number }[];
}

export const api = {
  // Public
  async getPublicTours(): Promise<TourPackage[]> {
    const res = await fetch(`${API_BASE}/tours`);
    if (!res.ok) throw new Error('Failed to load tours');
    return res.json();
  },

  async getPublicTour(id: string): Promise<TourPackage> {
    const res = await fetch(`${API_BASE}/tours/${id}`);
    if (!res.ok) throw new Error('Failed to load tour details');
    return res.json();
  },

  async submitBooking(data: Partial<Booking>): Promise<{ success: boolean; booking: Booking; message: string }> {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Booking failed');
    return json;
  },

  async getPublicSettings(): Promise<CompanySettings> {
    const res = await fetch(`${API_BASE}/settings/public`);
    if (!res.ok) throw new Error('Failed to load settings');
    return res.json();
  },

  async getReviews(): Promise<CustomerReview[]> {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) return [];
    return res.json();
  },

  async submitReview(data: Partial<CustomerReview>): Promise<any> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin Auth
  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: { id: string; name: string; email: string; role: string } }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Authentication failed');
    return json;
  },

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE}/admin/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('tb_admin_token');
      localStorage.removeItem('tb_admin_user');
    }
  },

  async getMe(): Promise<{ id: string; name: string; email: string; role: string }> {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },

  // Admin Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load dashboard stats');
    return res.json();
  },

  // Admin Tours
  async getAdminTours(): Promise<TourPackage[]> {
    const res = await fetch(`${API_BASE}/admin/tours`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load tours');
    return res.json();
  },

  async createTour(tour: Partial<TourPackage>): Promise<{ success: boolean; tour: TourPackage }> {
    const res = await fetch(`${API_BASE}/admin/tours`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tour)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create tour');
    return json;
  },

  async updateTour(id: string, tour: Partial<TourPackage>): Promise<{ success: boolean; tour: TourPackage }> {
    const res = await fetch(`${API_BASE}/admin/tours/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tour)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update tour');
    return json;
  },

  async deleteTour(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/admin/tours/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete tour');
    return json;
  },

  // Admin Bookings
  async getAdminBookings(filters: { search?: string; bookingStatus?: string; paymentStatus?: string; travelDate?: string; tourId?: string } = {}): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.bookingStatus && filters.bookingStatus !== 'all') params.set('bookingStatus', filters.bookingStatus);
    if (filters.paymentStatus && filters.paymentStatus !== 'all') params.set('paymentStatus', filters.paymentStatus);
    if (filters.travelDate) params.set('travelDate', filters.travelDate);
    if (filters.tourId) params.set('tourId', filters.tourId);

    const res = await fetch(`${API_BASE}/admin/bookings?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load bookings');
    return res.json();
  },

  async updateBookingStatus(id: string, data: { bookingStatus?: string; paymentStatus?: string; paidAmount?: number; notes?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update booking status');
    return json;
  },

  // Admin Customers
  async getAdminCustomers(search?: string): Promise<CustomerRecord[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    const res = await fetch(`${API_BASE}/admin/customers${params}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load customers');
    return res.json();
  },

  async getAdminCustomerDetails(id: string): Promise<{ customer: CustomerRecord; bookings: Booking[] }> {
    const res = await fetch(`${API_BASE}/admin/customers/${id}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load customer details');
    return res.json();
  },

  // Admin Payments
  async getAdminPayments(filters: { method?: string; status?: string; search?: string } = {}): Promise<PaymentRecord[]> {
    const params = new URLSearchParams();
    if (filters.method && filters.method !== 'all') params.set('method', filters.method);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.search) params.set('search', filters.search);

    const res = await fetch(`${API_BASE}/admin/payments?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load payments');
    return res.json();
  },

  async updatePayment(id: string, data: { paymentStatus?: string; amount?: number; notes?: string }): Promise<any> {
    const res = await fetch(`${API_BASE}/admin/payments/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update payment');
    return json;
  },

  // Admin Reports
  async getAdminReports(range: string = 'all', startDate?: string, endDate?: string): Promise<ReportData> {
    const params = new URLSearchParams();
    params.set('range', range);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);

    const res = await fetch(`${API_BASE}/admin/reports?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load reports');
    return res.json();
  },

  // Admin Notifications
  async getAdminNotifications(): Promise<AdminNotification[]> {
    const res = await fetch(`${API_BASE}/admin/notifications`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load notifications');
    return res.json();
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`${API_BASE}/admin/notifications/${id}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
  },

  async markAllNotificationsRead(): Promise<void> {
    await fetch(`${API_BASE}/admin/notifications/mark-all-read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
  },

  // Admin Settings
  async getAdminSettings(): Promise<CompanySettings> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load settings');
    return res.json();
  },

  async updateAdminSettings(settings: Partial<CompanySettings>): Promise<{ success: boolean; settings: CompanySettings }> {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update settings');
    return json;
  }
};
