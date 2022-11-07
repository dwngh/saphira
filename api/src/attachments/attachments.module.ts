import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { Attachment } from './attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  imports: [TypeOrmModule.forFeature([Attachment])],
  exports: [AttachmentsService]
})
export class AttachmentsModule {}
