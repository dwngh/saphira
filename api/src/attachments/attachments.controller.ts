import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  Header,
  Request,
  UseGuards
} from '@nestjs/common';
import { Attachment } from './attachment.entity';
import { AttachmentsService } from './attachments.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Blob } from "buffer";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Request() req, @Body() body: Attachment, @UploadedFile() file: Express.Multer.File) {
    const temp = {...body}
    temp.file = file.buffer;
    temp.fileName = file.originalname;
    temp.size = file.size;
    temp.authorId = req.user.userId
    return this.attachmentsService.create(temp);
  }

  @Get()
  findAll(): Promise<Attachment[]> {
    return this.attachmentsService.findAll();
  }

  @Get('/patient/:id')
  getAttachmentByPatientId(@Param('id', ParseIntPipe) id: number): Promise<Attachment[]> {
    return this.attachmentsService.findByPatientId(id);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    // return this.attachmentsService.findOne(id);
    let a = await this.attachmentsService.findOne(id);
    res.set({
        'Content-Type': a.type,
        'Content-Disposition': 'attachment; filename=' + a.fileName,
      });
    res.send(a.file);
  }

  @Post()
  create(@Body() item: Attachment) {
    return this.attachmentsService.create(item);
  }

  @Put()
  update(@Body() item: Attachment) {
    return this.attachmentsService.update(item);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.attachmentsService.delete(id);
  }
}
