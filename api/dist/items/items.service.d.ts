import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class ItemsService {
    private readonly itemsRepo;
    constructor(itemsRepo: Repository<Item>);
    findAll(): Promise<Item[]>;
    findOne(_id: any): Promise<Item>;
    create(item: Item): Promise<Item>;
    update(item: Item): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
}
