import prisma from "../../../../lib/prisma";
import { getUserFromRequest } from "../../../../lib/auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true } },
      comments: {
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "asc" },
      },
      likes: true,
    },
  });
  if (!post) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(post), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const user = await getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const id = Number(params.id);
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post || post.authorId !== user.id) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  await prisma.like.deleteMany({ where: { postId: id } });
  await prisma.comment.deleteMany({ where: { postId: id } });
  await prisma.post.delete({ where: { id } });
  return new Response(null, { status: 204 });
}