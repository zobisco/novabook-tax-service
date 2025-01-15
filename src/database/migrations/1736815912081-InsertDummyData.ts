import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAndSeedTables1736815912081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Transaction" (
        id TEXT PRIMARY KEY,
        "eventType" TEXT NOT NULL,
        "date" TEXT NOT NULL, -- ISO 8601 format
        "invoiceId" TEXT,
        "amount" INTEGER
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "SaleItem" (
        id TEXT PRIMARY KEY,
        "transactionId" TEXT,
        "itemId" TEXT NOT NULL,
        "cost" INTEGER NOT NULL,
        "taxRate" REAL NOT NULL,
        FOREIGN KEY ("transactionId") REFERENCES "Transaction" (id) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "SaleAmendment" (
        id TEXT PRIMARY KEY,
        "date" TEXT NOT NULL, -- ISO 8601 format
        "invoiceId" TEXT NOT NULL,
        "itemId" TEXT NOT NULL,
        "cost" INTEGER NOT NULL,
        "taxRate" REAL NOT NULL,
        "taxPosition" INTEGER
      );
    `);

    await queryRunner.query(`
      INSERT INTO "Transaction" ("id", "eventType", "date", "invoiceId", "amount")
      VALUES
        ('1', 'SALES', '2024-02-22T17:00:00Z', 'invoice1', NULL),
        ('2', 'TAX_PAYMENT', '2024-02-22T17:15:00Z', NULL, 1000),
        ('3', 'SALES', '2024-02-22T17:29:00Z', 'invoice2', NULL);
    `);

    await queryRunner.query(`
      INSERT INTO "SaleItem" ("id", "transactionId", "itemId", "cost", "taxRate")
      VALUES
        ('1', '1', 'item1', 500, 0.2),  -- Tax: 100
        ('2', '1', 'item2', 400, 0.1),  -- Tax: 40
        ('3', '3', 'item3', 600, 0.15), -- Tax: 90
        ('4', '3', 'item4', 200, 0.1);  -- Tax: 20
    `);

    await queryRunner.query(`
      INSERT INTO "SaleAmendment" ("id", "date", "invoiceId", "itemId", "cost", "taxRate", "taxPosition")
      VALUES
        ('1', '2024-02-22T17:29:39Z', 'invoice2', 'item3', 600, 0.15, 98);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SaleAmendment";`);
    await queryRunner.query(`DROP TABLE "SaleItem";`);
    await queryRunner.query(`DROP TABLE "Transaction";`);
  }
}
