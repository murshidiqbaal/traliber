import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { calculateTripDuration, getDurationDescription } from '@/lib/travel-calculator';

interface StepDatesProps {
  departureDate: string;
  returnDate: string;
  onDatesChange: (departure: string, returnDate: string) => void;
  onNext: () => void;
}

export const StepDates: React.FC<StepDatesProps> = ({
  departureDate,
  returnDate,
  onDatesChange,
  onNext,
}) => {
  const durationResult = calculateTripDuration(departureDate, returnDate);

  // Quick preset helper
  const handlePreset = (daysToAdd: number) => {
    const today = new Date();
    // Default departure: tomorrow
    const dep = new Date(today);
    dep.setDate(dep.getDate() + 1);

    const ret = new Date(dep);
    ret.setDate(ret.getDate() + daysToAdd);

    const depStr = dep.toISOString().split('T')[0];
    const retStr = ret.toISOString().split('T')[0];

    onDatesChange(depStr, retStr);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 1 of 6 • Travel Dates
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          When are you travelling?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Select your departure and return dates. We calculate calendar days and nights to customize your hygiene consumables.
        </p>
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-xs focus-within:border-[#4F75FF] transition-all">
          <label
            htmlFor="departure-date"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
          >
            <Calendar className="w-4 h-4 text-[#4F75FF]" />
            Departure Date
          </label>
          <input
            id="departure-date"
            type="date"
            value={departureDate}
            onChange={(e) => onDatesChange(e.target.value, returnDate)}
            className="w-full text-base sm:text-lg font-semibold text-[#1E1B4B] bg-transparent outline-none cursor-pointer"
          />
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-xs focus-within:border-[#4F75FF] transition-all">
          <label
            htmlFor="return-date"
            className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
          >
            <Calendar className="w-4 h-4 text-[#4F75FF]" />
            Return Date
          </label>
          <input
            id="return-date"
            type="date"
            value={returnDate}
            min={departureDate || undefined}
            onChange={(e) => onDatesChange(departureDate, e.target.value)}
            className="w-full text-base sm:text-lg font-semibold text-[#1E1B4B] bg-transparent outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Presets */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">Or choose a quick itinerary preset:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handlePreset(0)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            1 Day (Day trip)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(2)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            Weekend (3 Days)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(4)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            Short Break (5 Days)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(6)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            1 Week (7 Days)
          </button>
          <button
            type="button"
            onClick={() => handlePreset(13)}
            className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
          >
            2 Weeks (14 Days)
          </button>
        </div>
      </div>

      {/* Calculated Duration Display Card */}
      {durationResult.isValid ? (
        <div className="p-5 rounded-2xl bg-[#F8F7FC] border border-[#E9E6F5] space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#8657F6]" />
              <span className="text-sm font-bold text-[#1E1B4B]">
                Calculated Duration:
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold">
                {durationResult.durationCategory}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {durationResult.formattedRange}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#1E1B4B]">
            {durationResult.days} {durationResult.days === 1 ? 'Calendar Day' : 'Calendar Days'} / {durationResult.nights} {durationResult.nights === 1 ? 'Night' : 'Nights'}
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {getDurationDescription(
              durationResult.durationCategory,
              durationResult.days,
              durationResult.nights
            )}
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{durationResult.error || 'Please choose valid departure and return dates.'}</span>
        </div>
      )}

      {/* Continue CTA */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!durationResult.isValid}
          className={`px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
            durationResult.isValid
              ? 'bg-[#1E1B4B] hover:bg-[#2C2860] text-white hover:shadow-lg cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next: Travel Purpose</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

