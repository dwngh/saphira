import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { Calendar } from './calendar.entity';

@Injectable()
export class CalendarsService {
  constructor(
    @InjectRepository(Calendar) 
    private readonly calRepo: Repository<Calendar>,
  ) {}

  async findAll(): Promise<Calendar[]> {
    return await this.calRepo.find();
  }

  async findOne(id): Promise<Calendar> {
    return await this.calRepo.findOneBy({id: id});
  }

  async create(item: Calendar): Promise<Calendar>{
    return await this.calRepo.save(item);
  }
  async update(item: Calendar): Promise<UpdateResult> {
    return await this.calRepo.update(item.id, item)
  }

  async delete(id): Promise<DeleteResult> {
    return await this.calRepo.delete(id);
  }
}

