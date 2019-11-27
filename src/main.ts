/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-27 17:14:50
 * @LastEditors: Zhelin Cheng
 * @Description: 主模块
 */

import * as path from 'path'
import * as dotenv from 'dotenv'
// 获取环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import * as fs from 'fs'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const staticPath = path.resolve(__dirname, '../static')
  if (fs.existsSync(staticPath)) { app.useStaticAssets(staticPath) }
  app.set('trust proxy', 'loopback')
  app.set('x-powered-by', false)

  app.use(
    rateLimit({
      windowMs: 60000,
      max: 20,
      message: {
        statusCode: 429,
        message: '请求过于频繁，请休息一下再试。'
      },
      skip: (req: { ip: string }) => {
        return req.ip.includes('127.0.0.1')
      }
    })
  )

  // 设置 HTTP 头
  app.use(helmet())

  await app.listen(3036)

  // tslint:disable-next-line: no-console
  console.info(`
  运行环境：${process.env.NODE_ENV}
  服务链接：${await app.getUrl()}
  `)
}
bootstrap()
