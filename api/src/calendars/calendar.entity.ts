import {
    Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Calendar {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @OneToOne(() => User)
    @JoinColumn()
    public doctor: User['id'];

    @Column('varchar', {default: '00000000000000000000000000000000000000000000000000000000'}) 
    avail: string;
}