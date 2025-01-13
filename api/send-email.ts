import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('API handler started');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerName, customerEmail, items, totalAmount, shippingAddress, paymentMethod } = req.body;

    // リクエストデータのログ
    console.log('Request data:', JSON.stringify({
      customerName,
      customerEmail,
      totalAmount,
      shippingAddress,
      paymentMethod
    }, null, 2));

    // 環境変数の確認
    console.log('Environment variables:', {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? 'Set' : 'Not set',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      NODE_ENV: process.env.NODE_ENV
    });

    const emailData = {
      from: 'KENDEN DRIVER <onboarding@resend.dev>',
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
    };

    console.log('Preparing to send email');

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      const responseData = await response.text();
      console.log('Resend API response:', {
        status: response.status,
        data: responseData
      });

      if (!response.ok) {
        throw new Error(`Resend API error: ${responseData}`);
      }

      console.log('Email sent successfully');
      return res.status(200).json({ success: true });
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 