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

    @Column({nullable: true})
    doctorId: number;

    @Column('varchar', {default: '00000000000000000000000000000000000000000000000000000000'}) 
    avail: string;

    @Column({nullable: true})
    enableAutoNote: boolean;

    @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
    note: string;
}