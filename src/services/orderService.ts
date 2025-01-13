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

export const createOrder = async (orderData: OrderData) => {
  try {
    // 1. ordersテーブルに注文を保存
    const supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!
    );
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        payment_details: orderData.paymentDetails,
        total_amount: orderData.totalAmount,
      }])
      .select()
      .single();

    if (orderError) throw orderError;

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

    if (itemsError) throw itemsError;

    // 3. Edge Functionを呼び出してメール送信
    const { error: emailError } = await supabase.functions.invoke('send-order-email', {
      body: { orderId: order.id }
    });

    if (emailError) throw emailError;

    return true;
  } catch (error) {
    console.error('Order processing failed:', error);
    return false;
  }
}; 