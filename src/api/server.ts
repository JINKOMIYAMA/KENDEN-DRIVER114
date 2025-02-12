import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// 環境変数を読み込む
dotenv.config()  // デフォルトでプロジェクトルートの.envを読み込む

const app = express()

app.use(cors())
app.use(express.json())

// 環境変数を確認
const GMAIL_USER = process.env.VITE_GMAIL_USER
const GMAIL_PASSWORD = process.env.VITE_GMAIL_APP_PASSWORD
const ADMIN_EMAIL = process.env.VITE_ADMIN_EMAIL

if (!GMAIL_USER || !GMAIL_PASSWORD || !ADMIN_EMAIL) {
  console.error('Required environment variables are missing:', {
    GMAIL_USER: !!GMAIL_USER,
    GMAIL_PASSWORD: !!GMAIL_PASSWORD,
    ADMIN_EMAIL: !!ADMIN_EMAIL
  })
  process.exit(1)
}

// Gmailトランスポーターの設定
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD
  }
})

app.post('/api/send-order-email', async (req, res) => {
  try {
    console.log('Received request body:', req.body)
    const { customerEmail, customerName, items, totalAmount, shippingAddress, paymentMethod } = req.body

    // 受信したデータの検証
    if (!customerEmail || !customerName) {
      console.error('Missing required fields:', { customerEmail, customerName })
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // 顧客へのメール送信
    console.log('Sending customer email to:', customerEmail)
    await transporter.sendMail({
      from: GMAIL_USER,
      to: customerEmail,
      subject: 'ご注文ありがとうございます',
      html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${customerName}様</h2>
      <p>ご注文ありがとうございます。</p>

      <h3>【ご注文内容】</h3>
      <ul>
        ${items?.map(item => `
          <li>${item.name} - ${item.quantity}個 (¥${item.price.toLocaleString()})</li>
        `).join('')}
      </ul>

      <p>合計金額: ¥${totalAmount?.toLocaleString() || 0}</p>
      <p>配送先: ${shippingAddress || ''}</p>
      <p>支払方法: ${paymentMethod === 'bank' ? '銀行振込' : 'その他'}</p>

      ${paymentMethod === 'bank' ? `
        <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 5px;">
          <h3>【お振込先情報】</h3>
          <p>以下の口座へお振込をお願いいたします。</p>
          
          <table style="margin: 10px 0;">
            <tr><td>銀行名</td><td>：</td><td>○○銀行</td></tr>
            <tr><td>支店名</td><td>：</td><td>××支店（支店コード: 123）</td></tr>
            <tr><td>口座種別</td><td>：</td><td>普通</td></tr>
            <tr><td>口座番号</td><td>：</td><td>1234567</td></tr>
            <tr><td>口座名義</td><td>：</td><td>カブシキガイシャ ケンデン</td></tr>
          </table>

          <p style="color: #ff0000;">※お振込手数料はお客様負担となります。</p>
          <p>※お振込確認後、商品の発送準備に入らせていただきます。</p>
        </div>
      ` : ''}

      <p>商品の発送準備が整い次第、改めてご連絡させていただきます。</p>
      <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>

      <hr style="margin: 30px 0;">
      <div style="font-size: 12px; color: #666;">
        <p>株式会社ケンデン</p>
        <p>〒123-4567 東京都○○区××1-2-3</p>
        <p>TEL: 03-1234-5678</p>
        <p>Email: ${ADMIN_EMAIL}</p>
      </div>
    </div>
  `
    })

    // 管理者へのメール送信
    console.log('Sending admin email to:', ADMIN_EMAIL)
    await transporter.sendMail({
      from: GMAIL_USER,
      to: ADMIN_EMAIL,
      subject: '新規注文が入りました',
      text: `
新規注文がありました。

【注文内容】
注文者: ${customerName}
メール: ${customerEmail}
配送先: ${shippingAddress || ''}
支払方法: ${paymentMethod || ''}

商品:
${items?.map(item => `${item.name} - ${item.quantity}個 (¥${item.price})`).join('\n') || '商品情報なし'}

合計金額: ¥${totalAmount || 0}
      `
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message,
      stack: error.stack
    })
  }
})

const port = 8083
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log('Environment variables loaded:', {
    GMAIL_USER: !!GMAIL_USER,
    GMAIL_PASSWORD: !!GMAIL_PASSWORD,
    ADMIN_EMAIL: !!ADMIN_EMAIL
  })
}) 