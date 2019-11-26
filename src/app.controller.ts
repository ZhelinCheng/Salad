/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-26 13:33:17
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common'
import { AppService } from './app.service'
import { BaseParamsDto } from './app.dto'

@Controller()
@UsePipes(new ValidationPipe())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':page/:size/:color?')
  generateImage(@Param() params: BaseParamsDto): any {
    return this.appService.generateImage(params)
  }
}
