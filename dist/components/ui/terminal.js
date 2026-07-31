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
const LINE_VARIANTS = {
    normal: { opacity: 1 },
    animate: {
        opacity: [1, 0, 1],
        transition: {
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
        },
    },
};
const TerminalIcon = forwardRef((_a, ref) => {
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
    return (_jsx("div", Object.assign({ className: cn(className), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, props, { children: _jsxs("svg", { fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("polyline", { points: "4 17 10 11 4 5" }), _jsx(motion.line, { animate: controls, initial: "normal", variants: LINE_VARIANTS, x1: "12", x2: "20", y1: "19", y2: "19" })] }) })));
});
TerminalIcon.displayName = "TerminalIcon";
export { TerminalIcon };
