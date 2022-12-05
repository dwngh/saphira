import {
    Column, PrimaryGeneratedColumn, Entity, OneToMany
} from 'typeorm';
import { Speciality } from '../specialitys/speciality.entity';
import { User } from '../users/user.entity';

@Entity()
export class Hospital {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
    name: string;

    @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
    address: string;

    @OneToMany(() => User, user => user.hospital)
    users: User[];

    @OneToMany(() => Speciality, speciality => speciality.hospital)
    specialitys: Speciality[];
}
