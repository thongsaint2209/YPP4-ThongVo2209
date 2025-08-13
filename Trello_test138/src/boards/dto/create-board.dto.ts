import { IsString, IsNotEmpty } from "class-validator";

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;
}
