import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Attachment {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column() 
    order_id: number;

    @Column()
    file: URL;
}
