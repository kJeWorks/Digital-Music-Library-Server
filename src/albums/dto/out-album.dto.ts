import { Exclude, Expose, Type } from "class-transformer";
import { Band } from "src/bands/entities/band.entity";
import { Song } from "src/songs/entities/song.entity";

@Exclude()
export class OutAlbumSimpleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  @Type(() => Band)
  band: Band;
}

export class OutAlbumDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => Band)
  band: Band;

  @Expose()
  @Type(() => Song)
  songs: Song[];
}