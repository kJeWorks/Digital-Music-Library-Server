import { Band } from "src/bands/entities/band.entity";
import { Song } from "src/songs/entities/song.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column("text")
  description: string;

  @ManyToOne(() => Band, (band) => band.albums)
  band: Band;

  @OneToMany(() => Song, (song) => song.album, { cascade: true, onDelete: 'CASCADE' })
  songs: Song[];

  constructor(partial: Partial<Album>) {
    super();
    Object.assign(this, partial);
  }
}
