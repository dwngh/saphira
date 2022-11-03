import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) 
    private readonly notesRepo: Repository<Note>,
) {}

async findAll(): Promise<Note[]> {
    return await this.notesRepo.find();
}

async findOne(_id): Promise<Note> {
    return await this.notesRepo.findOneBy({id:_id});
}

async create(note: Note): Promise<Note>{
    return await this.notesRepo.save(note);
}

async update(note: Note): Promise<UpdateResult> {
    return await this.notesRepo.update(note.id, note)
}

async delete(id): Promise<DeleteResult> {
    return await this.notesRepo.delete(id);
}
}
