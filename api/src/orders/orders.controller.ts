import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { request } from 'https';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() order: Order) {
    return this.ordersService.create(order);
  }

  @Get('/doctor/' + ':id')
  findOrdersByDoctorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Order[]> {
    return this.ordersService.getAllOrdersByDoctorId(id);
  }

  @Get('/patient/' + ':id')
  findOrdersByPatientId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Order[]> {
    return this.ordersService.getAllOrdersByPatientId(id);
  }

  @Get('/attachments')
  getAllAttachmentsOfOrder() {
    return this.ordersService.getOrderWithAllAttachments();
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post('/done/' + ':id')
  updateStatus(@Param('id', ParseIntPipe) id: number) {
    let order = new Order();
    order.id = id;
    order.status = 1;
    return this.ordersService.updateAllOrders(order);
  }

  @Put('/note')
  updateNote(@Body() order: Order) {
    return this.ordersService.updateNoteFromOrder(order);
  }

  @Put()
  update(@Body() order: Order) {
    return this.ordersService.update(order);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
