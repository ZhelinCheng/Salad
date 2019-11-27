/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-27 10:23:31
 * @LastEditTime: 2019-11-27 10:44:15
 * @LastEditors: Zhelin Cheng
 * @Description: 异常过滤
 */

import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { HttpException } from '@nestjs/common'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const isHttp = exception instanceof HttpException
    const status = isHttp ? exception.getStatus() : 500
    const message = exception.message
    let errMsg = []
    if (message.hasOwnProperty('message') && message.message instanceof Array) {
      const errArr = message.message
      errArr.map((item: any) => {
        errMsg = errMsg.concat(Object.values(item.constraints))
      })
    }

    if (status >= 500) {
      // tslint:disable-next-line: no-console
      console.error(message)
    }

    response
      .set('Content-Type', 'application/json')
      .status(status)
      .json({
        statusCode: message.status || status,
        message:
          status >= 500
            ? '服务器错误'
            : errMsg.length > 0
              ? errMsg[0]
              : typeof message === 'object'
                ? message.error
                : message
      })
  }
}
