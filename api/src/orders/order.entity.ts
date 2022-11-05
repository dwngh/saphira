import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';
import { Attachment } from '../attachments/attachment.entity';
import { Note } from '../notes/note.entity';
import {
    User
} from '../users/user.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    patient: User["id"];

    @OneToOne(() => User)
    @JoinColumn()
    doctor: User["id"];

    @Column('text') 
    description: string;

    @Column({nullable: true})
    price: number;

    // 
    @Column({nullable: true})
    status: number; 

    //- Ca người dùng chọn và lưu theo đúng một số theo thứ tự ca trong xâu avail.
    @Column({nullable: true})
    shift: number;

    @Column({nullable: true})
    created_at: Date;

    @OneToMany(() => Attachment, attachment => attachment.order)
    public attachments: Attachment[];

    @OneToMany(() => Note, note => note.order)
    public notes: Note[];

    @Column()
    isPaid: boolean;
}
