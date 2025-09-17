import process from 'node:process';
import { PrismaClient } from '@prisma/client';

import { seedAccounts } from './users/account';

const prisma = new PrismaClient();

async function seedData() {
  await seedAccounts();
}

seedData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
