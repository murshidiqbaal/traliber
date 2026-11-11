'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#F8F7FC] text-[#22213A] p-4 font-sans">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Critical System Error</h1>
          <p className="text-xs text-[#22213A]/70">
            A critical application error occurred. Please try reloading the application.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-full bg-[#1E1B4B] text-white text-xs font-bold shadow-md cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

