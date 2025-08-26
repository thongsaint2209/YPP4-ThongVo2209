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

  getCardsStage(StagePoision: number, BoardId: number): Promise<CardDto[]> {
    const sql = `
    SELECT 
      crd.Id, 
      crd.Title
    FROM 
      Cards crd
    JOIN Stage stg ON crd.StageId = stg.Id
    JOIN Board b ON stg.BoardId = b.Id
    WHERE 
      stg.Position= ? AND b.Id = ?`;

    return this.cardRepository.query(sql, [StagePoision, BoardId]);
  }

  getCardsInfor(
    CardId: number,
    StageId: number,
    BoardId: number,
  ): Promise<CardDto[]> {
    const sql = `
      WITH CountAttachmentCard AS (
        SELECT 
          CardId, 
          COUNT(*) AS number_of_attachment 
        FROM 
          Attachment 
        GROUP BY 
          CardId
      ), 
      CountChecklistItem AS (
        SELECT 
          cl.CardId, 
          COUNT(*) AS number_of_checklist_item 
        FROM 
          CheckList cl 
          JOIN CheckListItem cli ON cli.CheckListId = cl.Id 
        GROUP BY 
          cl.CardId
      ) 
    SELECT 
      crd.Id, 
      crd.Title, 
      crd.CardLocation, 
      crd.StartDate, 
      crd.DueDate, 
      crd.Position, 
      ISNULL(cac.number_of_attachment, 0) AS number_of_attachment, 
      ISNULL(ccl.number_of_checklist_item, 0) AS number_of_checklist_item, 
      col.Icon, 
      col.ColorName 
    FROM 
      Cards crd 
      LEFT JOIN CountAttachmentCard cac ON cac.CardId = crd.Id 
      LEFT JOIN CountChecklistItem ccl ON ccl.CardId = crd.Id 
      JOIN Stage stg ON stg.Id = crd.StageId 
      JOIN Board brd ON brd.Id = stg.BoardId 
      JOIN CardLabel cl ON cl.CardId = crd.Id 
      JOIN Labels l ON l.Id = cl.LabelId 
      JOIN Color col ON col.Id = l.ColorId 
    WHERE 
      crd.Id = ? 
      AND stg.Id = ? 
      AND brd.Id = ?`;

    return this.cardRepository.query(sql, [CardId, StageId, BoardId]);
  }
}
