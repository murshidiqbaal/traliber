-- ========================================================================
-- TRALIBER TRAVEL KIT BUILDER & RECOMMENDATION ENGINE DATABASE SCHEMA
-- ========================================================================

-- Enable pgcrypto / uuid-ossp for gen_random_uuid() if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Table: travel_kit_items
CREATE TABLE IF NOT EXISTS travel_kit_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Base Traliber Kit',
    'Additional Hygiene Essentials',
    'Personal Care',
    'Journey Comfort',
    'Organisation',
    'Destination-Specific Suggestions'
  )),
  image_url TEXT,
  is_in_base_kit BOOLEAN DEFAULT false,
  base_quantity INTEGER DEFAULT 1,
  is_available_for_sale BOOLEAN DEFAULT false,
  availability_status TEXT DEFAULT 'available_from_traliber' CHECK (availability_status IN (
    'available_from_traliber',
    'recommendation_only',
    'temporarily_unavailable'
  )),
  price NUMERIC(10,2),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for travel_kit_items
CREATE INDEX IF NOT EXISTS idx_travel_kit_items_active ON travel_kit_items(is_active);
CREATE INDEX IF NOT EXISTS idx_travel_kit_items_category ON travel_kit_items(category);

-- 2. Table: travel_recommendation_rules
CREATE TABLE IF NOT EXISTS travel_recommendation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name TEXT NOT NULL,
  duration_min INTEGER,
  duration_max INTEGER,
  travel_purpose TEXT CHECK (travel_purpose IS NULL OR travel_purpose IN ('leisure', 'business', 'adventure', 'family', 'backpacking', 'other')),
  transport_mode TEXT CHECK (transport_mode IS NULL OR transport_mode IN ('train', 'flight', 'bus', 'road_trip', 'other')),
  destination_type TEXT CHECK (destination_type IS NULL OR destination_type IN ('domestic', 'international')),
  climate TEXT CHECK (climate IS NULL OR climate IN ('hot', 'cold', 'rainy', 'mixed', 'not_sure')),
  item_id UUID REFERENCES travel_kit_items(id) ON DELETE CASCADE,
  recommended_quantity INTEGER DEFAULT 1,
  priority INTEGER DEFAULT 0,
  reason TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for travel_recommendation_rules
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_active ON travel_recommendation_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_purpose ON travel_recommendation_rules(travel_purpose);
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_transport ON travel_recommendation_rules(transport_mode);

