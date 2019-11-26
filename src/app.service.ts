/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-26 14:09:07
 * @LastEditors: Zhelin Cheng
 * @Description: 处理程序
 */
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  generateImage({ page, size, color = 'cccccc' }) {
    return 1
  }
}
