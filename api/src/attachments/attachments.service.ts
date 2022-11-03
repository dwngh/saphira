import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachRepo: Repository<Attachment>,
  ) {}
  async findAll(): Promise<Attachment[]> {
      return await this.attachRepo.find();
  }

  async findOne(_id): Promise<Attachment> {
      return await this.attachRepo.findOneBy({id:_id});
  }

  async create(item: Attachment): Promise<Attachment>{
      return await this.attachRepo.save(item);
  }

  async update(item: Attachment): Promise<UpdateResult> {
      return await this.attachRepo.update(item.id, item)
  }

  async delete(id): Promise<DeleteResult> {
      return await this.attachRepo.delete(id);
  }
}
