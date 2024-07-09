import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bands')
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "BandID" })
  id: number;

  @Column({ name: "Name" })
  name: string;
}
