import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBandDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsArray()
  albums: CreateAlbumDto[];
}
