import {
    Column, PrimaryGeneratedColumn, Entity
} from 'typeorm'
import { JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Hospital } from '../hospitals/hospital.entity';
import { Notification } from '../notifications/notification.entity';
import { Speciality } from '../specialitys/speciality.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    birthday: Date;

    //or Linkstyle?
    @Column()
    email: string;

    @Column()
    phone: string;

    //0 - admin, 1 - patient, 2 - doctor, 3 - secretary
    @Column()
    role: number;

    //
    @Column()
    name: string;

    @Column()
    address: string;

   // @Column()
    //profile_img: ImageData;

    @Column()
    gender: boolean;

    //Chung minh thu (CCCD)
    @Column()
    identity_num: string;

    @ManyToOne(()=> Hospital, (hospital) => hospital.users)
    @JoinColumn()
    public hospital: Hospital['id'];

    @Column()
    price: number;

    //Số bảo hiểm y tế
    @Column()
    hi_num: string;

    @Column('float')
    weight: number;

    @Column('float')
    height: number;

    @Column()
    blood_type: number;

    @ManyToOne(() => Speciality, (speciality) => speciality.users)
    @JoinColumn()
    public speciality: Speciality['id'];

    //Tiền sử bệnh
    @Column()
    anamnesis: string;

    @OneToMany(()=> Notification, notification => notification.user) 
    notices: Notification[];
}
