import React from 'react';
import { Feather, CheckCheck, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { PackingPreference } from '@/lib/travel-recommendations';

interface StepPreferencesProps {
  preference: PackingPreference;
  notes: string;
  onPreferenceChange: (pref: PackingPreference) => void;
  onNotesChange: (notes: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const PREFERENCES: {
  id: PackingPreference;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'minimal',
    title: 'Minimal / Ultra-Light',
    desc: 'Keep weight down. Carry strictly high-utility hygiene essentials without bulky extras.',
    icon: Feather,
  },
  {
    id: 'standard',
    title: 'Standard / Balanced (Recommended)',
    desc: 'The ideal balance between compact packing and complete hygiene readiness for your duration.',
    icon: CheckCheck,
  },
  {
    id: 'extra_prepared',
    title: 'Extra Preparedness',
    desc: 'Pack additional backup sanitizer, spare paper soap, and extra seat covers for maximum peace of mind.',
    icon: ShieldCheck,
  },
  {
    id: 'other',
    title: 'Custom Focus',
    desc: 'Tailored hygiene setup based on personal health, family habits, or sensitive travel routines.',
    icon: Sparkles,
  },
];

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  preference,
  notes,
  onPreferenceChange,
  onNotesChange,
  onGenerate,
  onBack,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <span className="text-xs font-bold tracking-widest text-[#4F75FF] uppercase">
          Step 6 of 6 • Personal Preferences (Optional)
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] mt-1 font-serif">
          How do you prefer to pack?
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Select your packing philosophy. You can skip this step or adjust individual items anytime on the results page.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PREFERENCES.map((item) => {
          const Icon = item.icon;
          const isSelected = preference === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onPreferenceChange(item.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#8657F6] bg-[#8657F6]/5 ring-2 ring-[#8657F6]/20'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#8657F6] text-white' : 'bg-gray-100 text-gray-700'
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

      {/* Optional notes */}
      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 focus-within:border-[#4F75FF] transition-all">
        <label
          htmlFor="special-notes"
          className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
        >
          Special Travel Notes / Requests (Optional)
        </label>
        <textarea
          id="special-notes"
          rows={2}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="e.g. Sensitive skin, carrying infant, travelling on overnight train 12626, etc."
          className="w-full text-sm text-[#1E1B4B] bg-transparent outline-none resize-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          ← Back to Travellers
        </button>
        <button
          type="button"
          onClick={onGenerate}
          className="px-8 py-4 rounded-full text-sm font-black bg-[#4F75FF] hover:bg-[#3D63EC] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
        >
          <span>✦ Build My Travel Kit</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

