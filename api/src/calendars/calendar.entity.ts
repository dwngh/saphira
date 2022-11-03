import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Calendar {

    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    doctor_id: number;

    @Column() 
    avail: string;
}