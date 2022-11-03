import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Note } from './note.entity';
import { NotesService } from './notes.service';


@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(): Promise<Note[]> {
      return this.notesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id : number) {
      return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() item: Note) {
      return this.notesService.create(item);
  } 

  @Put() 
  update(@Body() item: Note) {
      return this.notesService.update(item);
  }

  @Delete(':id') 
  delete(@Param('id', ParseIntPipe) id : number) {
      return this.notesService.delete(id);
  }
}
