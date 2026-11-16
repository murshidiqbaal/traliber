import React from 'react';
import { Palmtree, Briefcase, Compass, Users, Backpack, Sparkles, Check } from 'lucide-react';
import { TravelPurpose } from '@/lib/travel-recommendations';

interface StepPurposeProps {
  selectedPurpose: TravelPurpose;
  onSelectPurpose: (purpose: TravelPurpose) => void;
  onNext: () => void;
  onBack: () => void;
}

const PURPOSES: {
  id: TravelPurpose;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'leisure',
    title: 'Leisure / Holiday',
    desc: 'Relaxing vacations, city exploration, and sightseeing with balanced travel essentials.',
    icon: Palmtree,
  },
  {
    id: 'business',
    title: 'Business Trip',
    desc: 'Work travel, client visits, conferences, and sharp personal grooming touch-ups.',
    icon: Briefcase,
  },
  {
    id: 'adventure',
    title: 'Adventure / Outdoor',
    desc: 'Trekking, hiking, camping, and outdoor exploration requiring moisture and blister protection.',
    icon: Compass,
  },
  {
    id: 'family',
    title: 'Family Trip',
    desc: 'Travelling with spouse, parents, or kids. Shared and individual hygiene calculated separately.',
    icon: Users,
  },
  {
    id: 'backpacking',
    title: 'Backpacking',
    desc: 'Hostels, sleeper transits, and lightweight packs prioritizing ultra-compact dry essentials.',
    icon: Backpack,
  },
  {
    id: 'other',
    title: 'Other Journey',
    desc: 'Pilgrimage, emergency travel, solo expeditions, or custom itinerary requirements.',
    icon: Sparkles,
  },
];

export const StepPurpose: React.FC<StepPurposeProps> = ({
  selectedPurpose,
  onSelectPurpose,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 2 of 6 • Travel Purpose
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          What is the purpose of this trip?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Your travel style determines whether we prioritize compact grooming, family-sharing consumables, or rugged outdoor protection.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PURPOSES.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedPurpose === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPurpose(item.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#8657F6] bg-[#8657F6]/5 shadow-sm ring-2 ring-[#8657F6]/20'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#8657F6] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#8657F6] text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-[#1E1B4B]">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          ← Back to Dates
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#1E1B4B] hover:bg-[#2C2860] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Transport Mode</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

