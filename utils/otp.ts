export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  const otpExpiredAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  return { otp, otpExpiredAt };
};