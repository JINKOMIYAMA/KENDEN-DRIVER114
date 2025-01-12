import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 380);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 380);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (location.pathname === '/checkout' || location.pathname === '/payment') {
    return null;
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => navigate('/checkout')}
        className="relative p-4 md:p-4 bg-gray-900/80 backdrop-blur-sm rounded-full border border-blue-400/20 hover:bg-gray-800/80 transition-colors"
      >
        <ShoppingCart className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-blue-400`} />
        {itemCount > 0 && (
          <span className={`absolute -top-1 -right-1 bg-red-500 text-white ${
            isMobile ? 'w-5 h-5 text-sm' : 'w-7 h-7 text-sm'
          } rounded-full flex items-center justify-center`}>
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;