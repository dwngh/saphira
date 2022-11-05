import {
    Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Note {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(() => Order, order => order.notes)
    @JoinColumn()
    public order: Order['id'];

    @Column({nullable: true}) 
    content: string;
}
