export type Email = {
  toEmail: string;
  from: string;
  subject: string;
};

export type EmailVerificationCode = Email & {
  verificationCode: string;
  idToken: string;
};

export type ForgotPasswordCode = Email & {
  resetCode: string;
};
