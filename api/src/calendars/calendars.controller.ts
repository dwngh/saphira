import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Calendar } from './calendar.entity';
import { CalendarsService } from './calendars.service';

@Controller('calendars')
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) {}

  @Get()
    findAll(): Promise<Calendar[]> {
        return this.iService.findAll();
    }

    @Get(':id')
    get(@Param('id', ParseIntPipe) id : number) {
        return this.calendarsService.findOne(id);
    }

    @Post()
    create(@Body() item: Calendar) {
        return this.calendarsService.create(item);
    } 

    @Put() 
    update(@Body() item: Calendar) {
        return this.calendarsService.update(item);
    }

    @Delete(':id') 
    delete(@Param('id', ParseIntPipe) id : number) {
        return this.calendarsService.delete(id);
    }
}
