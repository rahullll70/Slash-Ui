import type { HTMLAttributes } from "react";
export interface BadgeAlertIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}
interface BadgeAlertIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}
declare const BadgeAlertIcon: import("react").ForwardRefExoticComponent<BadgeAlertIconProps & import("react").RefAttributes<BadgeAlertIconHandle>>;
export { BadgeAlertIcon };
