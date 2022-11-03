import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    user_id: number;

    @Column() 
    url: URL;

    @Column()
    content: string;
    
    @Column('date', { nullable: true })
    created_at: Date;
}
