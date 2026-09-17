import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  KeyRound 
} from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { lang, adminLogin, setCurrentView } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(lang === 'bn' ? 'ইমেইল এবং পাসওয়ার্ড দুটিই প্রয়োজন।' : 'Both email and password are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const success = await adminLogin(email, password);
      if (!success) {
        setError(lang === 'bn' ? 'ভুল ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।' : 'Invalid email or password. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || (lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে।' : 'Login failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 text-stone-100">
      <div className="max-w-md w-full space-y-8">
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-4 ring-amber-500/20 mb-4">
            <ShieldCheck className="w-9 h-9 text-stone-950" />
          </div>
          <div className="flex items-center justify-center gap-1 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'নিরাপদ প্রশাসনিক প্রবেশদ্বার' : 'Secure Admin Portal'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            {lang === 'bn' ? 'অ্যাডমিন লগইন' : 'Admin Portal Login'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-400">
            {lang === 'bn' 
              ? 'তীর্থবন্ধু ট্যুর অ্যান্ড ট্রাভেলস-এর অভ্যন্তরীণ অপারেশন পরিচালনা' 
              : 'Tirthobondhu Tour & Travels internal management portal'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                {lang === 'bn' ? 'অ্যাডমিন ইমেইল' : 'Admin Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tirthobondhu.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সুরক্ষিত প্রশাসনিক এনক্রিপশন' : 'Protected Admin Encryption'}</span>
              </span>
              <span className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'সেশন সময়সীমা: ৭ দিন' : 'Session: 7 Days'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-900/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying Credentials...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Authenticate & Enter Portal'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-6 pt-5 border-t border-stone-800 text-center">
            <p className="text-[11px] text-stone-500 leading-relaxed">
              {lang === 'bn' 
                ? 'এই প্যানেলটি শুধুমাত্র অনুমোদিত তীর্থবন্ধু অ্যাডমিনদের জন্য সংরক্ষিত। সাধারণ গ্রাহকবৃন্দ মূল ওয়েবসাইটে ফিরে যেতে পারেন।' 
                : 'This portal is restricted to authorized Tirthobondhu administrators only.'}
            </p>
          </div>
        </div>

        {/* Back to Public Website */}
        <div className="text-center">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Return to Customer Website'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
