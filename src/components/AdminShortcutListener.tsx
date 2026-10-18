'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Settings, X } from 'lucide-react';

export const AdminShortcutListener: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on Ctrl + Shift + A or Cmd + Shift + A
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (pathname === '/admin') {
          router.push('/');
        } else {
          router.push('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname]);

  // Don't render shortcut badge if already on the admin page
  if (pathname === '/admin') return null;

  return (
    <>
      {/* Discreet floating admin badge in bottom-left */}
      <div className="fixed bottom-5 left-5 z-40">
        <a
          href="/admin"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#8657F6]/20 shadow-md hover:shadow-lg text-[11px] font-bold text-[#22213A] transition-all hover:bg-white active:scale-95"
          title="Open Admin Panel (Shortcut: Ctrl + Shift + A)"
        >
          <Settings className="w-3.5 h-3.5 text-[#8657F6] group-hover:rotate-45 transition-transform" />
          <span>Admin</span>
          <span className="hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-[#22213A]/70 border border-gray-200">
            Ctrl + Shift + A
          </span>
        </a>
      </div>
    </>
  );
};
