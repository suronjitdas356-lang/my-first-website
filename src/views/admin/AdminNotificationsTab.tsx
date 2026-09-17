import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { AdminNotification } from '../../../server/db';
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';

interface AdminNotificationsTabProps {
  onSelectBooking?: (bookingId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const AdminNotificationsTab: React.FC<AdminNotificationsTabProps> = ({ onSelectBooking, onNavigateTab }) => {
  const { lang, adminNotifications, refreshAdminNotifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshAdminNotifications();
  }, [refreshAdminNotifications]);

  const handleItemClick = (n: AdminNotification) => {
    if (!n.read) {
      markNotificationRead(n.id);
    }
    if (n.bookingId) {
      if (onSelectBooking) onSelectBooking(n.bookingId);
      onNavigateTab('bookings');
    }
  };

  const unreadCount = adminNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-700" />
            <span>{lang === 'bn' ? 'অ্যাডমিন নোটিফিকেশন সেন্টার' : 'Admin Notification Center'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {lang === 'bn' 
              ? 'নতুন বুকিং, পেমেন্ট সাবমিশন ও যাত্রীদের স্ট্যাটাস পরিবর্তনের সার্বক্ষণিক নোটিফিকেশন।' 
              : 'Real-time booking submissions, TrxID verifications, and passenger alerts.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllNotificationsRead()}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'সব পঠিত হিসেবে চিহ্নিত করুন' : 'Mark all as read'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm divide-y divide-stone-100 overflow-hidden">
        {adminNotifications.length === 0 ? (
          <div className="py-16 text-center text-stone-400">
            <Bell className="w-8 h-8 mx-auto mb-2 text-stone-300" />
            <p className="text-sm font-medium">
              {lang === 'bn' ? 'কোনো নোটিফিকেশন নেই।' : 'No notifications currently.'}
            </p>
          </div>
        ) : (
          adminNotifications.map((n) => {
            const isNewBooking = n.type === 'new_booking';
            const isPayment = n.type === 'payment_update';

            return (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                className={`p-4 transition-colors cursor-pointer flex items-start gap-3.5 ${
                  n.read ? 'bg-white hover:bg-stone-50' : 'bg-amber-50/50 hover:bg-amber-100/50'
                }`}
              >
                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isNewBooking 
                    ? 'bg-blue-100 text-blue-800' 
                    : isPayment 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isNewBooking ? <Calendar className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-xs font-bold ${n.read ? 'text-stone-800' : 'text-stone-900'}`}>
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-stone-400 font-mono shrink-0">
                      {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now'}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    {n.message}
                  </p>

                  {n.bookingId && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                        {n.bookingId}
                      </span>
                      <span className="text-[10px] text-amber-700 font-medium flex items-center gap-0.5 hover:underline">
                        <span>{lang === 'bn' ? 'বুকিং দেখুন' : 'View booking'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Unread indicator */}
                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0 mt-2"></span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
