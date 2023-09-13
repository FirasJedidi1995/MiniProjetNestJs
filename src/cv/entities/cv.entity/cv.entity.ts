import { TimestampEntities } from 'src/Generics/timestamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cv')
export class CvEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: 'name',
    length: 50,
  })
  name: string;
  @Column({
    length: 50,
  })
  firstname: string;
  @Column()
  age: number;
  @Column()
  path: string;
  @Column()
  cin: number;
  @Column()
  job: string;
}
