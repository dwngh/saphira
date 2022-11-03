import {
    Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';
import {
    User
} from '../users/user.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    patient_id: User["id"];

    @OneToOne(() => User)
    @JoinColumn()
    doctor_id: User["id"];

    @Column('text') 
    description: string;

    @Column()
    price: number;

    // 
    @Column()
    status: number; 

    //- Ca người dùng chọn và lưu theo đúng một số theo thứ tự ca trong xâu avail.
    @Column()
    shift: number;

    @Column()
    created_at: Date;
}
