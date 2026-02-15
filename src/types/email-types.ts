export type Email = {
  toEmail: string;
  subject: string;
};

export type EmailVerificationCode = Email & {
  verificationCode: string;
  idToken: string;
};

export type ForgotPasswordLink = Email & {
  forgot_password_link: string;
};
