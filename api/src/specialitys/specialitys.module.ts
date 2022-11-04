import { Module } from '@nestjs/common';
import { SpecialitysService } from './specialitys.service';
import { SpecialitysController } from './specialitys.controller';
import { Speciality } from './speciality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SpecialitysController],
  providers: [SpecialitysService],
  imports: [TypeOrmModule.forFeature([Speciality])],
  exports: [SpecialitysService],
})
export class SpecialitysModule {}
