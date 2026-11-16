import { NextResponse } from 'next/server';
import { supabase, getSupabaseAdmin } from '@/lib/supabase';
import { DEFAULT_ADDITIONAL_ITEMS } from '@/lib/travel-recommendations';

export async function GET() {
  try {
    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { data, error } = await client
      .from('travel_kit_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      // Return default catalog items converted to array
      const fallbackList = Object.values(DEFAULT_ADDITIONAL_ITEMS).map((item, idx) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        image_url: item.image || null,
        is_in_base_kit: false,
        base_quantity: 1,
        is_available_for_sale: item.availability === 'available_from_traliber',
        availability_status: item.availability,
        price: item.price,
        is_active: true,
        display_order: idx + 1,
      }));
      return NextResponse.json({ items: fallbackList, source: 'fallback' });
    }

    return NextResponse.json({ items: data, source: 'database' });
  } catch (err: any) {
    const fallbackList = Object.values(DEFAULT_ADDITIONAL_ITEMS).map((item, idx) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      image_url: item.image || null,
      is_in_base_kit: false,
      base_quantity: 1,
      is_available_for_sale: item.availability === 'available_from_traliber',
      availability_status: item.availability,
      price: item.price,
      is_active: true,
      display_order: idx + 1,
    }));
    return NextResponse.json({ items: fallbackList, source: 'fallback' });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      category,
      image_url,
      availability_status,
      price,
      is_active,
      display_order,
    } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required.' },
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
      .from('travel_kit_items')
      .insert({
        name,
        description: description || null,
        category,
        image_url: image_url || null,
        is_in_base_kit: false,
        base_quantity: 1,
        is_available_for_sale: availability_status === 'available_from_traliber',
        availability_status: availability_status || 'available_from_traliber',
        price: price ? Number(price) : null,
        is_active: is_active ?? true,
        display_order: display_order ? Number(display_order) : 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required.' }, { status: 400 });
    }

    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { data, error } = await client
      .from('travel_kit_items')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required.' }, { status: 400 });
    }

    let client = supabase;
    try {
      client = getSupabaseAdmin();
    } catch {
      client = supabase;
    }

    const { error } = await client.from('travel_kit_items').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

