import { Album } from "src/albums/entities/album.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bands')
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "BandID" })
  id: number;

  @Column({ name: "Name" })
  name: string;

  @OneToMany(() => Album, (album) => album.band, { cascade: true })
  albums: Album[];
}
