import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  //인터셉터에서 준 파일을 받는다
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    // console.log(file.buffer.toString('utf-8')); //텍스트 파일 내용 출력
    console.log(file);
    return `${file.originalname} File Uploaded check http://localhost:3000/uploads/${file.filename}`;
  }
}
