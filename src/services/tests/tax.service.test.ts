import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxPositionService } from '../tax.service';
import { TransactionEntity } from '../../database/entities/transaction.entity';
import { BadRequestException } from '@nestjs/common';

describe('TaxPositionService', () => {
  let service: TaxPositionService;
  let transactionRepo: Repository<TransactionEntity>;

  const mockTransactionRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxPositionService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: mockTransactionRepo,
        },
      ],
    }).compile();

    service = module.get<TaxPositionService>(TaxPositionService);
    transactionRepo = module.get<Repository<TransactionEntity>>(
      getRepositoryToken(TransactionEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if date parameter is missing', async () => {
    await expect(service.getTaxPosition('')).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.getTaxPosition('')).rejects.toThrow(
      'Missing "date" query parameter',
    );
  });

  it('should throw an error if date parameter is invalid', async () => {
    await expect(service.getTaxPosition('invalid-date')).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.getTaxPosition('invalid-date')).rejects.toThrow(
      'Invalid date format. Use ISO 8601 format.',
    );
  });
});
