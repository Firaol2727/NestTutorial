import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product} from '../products/entity/products.entity';
import { User } from '../../users/entity/users.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.orders)
    product: Product;

    // @ManyToOne(() => User, user => user.orders)
    // user: User;

    @Column('decimal')
    amount: number;
}