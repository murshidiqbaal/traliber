import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin Portal | Traliber',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

