import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};

export default Router;