/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 19:25:07
 * @LastEditTime: 2019-11-26 21:02:32
 * @LastEditors: Zhelin Cheng
 * @Description:
 */
import { Module, CacheModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 15
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
