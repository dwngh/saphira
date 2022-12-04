import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult, createQueryBuilder } from 'typeorm';
import { Hospital } from '../hospitals/hospital.entity';
import { Speciality } from './speciality.entity';
import { HospitalsService } from '../hospitals/hospitals.service';
@Injectable()
export class SpecialitysService {
  constructor(
    @InjectRepository(Speciality) 
    private readonly specRepo: Repository<Speciality>,
  ) {}

  async findAll(): Promise<Speciality[]> {
    return await this.specRepo.find();
  }

  async findOne(_id): Promise<Speciality> {
    return await this.specRepo.findOneBy({id:_id});
  }

  async findByHospital(_hospitalId): Promise<Speciality[]> {
    const spec = await this.specRepo.createQueryBuilder("speciality")
        .leftJoin("speciality.hospital", "hospital")
        .where("hospital.id=:id", {id:_hospitalId})
        .getMany();
    return spec;
    
  }

  async create(item: Speciality): Promise<Speciality>{
    return await this.specRepo.save(item);
  }

  async update(item: Speciality): Promise<UpdateResult> {
    return await this.specRepo.update(item.id, item)
  }

  async delete(id): Promise<DeleteResult> {
    return await this.specRepo.delete(id);
  }
}
