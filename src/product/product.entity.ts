import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  image: string;

  @Column({nullable:true})
  vendor: string;

  @Column({ nullable: true, type: 'int' }) 
  quantity: number | null;  
}
