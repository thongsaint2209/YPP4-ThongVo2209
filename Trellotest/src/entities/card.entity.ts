export class Card {
  constructor(
    public id: number,
    public stageId?: number,
    public title?: string,
    public cardDescription?: string,
    public createdAt?: Date,
    public createdBy?: number,
    public cardStatus?: string,
    public cardLocation?: string,
    public startDate?: Date,
    public dueDate?: Date,
    public cardCoverTypeId?: number,
    public coverValue?: string,
    public position?: number,
    public updatedAt?: Date,
    public updatedBy?: number,
    public isTemplate?: boolean,
    public isCompleted?: boolean,
  ) {}
}
