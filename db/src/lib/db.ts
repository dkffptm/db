import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 핫 Reroading을 제어해서 중복데이터베이스연결 차단
// prisma instance를 중복 생성하는 문제를 막아준다
