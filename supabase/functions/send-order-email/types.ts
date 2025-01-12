export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderEmailRequest {
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  paymentMethod: string;
  shippingAddress: string;
  items: OrderItem[];
}

export interface EmailRequest {
  from: string;
  to: string[];
  subject: string;
  html: string;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};