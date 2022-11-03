import {
    Column, PrimaryGeneratedColumn, Entity
} from 'typeorm';

@Entity()
export class Hospital {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;
}
