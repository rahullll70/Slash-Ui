'use server';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { randomInt } from 'crypto';
import { sendOtpEmail } from '../email';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sendOtp(formData: FormData) {
  const email = formData.get('email') as string;

  const rawOtp = randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(rawOtp, 10);

  await prisma.otp.create({
    data: {
      email,
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, rawOtp);

  return { success: true };
}

export async function verifyOtp(formData: FormData) {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;

  try {
    const record = await prisma.otp.findFirst({
      where: {
        email,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      return { success: false, message: 'OTP expired' };
    }

    const valid = await bcrypt.compare(otp, record.code);

    if (!valid) {
      return { success: false, message: 'Invalid OTP' };
    }

    await prisma.otp.deleteMany({ where: { email } });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' },
    );

    const cookieStore = await cookies();

    cookieStore.set('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Server error' };
  }

  redirect('/account');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  redirect('/');
}