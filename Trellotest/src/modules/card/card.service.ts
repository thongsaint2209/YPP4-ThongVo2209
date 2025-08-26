import { Injectable } from '@nestjs/common';
import { CardRepository } from './card.repository';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
  constructor(private readonly CardRepository: CardRepository) {}

  getCardsStage(StagePoision: number, BoardId: number): Promise<CardDto[]> {
    return this.CardRepository.getCardsStage(StagePoision, BoardId);
  }

  getCardsInfor(
    CardId: number,
    StageId: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    return this.CardRepository.getCardsInfor(CardId, StageId, BoardId);
  }
}
