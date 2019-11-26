/*
 * @Author: Zhelin Cheng
 * @Date: 2019-11-26 17:30:49
 * @LastEditTime: 2019-11-26 17:38:53
 * @LastEditors: Zhelin Cheng
 * @Description: 常量
 */

import * as path from 'path'
import * as fs from 'fs-extra'
const pagesPath = path.resolve(__dirname, '../../pages')
let pages = fs.readdirSync(pagesPath)
pages = pages.filter(dir => {
  return fs.statSync(path.join(pagesPath, dir)).isDirectory()
})

 // 最小文字
export const MIN_FONT_SIZE = 12

// 文字缩放
export const FONT_SIZE_ZOOM = 8

// pages目录
export const ROUTER_PAGES = pages
