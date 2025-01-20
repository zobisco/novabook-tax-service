import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database';
import { AmendSaleController } from './controllers/amendSale.controller';
import { TaxController } from './controllers/tax.controller';
import { TransactionController } from './controllers/transaction.controller';
import { AmendSaleService } from './services/amendSale.service';
import { TaxPositionService } from './services/tax.service';
import { TransactionService } from './services/transaction.service';
import { SaleItemEntity } from './database/entities/saleItem.entity';
import { AmendSaleEntity } from './database/entities/amendSale.entity';
import { TransactionEntity } from './database/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      AmendSaleEntity,
      SaleItemEntity,
      TransactionEntity,
    ]),
  ],
  controllers: [AmendSaleController, TaxController, TransactionController],
  providers: [AmendSaleService, TaxPositionService, TransactionService],
})
export class AppModule {}
