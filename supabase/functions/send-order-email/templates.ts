import { OrderEmailRequest } from './types.ts';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  payment_method: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
}

export const createCustomerEmail = (order: Order) => {
  const items = order.order_items.map(item => `
    <tr>
      <td>${item.product_name}</td>
      <td>${item.quantity}個</td>
      <td>¥${item.price.toLocaleString()}</td>
      <td>¥${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <h2>ご注文ありがとうございます</h2>
    <p>${order.customer_name} 様</p>
    <p>ご注文を受け付けました。</p>
    
    <h3>ご注文内容</h3>
    <p>注文番号: ${order.id}</p>
    <table>
      <tr>
        <th>商品名</th>
        <th>数量</th>
        <th>単価</th>
        <th>小計</th>
      </tr>
      ${items}
    </table>
    
    <p>合計金額: ¥${order.total_amount.toLocaleString()}</p>
    
    <h3>お届け先情報</h3>
    <p>${order.shipping_address}</p>
    
    <h3>お支払い方法</h3>
    <p>${order.payment_method}</p>
  `;
};

export const createAdminEmail = (order: Order) => {
  const items = order.order_items.map(item => `
    <tr>
      <td>${item.product_name}</td>
      <td>${item.quantity}個</td>
      <td>¥${item.price.toLocaleString()}</td>
      <td>¥${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
    <h2>新規注文がありました</h2>
    
    <h3>注文情報</h3>
    <p>注文番号: ${order.id}</p>
    <p>注文日時: ${new Date(order.created_at).toLocaleString('ja-JP')}</p>
    
    <h3>お客様情報</h3>
    <p>お名前: ${order.customer_name}</p>
    <p>メール: ${order.customer_email}</p>
    
    <h3>注文内容</h3>
    <table>
      <tr>
        <th>商品名</th>
        <th>数量</th>
        <th>単価</th>
        <th>小計</th>
      </tr>
      ${items}
    </table>
    
    <p>合計金額: ¥${order.total_amount.toLocaleString()}</p>
    
    <h3>お届け先情報</h3>
    <p>${order.shipping_address}</p>
    
    <h3>お支払い方法</h3>
    <p>${order.payment_method}</p>
  `;
};