import {
    Column, PrimaryGeneratedColumn, Entity, OneToMany
} from 'typeorm';
import { Speciality } from '../specialitys/speciality.entity';
import { User } from '../users/user.entity';

@Entity()
export class Hospital {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    address: string;

    @OneToMany(() => User, user => user.hospital)
    users: User[];

    @OneToMany(() => Speciality, speciality => speciality.hospital)
    specialitys: Speciality[];
}
