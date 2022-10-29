import { Injectable } from '@nestjs/common';
import { Item } from './item.entity' 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';


@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item) 
        private readonly itemsRepo: Repository<Item>,
    ) {}

    async findAll(): Promise<Item[]> {
        return await this.itemsRepo.find();
    }

    async findOne(_id): Promise<Item> {
        return await this.itemsRepo.findOneBy({id:_id});
    }

   async create(item: Item): Promise<Item>{
        return await this.itemsRepo.save(item);
   }

   async update(item: Item): Promise<UpdateResult> {
        return await this.itemsRepo.update(item.id, item)
   }

   async delete(id): Promise<DeleteResult> {
        return await this.itemsRepo.delete(id);
   }
}
