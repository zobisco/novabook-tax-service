import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDummyData1736815912081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "Transaction" (
        id TEXT PRIMARY KEY,
        "eventType" TEXT NOT NULL,
        "date" TEXT NOT NULL,
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
      CREATE TABLE "AmendSale" (
        id TEXT PRIMARY KEY,
        "date" TEXT NOT NULL,
        "invoiceId" TEXT NOT NULL,
        "itemId" TEXT NOT NULL,
        "cost" INTEGER NOT NULL,
        "taxRate" REAL NOT NULL
      );
    `);

    await queryRunner.query(`
      INSERT INTO "Transaction" ("id", "eventType", "date", "invoiceId", "amount")
      VALUES
        ('1', 'SALES', '2024-02-22T17:00:00Z', 'invoice0', 900),
        ('2', 'TAX_PAYMENT', '2024-02-22T17:15:00Z', NULL, 250),
        ('3', 'SALES', '2024-02-22T17:29:00Z', 'invoice2', 800),
        ('4', 'TAX_PAYMENT', '2024-02-22T17:45:00Z', NULL, 250),
        ('5', 'SALES', '2024-02-22T18:00:00Z', 'invoice3', 3000),
        ('6', 'TAX_PAYMENT', '2024-02-22T18:10:00Z', NULL, 600),
        ('7', 'SALES', '2024-02-22T18:30:00Z', 'invoice4', 2000),
        ('8', 'TAX_PAYMENT', '2024-02-22T18:40:00Z', NULL, 400);
    `);

    await queryRunner.query(`
      INSERT INTO "SaleItem" ("id", "transactionId", "itemId", "cost", "taxRate")
      VALUES
        ('1', '1', 'item1', 500, 0.2),
        ('2', '1', 'item2', 400, 0.1),
        ('3', '3', 'item3', 600, 0.15),
        ('4', '3', 'item4', 200, 0.1),
        ('5', '5', 'item5', 3000, 0.2),
        ('6', '7', 'item6', 2000, 0.2);
    `);

    await queryRunner.query(`
      INSERT INTO "AmendSale" ("id", "date", "invoiceId", "itemId", "cost", "taxRate")
      VALUES
        ('1', '2024-02-22T17:29:39Z', 'invoice2', 'item3', 600, 0.15);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "AmendSale";`);
    await queryRunner.query(`DROP TABLE "SaleItem";`);
    await queryRunner.query(`DROP TABLE "Transaction";`);
  }
}
