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
    @Column()
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
    public hospital: Hospital['id'];

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
    public speciality: Speciality['id'];

    //Tiền sử bệnh
    @Column({nullable: true})
    anamnesis: string;

    @OneToMany(()=> Notification, notification => notification.user) 
    notices: Notification[];
}
