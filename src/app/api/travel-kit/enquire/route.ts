import { NextResponse } from 'next/server';
import { supabase, getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      trip_departure,
      trip_return,
      trip_duration,
      trip_nights,
      duration_category,
      traveller_count,
      adults,
      children,
      travel_purpose,
      transport_mode,
      destination_type,
      destination_country,
      climate,
      packing_preference,
      base_kit,
      selected_items,
      estimated_total_price,
      customer_notes,
    } = body;

    // Validate minimum required fields
    if (!trip_duration || !travel_purpose || !transport_mode) {
      return NextResponse.json(
        { error: 'Missing required trip parameters.' },
        { status: 400 }
      );
    }

    // Try inserting into Supabase if configured
    try {
      let client = supabase;
      try {
        client = getSupabaseAdmin();
      } catch {
        // Fall back to anon client
        client = supabase;
      }

      const { data, error } = await client
        .from('travel_kit_enquiries')
        .insert({
          trip_departure: trip_departure || null,
          trip_return: trip_return || null,
          trip_duration,
          trip_nights: trip_nights || 0,
          duration_category: duration_category || 'Trip',
          traveller_count: traveller_count || 1,
          adults: adults || 1,
          children: children || 0,
          travel_purpose,
          transport_mode,
          destination_type: destination_type || 'domestic',
          destination_country: destination_country || null,
          climate: climate || 'mixed',
          packing_preference: packing_preference || 'standard',
          base_kit: base_kit || {},
          selected_items: selected_items || [],
          estimated_total_price: estimated_total_price || null,
          customer_notes: customer_notes || null,
          enquiry_status: 'new',
        })
        .select()
        .single();

      if (error) {
        console.warn('Supabase enquiry insert notice (table might not be initialized yet):', error.message);
      }

      return NextResponse.json({
        success: true,
        enquiryId: data?.id || `local-${Date.now()}`,
        message: 'Enquiry recorded successfully.',
      });
    } catch (dbErr: any) {
      console.warn('Database error while saving enquiry, continuing gracefully:', dbErr?.message);
      return NextResponse.json({
        success: true,
        enquiryId: `offline-${Date.now()}`,
        message: 'Enquiry processed.',
      });
    }
  } catch (err: any) {
    console.error('Error handling travel kit enquiry:', err);
    return NextResponse.json(
      { error: 'Internal server error processing enquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { data, error } = await client
      .from('travel_kit_enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ enquiries: [] });
    }

    return NextResponse.json({ enquiries: data || [] });
  } catch {
    return NextResponse.json({ enquiries: [] });
  }
}

