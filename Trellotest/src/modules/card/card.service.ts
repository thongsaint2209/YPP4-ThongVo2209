import { Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
  constructor(private readonly CardRepository: CardRepository) {}

  getCardsOfStageInBoard(
    StagePoision: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    return this.CardRepository.getCardsOfStageInBoard(StagePoision, BoardId);
  }
}
