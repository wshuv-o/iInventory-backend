import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({nullable:true})
  phone: string;

  @Column()
  password: string;
  
  @Column({nullable:true})
  role: string;

  @Column({nullable:true})
  state: string;

}
