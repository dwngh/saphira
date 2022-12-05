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
    @JoinColumn(/*{name: 'hospitalId'}*/)
    hospital: Hospital["id"];
/*
    @Column({type: 'integer', unsigned: true})
    hospitalId: number;
*/
    @Column({charset: 'utf8', collation: 'utf8_general_ci'}) 
    name: string;

    @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
    note: string;

    @OneToMany(() => User, user => user.speciality)
    @JoinColumn() 
    users: User[];
}
