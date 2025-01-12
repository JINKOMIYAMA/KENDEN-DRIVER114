interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  paymentDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
    bankName: string;
    phoneNumber: string;
  };
  setPaymentDetails: React.Dispatch<React.SetStateAction<{
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
    bankName: string;
    phoneNumber: string;
  }>>;
  error: string;
}

export const PaymentMethod = ({ 
  paymentMethod, 
  setPaymentMethod, 
  paymentDetails,
  setPaymentDetails,
  error 
}: PaymentMethodProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">お支払い方法</h3>
      <div className="space-y-4">
        <div className="flex gap-3">
          <label 
            className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all flex-1
              ${paymentMethod === 'credit' 
                ? 'border-yellow-500 bg-gray-700/50' 
                : 'border-gray-700 hover:border-gray-600'}`}
          >
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only" 
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-gray-300">クレジットカード</span>
          </label>

          <label 
            className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all flex-1
              ${paymentMethod === 'bank' 
                ? 'border-yellow-500 bg-gray-700/50' 
                : 'border-gray-700 hover:border-gray-600'}`}
          >
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="sr-only" 
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="text-gray-300">銀行振込</span>
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        {paymentMethod === 'credit' && (
          <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">カード番号 <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">有効期限 <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    name="expiry"
                    value={paymentDetails.expiry}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">セキュリティコード <span className="text-red-500">*</span></label>
                  <input 
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">カード名義人（ローマ字） <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  name="cardName"
                  value={paymentDetails.cardName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="TARO YAMADA"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'bank' && (
          <div className="mt-4 space-y-4 pl-6 border-l-2 border-gray-700">
            <div>
              <h4 className="text-white font-medium mb-2">振込先情報</h4>
              <div className="bg-gray-800 p-4 rounded space-y-2 text-gray-300">
                <p>銀行名：テック銀行</p>
                <p>支店名：渋谷支店（101）</p>
                <p>口座種別：普通</p>
                <p>口座番号：1234567</p>
                <p>口座名義：カ）テックショップ</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">振込人情報</h4>
              <div>
                <label className="block text-gray-300 text-sm mb-1">お名前（カタカナ） <span className="text-red-500">*</span></label>
                <input 
                  type="text"
                  name="bankName"
                  value={paymentDetails.bankName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="ヤマダ タロウ"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">電話番号 <span className="text-red-500">*</span></label>
                <input 
                  type="tel"
                  name="phoneNumber"
                  value={paymentDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  placeholder="090-1234-5678"
                />
              </div>
              <div className="text-sm text-gray-400">
                ※振込手数料はお客様負担となります。<br />
                ※お振込みは1週間以内にお願いいたします。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};