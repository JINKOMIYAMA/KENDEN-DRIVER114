export { serve } from "https://deno.land/std@0.181.0/http/server.ts";
export { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
export { Resend } from "https://esm.sh/resend@2.0.0";

// Denoの型定義
export interface Deno {
  env: {
    get(key: string): string | undefined;
  };
}

declare global {
  const Deno: Deno;
} 