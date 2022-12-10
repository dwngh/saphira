import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Order } from '../orders/order.entity';
import { Item } from '../items/item.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async validateUser(user: User) {
    //validate user here
    const resultByUsername = await this.findByUsername(user.username);
    const resultByIdentityNum = await this.findByIdentityNum(user.identity_num);
    /* Email and Phone -- may be coming soon
    const resultByEmail = await this.findByEmail(user.email);
    const resultByPhone = await this.findByPhone(user.phone);

    var checkPass = 0;
    const checkMax = 4;
    
    if (resultByEmail) throw new BadRequestException('Email already used!');
    if (resultByPhone) throw new BadRequestException('Phone number already used!');
    */
    //console.log(resultByUsername.username);
    if (resultByUsername == null) {
      
      if (resultByIdentityNum == null) {
        //console.log("xacthucthanhconghihi");

        return true;
      } else throw new BadRequestException('Identity number already exists!')
    } else throw new BadRequestException('Username already exists!');
  }

  async create(user: User): Promise<User> {
    let saltRounds = 10;

    if(user.username == "admin") {
      user.role = 0;
    } 

    if (!(await this.validateUser(user)))
      throw new BadRequestException({ error: 'Invalid user information' });

    let pwd = await bcrypt.hash(user.password, saltRounds);
    user.password = pwd;
    return await this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findDoctors(): Promise<User[]> {
    const doctors = await this.usersRepo.createQueryBuilder("user")
      .leftJoin("user.speciality", "speciality")
      .leftJoin("user.hospital", "hospital")
      .leftJoin("user.calendar", "calendar").select(["user", "calendar", "speciality.name", "hospital"])
      .where({role: 3})
      .getMany();
    return doctors;
  }

  async changeUserPassword(_id, oldPassword: string, newPassword: string) {
    let saltRounds = 10;
    const user = this.usersRepo.findOneBy({id:_id});
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, (await user).password);
    if (!isOldPasswordCorrect) throw new BadRequestException("Wrong old password!");
    if ((oldPassword == newPassword)) throw new BadRequestException("The new password is the same as the old password!");
    return await this.usersRepo.createQueryBuilder()
      .update(User)
      .set({ password: await bcrypt.hash(newPassword, saltRounds) })
      .where("user.Id = :id", { id: _id })
      .execute();
  }

  async findOne(_id): Promise<User> {
    const userRep = await this.usersRepo.createQueryBuilder("user")
      .leftJoin("user.speciality", "speciality")
      .leftJoin("user.hospital", "hospital")
      .leftJoin("user.calendar", "calendar").select(["user", "calendar", "speciality.name", "hospital"])
      .where({id: _id})
      .getOne();
    if (userRep?.role != 1) {
      return await this.usersRepo.findOneBy({id: _id});
    } else {
      return userRep;
    }
  }

  async findByUsername(_username): Promise<User> {
    return await this.usersRepo.findOneBy({ username: _username });
  }

  async findByIdentityNum(_identity): Promise<User> {
    return await this.usersRepo.findOneBy( { identity_num: _identity});
  }

  /* find user by email and phone number (coming soon)
  async findByEmail(_email): Promise<User> {
    return await this.usersRepo.findOneBy( {email: _email});
  }

  async findByPhone(_phone): Promise<User> {
    return await this.usersRepo.findOneBy( {phone: _phone});
  }
*/

  async findByOrderId(_orderid): Promise<User> {
    //console.log(_orderid);
    const userFinded = await this.usersRepo.findOneBy({order: _orderid});
    if (userFinded) {
      return userFinded;
    } throw new BadRequestException("Not Found");
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.usersRepo.update(user.id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.usersRepo.delete(id);
  }
}
