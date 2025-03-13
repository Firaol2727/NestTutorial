
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Order } from 'src/purchase/orders/orders.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
  // Create The Relation Ships with Role
  @Column({ nullable: true })
  roleId: number
  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'roleId' })  // Foreign key column in the user table
  role: Role;
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
