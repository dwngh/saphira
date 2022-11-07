import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.find();
  }

  async findOne(_id): Promise<User> {
    return await this.usersRepo.findOneBy({id: _id});
  }

  async update(user: User): Promise<UpdateResult> {
    return await this.usersRepo.update(user.id, user);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.usersRepo.delete(id);
  }
}
