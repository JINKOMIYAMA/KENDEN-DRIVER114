export const validationMessages = {
  cart: {
    empty: 'カートに商品がありません',
  },
  customer: {
    nameRequired: 'お名前を入力してください',
    emailRequired: 'メールアドレスを入力してください',
    emailInvalid: '有効なメールアドレスを入力してください',
  },
  address: {
    postalCodeRequired: '郵便番号を入力してください',
    postalCodeInvalid: '郵便番号は7桁で入力してください',
    prefectureRequired: '都道府県を入力してください',
    cityRequired: '市区町村を入力してください',
    streetRequired: '番地・建物名を入力してください',
  },
  creditCard: {
    numberRequired: 'クレジットカード番号を入力してください',
    numberInvalid: '有効なクレジットカード番号を入力してください',
    expiryRequired: '有効期限を入力してください',
    expiryInvalid: '有効期限は MM/YY の形式で入力してください',
    cvvRequired: 'セキュリティコードを入力してください',
    cvvInvalid: 'セキュリティコードは3桁の数字で入力してください',
    nameRequired: 'カード名義人を入力してください',
  },
  bankTransfer: {
    nameRequired: 'お名前（カタカナ）を入力してください',
    nameInvalid: 'お名前はカタカナで入力してください',
    phoneRequired: '電話番号を入力してください',
    phoneInvalid: '有効な電話番号を入力してください（例：090-1234-5678）',
  },
} as const;