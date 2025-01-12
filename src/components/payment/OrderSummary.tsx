import { CartItem } from '../../contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export const OrderSummary = ({ items, total }: OrderSummaryProps) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-white font-medium mb-4">注文概要</h3>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-gray-300">
            <span>{item.name} × {item.quantity}</span>
            <span>¥{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 mt-4 pt-4">
        <div className="flex justify-between text-white font-bold">
          <span>合計</span>
          <span>¥{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};