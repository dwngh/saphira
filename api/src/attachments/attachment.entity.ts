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

    @Column({nullable:true})
    orderId: number;

    @Column("blob", {nullable:true})
    file;

    @Column({charset: 'utf8', collation: 'utf8_general_ci'}) 
    fileName: string;

    @Column({nullable:true}) 
    created_at: Date;
}
