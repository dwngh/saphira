import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Get('/user/' + ':id')
  getNotificationsByUserId(@Param('id', ParseIntPipe) id: number): Promise<Notification[]> {
    return this.notificationService.getAllNotificationsOfUser(id);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id : number) {
    return this.notificationService.findOne(id);
  }

  /*
  @Post()
  create() {
    return this.notificationService.create(item);
  } 
  */
  @Put() 
  update(@Body() item: Notification) {
      return this.notificationService.update(item);
  }

  @Delete(':id') 
  delete(@Param('id', ParseIntPipe) id : number) {
      return this.notificationService.delete(id);
  }
}
