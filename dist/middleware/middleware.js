import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export function middleware(req) {
    var _a;
    const token = (_a = req.cookies.get('access_token')) === null || _a === void 0 ? void 0 : _a.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    }
    catch (_b) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
export const config = {
    matcher: ['/account/:path*', '/docs/:path*', '/components/:path*'],
};
