// lib/bcrypt.ts
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashOtp = async (otp: string) => {
  const hashedOtp = await bcrypt.hash(otp, saltRounds);
  return hashedOtp;
};

export const compareOtp = async (otp: string, hashedOtp: string) => {
  const isMatch = await bcrypt.compare(otp, hashedOtp);
  return isMatch;
};
