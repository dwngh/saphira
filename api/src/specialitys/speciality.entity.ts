import {
    Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../users/user.entity';


@Entity()
export class Speciality {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    hospital_id: number;

    @Column() 
    name: string;

    @Column()
    note: string;

    @OneToMany(() => User, user => user.speciality)
    @JoinColumn() 
    users: User[];
}
