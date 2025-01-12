import { serve, createClient, Resend } from "./deps.ts";
import { createCustomerEmail, createAdminEmail } from './templates.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderId } = await req.json();

    // Supabase クライアントの初期化
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 注文情報を取得
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    
    // Resendの初期化
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // 顧客へのメール送信
    await resend.emails.send({
      from: 'Shop <noreply@yourdomain.com>',
      to: order.customer_email,
      subject: 'ご注文ありがとうございます',
      html: createCustomerEmail(order)
    });

    // 管理者へのメール送信
    await resend.emails.send({
      from: 'Shop <noreply@yourdomain.com>',
      to: Deno.env.get('ADMIN_EMAIL') ?? '',
      subject: '新規注文がありました',
      html: createAdminEmail(order)
    });

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});