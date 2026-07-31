import type { HTMLAttributes } from "react";
export interface FeatherIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}
interface FeatherIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}
declare const FeatherIcon: import("react").ForwardRefExoticComponent<FeatherIconProps & import("react").RefAttributes<FeatherIconHandle>>;
export { FeatherIcon };
