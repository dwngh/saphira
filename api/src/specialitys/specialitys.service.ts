import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Speciality } from './speciality.entity';

@Injectable()
export class SpecialitysService {
  constructor(
    @InjectRepository(Speciality) 
    private readonly specRepo: Repository<Speciality>,
  ) {}

  async findAll(): Promise<Speciality[]> {
      return await this.specRepo.find();
  }

  async findOne(_id): Promise<Speciality> {
      return await this.specRepo.findOneBy({id:_id});
  }

  async create(item: Speciality): Promise<Speciality>{
      return await this.specRepo.save(item);
  }

  async update(item: Speciality): Promise<UpdateResult> {
      return await this.specRepo.update(item.id, item)
  }

  async delete(id): Promise<DeleteResult> {
      return await this.specRepo.delete(id);
  }
}
