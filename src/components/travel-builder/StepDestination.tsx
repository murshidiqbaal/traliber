import React from 'react';
import { Globe, MapPin, Sun, Snowflake, CloudRain, CloudSun, HelpCircle, Check } from 'lucide-react';
import { DestinationType, ClimateType } from '@/lib/travel-recommendations';

interface StepDestinationProps {
  destination: DestinationType;
  destinationCountry: string;
  climate: ClimateType;
  onDestinationChange: (dest: DestinationType) => void;
  onCountryChange: (country: string) => void;
  onClimateChange: (climate: ClimateType) => void;
  onNext: () => void;
  onBack: () => void;
}

const CLIMATES: {
  id: ClimateType;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'hot',
    title: 'Hot / Sunny',
    desc: 'Beaches, plains, tropical or desert heat. Prioritizes sun protection and refreshing wipes.',
    icon: Sun,
  },
  {
    id: 'cold',
    title: 'Cold / Mountains',
    desc: 'Hill stations, winter travel, or freezing weather. Prioritizes barrier moisturizers & lip care.',
    icon: Snowflake,
  },
  {
    id: 'rainy',
    title: 'Monsoon / Rainy',
    desc: 'Wet weather, high humidity, or coastal rain. Prioritizes waterproof dry bags and rain gear.',
    icon: CloudRain,
  },
  {
    id: 'mixed',
    title: 'Mixed / Variable',
    desc: 'Multiple regions or variable daily weather across a multi-city itinerary.',
    icon: CloudSun,
  },
  {
    id: 'not_sure',
    title: 'Mild / Not Sure',
    desc: 'Moderate indoor/outdoor climate; standard weather-agnostic essentials.',
    icon: HelpCircle,
  },
];

export const StepDestination: React.FC<StepDestinationProps> = ({
  destination,
  destinationCountry,
  climate,
  onDestinationChange,
  onCountryChange,
  onClimateChange,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 4 of 6 • Destination & Climate
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          Where are you heading?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Destination type informs document protection and international regulations, while expected weather guides skin and moisture defense.
        </p>
      </div>

      {/* Domestic vs International */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onDestinationChange('domestic')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
            destination === 'domestic'
              ? 'border-[#8657F6] bg-[#8657F6]/5 ring-2 ring-[#8657F6]/20'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                destination === 'domestic' ? 'bg-[#8657F6] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">Domestic Journey (India)</h3>
              <p className="text-xs text-gray-500">Travel within Indian states and territories</p>
            </div>
          </div>
          {destination === 'domestic' && (
            <span className="w-5 h-5 rounded-full bg-[#8657F6] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onDestinationChange('international')}
          className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
            destination === 'international'
              ? 'border-[#8657F6] bg-[#8657F6]/5 ring-2 ring-[#8657F6]/20'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                destination === 'international' ? 'bg-[#8657F6] text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">International Trip</h3>
              <p className="text-xs text-gray-500">Cross-border travel (passport & visa advised)</p>
            </div>
          </div>
          {destination === 'international' && (
            <span className="w-5 h-5 rounded-full bg-[#8657F6] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </span>
          )}
        </button>
      </div>

      {/* Optional destination name input */}
      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-xs focus-within:border-[#4F75FF] transition-all">
        <label
          htmlFor="destination-country"
          className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
        >
          Specific City / Country / Region (Optional)
        </label>
        <input
          id="destination-country"
          type="text"
          value={destinationCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          placeholder="e.g. Manali, Goa, London, Singapore, Jaipur"
          className="w-full text-base font-semibold text-[#1E1B4B] bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Climate selection */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
          Expected Destination Climate:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLIMATES.map((item) => {
            const Icon = item.icon;
            const isSelected = climate === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onClimateChange(item.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#8657F6] bg-[#8657F6]/5 ring-1 ring-[#8657F6]/20'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#8657F6] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#1E1B4B]">{item.title}</span>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          ← Back to Transport
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#1E1B4B] hover:bg-[#2C2860] text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Travellers</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

