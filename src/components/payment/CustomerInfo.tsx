import React, { useState } from 'react';

interface CustomerInfoProps {
  customerInfo: {
    name: string;
    email: string;
  };
  setCustomerInfo: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
  }>>;
  errors: {
    name: string;
    email: string;
  };
}

export const CustomerInfo = ({ customerInfo, setCustomerInfo, errors }: CustomerInfoProps) => {
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('有効なメールアドレスではありません');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setCustomerInfo(prev => ({ ...prev, email: newEmail }));
    validateEmail(newEmail);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">お客様情報</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white 
              ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="山田 太郎"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={customerInfo.email}
            onChange={handleEmailChange}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white
              ${(errors.email || emailError) ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="example@email.com"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
};