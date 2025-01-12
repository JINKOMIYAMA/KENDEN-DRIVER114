import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, X } from 'lucide-react';

const Checkout = () => {
  const { items, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark p-6">
        <div className="max-w-4xl mx-auto bg-gray-900/80 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">カートが空です</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300"
          >
            商品一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-4xl mx-auto bg-gray-900/80 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">ショッピングカート</h2>
        
        <div className="space-y-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="bg-gray-800/50 p-4 rounded-lg">
              <div className="mb-2">
                <div className="text-white font-medium text-lg">
                  {item.name}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-400 text-lg">
                  ¥{item.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="p-2 hover:bg-gray-700 rounded-full"
                  >
                    <Minus className="w-4 h-4 text-gray-300" />
                  </button>
                  
                  <span className="w-8 text-center text-white text-lg">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="p-2 hover:bg-gray-700 rounded-full"
                  >
                    <Plus className="w-4 h-4 text-gray-300" />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-gray-700 rounded-full ml-2"
                  >
                    <X className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex justify-between text-xl font-bold text-white mb-8">
              <span>合計</span>
              <span>¥{total.toLocaleString()}</span>
            </div>

            <div className="flex flex-row justify-between items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-blue-400 hover:text-blue-300 md:text-base text-sm whitespace-nowrap"
              >
                ← 買い物を続ける
              </button>

              <button
                onClick={handleProceedToPayment}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold md:py-3 md:px-8 py-2 px-4 rounded-full transition-colors md:text-base text-sm whitespace-nowrap"
              >
                レジに進む
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;