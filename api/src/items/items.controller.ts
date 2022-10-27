import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { ItemsModule } from './items.module';

@Controller('items')
export class ItemsController {
    constructor(private readonly iService: ItemsService) {}

    @Get()
    findAll(): Promise<Item[]> {
        return this.iService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id : number) {
        return this.iService.findOne(id);
    }

    @Post()
    create(@Body() item: Item) {
        return this.iService.create(item);
    } 

    @Put(':id') 
    update(@Body() item: Item) {
        return this.iService.update(item);
    }

    @Delete(':id') 
    delete(@Param('id', ParseIntPipe) id : number) {
        return this.iService.delete(id);
    }
}
