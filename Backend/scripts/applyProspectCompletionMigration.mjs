import prisma from "../src/db/prismaClient.js";

async function columnExists(columnName) {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME IN ('prospect', 'Prospect')
       AND COLUMN_NAME = ?`,
    columnName
  );

  return Number(rows?.[0]?.count ?? 0) > 0;
}

async function indexExists(indexName) {
  const rows = await prisma.$queryRawUnsafe(
    `SELECT COUNT(*) AS count
     FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME IN ('prospect', 'Prospect')
       AND INDEX_NAME = ?`,
    indexName
  );

  return Number(rows?.[0]?.count ?? 0) > 0;
}

async function main() {
  const addColumnSql = [];

  if (!(await columnExists("completed"))) {
    addColumnSql.push("ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false");
  }

  if (!(await columnExists("completedAt"))) {
    addColumnSql.push("ADD COLUMN `completedAt` DATETIME(3) NULL");
  }

  if (addColumnSql.length > 0) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE \`prospect\` ${addColumnSql.join(", ")}`
    );
    console.log(`Applied prospect completion column updates: ${addColumnSql.length}`);
  } else {
    console.log("Prospect completion columns already exist");
  }

  if (!(await indexExists("Prospect_completed_idx"))) {
    await prisma.$executeRawUnsafe(
      "CREATE INDEX `Prospect_completed_idx` ON `Prospect`(`completed`)"
    );
    console.log("Created Prospect_completed_idx");
  } else {
    console.log("Prospect_completed_idx already exists");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
