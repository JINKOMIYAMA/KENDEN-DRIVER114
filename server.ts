import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Shop <comimasa@icloud.com>',
        to: [customerEmail, process.env.ADMIN_EMAIL],
        subject: 'ご注文ありがとうございます',
        html: `
          <h2>${customerName}様</h2>
          <p>ご注文ありがとうございます。</p>
          
          <h3>ご注文内容</h3>
          <table>
            ${items.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}個</td>
                <td>¥${item.price.toLocaleString()}</td>
              </tr>
            `).join('')}
          </table>
          
          <p>合計金額: ¥${totalAmount.toLocaleString()}</p>
          
          <h3>お届け先情報</h3>
          <p>${shippingAddress}</p>
          
          <h3>お支払い方法</h3>
          <p>${paymentMethod}</p>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 