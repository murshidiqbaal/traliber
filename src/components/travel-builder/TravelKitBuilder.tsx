'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Compass,
  Train,
  MapPin,
  Users,
  Feather,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { calculateTripDuration } from '@/lib/travel-calculator';
import {
  TripInputs,
  TravelPurpose,
  TransportMode,
  DestinationType,
  ClimateType,
  PackingPreference,
  generateKitRecommendation,
  KitRecommendationResult,
} from '@/lib/travel-recommendations';
import { StepDates } from './StepDates';
import { StepPurpose } from './StepPurpose';
import { StepTransport } from './StepTransport';
import { StepDestination } from './StepDestination';
import { StepTravellers } from './StepTravellers';
import { StepPreferences } from './StepPreferences';
import { KitResultsView } from './KitResultsView';

export const TravelKitBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Form State - initialized with static defaults to satisfy Next.js 16 SSR prerender
  const [departureDate, setDepartureDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [purpose, setPurpose] = useState<TravelPurpose>('leisure');
  const [transport, setTransport] = useState<TransportMode>('train');
  const [destination, setDestination] = useState<DestinationType>('domestic');
  const [destinationCountry, setDestinationCountry] = useState<string>('');
  const [climate, setClimate] = useState<ClimateType>('mixed');
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [packingPreference, setPackingPreference] = useState<PackingPreference>('standard');
  const [notes, setNotes] = useState<string>('');

  // Hydrate dates safely on client mount
  useEffect(() => {
    const today = new Date();
    const dep = new Date(today);
    dep.setDate(dep.getDate() + 1);
    const ret = new Date(dep);
    ret.setDate(ret.getDate() + 3);
    setDepartureDate(dep.toISOString().split('T')[0]);
    setReturnDate(ret.toISOString().split('T')[0]);
  }, []);

  // Results state
  const [recommendationResult, setRecommendationResult] = useState<KitRecommendationResult | null>(null);

  // Step definitions
  const steps = [
    { title: 'Dates', icon: Calendar },
    { title: 'Purpose', icon: Compass },
    { title: 'Transport', icon: Train },
    { title: 'Destination', icon: MapPin },
    { title: 'Travellers', icon: Users },
    { title: 'Style', icon: Feather },
  ];

  const handleGenerate = () => {
    const duration = calculateTripDuration(departureDate, returnDate);

    const tripInputs: TripInputs = {
      departureDate,
      returnDate,
      days: duration.days,
      nights: duration.nights,
      durationCategory: duration.durationCategory,
      purpose,
      transport,
      destination,
      destinationCountry: destinationCountry.trim() || undefined,
      climate,
      travellerCount: adults + children,
      adults,
      children,
      packingPreference,
      notes: notes.trim() || undefined,
    };

    const result = generateKitRecommendation(tripInputs);
    setRecommendationResult(result);
    setCurrentStep(6); // Results view
    // Scroll to builder
    const el = document.getElementById('kit-builder-top');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    const today = new Date();
    const dep = new Date(today);
    dep.setDate(dep.getDate() + 1);
    const ret = new Date(dep);
    ret.setDate(ret.getDate() + 3);
    setDepartureDate(dep.toISOString().split('T')[0]);
    setReturnDate(ret.toISOString().split('T')[0]);
    setPurpose('leisure');
    setTransport('train');
    setDestination('domestic');
    setDestinationCountry('');
    setClimate('mixed');
    setAdults(1);
    setChildren(0);
    setPackingPreference('standard');
    setNotes('');
    setRecommendationResult(null);
    setCurrentStep(0);
  };

  return (
    <div id="kit-builder-top" className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Intro Heading Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Travel Duration Calculator & Custom Kit Builder
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1E1B4B] font-serif tracking-tight">
          Your Journey. Your Kit.
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-3 font-light leading-relaxed">
          Every journey is different. Build a travel kit that fits yours.
        </p>
      </div>

      {/* Multi-step card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden p-6 sm:p-10">
        {/* Step Indicator (Only visible during form steps 0-5) */}
        {currentStep < 6 && (
          <div className="mb-10">
            {/* Step navigation bar */}
            <div className="flex items-center justify-between relative">
              {/* Progress background bar */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8657F6] transition-all duration-300 z-0"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => idx <= currentStep && setCurrentStep(idx)}
                    disabled={idx > currentStep}
                    className={`relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#1E1B4B] text-white ring-4 ring-[#8657F6]/20 scale-110 shadow-md'
                          : isCompleted
                          ? 'bg-[#8657F6] text-white shadow-xs'
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span
                      className={`hidden sm:block text-[11px] font-bold mt-2 transition-colors ${
                        isCurrent
                          ? 'text-[#1E1B4B]'
                          : isCompleted
                          ? 'text-[#8657F6]'
                          : 'text-gray-400'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 0 && (
          <StepDates
            departureDate={departureDate}
            returnDate={returnDate}
            onDatesChange={(dep, ret) => {
              setDepartureDate(dep);
              setReturnDate(ret);
            }}
            onNext={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 1 && (
          <StepPurpose
            selectedPurpose={purpose}
            onSelectPurpose={(p) => setPurpose(p)}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}

        {currentStep === 2 && (
          <StepTransport
            selectedTransport={transport}
            onSelectTransport={(t) => setTransport(t)}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <StepDestination
            destination={destination}
            destinationCountry={destinationCountry}
            climate={climate}
            onDestinationChange={(d) => setDestination(d)}
            onCountryChange={(c) => setDestinationCountry(c)}
            onClimateChange={(c) => setClimate(c)}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <StepTravellers
            adults={adults}
            children={children}
            onAdultsChange={(a) => setAdults(a)}
            onChildrenChange={(c) => setChildren(c)}
            onNext={() => setCurrentStep(5)}
            onBack={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 5 && (
          <StepPreferences
            preference={packingPreference}
            notes={notes}
            onPreferenceChange={(p) => setPackingPreference(p)}
            onNotesChange={(n) => setNotes(n)}
            onGenerate={handleGenerate}
            onBack={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 6 && recommendationResult && (
          <KitResultsView
            initialResult={recommendationResult}
            onEditJourney={() => setCurrentStep(0)}
          />
        )}
      </div>

      {/* Educational & SEO Explanatory Content Section */}
      <section className="mt-16 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xs space-y-6 text-[#1E1B4B]">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif">
            Build Your Custom Travel Essentials Kit
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Travel hygiene is not one-size-fits-all. A 2-day weekend conference in Mumbai requires different consumables than a 10-day trekking expedition in Himachal or an overnight sleeper train across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 text-xs text-gray-600">
          <div>
            <h3 className="font-bold text-sm text-[#1E1B4B] mb-1">
              1. Duration-Calculated Hygiene
            </h3>
            <p className="leading-relaxed">
              Our calendar-day calculator ensures you carry sufficient sanitizer, paper soap leaves, and wet wipes without hauling heavy, surplus luggage.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#1E1B4B] mb-1">
              2. Transit-Aware Preparations
            </h3>
            <p className="leading-relaxed">
              We factor in airport liquid checks, train washroom conditions, and highway road-trip stops to recommend practical personal care solutions.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#1E1B4B] mb-1">
              3. Verified Traliber Quality
            </h3>
            <p className="leading-relaxed">
              Every custom kit starts with Traliber’s 10-item core kit at ₹199, housed in our signature water-resistant pouch for cleaner journeys tomorrow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

