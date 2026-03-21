var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
// 1. CHANGE THIS TO DEFAULT EXPORT
export default function NeubrutalButton(_a) {
    var { children = 'Click Me!', className } = _a, props = __rest(_a, ["children", "className"]);
    return (_jsxs("button", Object.assign({}, props, { className: cn('group relative w-[140px] h-[50px] bg-none outline-none border-none p-0 cursor-pointer active:translate-y-[2px] transition-transform', className), children: [_jsx("div", { className: 'absolute top-[14px] -left-[1px] w-[calc(100%+2px)] h-full bg-[#8c8c8c] rounded-[7mm] outline outline-2 outline-[#242622] -z-10' }), _jsxs("div", { className: 'absolute top-[10px] left-0 w-full h-full bg-[#e5e5c7] rounded-[7mm] outline outline-2 outline-[#242622] -z-10', children: [_jsx("div", { className: 'absolute bottom-0 left-[15%] w-[2px] h-[9px] bg-[#242622]' }), _jsx("div", { className: 'absolute bottom-0 left-[85%] w-[2px] h-[9px] bg-[#242622]' })] }), _jsxs("div", { className: 'relative w-full h-full flex items-center justify-center bg-[#ffffee] rounded-[7mm] outline outline-2 outline-[#242622] text-[#242622] font-semibold text-base overflow-hidden transition-all duration-200 group-active:translate-y-[10px]', children: [_jsx("div", { className: 'absolute top-0 -left-[20px] w-[15px] h-full bg-black/10 skew-x-[30deg] transition-all duration-300 group-active:left-[calc(100%+20px)]' }), children] })] })));
}
