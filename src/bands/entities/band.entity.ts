import { Album } from "src/albums/entities/album.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('bands')
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Album, (album) => album.band, { cascade: true, onDelete: 'CASCADE' })
  albums: Album[];
}
