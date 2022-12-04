import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { Hospital } from './hospital.entity';

@Controller('hospitals')
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Post()
  create(@Body() hospital: Hospital) {
    return this.hospitalsService.create(hospital);
  }

  @Get()
  findAll() {
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalsService.findOne(+id);
  }

  @Put()
  update(@Body() hospital: Hospital) {
    return this.hospitalsService.update(hospital);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalsService.delete(+id);
  }
}
