"use client";
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
import { motion, useAnimation } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
const ICON_VARIANTS = {
    normal: { scale: 1, rotate: 0 },
    animate: {
        scale: [1, 1.1, 1.1, 1.1, 1],
        rotate: [0, -3, 3, -2, 2, 0],
        transition: {
            duration: 0.5,
            times: [0, 0.2, 0.4, 0.6, 1],
            ease: "easeInOut",
        },
    },
};
const BadgeAlertIcon = forwardRef((_a, ref) => {
    var { onMouseEnter, onMouseLeave, className, size = 28 } = _a, props = __rest(_a, ["onMouseEnter", "onMouseLeave", "className", "size"]);
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
        isControlledRef.current = true;
        return {
            startAnimation: () => controls.start("animate"),
            stopAnimation: () => controls.start("normal"),
        };
    });
    const handleMouseEnter = useCallback((e) => {
        if (isControlledRef.current) {
            onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(e);
        }
        else {
            controls.start("animate");
        }
    }, [controls, onMouseEnter]);
    const handleMouseLeave = useCallback((e) => {
        if (isControlledRef.current) {
            onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);
        }
        else {
            controls.start("normal");
        }
    }, [controls, onMouseLeave]);
    return (_jsx("div", Object.assign({ className: cn(className), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, props, { children: _jsxs(motion.svg, { animate: controls, fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", variants: ICON_VARIANTS, viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }), _jsx("line", { x1: "12", x2: "12", y1: "8", y2: "12" }), _jsx("line", { x1: "12", x2: "12.01", y1: "16", y2: "16" })] }) })));
});
BadgeAlertIcon.displayName = "BadgeAlertIcon";
export { BadgeAlertIcon };
