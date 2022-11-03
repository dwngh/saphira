import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    order_id: number;

    @Column() 
    content: string;
}
