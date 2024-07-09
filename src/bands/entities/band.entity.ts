import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Bands')
export class Band extends BaseEntity {
  @PrimaryGeneratedColumn()
  bandId: number;

  @Column({ name: "Name" })
  bandName: string;
}
