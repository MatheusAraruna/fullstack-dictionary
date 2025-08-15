import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger('PrismaSeed');

async function seeds() {}

async function main() {
  logger.log('Seeding database...');

  await seeds();

  logger.log('Database seeded!');
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
