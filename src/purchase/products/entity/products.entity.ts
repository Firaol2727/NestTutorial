import { Order } from "src/purchase/orders/orders.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;
    
    @OneToMany(() => Order, (order) => order.product)
    orders:Order[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}