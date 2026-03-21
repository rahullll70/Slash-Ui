import { NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    user: null;
}> | NextResponse<{
    user: {
        email: string;
    };
}>>;
