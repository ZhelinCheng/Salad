/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 11:00:33
 * @LastEditTime: 2019-11-26 20:55:04
 * @LastEditors: Zhelin Cheng
 * @Description: 处理程序
 */
import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as sharp from 'sharp'
import * as TextToSVG from 'text-to-svg'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { MIN_FONT_SIZE, FONT_SIZE_ZOOM, ROUTER_PAGES } from './const'
const textToSVG = TextToSVG.loadSync()
const adapter = new FileSync(path.resolve(__dirname, '../db.json'))
const db = low(adapter)

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  // 生成sharp
  private convert2Sharp(input: string): sharp.Sharp {
    return sharp(input)
  }

  // 获取源图片
  private getSourceImage(page: string, isWidth: boolean): string {
    let dir = page
    if (!ROUTER_PAGES.includes(page)) {
      dir = ROUTER_PAGES[Math.floor((Math.random() * ROUTER_PAGES.length))]
    }

    const images = db.get(`images.${dir}.${isWidth ? 'width' : 'height'}`).value()
    const img = images[Math.floor((Math.random() * images.length))]

    return path.resolve(__dirname, `../pages/${dir}/${img.name}`)
  }

  // 计算文字大小
  private computedFontSize(width: number, height: number, size: string): number {
    // 计算文字大小
    let fontSize = width > height ?
      Math.floor(height / FONT_SIZE_ZOOM) :
      Math.floor(width / FONT_SIZE_ZOOM)

    // 获取最小字体
    if (fontSize < MIN_FONT_SIZE && fontSize * FONT_SIZE_ZOOM >= MIN_FONT_SIZE) {
      fontSize = MIN_FONT_SIZE
    }

    // 字体宽度大于图片宽度
    if (fontSize > height) {
      fontSize = 0
    }

    return fontSize
  }

  async generateImage({ page, size, color = 'ffffff' }) {
    let sizeSplit = size.split(/x|X/)
    sizeSplit = sizeSplit.map((item: string) => parseInt(item, 10))
    // 获取宽高
    const [width, height] = sizeSplit
    const fontSize = this.computedFontSize(width, height, size)
    const fontColor = '#' + color
    // 生成SVG
    const composite: sharp.OverlayOptions[] = []
    if (fontSize >= 12) {
      const attributes = { fill: fontColor, stroke: fontColor }
      const options = { x: 0, y: 0, fontSize, anchor: 'top', attributes }
      const svg = textToSVG.getSVG(size, options)
      composite.push({
        input: Buffer.from(svg)
      })
    }

    const file = this.getSourceImage(page, width >= height)
    return await this.convert2Sharp(file)
      .composite(composite)
      .resize(width, height)
      .jpeg()
      .toBuffer()
  }
}
