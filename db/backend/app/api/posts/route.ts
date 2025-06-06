import prisma from "../../../lib/prisma";
import { getUserFromRequest } from "../../../lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true, likes: true },
      },
      author: { select: { id: true, name: true } },
    },
  });

  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const { title, content } = await req.json();
  const post = await prisma.post.create({
    data: { title, content, authorId: user.id },
  });
  return new Response(JSON.stringify(post), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}