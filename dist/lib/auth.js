import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function getCurrentUserEmail() {
    var _a;
    const token = (_a = (await cookies()).get("access_token")) === null || _a === void 0 ? void 0 : _a.value;
    if (!token)
        return null;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.email;
    }
    catch (_b) {
        return null;
    }
}
