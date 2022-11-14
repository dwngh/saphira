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
    if (await this.validateOrder(order))
      return await this.ordersRepo.save(order);
    else throw new BadRequestException({ error: 'Invalid order information' });
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepo.find();
  }

  async findOne(_id): Promise<Order> {
    return await this.ordersRepo.findOneBy({id: _id});
  }

  async update(order: Order): Promise<UpdateResult> {
    return await this.ordersRepo.update(order.id, order);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.ordersRepo.delete(id);
  }
}

