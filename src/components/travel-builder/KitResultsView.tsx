import React, { useState } from 'react';
import {
  Check,
  Plus,
  Minus,
  MessageCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  Info,
  Clock,
  MapPin,
  Train,
  Plane,
  Bus,
  Car,
  Users,
  Compass,
  Briefcase,
  Palmtree,
  Backpack,
} from 'lucide-react';
import {
  KitRecommendationResult,
  RecommendedItem,
  generateWhatsAppKitEnquiryMessage,
  RecommendationCategory,
} from '@/lib/travel-recommendations';
import { WHATSAPP_CONFIG } from '@/data/traliber-kit';
import { useTraliberStore } from '@/context/TraliberStore';

interface KitResultsViewProps {
  initialResult: KitRecommendationResult;
  onEditJourney: () => void;
}

export const KitResultsView: React.FC<KitResultsViewProps> = ({
  initialResult,
  onEditJourney,
}) => {
  const { trackWhatsAppClick } = useTraliberStore();

  const [additions, setAdditions] = useState<RecommendedItem[]>(
    initialResult.recommendedAdditions
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);

  // Toggle item selection
  const handleToggleSelect = (id: string) => {
    setAdditions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // Adjust item quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setAdditions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.selectedQuantity + delta);
          return { ...item, selectedQuantity: newQty };
        }
        return item;
      })
    );
  };

  // Live recalculate totals
  const basePrice = initialResult.baseKit.price;
  let additionsPrice = 0;
  let hasUnpricedPurchasables = false;
  let totalItemsCount = initialResult.baseKit.items.reduce(
    (acc, i) => acc + i.includedQuantity,
    0
  );

  for (const item of additions) {
    if (item.isSelected) {
      totalItemsCount += item.selectedQuantity;
      if (item.availability === 'available_from_traliber') {
        if (item.price !== null) {
          additionsPrice += item.price * item.selectedQuantity;
        } else {
          hasUnpricedPurchasables = true;
        }
      }
    }
  }

  const estimatedTotal = hasUnpricedPurchasables ? null : basePrice + additionsPrice;

  // Build updated result object for WhatsApp message
  const currentResult: KitRecommendationResult = {
    ...initialResult,
    recommendedAdditions: additions,
    totalBasePrice: basePrice,
    totalAdditionsPrice: additionsPrice,
    estimatedTotalPrice: estimatedTotal,
    hasUnpricedPurchasables,
    totalSelectedItemsCount: totalItemsCount,
  };

  // Handle WhatsApp Enquiry click
  const handleEnquireWhatsApp = async () => {
    trackWhatsAppClick('Custom Kit Enquiry Submit');
    setIsSubmittingEnquiry(true);

    try {
      // Save enquiry to Supabase in the background
      await fetch('/api/travel-kit/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip_departure: initialResult.inputs.departureDate,
          trip_return: initialResult.inputs.returnDate,
          trip_duration: initialResult.inputs.days,
          trip_nights: initialResult.inputs.nights,
          duration_category: initialResult.inputs.durationCategory,
          traveller_count: initialResult.inputs.travellerCount,
          adults: initialResult.inputs.adults,
          children: initialResult.inputs.children,
          travel_purpose: initialResult.inputs.purpose,
          transport_mode: initialResult.inputs.transport,
          destination_type: initialResult.inputs.destination,
          destination_country: initialResult.inputs.destinationCountry,
          climate: initialResult.inputs.climate,
          packing_preference: initialResult.inputs.packingPreference,
          base_kit: initialResult.baseKit,
          selected_items: additions.filter((a) => a.isSelected),
          estimated_total_price: estimatedTotal,
          customer_notes: initialResult.inputs.notes,
        }),
      });
    } catch (e) {
      console.warn('Enquiry background logging notice:', e);
    } finally {
      setIsSubmittingEnquiry(false);
    }

    // Open WhatsApp
    const encodedMessage = generateWhatsAppKitEnquiryMessage(currentResult);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Filter additions by category
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Additions' },
    { id: 'Additional Hygiene Essentials', label: 'Hygiene Essentials' },
    { id: 'Personal Care', label: 'Personal Care' },
    { id: 'Journey Comfort', label: 'Journey Comfort' },
    { id: 'Organisation', label: 'Organisation' },
    { id: 'Destination-Specific Suggestions', label: 'Destination Specific' },
  ];

  const filteredAdditions =
    activeCategoryFilter === 'all'
      ? additions
      : additions.filter((a) => a.category === activeCategoryFilter);

  // Helper transport icon
  const getTransportIcon = () => {
    switch (initialResult.inputs.transport) {
      case 'train':
        return <Train className="w-4 h-4 text-[#8657F6]" />;
      case 'flight':
        return <Plane className="w-4 h-4 text-[#4F75FF]" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-emerald-600" />;
      case 'road_trip':
        return <Car className="w-4 h-4 text-amber-600" />;
      default:
        return <Compass className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Top Banner / Heading */}
      <div className="bg-gradient-to-r from-[#1E1B4B] to-[#2C2860] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#8657F6]" />
              Smart Travel Kit Recommendation
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight">
              Your Travel Kit Is Ready
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-xl">
              Personalized based on your itinerary, travel mode, destination weather, and packing preference.
            </p>
          </div>

          <button
            type="button"
            onClick={onEditJourney}
            className="self-start md:self-center px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Edit Journey Details</span>
          </button>
        </div>

        {/* Journey Summary Badges */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-300 shrink-0" />
            <div>
              <div className="text-gray-300">Duration</div>
              <div className="font-bold text-white">
                {initialResult.inputs.days} Days / {initialResult.inputs.nights} Nights
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getTransportIcon()}
            <div>
              <div className="text-gray-300">Transport</div>
              <div className="font-bold text-white capitalize">
                {initialResult.inputs.transport.replace('_', ' ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-300 shrink-0" />
            <div>
              <div className="text-gray-300">Travellers</div>
              <div className="font-bold text-white">
                {initialResult.inputs.travellerCount} ({initialResult.inputs.adults}A
                {initialResult.inputs.children > 0 ? `, ${initialResult.inputs.children}C` : ''})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-300 shrink-0" />
            <div>
              <div className="text-gray-300">Destination</div>
              <div className="font-bold text-white capitalize">
                {initialResult.inputs.destinationCountry || initialResult.inputs.destination} ({initialResult.inputs.climate})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION A: YOUR BASE KIT */}
      {/* ======================================================== */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8657F6]/10 text-[#8657F6] font-bold text-sm flex items-center justify-center">
                A
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
                Section A: Your Base Traliber Kit
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Included as the foundation of your journey. Pre-packed with 10 essential travel personal care items in our signature water-resistant pouch.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Base Package Price</div>
            <div className="text-2xl font-black text-[#1E1B4B]">₹{initialResult.baseKit.price}</div>
          </div>
        </div>

        {/* 10 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {initialResult.baseKit.items.map((item, index) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#F8F7FC] border border-[#E9E6F5] flex flex-col justify-between group hover:border-[#8657F6]/40 transition-all"
            >
              <div>
                <div className="relative aspect-square w-full rounded-xl bg-white overflow-hidden mb-2.5 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-[#1E1B4B]/80 text-white text-[10px] font-bold backdrop-blur-xs">
                    #{index + 1}
                  </span>
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#1E1B4B] line-clamp-1">
                  {item.name}
                </h4>
                <div className="text-[11px] font-semibold text-[#8657F6]">
                  {item.quantityLabel}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 line-clamp-2 leading-tight">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-purple-50 text-purple-900 text-xs flex items-center gap-2 border border-purple-100">
          <ShieldCheck className="w-4 h-4 text-[#8657F6] shrink-0" />
          <span>
            <strong>Verified Standard Inventory:</strong> All 10 items above are pre-assembled in the base kit at ₹{initialResult.baseKit.price}.
          </span>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION B: RECOMMENDED ADDITIONS */}
      {/* ======================================================== */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#4F75FF]/10 text-[#4F75FF] font-bold text-sm flex items-center justify-center">
              B
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
              Section B: Recommended Additions
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Tailored suggestions for your duration, transport mode, and climate. Select items you want included or uncheck items you already have.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                activeCategoryFilter === cat.id
                  ? 'bg-[#1E1B4B] text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Additions List */}
        {filteredAdditions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAdditions.map((item) => {
              const isPurchasable = item.availability === 'available_from_traliber';
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    item.isSelected
                      ? 'border-[#8657F6]/40 bg-[#FBFBFE] shadow-xs'
                      : 'border-gray-100 bg-gray-50/40 opacity-75'
                  }`}
                >
                  <div>
                    {/* Header: Checkbox + Title + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <label className="flex items-start gap-3 cursor-pointer select-none flex-1">
                        <input
                          type="checkbox"
                          checked={item.isSelected}
                          onChange={() => handleToggleSelect(item.id)}
                          className="mt-1 w-4 h-4 rounded-md text-[#8657F6] focus:ring-[#8657F6] cursor-pointer"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                              {item.category}
                            </span>
                            {isPurchasable ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                Available from Traliber
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                                Packing Advisory
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-[#1E1B4B] mt-1">
                            {item.name}
                          </h4>
                        </div>
                      </label>

                      {/* Price badge */}
                      <div className="text-right shrink-0">
                        {isPurchasable ? (
                          item.price !== null ? (
                            <span className="text-base font-black text-[#1E1B4B]">
                              +₹{item.price * item.selectedQuantity}
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-gray-500">
                              On Enquiry
                            </span>
                          )
                        ) : (
                          <span className="text-xs font-semibold text-gray-600">
                            Advisory
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="mt-3 p-2.5 rounded-xl bg-white border border-gray-100 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8657F6] shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600 leading-snug">
                        {item.reason}
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Quantity adjustment (only for purchasables that can be scaled) */}
                  {item.isSelected && isPurchasable && (
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-600">
                        Select Quantity:
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.selectedQuantity <= 1}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-700" />
                        </button>
                        <span className="w-6 text-center font-bold text-sm text-[#1E1B4B]">
                          {item.selectedQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 text-gray-700" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 text-sm">
            No additions in this category.
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* SECTION C: CUSTOM KIT SUMMARY & WHATSAPP ORDERING */}
      {/* ======================================================== */}
      <section className="bg-gradient-to-br from-[#F8F7FC] to-[#F1EEFB] p-6 sm:p-8 rounded-3xl border border-[#E9E6F5] space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#8657F6] text-white font-bold text-sm flex items-center justify-center">
              C
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1E1B4B]">
              Section C: Your Custom Kit Summary
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Review your complete kit configuration and send an instant inquiry to Traliber via WhatsApp.
          </p>
        </div>

        {/* Itemised Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 space-y-4">
          {/* Base kit row */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <Package className="w-5 h-5 text-[#8657F6]" />
              <div>
                <div className="text-sm font-bold text-[#1E1B4B]">
                  1x Traliber Base Travel Essentials Kit
                </div>
                <div className="text-xs text-gray-500">
                  10 verified items (Pouch, Toothbrush, Paste, 5 Sanitizers, Wipes, Towel, 2 Seat Covers, Mask, Paper Soap, Cutlery)
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-[#1E1B4B] shrink-0">
              ₹{basePrice}
            </div>
          </div>

          {/* Additions list */}
          {additions.filter((a) => a.isSelected).length > 0 && (
            <div className="space-y-2 pt-1 pb-3 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Selected Additions & Advisories:
              </div>
              {additions
                .filter((a) => a.isSelected)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-700">
                      • {item.name} {item.selectedQuantity > 1 ? `x${item.selectedQuantity}` : ''}{' '}
                      <span className="text-[10px] text-gray-600">({item.category})</span>
                    </span>
                    <span className="font-semibold text-gray-800 shrink-0">
                      {item.availability === 'available_from_traliber'
                        ? item.price !== null
                          ? `₹${item.price * item.selectedQuantity}`
                          : 'Price on enquiry'
                        : 'Advisory ($0)'}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {/* Total Row */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-base font-extrabold text-[#1E1B4B]">
                Estimated Kit Total
              </div>
              <div className="text-xs text-gray-500">
                {totalItemsCount} total travel items selected • Cash on Delivery / UPI available on WhatsApp
              </div>
            </div>
            <div className="text-right">
              {estimatedTotal !== null ? (
                <div className="text-3xl font-black text-[#1E1B4B]">
                  ₹{estimatedTotal}
                </div>
              ) : (
                <div className="text-lg font-bold text-[#1E1B4B]">
                  Price Available on Enquiry
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Availability Disclaimer */}
        <div className="p-4 rounded-xl bg-white/70 border border-gray-200/60 text-xs text-gray-600 space-y-1">
          <p className="flex items-center gap-1.5 font-semibold text-[#1E1B4B]">
            <Info className="w-4 h-4 text-[#8657F6] shrink-0" />
            Product Availability & Pricing Guarantee:
          </p>
          <p className="text-[11px] leading-relaxed">
            The base Traliber Kit is ₹199. Extra purchasable Traliber add-ons are itemized above. Items marked as <em>Packing Advisory</em> are practical travel suggestions for you to pack from home.
          </p>
        </div>

        {/* Primary WhatsApp CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleEnquireWhatsApp}
            disabled={isSubmittingEnquiry}
            className="w-full sm:w-auto flex-1 px-8 py-4 rounded-full bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Enquire About My Custom Kit on WhatsApp</span>
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={onEditJourney}
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-gray-100 text-[#1E1B4B] text-xs font-bold border border-gray-200 transition-colors"
          >
            Modify Travel Details
          </button>
        </div>
      </section>
    </div>
  );
};

