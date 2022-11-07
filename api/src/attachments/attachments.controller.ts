import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { AttachmentsService } from './attachments.service';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Get()
  findAll(): Promise<Attachment[]> {
      return this.attachmentsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id : number) {
      return this.attachmentsService.findOne(id);
  }

  @Post()
  create(@Body() item: Attachment) {
      return this.attachmentsService.create(item);
  } 

  @Put() 
  update(@Body() item: Attachment) {
      return this.attachmentsService.update(item);
  }

  @Delete(':id') 
  delete(@Param('id', ParseIntPipe) id : number) {
      return this.attachmentsService.delete(id);
  }
}
