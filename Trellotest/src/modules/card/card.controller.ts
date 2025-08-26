// CardCard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@Controller('Card')
export class CardController {
  constructor(private readonly CardService: CardService) {}

  @Get('getCardsStage')
  getCardsStage(StagePoision: number, BoardId: number): Promise<CardDto[]> {
    return this.CardService.getCardsStage(StagePoision, BoardId);
  }

  @Get('getCardsInfor')
  getCardsInfor(
    CardId: number,
    StageId: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    return this.CardService.getCardsInfor(CardId, StageId, BoardId);
  }
}
