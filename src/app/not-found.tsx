import Link from 'next/link';
import { Compass, ArrowLeft, Home, Package, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F7FC] text-[#22213A] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#8657F6]/10 text-[#8657F6] flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8657F6]">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1E1B4B]">
            Journey Took a Wrong Turn
          </h1>
          <p className="text-sm text-[#22213A]/70 leading-relaxed">
            The page you are looking for has been moved, renamed, or does not exist. Let&apos;s get you back on track.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-bold shadow-md transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/travel-essentials-kit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-[#1E1B4B] text-xs font-bold border border-[#22213A]/15 shadow-xs transition-all"
          >
            <Package className="w-3.5 h-3.5 text-[#4F75FF]" />
            <span>View The Kit</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-[#22213A]/10 text-xs text-[#22213A]/60 flex items-center justify-center gap-4">
          <Link href="/travel-hygiene-guides" className="hover:text-[#4F75FF] transition-colors">
            Hygiene Guides
          </Link>
          <span>•</span>
          <Link href="/faq" className="hover:text-[#4F75FF] transition-colors">
            FAQ
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#4F75FF] transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

