import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(() => User, (user) => user.notices)
    @JoinColumn()
    public user: User['id'];

    @Column() 
    url: string;

    @Column({charset: 'utf8', collation: 'utf8_general_ci'})
    content: string;
    
    @Column('date', { nullable: true })
    created_at: Date;
}
