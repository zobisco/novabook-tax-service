import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleItemEntity } from '../database/entities/saleItem.entity';
import { SaleItemDto } from '../dtos/saleItem.dto';

@Injectable()
export class AmendSaleService {
  constructor(
    @InjectRepository(SaleItemEntity)
    private readonly amendSaleRepo: Repository<SaleItemEntity>
  ) {}

  async createAmendment(amendSale: SaleItemDto): Promise<SaleItemEntity> {
    let existingSaleItem = await this.amendSaleRepo.findOne({
      where: {
        transactionId: amendSale.transactionId,
        itemId: amendSale.itemId,
      },
    });

    if (existingSaleItem) {
      existingSaleItem.cost = amendSale.cost ?? existingSaleItem.cost;
      existingSaleItem.taxRate = amendSale.taxRate ?? existingSaleItem.taxRate;
    } else {
      existingSaleItem = this.amendSaleRepo.create(amendSale);
    }

    return this.amendSaleRepo.save(existingSaleItem);
  }
}
