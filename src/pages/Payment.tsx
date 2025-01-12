import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { OrderSummary } from '../components/payment/OrderSummary';
import { CustomerInfo } from '../components/payment/CustomerInfo';
import { DeliveryInfo } from '../components/payment/DeliveryInfo';
import { PaymentMethod } from '../components/payment/PaymentMethod';
import { toast } from 'sonner';
import { validateCustomerInfo, validateAddress, validatePaymentMethod } from '../utils/validationUtils';
import { createOrder } from '../services/orderService';

const Payment = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });
  const [address, setAddress] = useState({
    postalCode: '',
    prefecture: '',
    city: '',
    street: ''
  });
  const [errors, setErrors] = useState({
    customer: {
      name: '',
      email: ''
    },
    address: {
      postalCode: '',
      prefecture: '',
      city: '',
      street: ''
    },
    payment: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    bankName: '',
    phoneNumber: ''
  });

  const handlePostalCodeChange = async (code: string) => {
    setAddress(prev => ({ ...prev, postalCode: code }));
    
    if (code.length === 7) {
      try {
        const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`);
        const data = await response.json();
        
        if (data.results) {
          const result = data.results[0];
          setAddress(prev => ({
            ...prev,
            prefecture: result.address1,
            city: result.address2 + result.address3,
          }));
        } else {
          toast.error('郵便番号が見つかりませんでした');
        }
      } catch (error) {
        console.error('郵便番号の検索に失敗しました:', error);
        toast.error('郵便番号の検索に失敗しました');
      }
    }
  };

  const validateForm = (formElement: HTMLFormElement) => {
    let isValid = true;
    const newErrors = {
      customer: { name: '', email: '' },
      address: { postalCode: '', prefecture: '', city: '', street: '' },
      payment: ''
    };

    // カートの確認
    if (items.length === 0) {
      toast.error('カートが空です');
      return false;
    }

    // 顧客情報の確認
    if (!customerInfo.name.trim()) {
      newErrors.customer.name = 'お名前を入力してください';
      isValid = false;
    }
    if (!customerInfo.email.trim()) {
      newErrors.customer.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.customer.email = '有効なメールアドレスを入力してください';
      isValid = false;
    }

    // 配送先情報の確認
    if (!address.postalCode.trim()) {
      newErrors.address.postalCode = '郵便番号を入力してください';
      isValid = false;
    }
    if (!address.prefecture.trim()) {
      newErrors.address.prefecture = '都道府県を入力してください';
      isValid = false;
    }
    if (!address.city.trim()) {
      newErrors.address.city = '市区町村を入力してください';
      isValid = false;
    }
    if (!address.street.trim()) {
      newErrors.address.street = '番地を入力してください';
      isValid = false;
    }

    // 支払い方法の確認
    if (!paymentMethod) {
      newErrors.payment = 'お支払い方法を選択してください';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    if (!validateForm(formElement)) {
      return;
    }

    const orderData = {
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      shippingAddress: `〒${address.postalCode} ${address.prefecture}${address.city}${address.street}`,
      paymentMethod,
      paymentDetails: paymentDetails,
      totalAmount: total,
      items: items
    };

    const success = await createOrder(orderData);
    if (success) {
      toast.success('ご注文ありがとうございます！');
      clearCart();
      navigate('/');
    }
  };

  const isFormValid = () => {
    // カートが空の場合は無効
    if (items.length === 0) return false;

    // お客様情報の確認
    if (!customerInfo.name.trim() || !customerInfo.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) return false;

    // お届け先情報の確認
    if (!address.postalCode.trim() || 
        !address.prefecture.trim() || 
        !address.city.trim() || 
        !address.street.trim()) return false;

    // 支払い方法の確認
    if (paymentMethod === 'credit') {
      return !!(paymentDetails.cardNumber.trim() &&
                paymentDetails.expiry.trim() &&
                paymentDetails.cvv.trim() &&
                paymentDetails.cardName.trim());
    } else if (paymentMethod === 'bank') {
      return !!(paymentDetails.bankName.trim() &&
                paymentDetails.phoneNumber.trim());
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-3xl mx-auto bg-gray-900/80 rounded-xl p-4 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-6">お支払い情報</h2>

        <form onSubmit={handlePayment} className="space-y-6">
          <OrderSummary items={items} total={total} />
          <CustomerInfo 
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            errors={errors.customer}
          />
          <DeliveryInfo 
            address={address}
            setAddress={setAddress}
            handlePostalCodeChange={handlePostalCodeChange}
            errors={errors.address}
          />
          <PaymentMethod 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            error={errors.payment}
          />

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="text-blue-400 hover:text-blue-300 md:text-base text-sm"
            >
              ← カートに戻る
            </button>

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`font-bold md:py-3 md:px-8 py-2 px-4 rounded-full transition-colors md:text-base text-sm
                ${isFormValid()
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
            >
              注文を確定する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;