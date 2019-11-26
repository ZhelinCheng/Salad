/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 17:52:56
 * @LastEditTime: 2019-11-26 18:04:30
 * @LastEditors: Zhelin Cheng
 * @Description: 生成基础配置
 */
import * as path from 'path'
import * as fs from 'fs-extra'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync(path.resolve(__dirname, '../../db.json'))
const db = low(adapter)
db.defaults({}).write()

const pagesPath = path.resolve(__dirname, '../../pages')
let pages = fs.readdirSync(pagesPath)
pages = pages.filter(dir => {
  const dirPath = path.join(pagesPath, dir)
  const isDirectory = fs.statSync(dirPath).isDirectory()
  return isDirectory && Boolean(fs.readdirSync(dirPath).length)
})

console.log(pages)
