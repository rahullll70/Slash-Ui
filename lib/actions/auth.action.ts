'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { randomInt } from 'crypto';
import { sendOtpEmail } from '../email';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sendOtp(formData: FormData) {
  const email = formData.get('email') as string;

  console.log('EMAIL RECEIVED:', email);

  const rawOtp = randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(rawOtp, 10);

  await prisma.otp.create({
    data: {
      email,
      code: hashedOtp, // ✅ must match schema field name
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  const response = await sendOtpEmail(email, rawOtp);
  console.log('Email send response:', response);
}

export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;

  let isSuccess = false; // Track success state

  try {
    const record = await prisma.otp.findFirst({
      where: {
        email,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) return { success: false, message: 'OTP Expired or not found' };

    const isValid = await bcrypt.compare(otp, record.code);
    if (!isValid) return { success: false, message: 'Invalid OTP' };

    await prisma.otp.deleteMany({ where: { email } });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    const cookieStore = await cookies();
    cookieStore.set('user_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/', // Changed to '/' so it's accessible across the site
    });

    isSuccess = true; // Mark as successful
  } catch (error) {
    // Check if the error is a redirect error (though it shouldn't be here now)
    console.error('Auth Error:', error);
    return { success: false, message: 'A server error occurred' };
  }

  // CALL REDIRECT OUTSIDE THE TRY/CATCH
  if (isSuccess) {
    redirect('/account');
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('user_email'); // Remove the session cookie
  redirect('/'); // Redirect to Home
}
