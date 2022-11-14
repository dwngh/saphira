import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async validateUser(user: User) {
    //validate user here
    return true;
  }

  async create(user: User): Promise<User> {
    let saltRounds = 10;

    if (!(await this.validateUser(user)))
      throw new BadRequestException({ error: 'Invalid user information' });

    let pwd = await bcrypt.hash(user.password, saltRounds);
    user.password = pwd;
    return await this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findOne(_id): Promise<User> {
    return await this.usersRepo.findOneBy({ id: _id });
  }

  async findByUsername(_username): Promise<User> {
    return await this.usersRepo.findOneBy({ username: _username });
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.usersRepo.update(user.id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.usersRepo.delete(id);
  }
}
