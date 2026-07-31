import type { HTMLAttributes } from "react";
export interface CircleCheckIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}
interface CircleCheckIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}
declare const CircleCheckIcon: import("react").ForwardRefExoticComponent<CircleCheckIconProps & import("react").RefAttributes<CircleCheckIconHandle>>;
export { CircleCheckIcon };
