import { DataSource } from 'typeorm';
import { TransactionEntity } from './database/entities/transaction.entity';
import { AmendSaleEntity } from './database/entities/amendSale.entity';
import { SaleItemEntity } from './database/entities/saleItem.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'novabook.sqlite',
  entities: [AmendSaleEntity, SaleItemEntity, TransactionEntity],
  migrations: ['./dist/src/database/migrations/*.js'],
});

export default dataSource;
