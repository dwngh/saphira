import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Hospital } from './hospital.entity';
@Injectable() 
export class HospitalsService {
  constructor(
    @InjectRepository(Hospital)
    private readonly hospitalsRepo: Repository<Hospital>,
  ) {}

  async findAll(): Promise<Hospital[]> {
    return await this.hospitalsRepo.find();
  }

  async findOne(_id: number): Promise<Hospital> {
    return await this.hospitalsRepo.findOneBy({id: _id});
  }

  async create(hospital: Hospital): Promise<Hospital> {
    return await this.hospitalsRepo.create(hospital);
  }

  async update(hostpital : Hospital): Promise<UpdateResult> {
    return await this.hospitalsRepo.update(hostpital.id, hostpital);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.hospitalsRepo.delete(id);
  }
}
