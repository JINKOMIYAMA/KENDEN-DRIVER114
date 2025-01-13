import { createClient } from '@supabase/supabase-js';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentDetails: any;
  totalAmount: number;
  items: OrderItem[];
}

// Supabaseクライアントを一度だけ初期化
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export const createOrder = async (orderData: OrderData) => {
  try {
    console.log('Creating order with data:', orderData);

    // 1. ordersテーブルに注文を保存
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        payment_details: orderData.paymentDetails,
        total_amount: orderData.totalAmount
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation failed:', orderError);
      throw orderError;
    }

    // 2. order_itemsテーブルに商品を保存
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items creation failed:', itemsError);
      throw itemsError;
    }

    // 3. メール送信（環境に応じてURLを変更）
    const apiUrl = import.meta.env.PROD 
      ? '/api/send-email'  // 本番環境
      : 'http://localhost:3001/api/send-email';  // 開発環境

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod
      })
    });

    if (!response.ok) {
      console.error('Email sending failed:', await response.text());
    }

    return true;
  } catch (error) {
    console.error('Order processing failed:', error);
    return false;
  }
}; 