import nodemailer from 'nodemailer';

// トランスポーターの作成
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.VITE_GMAIL_USER,
    pass: import.meta.env.VITE_GMAIL_APP_PASSWORD
  }
});

interface MailResult {
  success: boolean;
  error?: any;
}

// メール送信関数
export const sendMail = async (
  from: string,
  subject: string,
  text: string
): Promise<MailResult> => {
  try {
    const mailOptions = {
      from: from, // 送信者のメールアドレス
      to: import.meta.env.VITE_ADMIN_EMAIL, // 管理者のメールアドレス
      subject: subject,
      text: text,
      replyTo: from // 返信先を設定
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 