import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Role } from './roles.entity';

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    content: string;
    @Column()
    type: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}
