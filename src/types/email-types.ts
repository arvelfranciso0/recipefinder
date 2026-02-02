export type Email = {
  toEmail: string;
  from: string;
  subject: string;
};

export type EmailVerificationCode = Email & {
  verificationCode: string;
};

export type ForgotPasswordCode = Email & {
  resetCode: string;
};
