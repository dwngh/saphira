import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Aimatlac0',
    database: 'sliver',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  ItemsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
