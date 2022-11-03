import { Module } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';
import { Calendar } from './calendar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar])],
  controllers: [CalendarsController],
  providers: [CalendarsService],
  exports: [CalendarsService],
})
export class CalendarsModule {}
