import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Hospital } from '../hospitals/hospital.entity';
import { User } from '../users/user.entity';


@Entity()
export class Speciality {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(() => Hospital, hospital => hospital.specialitys)
    @JoinColumn()
    hospital: Hospital['id'];

    @Column() 
    name: string;

    @Column({nullable: true})
    note: string;

    @OneToMany(() => User, user => user.speciality)
    @JoinColumn() 
    users: User[];
}
