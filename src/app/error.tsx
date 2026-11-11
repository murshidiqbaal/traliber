'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error for observability without exposing sensitive credentials
    console.error('[Traliber Error Boundary]:', error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FC] text-[#22213A] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500">
            System Notice
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-[#1E1B4B]">
            Something Didn&apos;t Go as Planned
          </h1>
          <p className="text-sm text-[#22213A]/70 leading-relaxed">
            An unexpected error occurred while loading this page. You can try refreshing or return to the main store.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-[#1E1B4B] text-xs font-bold border border-[#22213A]/15 shadow-xs transition-all"
          >
            <Home className="w-3.5 h-3.5 text-[#4F75FF]" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

