import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  bandId: number;
}
