import { EmailVerificationCode, ForgotPasswordLink } from "@/types/email-types";
import nodemailer from "nodemailer";

const APP_URL = process.env.APP_URL;

export function sendEmailVerification(email: EmailVerificationCode) {
  return new Promise(async (resolve, reject) => {
    const tranpoter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      secure: false, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await tranpoter
      .sendMail({
        from: `"RecipeFinder" <${process.env.FROM_EMAIL}>`,
        to: email.toEmail,
        subject: email.subject,
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your RecipeFinder Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; background-color: #ffffff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
          
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto; border-collapse: collapse;">
                <tr>
                  <td align="center" valign="middle" bgcolor="#65a338" style="height: 48px; width: 48px; border-radius: 12px; line-height: 0; font-size: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin: 0; padding: 0;">
                      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/>
                      <path d="M6 17h12"/>
                    </svg>
                  </td>
                </tr>
              </table>
              <h1 style="margin-top: 15px; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.025em; margin-bottom: 0;">
                Recipe<span style="color: #65a338;">Finder</span>
              </h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 20px 40px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 12px;">Verify your email</h2>
              <p style="font-size: 15px; line-height: 24px; color: #64748b; margin: 0;">
                Use the code below on the verification screen to complete your registration and start exploring recipes.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 10px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" bgcolor="#f1f5f9" style="padding: 16px 32px; border-radius: 16px; border: 2px dashed #e2e8f0;">
                    <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #65a338; letter-spacing: 10px; padding-left: 10px;">
                      ${email.verificationCode}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 40px 40px 40px;">
              <p style="font-size: 14px; color: #64748b; margin-bottom: 20px; line-height: 21px;">
                If you closed the verification page, please click the button below to return and enter your code:
              </p>
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${APP_URL}verify/${email.idToken}" target="_blank" style="display: inline-block; background-color: #65a338; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 14px; box-shadow: 0 4px 6px -1px rgba(101, 163, 56, 0.2);">
                      Return to Verification
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; line-height: 18px;">
                This code will expire in 15 minutes.<br>
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      })
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

export function sendForgotPasswordLink(forgotPassword: ForgotPasswordLink) {
  return new Promise(async (resolve, reject) => {
    const tranpoter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      secure: false, // use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await tranpoter
      .sendMail({
        from: `"RecipeFinder" <${process.env.FROM_EMAIL}>`,
        to: forgotPassword.toEmail,
        subject: forgotPassword.subject,
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your RecipeFinder Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border-radius: 32px; border: 1px solid #e2e8f0; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.04);">
          
          <tr>
            <td align="center" style="padding: 48px 40px 32px 40px;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" bgcolor="#65a338" style="height: 56px; width: 56px; border-radius: 16px;">
                    <span style="color: #ffffff; font-size: 28px; line-height: 56px;">👨‍🍳</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin-top: 16px; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.04em; margin-bottom: 0;">
                Recipe<span style="color: #65a338;">Finder</span>
              </h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 32px 40px;">
              <h2 style="font-size: 22px; font-weight: 800; color: #1e293b; margin: 0 0 12px 0; letter-spacing: -0.01em;">Reset your password</h2>
              <p style="font-size: 16px; line-height: 24px; color: #64748b; margin: 0;">
                We received a request to secure your account. Click the button below to set up a new password.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 32px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${forgotPassword.forgot_password_link}" target="_blank" style="display: inline-block; background-color: #65a338; color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; padding: 18px 48px; border-radius: 18px; box-shadow: 0 10px 15px -3px rgba(101, 163, 56, 0.3);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 40px 40px; border-top: 1px solid #f1f5f9;">
              <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; line-height: 18px; margin-bottom: 8px;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="font-size: 12px; word-break: break-all; color: #65a338; margin: 0;">
                <a href="${forgotPassword.forgot_password_link}" style="color: #65a338; text-decoration: underline;">
                  ${forgotPassword.forgot_password_link}
                </a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f8fafc" style="border-radius: 20px; border: 1px solid #f1f5f9;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="font-size: 11px; color: #64748b; line-height: 16px; margin: 0; text-align: center;">
                      This link will expire in <strong>15 minutes</strong>. If you did not request this change, please ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; margin-top: 24px;">
          <tr>
            <td align="center">
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                &copy; 2026 RecipeFinder. All rights reserved. <br>
                Cebu City, Philippines
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      })
      .then((res: any) => {
        resolve(res);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

export default {
  sendEmailVerification,
  sendForgotPasswordLink,
};
