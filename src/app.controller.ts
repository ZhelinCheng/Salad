/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-27 10:40:35
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Header,
  Res,
  UseInterceptors,
  CacheInterceptor,
  UseFilters
} from '@nestjs/common'
import { AppService } from './app.service'
import { BaseParamsDto } from './app.dto'
import * as stream from 'stream'
import { Response } from 'express'
import { AppExceptionFilter } from './app.exception.filter'

@Controller()
@UsePipes(new ValidationPipe())
@UseInterceptors(CacheInterceptor)
@UseFilters(AppExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':page/:size/:color?')
  @Header('Content-Type', 'image/jpeg')
  async generateImage(@Param() params: BaseParamsDto, @Res() res: Response) {
    const buffer: any = await this.appService.generateImage(params)
    const bufferStream = new stream.PassThrough()
    bufferStream.end(buffer)
    bufferStream.pipe(res)
  }

  @Get()
  getTest() {
    return Date.now()
  }
}
