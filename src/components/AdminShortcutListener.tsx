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

  // Keep keyboard listener active, but do not render any visual floating shortcut icon on screen
  return null;
};
