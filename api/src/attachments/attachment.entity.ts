import { User } from 'src/users/user.entity';
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

    @Column('mediumblob', {nullable:true})
    file: Buffer;

    @Column({charset: 'utf8', collation: 'utf8_general_ci'}) 
    fileName: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.attachments)
    @JoinColumn()
    author: User['id'];

    @Column({nullable: true})
    authorId: number;
}
