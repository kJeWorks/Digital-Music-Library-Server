import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  length: string;

  @IsInt()
  @IsNotEmpty()
  albumId: number;
}
