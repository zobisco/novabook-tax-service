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

  async createAmendment(amendSaleDto: SaleItemDto): Promise<SaleItemEntity> {
    let existingSaleItem = await this.amendSaleRepo.findOne({
      where: {
        transactionId: amendSaleDto.transactionId,
        itemId: amendSaleDto.itemId,
      },
    });

    if (existingSaleItem) {
      existingSaleItem.cost = amendSaleDto.cost ?? existingSaleItem.cost;
      existingSaleItem.taxRate = amendSaleDto.taxRate ?? existingSaleItem.taxRate;
    } else {
      existingSaleItem = this.amendSaleRepo.create(amendSaleDto);
    }

    return this.amendSaleRepo.save(existingSaleItem);
  }
}
