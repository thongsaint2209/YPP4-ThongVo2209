// CardCard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@Controller('Card')
export class CardController {
  constructor(private readonly CardService: CardService) {}

  @Get('getCardsOfStageInBoard')
  getCardsOfStageInBoard(
    StagePoision: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    return this.CardService.getCardsOfStageInBoard(StagePoision, BoardId);
  }
}
