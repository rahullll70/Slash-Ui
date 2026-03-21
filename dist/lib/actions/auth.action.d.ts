export declare function sendOtp(formData: FormData): Promise<{
    success: boolean;
}>;
export declare function verifyOtp(formData: FormData): Promise<{
    success: boolean;
    message: string;
}>;
export declare function logout(): Promise<void>;
