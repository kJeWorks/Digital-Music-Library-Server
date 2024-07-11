import { Album } from "src/albums/entities/album.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Songs')
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "SongID" })
  id: number;

  @Column({ name: "Title" })
  title: string;

  @Column({ name: "Length" })
  length: string;

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;

  constructor(partial: Partial<Song>) {
    super();
    Object.assign(this, partial);
  }
}
