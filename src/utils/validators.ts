import { validationMessages } from './validationMessages';
import { toast } from 'sonner';

interface CustomerInfo {
  name: string;
  email: string;
}

interface Address {
  postalCode: string;
  prefecture: string;
  city: string;
  street: string;
}

export const validateCart = (items: any[]): boolean => {
  if (items.length === 0) {
    toast.error(validationMessages.cart.empty);
    return false;
  }
  return true;
};

export const validateCustomerInfo = (customerInfo: CustomerInfo): boolean => {
  if (!customerInfo.name.trim()) {
    toast.error(validationMessages.customer.nameRequired);
    return false;
  }
  if (!customerInfo.email.trim()) {
    toast.error(validationMessages.customer.emailRequired);
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
    toast.error(validationMessages.customer.emailInvalid);
    return false;
  }
  return true;
};

export const validateAddress = (address: Address): boolean => {
  if (!address.postalCode) {
    toast.error(validationMessages.address.postalCodeRequired);
    return false;
  }
  if (address.postalCode.length !== 7) {
    toast.error(validationMessages.address.postalCodeInvalid);
    return false;
  }
  if (!address.prefecture.trim()) {
    toast.error(validationMessages.address.prefectureRequired);
    return false;
  }
  if (!address.city.trim()) {
    toast.error(validationMessages.address.cityRequired);
    return false;
  }
  if (!address.street.trim()) {
    toast.error(validationMessages.address.streetRequired);
    return false;
  }
  return true;
};

export const validateCreditCard = (): boolean => {
  const cardNumber = document.querySelector('input[placeholder="1234 5678 9012 3456"]') as HTMLInputElement;
  const expiry = document.querySelector('input[placeholder="MM/YY"]') as HTMLInputElement;
  const cvv = document.querySelector('input[placeholder="123"]') as HTMLInputElement;
  const cardName = document.querySelector('input[placeholder="TARO YAMADA"]') as HTMLInputElement;

  if (!cardNumber?.value) {
    toast.error(validationMessages.creditCard.numberRequired);
    return false;
  }
  if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    toast.error(validationMessages.creditCard.numberInvalid);
    return false;
  }
  if (!expiry?.value) {
    toast.error(validationMessages.creditCard.expiryRequired);
    return false;
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value)) {
    toast.error(validationMessages.creditCard.expiryInvalid);
    return false;
  }
  if (!cvv?.value) {
    toast.error(validationMessages.creditCard.cvvRequired);
    return false;
  }
  if (!/^\d{3}$/.test(cvv.value)) {
    toast.error(validationMessages.creditCard.cvvInvalid);
    return false;
  }
  if (!cardName?.value.trim()) {
    toast.error(validationMessages.creditCard.nameRequired);
    return false;
  }
  return true;
};

export const validateBankTransfer = (): boolean => {
  const bankName = document.querySelector('input[placeholder="ヤマダタロウ"]') as HTMLInputElement;
  const phoneNumber = document.querySelector('input[placeholder="090-1234-5678"]') as HTMLInputElement;

  if (!bankName?.value.trim()) {
    toast.error(validationMessages.bankTransfer.nameRequired);
    return false;
  }
  if (!/^[ァ-ヶー]+$/.test(bankName.value)) {
    toast.error(validationMessages.bankTransfer.nameInvalid);
    return false;
  }
  if (!phoneNumber?.value) {
    toast.error(validationMessages.bankTransfer.phoneRequired);
    return false;
  }
  if (!/^0\d{1,4}-\d{1,4}-\d{4}$/.test(phoneNumber.value)) {
    toast.error(validationMessages.bankTransfer.phoneInvalid);
    return false;
  }
  return true;
};