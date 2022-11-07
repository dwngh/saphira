import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [TypeOrmModule.forFeature([Notification])],
  exports: [NotificationsService],
})
export class NotificationsModule {}
