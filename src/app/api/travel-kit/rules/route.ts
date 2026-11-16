import { NextResponse } from 'next/server';
import { supabase, getSupabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { data, error } = await client
      .from('travel_recommendation_rules')
      .select('*, travel_kit_items(name, category, price, availability_status)')
      .order('priority', { ascending: false });

    if (error) {
      return NextResponse.json({ rules: [] });
    }

    return NextResponse.json({ rules: data || [] });
  } catch {
    return NextResponse.json({ rules: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      rule_name,
      duration_min,
      duration_max,
      travel_purpose,
      transport_mode,
      destination_type,
      climate,
      item_id,
      recommended_quantity,
      priority,
      reason,
      is_active,
    } = body;

    if (!rule_name || !reason) {
      return NextResponse.json(
        { error: 'Rule name and recommendation reason are required.' },
        { status: 400 }
      );
    }

    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { data, error } = await client
      .from('travel_recommendation_rules')
      .insert({
        rule_name,
        duration_min: duration_min ? Number(duration_min) : null,
        duration_max: duration_max ? Number(duration_max) : null,
        travel_purpose: travel_purpose || null,
        transport_mode: transport_mode || null,
        destination_type: destination_type || null,
        climate: climate || null,
        item_id: item_id || null,
        recommended_quantity: recommended_quantity ? Number(recommended_quantity) : 1,
        priority: priority ? Number(priority) : 0,
        reason,
        is_active: is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ rule: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Rule ID is required.' }, { status: 400 });
    }

    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { error } = await client
      .from('travel_recommendation_rules')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

