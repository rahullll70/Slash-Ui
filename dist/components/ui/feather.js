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
const FEATHER_VARIANTS = {
    normal: {
        rotate: 0,
        y: 0,
        x: 0,
    },
    animate: {
        rotate: [0, -8, 4, -3, 0],
        y: [0, -4, -2, -1, 0],
        x: [0, 2, -2, 1, 0],
        transition: {
            duration: 1.6,
            ease: "easeInOut",
        },
    },
};
const FeatherIcon = forwardRef((_a, ref) => {
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
    return (_jsx("div", Object.assign({ className: cn(className), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }, props, { children: _jsxs(motion.svg, { animate: controls, fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", variants: FEATHER_VARIANTS, viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" }), _jsx("path", { d: "M16 8 2 22" }), _jsx("path", { d: "M17.5 15H9" })] }) })));
});
FeatherIcon.displayName = "FeatherIcon";
export { FeatherIcon };
