import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Hospital } from '../hospitals/hospital.entity';
import { User } from '../users/user.entity';


@Entity()
export class Speciality {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(() => Hospital, hospital => hospital.specialitys, {cascade: ["insert"]})
    @JoinColumn(/*{name: 'hospitalId'}*/)
    hospital: Hospital["id"];
/*
    @Column({type: 'integer', unsigned: true})
    hospitalId: number;
*/
    @Column() 
    name: string;

    @Column({nullable: true})
    note: string;

    @OneToMany(() => User, user => user.speciality)
    @JoinColumn() 
    users: User[];
}
