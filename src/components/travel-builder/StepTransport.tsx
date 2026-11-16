import React from 'react';
import { Train, Plane, Bus, Car, Navigation, Check } from 'lucide-react';
import { TransportMode } from '@/lib/travel-recommendations';

interface StepTransportProps {
  selectedTransport: TransportMode;
  onSelectTransport: (transport: TransportMode) => void;
  onNext: () => void;
  onBack: () => void;
}

const TRANSPORTS: {
  id: TransportMode;
  title: string;
  desc: string;
  tip: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'train',
    title: 'Train Journey',
    desc: 'Indian Railways, intercity express, or long-haul sleeper transits.',
    tip: 'Prioritizes toilet seat covers, paper soap, and earplugs.',
    icon: Train,
  },
  {
    id: 'flight',
    title: 'Flight / Air Travel',
    desc: 'Domestic or international airlines, airport terminals, and connecting flights.',
    tip: 'Respects cabin liquid rules and suggests document organization.',
    icon: Plane,
  },
  {
    id: 'bus',
    title: 'Bus Transit',
    desc: 'Interstate AC sleepers, Volvo transit, or semi-sleeper overnight buses.',
    tip: 'Prioritizes instant face wipes, sleep masks, and travel neck pillows.',
    icon: Bus,
  },
  {
    id: 'road_trip',
    title: 'Car / Road Trip',
    desc: 'Self-drive journeys, highway travel, taxi road trips, and scenic drives.',
    tip: 'Prioritizes highway restroom seat covers and vehicle wet wipes.',
    icon: Car,
  },
  {
    id: 'other',
    title: 'Multi-Modal / Other',
    desc: 'Ferry, cruise, mixed transits, or combined transport itineraries.',
    tip: 'Balanced versatile hygiene setup for unpredictable stops.',
    icon: Navigation,
  },
];

export const StepTransport: React.FC<StepTransportProps> = ({
  selectedTransport,
  onSelectTransport,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 3 of 6 • Transport Mode
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          How are you travelling?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Transport conditions directly influence hygiene and comfort needs. Indian train berths differ vastly from airport boarding gates or highway petrol stops.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRANSPORTS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedTransport === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTransport(item.id)}
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
              <div className="mt-4 pt-3 border-t border-gray-100/80">
                <span className="text-[11px] font-semibold text-[#8657F6]">
                  ✦ {item.tip}
                </span>
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
          ← Back to Purpose
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#1E1B4B] hover:bg-[#2C2860] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Destination & Climate</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

