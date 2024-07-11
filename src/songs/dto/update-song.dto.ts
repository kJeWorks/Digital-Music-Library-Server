import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  length: string;

  @IsInt()
  @IsOptional()
  albumId: number;
}
