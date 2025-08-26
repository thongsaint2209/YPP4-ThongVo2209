// Card.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../../entities/card.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardRepository } from './card.repository';

describe('CardRepository (SQLite in-memory)', () => {
  let controller: CardController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Card]),
      ],
      controllers: [CardController],
      providers: [CardService, CardRepository],
    }).compile();

    controller = module.get<CardController>(CardController);
  });
  const BoardId = 1;
  const CardId = 1;
  const StageId = 1;
  const StagePoision = 1;
  //Get all card of specific stage in specific board
  it('should return get all card of specific stage in specific board', async () => {
    const result = await controller.getCardsStage(StagePoision, BoardId);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    expect(result.length).toBe(2);
  });

  afterAll(async () => {
    await module.close();
  });

  //Get infor card
  it('should return get infor card', async () => {
    const result = await controller.getCardsInfor(CardId, StageId, BoardId);
    console.log(result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });

  afterAll(async () => {
    await module.close();
  });
});
