import {
    Column, PrimaryGeneratedColumn, Entity, OneToMany
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Hospital {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(() => User, user => user.hospital)
    users: User[];
}
