import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getCurrentUserEmail() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    return decoded.email;
  } catch {
    return null;
  }
}