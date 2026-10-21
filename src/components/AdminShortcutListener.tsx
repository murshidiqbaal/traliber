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
        const isAuthenticated =
          typeof window !== 'undefined' &&
          localStorage.getItem('traliber_admin_auth') === 'true';

        if (pathname === '/admin' || pathname === '/admin/login') {
          router.push('/');
        } else if (isAuthenticated) {
          router.push('/admin');
        } else {
          router.push('/admin/login');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, pathname]);

  // Keep keyboard listener active, but do not render any visual floating shortcut icon on screen
  return null;
};
