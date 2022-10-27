import { ItemsService } from './items.service';
import { Item } from './item.entity';
export declare class ItemsController {
    private readonly iService;
    constructor(iService: ItemsService);
    findAll(): Promise<Item[]>;
    get(id: number): Promise<Item>;
    create(item: Item): Promise<Item>;
    update(item: Item): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
