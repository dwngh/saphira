import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { Speciality } from './speciality.entity';
import { SpecialitysService } from './specialitys.service';

@Controller('specialitys')
export class SpecialitysController {
  constructor(private readonly specialitysService: SpecialitysService) {}

  @Get()
  findAll(): Promise<Speciality[]> {
      return this.specialitysService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id : number) {
      return this.specialitysService.findOne(id);
  }

  @Get('/hospital/' + ':id') 
  getByHospital(@Param('id', ParseIntPipe) id: number) {
    return this.specialitysService.findByHospital(id);
  }

  @Post()
  create(@Body() item: Speciality) {
      return this.specialitysService.create(item);
  } 

  @Put() 
  update(@Body() item: Speciality) {
      return this.specialitysService.update(item);
  }

  @Delete(':id') 
  delete(@Param('id', ParseIntPipe) id : number) {
      return this.specialitysService.delete(id);
  }
}
