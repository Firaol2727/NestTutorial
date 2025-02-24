
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './users.entity';
import { Permissions } from './permissions.entity';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
  @ManyToMany(() => Permissions, (permissions) => permissions.roles)
  @JoinTable({ name: 'role_permissions' })  // Name of the join table
  permissions: Permissions[]
}