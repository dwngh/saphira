import { LargeNumberLike } from 'crypto';
import {
    Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn
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

    @ManyToOne(() => User, patient => patient.order)
    @JoinColumn()
    patient: User;

    @Column()
    patientId: number;

    @ManyToOne(() => User, doctor => doctor.order)
    @JoinColumn()
    doctor: User;

    @Column()
    doctorId: number;

    @Column({charset: 'utf8', collation: 'utf8_general_ci', nullable: true}) 
    description: string;

    @Column()
    price: number;

    //0 - đang chờ, 1 - đã xong, 2 - đã muộn/ trễ/ bị huỷ
    @Column({default: 0})
    status: number; 

    //- Ca người dùng chọn và lưu theo đúng một số theo thứ tự ca trong xâu avail.
    @Column({nullable: true})
    shift: number;

    @Column({ nullable: true})
    date: Date;

    @Column({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Attachment, attachment => attachment.order)
    attachments?: Attachment[];

    @Column({default: false})
    isPaid: boolean;

    @Column({nullable: true})
    location: string;

    @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
    note: string;
}
