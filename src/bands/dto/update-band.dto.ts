import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBandDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsArray()
  albums: CreateAlbumDto[];
}
