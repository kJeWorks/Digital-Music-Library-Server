import { Band } from "src/bands/entities/band.entity";
import { Song } from "src/songs/entities/song.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Albums')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "AlbumID" })
  id: number;

  @Column({ name: "Title" })
  title: string;

  @Column({ name: "Description" })
  description: string;

  @ManyToOne(() => Band, (band) => band.albums)
  band: Band;

  @OneToMany(() => Song, (song) => song.album, { cascade: true})
  songs: Song[];

  constructor(partial: Partial<Album>) {
    super();
    Object.assign(this, partial);
  }
}
