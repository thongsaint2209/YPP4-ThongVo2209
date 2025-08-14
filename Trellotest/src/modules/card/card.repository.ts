import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../entities/card.entity';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  getCardsOfStageInBoard(
    StagePoision: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    const sql = `
    SELECT 
      crd.Id, 
      crd.Title
    FROM Cards crd
    JOIN Stage stg ON crd.StageId = stg.Id
    JOIN Board b ON stg.BoardId = b.Id
    WHERE stg.Position= ? AND b.Id = ?`;

    return this.cardRepository.query(sql, [StagePoision, BoardId]);
  }
}
