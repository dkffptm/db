import prisma from "../../../../../lib/prisma";
import { getUserFromRequest } from "../../../../../lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const postId = Number(params.id);
  const existing = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId: user.id } },
  });
  if (existing) {
    await prisma.like.delete({
      where: { id: existing.id },
    });
    return new Response(JSON.stringify({ liked: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  await prisma.like.create({ data: { postId, userId: user.id } });
  return new Response(JSON.stringify({ liked: true }), {
    headers: { "Content-Type": "application/json" },
  });
}