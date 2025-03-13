import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './roles.entity';
import { Permissions } from './permissions.entity';
@Entity('role_permissions')  // Define the name of the join table explicitly
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, role => role.permissions)
  role: Role;

  @ManyToOne(() => Permissions, permission => permission.roles)
  permission: Permissions;
}
