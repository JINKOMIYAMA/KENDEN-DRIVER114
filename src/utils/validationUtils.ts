export const validateCustomerInfo = (customerInfo: { name: string; email: string }) => {
  if (!customerInfo.name.trim()) {
    return 'お名前を入力してください';
  }
  if (!customerInfo.email.trim()) {
    return 'メールアドレスを入力してください';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
    return '有効なメールアドレスを入力してください';
  }
  return null;
};

export const validateAddress = (address: { 
  postalCode: string;
  prefecture: string;
  city: string;
  street: string;
}) => {
  if (!address.postalCode || address.postalCode.length !== 7) {
    return '郵便番号を正しく入力してください';
  }
  if (!address.prefecture.trim()) {
    return '都道府県を入力してください';
  }
  if (!address.city.trim()) {
    return '市区町村を入力してください';
  }
  if (!address.street.trim()) {
    return '番地・建物名を入力してください';
  }
  return null;
};

export const validatePaymentMethod = (
  paymentMethod: string,
  formElement: HTMLFormElement
) => {
  if (paymentMethod === 'credit') {
    const cardNumber = formElement.querySelector('input[placeholder="1234 5678 9012 3456"]') as HTMLInputElement;
    const expiry = formElement.querySelector('input[placeholder="MM/YY"]') as HTMLInputElement;
    const cvv = formElement.querySelector('input[placeholder="123"]') as HTMLInputElement;
    const cardName = formElement.querySelector('input[placeholder="TARO YAMADA"]') as HTMLInputElement;

    if (!cardNumber?.value) {
      return 'カード番号を入力してください';
    }
    if (!expiry?.value) {
      return '有効期限を入力してください';
    }
    if (!cvv?.value) {
      return 'セキュリティコードを入力してください';
    }
    if (!cardName?.value.trim()) {
      return 'カード名義人を入力してください';
    }
  } else if (paymentMethod === 'bank') {
    const bankName = formElement.querySelector('input[placeholder="ヤマダタロウ"]') as HTMLInputElement;
    const phoneNumber = formElement.querySelector('input[placeholder="090-1234-5678"]') as HTMLInputElement;

    if (!bankName?.value.trim()) {
      return 'お名前（カタカナ）を入力してください';
    }
    if (!phoneNumber?.value) {
      return '電話番号を入力してください';
    }
  }
  return null;
};