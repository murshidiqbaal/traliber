import React from 'react';
import { Users, User, Baby, Plus, Minus, Info } from 'lucide-react';

interface StepTravellersProps {
  adults: number;
  children: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepTravellers: React.FC<StepTravellersProps> = ({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  onNext,
  onBack,
}) => {
  const totalTravellers = adults + children;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 5 of 6 • Travellers
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          Who is travelling?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Specify adults and children. We distinguish between personal hygiene items (toothbrushes, toilet seat covers) and shared pack items (paper soap, wet/dry pouches) to prevent overpacking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Adults counter */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#8657F6] flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">Adults</h3>
              <p className="text-xs text-gray-500">Age 12 and above</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              disabled={adults <= 1}
              aria-label="Decrease Adults"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-8 text-center text-lg font-black text-[#1E1B4B]">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              aria-label="Increase Adults"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Children counter */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#4F75FF] flex items-center justify-center">
              <Baby className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">Children</h3>
              <p className="text-xs text-gray-500">Under 12 years</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onChildrenChange(Math.max(0, children - 1))}
              disabled={children <= 0}
              aria-label="Decrease Children"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <span className="w-8 text-center text-lg font-black text-[#1E1B4B]">
              {children}
            </span>
            <button
              type="button"
              onClick={() => onChildrenChange(children + 1)}
              aria-label="Increase Children"
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Traveller summary note */}
      <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E9E6F5] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#8657F6] shrink-0 mt-0.5" />
        <div className="text-xs text-gray-600 leading-relaxed">
          <strong className="text-[#1E1B4B]">
            Total Party: {totalTravellers} {totalTravellers === 1 ? 'Traveller' : 'Travellers'}.
          </strong>{' '}
          {totalTravellers === 1
            ? 'A single kit setup is recommended with personal essentials sized for 1 traveller.'
            : 'For multi-person groups, you can decide on the results page whether to order individual kits for each person or share 1 base kit with additional companion items.'}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          ← Back to Destination
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#1E1B4B] hover:bg-[#2C2860] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Packing Preferences</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

