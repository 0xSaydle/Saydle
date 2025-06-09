import jwt from "jsonwebtoken";

export async function signJwt(payload: object): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "");
  } catch {
    return null;
  }
}