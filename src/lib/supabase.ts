import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kmksvaqzimyctbrarhpx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtta3N2YXF6aW15Y3RicmFyaHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MTE0MTIsImV4cCI6MjEwODA4NzQxMn0.UEqxxItc2mGk-_q1Ze-UWzFRC_TILg1uXD1TFi4WN3o';

// Client-side Supabase client using anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client using service role key (only for API routes/server actions)
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in environment variables.');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};
