import {
    Column, PrimaryGeneratedColumn, Entity
} from 'typeorm'
import { JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Hospital } from '../hospitals/hospital.entity';
import { Notification } from '../notifications/notification.entity';
import { Speciality } from '../specialitys/speciality.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    birthday: Date;

    //or Linkstyle?
    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    phone: string;

    //0 - admin, 1 - patient, 2 - doctor, 3 - secretary
    @Column({nullable: true})
    role: number;

    //
    @Column({charset: 'utf8', collation: 'utf8_general_ci'})
    name: string;

    @Column({nullable: true})
    address: string;

   // @Column()
    //profile_img: ImageData;

    @Column({nullable: true})
    gender: boolean;

    //Chung minh thu (CCCD)
    @Column()
    identity_num: string;

    @ManyToOne(()=> Hospital, (hospital) => hospital.users)
    @JoinColumn()
    public hospital: Hospital;

    @Column({nullable: true})
    price: number;

    //Số bảo hiểm y tế
    @Column({nullable: true})
    hi_num: string;

    @Column('float', {nullable: true})
    weight: number;

    @Column('float', {nullable: true})
    height: number;

    @Column({nullable: true})
    blood_type: number;

    @Column({nullable: true})
    specialityId: number;

    @Column({nullable: true})
    hospitalId: number;

    @ManyToOne(() => Speciality, (speciality) => speciality.users)
    @JoinColumn()
    public speciality: Speciality;

    //Tiền sử bệnh
    @Column({nullable: true,charset: 'utf8', collation: 'utf8_general_ci'})
    anamnesis: string;

    @OneToMany(()=> Notification, notification => notification.user) 
    notices: Notification[];

    @OneToOne(()=> Order) 
    @JoinColumn()
    public order: Order; 

    @Column({nullable:true})
    orderId: number;
}
