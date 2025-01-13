import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerName, customerEmail, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Shoei Buppan <onboarding@resend.dev>',
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
} 