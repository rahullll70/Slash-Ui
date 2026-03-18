import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: any) {
  const token = req.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/account/:path*', '/docs/:path*', '/components/:path*'],
};