-- 3. Table: travel_kit_enquiries
CREATE TABLE IF NOT EXISTS travel_kit_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_departure DATE,
  trip_return DATE,
  trip_duration INTEGER,
  trip_nights INTEGER,
  duration_category TEXT,
  traveller_count INTEGER DEFAULT 1,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  travel_purpose TEXT,
  transport_mode TEXT,
  destination_type TEXT,
  destination_country TEXT,
  climate TEXT,
  packing_preference TEXT,
  base_kit JSONB,
  selected_items JSONB,
  estimated_total_price NUMERIC(10,2),
  customer_notes TEXT,
  enquiry_status TEXT DEFAULT 'new' CHECK (enquiry_status IN ('new', 'contacted', 'confirmed', 'fulfilled', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for travel_kit_enquiries
CREATE INDEX IF NOT EXISTS idx_travel_kit_enquiries_created ON travel_kit_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_travel_kit_enquiries_status ON travel_kit_enquiries(enquiry_status);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================================================

ALTER TABLE travel_kit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_recommendation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_kit_enquiries ENABLE ROW LEVEL SECURITY;

-- 1. travel_kit_items Policies
DROP POLICY IF EXISTS "Public can view active travel kit items" ON travel_kit_items;
CREATE POLICY "Public can view active travel kit items"
  ON travel_kit_items FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage all travel kit items" ON travel_kit_items;
CREATE POLICY "Admins can manage all travel kit items"
  ON travel_kit_items FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 2. travel_recommendation_rules Policies
DROP POLICY IF EXISTS "Public can view active recommendation rules" ON travel_recommendation_rules;
CREATE POLICY "Public can view active recommendation rules"
  ON travel_recommendation_rules FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage all recommendation rules" ON travel_recommendation_rules;
CREATE POLICY "Admins can manage all recommendation rules"
  ON travel_recommendation_rules FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 3. travel_kit_enquiries Policies
DROP POLICY IF EXISTS "Public can submit travel kit enquiries" ON travel_kit_enquiries;
CREATE POLICY "Public can submit travel kit enquiries"
  ON travel_kit_enquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view and manage all enquiries" ON travel_kit_enquiries;
CREATE POLICY "Admins can view and manage all enquiries"
  ON travel_kit_enquiries FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ========================================================================
-- SEED INITIAL ITEMS & RULES
-- ========================================================================

INSERT INTO travel_kit_items (name, description, category, image_url, is_in_base_kit, base_quantity, is_available_for_sale, availability_status, price, is_active, display_order)
VALUES
  ('Extra Mini Sanitizer (Pack of 2)', 'Two additional 15ml pocket sanitizer spray bottles for high-frequency sanitization.', 'Additional Hygiene Essentials', '/images/products/mini-sanitizer.webp', false, 1, true, 'available_from_traliber', 49.00, true, 1),
  ('Extra Moisture-Lock Wet Wipes (2 Packs)', 'Two extra packets of gentle wet wipes for meal cleanups and transit dust.', 'Additional Hygiene Essentials', '/images/products/wet-wipes.webp', false, 1, true, 'available_from_traliber', 39.00, true, 2),
  ('Flushable Toilet Seat Covers (Pack of 4)', 'Four extra flushable biodegradable paper seat covers for train & highway restrooms.', 'Additional Hygiene Essentials', '/images/products/toilet-seat-cover.webp', false, 1, true, 'available_from_traliber', 49.00, true, 3),
  ('Paper Soap Flip-Box (50 Sheets)', 'Compact pocket flip-box of water-soluble soap leaves for soap-less station taps.', 'Additional Hygiene Essentials', '/images/products/paper-soap.webp', false, 1, true, 'available_from_traliber', 29.00, true, 4),
  ('Wet / Dry Waterproof Zip Pouch', 'Semi-transparent water-resistant zip bag to isolate damp towels, swimwear, or toiletries.', 'Organisation', '/images/products/pouch.webp', false, 1, true, 'available_from_traliber', 79.00, true, 5),
  ('Travel Toothbrush with Hygienic Cap', 'Additional soft micro-bristle travel toothbrush with ventilated protective cap.', 'Personal Care', '/images/products/toothbrush.webp', false, 1, true, 'available_from_traliber', 39.00, true, 6),
  ('Contoured Sleep Mask & Noise-Dampening Earplugs', 'Light-blocking 3D eye mask paired with soft memory foam earplugs for trains & flights.', 'Journey Comfort', NULL, false, 1, false, 'recommendation_only', NULL, true, 7),
  ('Ergonomic Memory Foam Travel Neck Pillow', 'Supports cervical alignment during overnight train, bus, or long flight transits.', 'Journey Comfort', NULL, false, 1, false, 'recommendation_only', NULL, true, 8),
  ('BPA-Free Compact Reusable Water Bottle', 'Lightweight refillable bottle to stay hydrated during transit without buying single-use plastic.', 'Journey Comfort', NULL, false, 1, false, 'recommendation_only', NULL, true, 9),
  ('Travel Document & Passport Organizer Wallet', 'Keeps passport, boarding passes, visas, and transit tickets flat and quickly accessible.', 'Organisation', NULL, false, 1, false, 'recommendation_only', NULL, true, 10),
  ('100ml Airline-Compliant Squeeze Bottles (3-pack)', 'Check individual airline and airport cabin liquid allowances before packing liquids.', 'Organisation', NULL, false, 1, false, 'recommendation_only', NULL, true, 11),
  ('Broad-Spectrum SPF Sun Protection & Lip Shield', 'Essential skin protection against harsh daytime ultraviolet rays in sunny destinations.', 'Destination-Specific Suggestions', NULL, false, 1, false, 'recommendation_only', NULL, true, 12),
  ('Deep Hydration Moisturizer & Barrier Cream', 'Prevents skin chapping, dry hands, and windburn during cold climate itineraries.', 'Destination-Specific Suggestions', NULL, false, 1, false, 'recommendation_only', NULL, true, 13),
  ('Compact Umbrella & Waterproof Pack Cover', 'Guards luggage and electronics against unexpected monsoon showers and damp weather.', 'Destination-Specific Suggestions', NULL, false, 1, false, 'recommendation_only', NULL, true, 14),
  ('Compact Blister Bandages & Antiseptic Swabs', 'Basic first-line minor scrape, blister, and outdoor hygiene essentials.', 'Personal Care', NULL, false, 1, false, 'recommendation_only', NULL, true, 15)
ON CONFLICT DO NOTHING;

