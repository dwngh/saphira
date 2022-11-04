import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult  } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>
  ) {}
  async create(order: Order) {
    return await this.ordersRepo.save(order);
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

