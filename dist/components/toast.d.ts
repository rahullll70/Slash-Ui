interface ToastProps {
    message: string;
    duration?: number;
    onClose?: () => void;
}
export declare function Toast({ message, duration, onClose }: ToastProps): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): {
    showToast: (message: string, duration?: number) => void;
    ToastContainer: () => import("react/jsx-runtime").JSX.Element;
};
export {};
