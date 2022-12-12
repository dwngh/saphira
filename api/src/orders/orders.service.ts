import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult  } from 'typeorm';
import { Order } from './order.entity';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>
  ) {}

  async validateOrder(order: Order) {
    return true;
  }

  async create(order: Order) {
    if (!await this.validateOrder(order))
      throw new BadRequestException({ error: 'Invalid order information' });
    await this.ordersRepo.save(order);
    const resOrder = await this.ordersRepo.createQueryBuilder("order")
      .leftJoin("order.doctor", "doctor")
      .leftJoin("doctor.calendar", "calendar")
      .select(["order","doctor.id", "doctor.name", "calendar.enableAutoNote", "calendar.note"])
      .where("order.id=:idd",{idd : order.id})
      .getOne();
    //console.log(resOrder.doctor.calendar.note);
    if (resOrder.doctor?.calendar?.enableAutoNote===true)
    return await this.ordersRepo.createQueryBuilder()
      .update(Order)
      .set({ note: resOrder.doctor.calendar.note })
      .where("order.id = :id", { id: resOrder.id })
      .execute();
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepo.find();
  }

  async findAllDetail(): Promise<Order[]> {
    const repOrder = await this.ordersRepo.createQueryBuilder("order")
      .leftJoin("order.patient", "patient")
      .leftJoin("order.doctor", "doctor").select(["order", "doctor.id", "doctor.name", "patient.id", "patient.name"]).getMany();
    return repOrder;
  }

  async getAllOrdersByPatientId(_id): Promise<Order[]> {
    const repOrder = await this.ordersRepo.createQueryBuilder("order")
      .leftJoin("order.doctor", "doctor")
      .leftJoin("order.patient", "patient")
      .leftJoin("doctor.speciality", "speciality")
      .leftJoin("doctor.calendar", "calendar")
      .select(["order", "patient.id", "patient.name", "patient.birthday", "patient.email", "patient.phone", "doctor.id", "doctor.name", "speciality.name", "calendar.avail"])
      .where("patient.id=:id", {id: _id})
      .getMany();

    return repOrder;
  }

  async findOne(_id): Promise<Order> {
    const repOrder = await this.ordersRepo.createQueryBuilder("order")
      .leftJoin("order.patient", "patient")
      .leftJoin("order.doctor", "doctor").select(["order", "doctor.id", "doctor.name", "patient.id", "patient.name"])
      .where("order.id=:id", {id: _id})
      .getOne();
    return repOrder;
  }

  async update(order: Order): Promise<UpdateResult> {
    return await this.ordersRepo.update(order.id, order);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.ordersRepo.delete(id);
  }

  async getAllOrdersByDoctorId(_id): Promise<Order[]> {
    const repOrder = await this.ordersRepo.createQueryBuilder("order")
      .leftJoin("order.doctor", "doctor")
      .leftJoin("order.patient", "patient")
      .select(["order", "patient.id", "patient.name", "patient.identity_num", "doctor.id", "doctor.name"])
      .where("doctor.id=:id", {id: _id})
      .getMany();

    return repOrder;
  }

  async getOrderWithAllAttachments(): Promise<Order[]> {
    const resOrder = await this.ordersRepo.createQueryBuilder("order")
    .leftJoin("order.attachments", "attachment")
    .leftJoin("attachment.author", "user")
    .leftJoin("order.patient", "patient")
    .leftJoin("order.doctor", "doctor")
    .select(["order", "doctor.id", "doctor.name", "patient.id", "patient.name", "user.id", "user.name", "attachment.id", "attachment.fileName", "attachment.size", "attachment.created_at"])
    .getMany();

    return resOrder;
  }
}

