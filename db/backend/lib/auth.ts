import jwt from "jsonwebtoken";
import prisma from "./prisma";

export async function getUserFromRequest(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string" || !decoded) return null;
    const { userId } = decoded as { userId: number };
    return await prisma.user.findUnique({ where: { id: userId } });
  } catch (e) {
    return null;
  }
}