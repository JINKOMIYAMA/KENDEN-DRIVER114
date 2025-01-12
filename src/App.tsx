import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import CartIcon from './components/CartIcon';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="relative min-h-screen bg-dark">
          <CartIcon />
          <Router />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
