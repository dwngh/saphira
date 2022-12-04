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
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv'

dotenv.config();
console.log(join(__dirname, '..', '..', 'front_end', 'out'))

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: + (process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'my_node',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'front_end', 'out'),
  }),
  ItemsModule,
  UsersModule,
  HospitalsModule,
  OrdersModule,
  SpecialitysModule,
  CalendarsModule,
  NotesModule,
  AttachmentsModule,
  NotificationsModule,
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
