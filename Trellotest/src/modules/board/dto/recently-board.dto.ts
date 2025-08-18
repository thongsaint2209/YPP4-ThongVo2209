export class RecentlyBoardDto {
  BoardId: number;
  BoardName?: string | null;
  BackgroundUrl?: string | null;
  LogoUrl: string;
  AccessedAt?: Date | null;
  BoardStatus?: string;
}
