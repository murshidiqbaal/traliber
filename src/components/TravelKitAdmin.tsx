'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Sliders,
  Play,
  Mail,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
  Train,
  Plane,
  Clock,
  Eye,
  DollarSign,
} from 'lucide-react';
import {
  RecommendationCategory,
  ProductAvailability,
  DEFAULT_ADDITIONAL_ITEMS,
  generateKitRecommendation,
  TripInputs,
  KitRecommendationResult,
} from '@/lib/travel-recommendations';
import { calculateTripDuration } from '@/lib/travel-calculator';

export const TravelKitAdmin: React.FC = () => {
  const [subTab, setSubTab] = useState<'items' | 'rules' | 'simulator' | 'enquiries'>('items');
  const [items, setItems] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Item Form State
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    category: 'Additional Hygiene Essentials' as RecommendationCategory,
    availability_status: 'available_from_traliber' as ProductAvailability,
    price: '',
    image_url: '',
    is_active: true,
  });
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // New Rule Form State
  const [newRule, setNewRule] = useState({
    rule_name: '',
    duration_min: '',
    duration_max: '',
    travel_purpose: '',
    transport_mode: '',
    destination_type: '',
    climate: '',
    item_id: '',
    recommended_quantity: 1,
    priority: 0,
    reason: '',
  });
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);

  // Simulator Form State
  const [simDeparture, setSimDeparture] = useState('2026-12-10');
  const [simReturn, setSimReturn] = useState('2026-12-14');
  const [simPurpose, setSimPurpose] = useState('leisure');
  const [simTransport, setSimTransport] = useState('train');
  const [simDestination, setSimDestination] = useState('domestic');
  const [simClimate, setSimClimate] = useState('cold');
  const [simTravellers, setSimTravellers] = useState(2);
  const [simResult, setSimResult] = useState<KitRecommendationResult | null>(null);

  // Load items, rules, enquiries
  const loadData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch items
      const itemsRes = await fetch('/api/travel-kit/items');
      const itemsJson = await itemsRes.json();
      if (itemsJson.items) {
        setItems(itemsJson.items);
      }

      // 2. Fetch rules
      const rulesRes = await fetch('/api/travel-kit/rules');
      const rulesJson = await rulesRes.json();
      if (rulesJson.rules) {
        setRules(rulesJson.rules);
      }

      // 3. Fetch enquiries
      const enqRes = await fetch('/api/travel-kit/enquire');
      const enqJson = await enqRes.json();
      if (enqJson.enquiries) {
        setEnquiries(enqJson.enquiries);
      }
    } catch (e: any) {
      console.error('Error fetching travel kit admin data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    runSimulation();
  }, []);

  // Run simulation
  const runSimulation = () => {
    const dur = calculateTripDuration(simDeparture, simReturn);
    const inputs: TripInputs = {
      departureDate: simDeparture,
      returnDate: simReturn,
      days: dur.days,
      nights: dur.nights,
      durationCategory: dur.durationCategory,
      purpose: simPurpose as any,
      transport: simTransport as any,
      destination: simDestination as any,
      climate: simClimate as any,
      travellerCount: simTravellers,
      adults: simTravellers,
      children: 0,
      packingPreference: 'standard',
    };
    const res = generateKitRecommendation(inputs);
    setSimResult(res);
  };

  // Handle Add Item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;

    try {
      const res = await fetch('/api/travel-kit/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (data.item) {
        setStatusMessage('Item created successfully.');
        setShowAddItemModal(false);
        setNewItem({
          name: '',
          description: '',
          category: 'Additional Hygiene Essentials',
          availability_status: 'available_from_traliber',
          price: '',
          image_url: '',
          is_active: true,
        });
        loadData();
      } else {
        setStatusMessage(data.error || 'Failed to create item');
      }
    } catch (err: any) {
      setStatusMessage('Error adding item.');
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/travel-kit/items?id=${id}`, { method: 'DELETE' });
      setStatusMessage('Item removed.');
      loadData();
    } catch {
      setStatusMessage('Error deleting item.');
    }
  };

  // Handle Add Rule
  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRule.rule_name || !newRule.reason) return;

    try {
      const res = await fetch('/api/travel-kit/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRule),
      });
      const data = await res.json();
      if (data.rule) {
        setStatusMessage('Rule saved successfully.');
        setShowAddRuleModal(false);
        setNewRule({
          rule_name: '',
          duration_min: '',
          duration_max: '',
          travel_purpose: '',
          transport_mode: '',
          destination_type: '',
          climate: '',
          item_id: '',
          recommended_quantity: 1,
          priority: 0,
          reason: '',
        });
        loadData();
      } else {
        setStatusMessage(data.error || 'Failed to create rule');
      }
    } catch {
      setStatusMessage('Error creating rule.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8657F6]/10 text-[#8657F6] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Travel Kit Configurator
          </div>
          <h2 className="text-2xl font-black text-[#1E1B4B]">
            Travel Kit Builder & Rules Engine
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage additional items, configure recommendation rules, simulate trip scenarios, and review customer custom kit enquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={isLoading}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs font-medium flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setSubTab('items')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'items'
              ? 'bg-[#1E1B4B] text-white shadow-xs'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Additional Items ({items.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'rules'
              ? 'bg-[#1E1B4B] text-white shadow-xs'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Recommendation Rules ({rules.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('simulator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'simulator'
              ? 'bg-[#1E1B4B] text-white shadow-xs'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Scenario Simulator</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('enquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            subTab === 'enquiries'
              ? 'bg-[#1E1B4B] text-white shadow-xs'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Customer Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-TAB 1: MANAGE ITEMS */}
      {/* ======================================================== */}
      {subTab === 'items' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B4B]">
              Catalog of Recommended & Add-on Items
            </h3>
            <button
              type="button"
              onClick={() => setShowAddItemModal(true)}
              className="px-4 py-2 rounded-xl bg-[#8657F6] hover:bg-[#7244E4] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1E1B4B]">{item.name}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-md">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.availability_status === 'available_from_traliber' ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          Available for Sale
                        </span>
                      ) : item.availability_status === 'recommendation_only' ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          Packing Advisory
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">
                          Unavailable
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#1E1B4B]">
                      {item.price ? `₹${item.price}` : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      {item.is_active ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-gray-400 font-semibold">Disabled</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 2: RECOMMENDATION RULES */}
      {/* ======================================================== */}
      {subTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">
                Active Recommendation Rules
              </h3>
              <p className="text-xs text-gray-500">
                Rules match duration, transport, purpose, and climate to suggest additional items.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddRuleModal(true)}
              className="px-4 py-2 rounded-xl bg-[#8657F6] hover:bg-[#7244E4] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Rule</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Rule Name</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Recommended Item</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rules.length > 0 ? (
                  rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-[#1E1B4B]">
                        {rule.rule_name}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {rule.travel_purpose && `Purpose: ${rule.travel_purpose} `}
                        {rule.transport_mode && `Transport: ${rule.transport_mode} `}
                        {rule.climate && `Climate: ${rule.climate} `}
                        {rule.duration_min && `Min Days: ${rule.duration_min}`}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#8657F6]">
                        {rule.travel_kit_items?.name || 'Assigned Item'} (x{rule.recommended_quantity})
                      </td>
                      <td className="py-3.5 px-4 text-gray-500 max-w-xs line-clamp-1">
                        {rule.reason}
                      </td>
                      <td className="py-3.5 px-4 font-bold">{rule.priority}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No custom database rules created yet. Built-in deterministic rules are running active in the calculator.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 3: SCENARIO SIMULATOR */}
      {/* ======================================================== */}
      {subTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-sm font-bold text-[#1E1B4B] flex items-center gap-1.5">
              <Play className="w-4 h-4 text-[#8657F6]" />
              Simulation Inputs
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Departure Date
              </label>
              <input
                type="date"
                value={simDeparture}
                onChange={(e) => setSimDeparture(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={simReturn}
                onChange={(e) => setSimReturn(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Purpose
              </label>
              <select
                value={simPurpose}
                onChange={(e) => setSimPurpose(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              >
                <option value="leisure">Leisure / Holiday</option>
                <option value="business">Business Trip</option>
                <option value="adventure">Adventure / Outdoor</option>
                <option value="family">Family Trip</option>
                <option value="backpacking">Backpacking</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Transport
              </label>
              <select
                value={simTransport}
                onChange={(e) => setSimTransport(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              >
                <option value="train">Train</option>
                <option value="flight">Flight</option>
                <option value="bus">Bus</option>
                <option value="road_trip">Car / Road Trip</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Climate
              </label>
              <select
                value={simClimate}
                onChange={(e) => setSimClimate(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              >
                <option value="hot">Hot / Sunny</option>
                <option value="cold">Cold / Mountains</option>
                <option value="rainy">Monsoon / Rainy</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                Travellers
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={simTravellers}
                onChange={(e) => setSimTravellers(Number(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-gray-200"
              />
            </div>

            <button
              type="button"
              onClick={runSimulation}
              className="w-full py-2.5 rounded-xl bg-[#1E1B4B] hover:bg-[#2C2860] text-white text-xs font-bold transition-all shadow-xs"
            >
              Simulate Recommendation
            </button>
          </div>

          {/* Simulator Output */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#1E1B4B]">
                Generated Kit Output
              </h3>
              {simResult && (
                <span className="text-xs font-bold text-[#8657F6]">
                  {simResult.inputs.days} Days / {simResult.inputs.nights} Nights ({simResult.inputs.durationCategory})
                </span>
              )}
            </div>

            {simResult && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#F8F7FC] border border-[#E9E6F5]">
                  <div className="font-bold text-[#1E1B4B]">Base Package:</div>
                  <div className="text-gray-600 mt-1">
                    1x Traliber Base Kit (10 verified products) • ₹{simResult.baseKit.price}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-[#1E1B4B] mb-2">
                    Recommended Additions ({simResult.recommendedAdditions.length}):
                  </div>
                  <div className="space-y-2">
                    {simResult.recommendedAdditions.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl border border-gray-100 flex items-start justify-between gap-3 bg-white"
                      >
                        <div>
                          <div className="font-bold text-gray-900">
                            {item.name} x{item.recommendedQuantity}
                          </div>
                          <div className="text-[11px] text-gray-500 mt-0.5">
                            Reason: {item.reason}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.availability === 'available_from_traliber'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {item.availability === 'available_from_traliber'
                              ? `+₹${(item.price || 0) * item.recommendedQuantity}`
                              : 'Advisory'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-sm font-bold">
                  <span>Estimated Total:</span>
                  <span className="text-base text-[#1E1B4B]">
                    ₹{simResult.estimatedTotalPrice}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-TAB 4: CUSTOMER ENQUIRIES */}
      {/* ======================================================== */}
      {subTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1E1B4B]">
              Recorded Customer Travel Kit Enquiries
            </h3>
            <span className="text-xs text-gray-500">
              Logged when users click &quot;Enquire on WhatsApp&quot;
            </span>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Trip Details</th>
                  <th className="py-3 px-4">Travellers</th>
                  <th className="py-3 px-4">Selected Items</th>
                  <th className="py-3 px-4">Est. Total</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.length > 0 ? (
                  enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 text-gray-500">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1E1B4B]">
                          {enq.trip_duration} Days ({enq.duration_category})
                        </div>
                        <div className="text-[11px] text-gray-500 capitalize">
                          {enq.transport_mode} • {enq.travel_purpose} • {enq.destination_type}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">
                        {enq.traveller_count} ({enq.adults}A, {enq.children}C)
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {Array.isArray(enq.selected_items)
                          ? `${enq.selected_items.length} additions selected`
                          : 'Standard Base'}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#1E1B4B]">
                        {enq.estimated_total_price ? `₹${enq.estimated_total_price}` : '—'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                          {enq.enquiry_status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No custom kit enquiries submitted yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add New Item */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-[#1E1B4B]">Add Catalog Item</h3>
              <button onClick={() => setShowAddItemModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g. Extra Mini Sanitizer Pack"
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                >
                  <option value="Additional Hygiene Essentials">Additional Hygiene Essentials</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Journey Comfort">Journey Comfort</option>
                  <option value="Organisation">Organisation</option>
                  <option value="Destination-Specific Suggestions">Destination-Specific Suggestions</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Availability Status</label>
                <select
                  value={newItem.availability_status}
                  onChange={(e) => setNewItem({ ...newItem, availability_status: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                >
                  <option value="available_from_traliber">Available from Traliber (Purchasable)</option>
                  <option value="recommendation_only">Recommendation Only (Packing Advisory)</option>
                  <option value="temporarily_unavailable">Temporarily Unavailable</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Price (₹ INR, optional)</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="e.g. 49"
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Brief product utility and hygiene role"
                  className="w-full p-2.5 rounded-xl border border-gray-200 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8657F6] text-white font-bold hover:bg-[#7244E4]"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

