import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { logout } from '@/lib/actions/auth.action';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
export default async function UserProfile() {
    var _a;
    const cookieStore = await cookies();
    const token = (_a = cookieStore.get('access_token')) === null || _a === void 0 ? void 0 : _a.value;
    if (!token) {
        redirect('/login');
    }
    let email;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        email = decoded.email;
    }
    catch (_b) {
        redirect('/login');
    }
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        redirect('/login');
    }
    const formattedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (_jsx("div", { className: 'min-h-screen text-white flex items-center justify-center px-4', children: _jsxs("main", { className: 'w-full max-w-xl', children: [_jsxs("header", { className: 'mb-10 text-center', children: [_jsx("p", { className: 'text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3', children: "Logged in as" }), _jsx("h1", { className: 'text-2xl md:text-3xl font-semibold tracking-tight break-all', children: email })] }), _jsxs("div", { className: 'space-y-0 text-sm', children: [_jsxs("div", { className: 'flex justify-between py-2 border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500 mb-2', children: [_jsx("span", { children: "Type" }), _jsx("span", { children: "Details" })] }), _jsx(Row, { label: 'Action', value: 'Logout', isAction: true, action: logout }), _jsx(Row, { label: 'Date of join', value: formattedDate }), _jsx(Row, { label: 'Membership', value: 'Free' }), _jsx(Row, { label: 'Components Access', value: '36+' })] }), _jsx(Link, { href: '/pricing', className: 'block text-center py-4 mt-5 w-full bg-zinc-900 hover:bg-zinc-800 transition-all duration-400 rounded-xl cursor-pointer', children: "Unlock full access" })] }) }));
}
function Row({ label, value, isAction = false, action, }) {
    return (_jsxs("div", { className: 'flex items-center justify-between py-5 border-b border-white/10', children: [_jsx("span", { className: 'text-gray-200', children: label }), isAction && action ? (_jsx("form", { action: action, children: _jsx("button", { type: 'submit', className: 'text-white hover:text-red-400 transition-colors cursor-pointer', children: value }) })) : (_jsx("span", { className: 'text-gray-400', children: value }))] }));
}
