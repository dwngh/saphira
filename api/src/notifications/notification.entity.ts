import {
    Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @ManyToOne(() => User, (user) => user.notices)
    @JoinColumn()
    public user: User['id'];

    @Column({nullable: true})
    userId: number;

    @Column({nullable: true}) 
    url: string;

    @Column({charset: 'utf8', collation: 'utf8_general_ci'})
    content: string;
    
    @Column({nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({default: false})
    read: boolean;
}
