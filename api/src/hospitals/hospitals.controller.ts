import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Post(':id')
  update(@Param('id') id: string, @Body() hospital: Hospital) {
    return this.hospitalsService.update(hospital);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalsService.delete(+id);
  }
}
