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

    // 必須フィールドの検証
    if (!customerName || !customerEmail || !items || !totalAmount || !shippingAddress || !paymentMethod) {
      console.error('Missing required fields:', { customerName, customerEmail, items, totalAmount, shippingAddress, paymentMethod });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 環境変数の検証
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error('Missing ADMIN_EMAIL');
      return res.status(500).json({ error: 'Server configuration error' });
    }

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

    console.log('Sending email to Resend API');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    const responseText = await response.text();
    console.log('Resend API response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${responseText}`);
    }

    console.log('Email sent successfully');
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 