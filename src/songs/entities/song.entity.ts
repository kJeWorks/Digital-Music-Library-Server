import { Album } from "src/albums/entities/album.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 50 })
  length: string;

  @ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE' })
  album: Album;

  constructor(partial: Partial<Song>) {
    super();
    Object.assign(this, partial);
  }
}
