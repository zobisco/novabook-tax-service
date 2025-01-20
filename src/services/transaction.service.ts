import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../database/entities/transaction.entity';
import { TransactionDto } from '../dtos/transaction.dto';
import { TransactionEventType } from '../enums/transactionEventType.enum';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepo: Repository<TransactionEntity>,
  ) {}

  async createTransaction(transactionDto: TransactionDto): Promise<TransactionEntity> {
    const entity = this.transactionRepo.create({
      ...transactionDto,
      eventType: transactionDto.eventType as TransactionEventType,
    });

    return this.transactionRepo.save(entity);
  }
}
