// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eslxpklvcyheclvkbijw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbHhwa2x2Y3loZWNsdmtiaWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTA0OTMsImV4cCI6MjA2ODI4NjQ5M30.009De0H2aBGEDBXE7ObFnPrCpMQKefSiPlGsxNGSJHg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});