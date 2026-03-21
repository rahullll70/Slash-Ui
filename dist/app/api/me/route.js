import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
export async function GET() {
    var _a;
    const cookieStore = await cookies();
    const token = (_a = cookieStore.get('access_token')) === null || _a === void 0 ? void 0 : _a.value;
    if (!token) {
        return NextResponse.json({ user: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.json({
            user: { email: decoded.email },
        });
    }
    catch (_b) {
        return NextResponse.json({ user: null });
    }
}
