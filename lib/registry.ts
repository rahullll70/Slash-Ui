'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getComponentSource(filePaths: string[] | undefined) {
    if (!filePaths || filePaths.length === 0) return

    try {
        const fullPath = path.join(process.cwd(), filePaths[0]);
        const source = await fs.readFile(fullPath, 'utf-8');
        return source;
    } catch (error) {
        console.error('Failed to read source code:', error);
        return
    }
}