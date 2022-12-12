import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() order: Order) {
    return this.ordersService.create(order);
  }

  @Get('/doctor/' + ':id')
  findOrdersByDoctorId(@Param('id', ParseIntPipe) id: number): Promise<Order[]> {
    return this.ordersService.getAllOrdersByDoctorId(id);
  }

  @Get('/patient/' + ':id')
  findOrdersByPatientId(@Param('id', ParseIntPipe) id: number): Promise<Order[]> {
    return this.ordersService.getAllOrdersByPatientId(id);
  }

  @Get(':id' + '/attachments')
  getAllAttachmentsOfOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderWithAllAttachments(id);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
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
