import {
    Column, PrimaryGeneratedColumn, Entity
} from '@nestjs/typeorm'

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

    @Column()
    profile_img: ImageData;

    @Column()
    gender: boolean;

    //Chung minh thu (CCCD)
    @Column()
    identity_num: string;

    @Column()
    hospital: string;

    @Column()
    speciality: string;

    @Column()
    price: number;

    //Số bảo hiểm y tế
    @Column()
    hi_num: string;

    @Column()
    weight: Float32Array;

    @Column()
    height: Float32Array;

    @Column()
    blood_type: number;

    //Tiền sử bệnh
    @Column()
    anamnesis: string;
}
