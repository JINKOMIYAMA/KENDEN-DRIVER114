import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '../contexts/CartContext';
import { toast } from 'sonner';

interface OrderData {
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export const processOrder = async (orderData: OrderData) => {
  try {
    // Save order to database
    const { error: dbError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: orderData.customerName,
          customer_email: orderData.customerEmail,
          total_amount: orderData.totalAmount,
          payment_method: orderData.paymentMethod,
          shipping_address: orderData.shippingAddress,
          items: orderData.items
        }
      ]);

    if (dbError) throw dbError;

    // Send confirmation emails
    const { error: emailError } = await supabase.functions.invoke('send-order-email', {
      body: orderData
    });

    if (emailError) {
      console.error('Error sending order emails:', emailError);
      toast.error('注文確認メールの送信に失敗しました');
      return false;
    }

    return true;
  } catch (error) {
    console.error('注文処理に失敗しました:', error);
    toast.error('注文処理に失敗しました。もう一度お試しください。');
    return false;
  }
};