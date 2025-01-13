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
    console.log('Processing order:', orderId);

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

    if (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }

    if (!order) {
      throw new Error('Order not found');
    }

    console.log('Order data:', order);

    // Resendの初期化
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    // 顧客へのメール送信
    const customerEmailResult = await resend.emails.send({
      from: 'Shop <comimasa@icloud.com>',
      to: order.customer_email,
      subject: 'ご注文ありがとうございます',
      html: createCustomerEmail(order)
    });

    console.log('Customer email result:', customerEmailResult);

    // 管理者へのメール送信
    const adminEmailResult = await resend.emails.send({
      from: 'Shop <comimasa@icloud.com>',
      to: Deno.env.get('ADMIN_EMAIL') ?? '',
      subject: '新規注文がありました',
      html: createAdminEmail(order)
    });

    console.log('Admin email result:', adminEmailResult);

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});