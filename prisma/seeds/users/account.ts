import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedAccounts() {
  const salt = bcrypt.genSaltSync(10);

  const users = [
    {
      email: 'admin@example.com',
      fname: 'Admin',
      lname: 'User',
      password: 'admin123',
      role: 'ADMIN' as const,
    },
    {
      email: 'user@example.com',
      fname: 'user',
      lname: 'Test',
      password: 'user123',
      role: 'USER' as const,
    },
  ];

  for (const user of users) {
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    await prisma.account.create({
      data: {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        password: hashedPassword,
        role: user.role as any,
      },
    });
  }

  console.warn('✅ Seeded 2 users:  admin, user');
}
