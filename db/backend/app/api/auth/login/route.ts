import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "이메일이 존재하지 않습니다." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: "비밀번호가 일치하지 않습니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // JWT에 반드시 userId 포함
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("❌ 로그인 오류:", error);

    return new Response(
      JSON.stringify({ error: "서버 오류 발생: " + error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
