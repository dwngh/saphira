import {
    Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn() 
    id: number;

    @ManyToOne(() => Order, order => order.attachments)
    @JoinColumn() 
    public order: Order['id'];

    @Column()
    file: string;
}
