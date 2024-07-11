import { Band } from "src/bands/entities/band.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

}
