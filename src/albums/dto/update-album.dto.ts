import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  bandId: number;
}
