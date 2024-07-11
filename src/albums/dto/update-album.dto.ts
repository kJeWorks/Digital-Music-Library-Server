import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateSongDto } from "src/songs/dto/create-song.dto";

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

  @IsArray()
  @IsNotEmpty()
  songs: CreateSongDto[];
}
