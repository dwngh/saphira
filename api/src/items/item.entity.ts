import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column({length: 500})
    name: string;

    @Column({default: 1}) 
    status: number;

    @Column('date', { nullable: true })
    created_at: Date;
}
