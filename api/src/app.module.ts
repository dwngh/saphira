import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { OrdersModule } from './orders/orders.module';
import { SpecialitysModule } from './specialitys/specialitys.module';
import { CalendarsModule } from './calendars/calendars.module';
import { NotesModule } from './notes/notes.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Aimatlac0',
    database: 'saphira',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ItemsModule,
  UsersModule,
  HospitalsModule,
  OrdersModule,
  SpecialitysModule,
  CalendarsModule,
  NotesModule,
  AttachmentsModule,
  NotificationsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
