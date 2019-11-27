/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 17:52:56
 * @LastEditTime: 2019-11-27 17:12:33
 * @LastEditors: Zhelin Cheng
 * @Description: 生成基础配置
 */
import * as path from 'path'
import * as fs from 'fs-extra'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { imageSize } from 'image-size'

interface ImageInfo {
  height: number
  orientation?: number
  width: number
  type?: string,
  name?: string
}

const adapter = new FileSync(path.resolve(__dirname, '../../db.json'))
const db = low(adapter)
const images = {}
db.defaults({ images }).write()

const pagesPath = path.resolve(__dirname, '../../pages')
fs.ensureDirSync(pagesPath)
let pages = fs.readdirSync(pagesPath)
pages = pages.filter(dir => {
  const dirPath = path.join(pagesPath, dir)
  const isDirectory = fs.statSync(dirPath).isDirectory()
  return isDirectory && Boolean(fs.readdirSync(dirPath).length)
})

pages.forEach(async (dir) => {
  const dirPath = path.join(pagesPath, dir)
  const dirImages = fs.readdirSync(dirPath)

  // 保存数据
  images[dir] = {
    width: [],
    height: []
  }

  for (const name of dirImages) {
    const imgInfo: ImageInfo = imageSize(path.join(dirPath, name))
    imgInfo.name = name
    if (imgInfo.width >= imgInfo.height) {
      images[dir].width.push(imgInfo)
    } else {
      images[dir].height.push(imgInfo)
    }
  }
})

db.set('images', images).write()
