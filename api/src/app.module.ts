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
import * as dotenv from 'dotenv'

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: + (process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
