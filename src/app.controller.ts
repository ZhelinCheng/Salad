/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-26 21:11:30
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
  CacheInterceptor
} from '@nestjs/common'
import { AppService } from './app.service'
import { BaseParamsDto } from './app.dto'
import * as stream from 'stream'
import { Response } from 'express'

@Controller()
@UsePipes(new ValidationPipe())
@UseInterceptors(CacheInterceptor)
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
