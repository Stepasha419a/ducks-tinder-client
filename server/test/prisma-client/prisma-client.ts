import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
console.log(process.env.DATABASE_URL);
export default prismaClient;
