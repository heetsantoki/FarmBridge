const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = async () => {
  if (transporter) return transporter;

  const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;
  const emailService = process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || 'gmail';

  if (emailUser && emailPass) {
    transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  } else {
    // Development fallback using Ethereal Test Account
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      transporter = {
        sendMail: async () => {
          return { messageId: 'dummy-id' };
        }
      };
    }
  }
  return transporter;
};

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const mailer = await getTransporter();
    const emailUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const from = process.env.EMAIL_FROM || process.env.SMTP_FROM || (emailUser ? `"FarmBridge" <${emailUser}>` : '"FarmBridge" <support@farmbridge.com>');
    const info = await mailer.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return { success: true, info };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
