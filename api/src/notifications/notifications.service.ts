import { Injectable } from '@nestjs/common';
import { Notification } from './notification.entity';
import { UpdateResult, DeleteResult, Repository } from  'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) 
    private readonly notisRepo: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
      return await this.notisRepo.find();
  }

  async findOne(_id): Promise<Notification> {
      return await this.notisRepo.findOneBy({id:_id});
  }

  async create(notification: Notification): Promise<Notification>{
      return await this.notisRepo.save(notification);
  }

  async update(notification: Notification): Promise<UpdateResult> {
      return await this.notisRepo.update(notification.id, notification)
  }

  async delete(id): Promise<DeleteResult> {
      return await this.notisRepo.delete(id);
  }
}
