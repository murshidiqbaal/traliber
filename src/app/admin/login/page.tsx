'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = 'traliber2026@gmail.com';
const ADMIN_PASSWORD = 'Traliber@2026';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to /admin directly
  useEffect(() => {
    try {
      const auth = localStorage.getItem('traliber_admin_auth');
      if (auth === 'true') {
        router.replace('/admin');
      }
    } catch (_) {}
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    setTimeout(() => {
      if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPass === ADMIN_PASSWORD) {
        try {
          localStorage.setItem('traliber_admin_auth', 'true');
          localStorage.setItem('traliber_admin_email', cleanEmail);
          localStorage.setItem('traliber_admin_login_at', new Date().toISOString());
        } catch (_) {}
        router.replace('/admin');
      } else {
        setIsLoading(false);
        setError('Invalid admin credentials. Please verify your email and password.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F7FC] text-[#22213A] relative overflow-hidden select-none">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#4F75FF]/10 via-[#8657F6]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Bar with return link */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#22213A]/70 hover:text-[#4F75FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Live Website</span>
        </Link>
        <div className="text-[11px] font-mono text-[#22213A]/50 hidden sm:block">
          Shortcut: <span className="bg-white px-2 py-0.5 rounded border border-[#22213A]/10 font-bold">Ctrl + Shift + A</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative z-10 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#22213A]/[0.08] shadow-[0_12px_40px_rgba(30,27,75,0.06)] space-y-7">
          
          {/* Card Header & Brand Icon */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#1E1B4B] text-white flex items-center justify-center mx-auto shadow-md shadow-[#1E1B4B]/20">
              <ShieldCheck className="w-7 h-7 text-[#55C7DE]" />
            </div>
            <div>
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#4F75FF] block mb-1">
                TRALIBER PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1E1B4B] tracking-tight">
                Admin Authentication
              </h1>
              <p className="text-xs sm:text-sm text-[#22213A]/60 mt-1">
                Enter your authorized credentials to manage live kit inventory and content.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-email"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1B4B]"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="traliber2026@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F7FC] border border-[#22213A]/[0.12] text-sm text-[#1E1B4B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-password"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1E1B4B]"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F8F7FC] border border-[#22213A]/[0.12] text-sm text-[#1E1B4B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#1E1B4B] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Fill Helper for Convenience */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setEmail(ADMIN_EMAIL);
                  setPassword(ADMIN_PASSWORD);
                  setError('');
                }}
                className="text-3xs font-mono text-[#4F75FF] hover:underline"
              >
                Auto-fill Authorized Credentials
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-[#1E1B4B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#55C7DE]" />
                    <span>Sign In to Console</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="pt-2 text-center text-3xs text-[#22213A]/50 border-t border-[#22213A]/[0.06]">
            Authorized personnel only. Sessions are saved locally in your browser.
          </div>

        </div>
      </main>

      {/* Footer copyright */}
      <footer className="w-full py-4 text-center text-3xs text-[#22213A]/40 relative z-10">
        © 2026 Traliber Travel Essentials. All rights reserved.
      </footer>
    </div>
  );
}
