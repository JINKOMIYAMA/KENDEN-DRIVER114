interface DeliveryInfoProps {
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
  };
  setAddress: React.Dispatch<React.SetStateAction<{
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
  }>>;
  handlePostalCodeChange: (code: string) => Promise<void>;
  errors: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
  };
}

export const DeliveryInfo = ({ address, setAddress, handlePostalCodeChange, errors }: DeliveryInfoProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">お届け先情報</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300">
            郵便番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            value={address.postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white
              ${errors.postalCode ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="1234567（ハイフンなし）"
          />
          {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
        </div>

        <div>
          <label htmlFor="prefecture" className="block text-sm font-medium text-gray-300">
            都道府県 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="prefecture"
            value={address.prefecture}
            onChange={(e) => setAddress(prev => ({ ...prev, prefecture: e.target.value }))}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white
              ${errors.prefecture ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="東京都"
          />
          {errors.prefecture && <p className="text-red-500 text-sm mt-1">{errors.prefecture}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300">
            市区町村 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white
              ${errors.city ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="渋谷区道玄坂"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-300">
            番地・建物名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
            className={`mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white
              ${errors.street ? 'border-red-500' : 'border-gray-600'}`}
            placeholder="1-2-3 ○○ビル101"
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>
      </div>
    </div>
  );
};