import type { HTMLAttributes } from "react";
export interface TerminalIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}
interface TerminalIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}
declare const TerminalIcon: import("react").ForwardRefExoticComponent<TerminalIconProps & import("react").RefAttributes<TerminalIconHandle>>;
export { TerminalIcon };
