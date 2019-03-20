/**
 * Created by ChengZheLin on 2019/3/20.
 * Features: 资源路径生成
 */

'use strict'

const imageinfo = require('imageinfo')
const fs = require('fs')
const path = require('path')

/**
 * 图片路径信息
 * @private
 */
let _IMG_PATH_INFO = {}


/**
 * @param images 图片列表
 * @param dir 图片所在文件夹
 */
function readImagesInfo (images, dir) {
  let info = {w:[], h:[]}

  images.forEach(img => {
    let imgPath = path.join(dir, img)
    let imgFile = fs.readFileSync(imgPath)
    let imgInfo = imageinfo(imgFile)

    if (imgInfo.width > imgInfo.height) {
      info.w.push(img)
    } else {
      info.h.push(img)
    }
  })

  return info
}

function isFile(path){
  return exists(path) && fs.statSync(path).isFile();
}


function f () {
  let sourcePath = path.resolve(__dirname, '../source')
  let sourceInner = fs.readdirSync(sourcePath)

  sourceInner = sourceInner.filter(dir => {
    let imagesDir = path.join(sourcePath, dir)

    // 判断是不是文件，如果是则不处理
    if (fs.statSync(imagesDir).isFile()) {
      return false;
    } else {
      let imagesFiles = fs.readdirSync(imagesDir)

      // 获取文件信息
      _IMG_PATH_INFO[dir] = readImagesInfo(imagesFiles, imagesDir)
      return true
    }
  })

  // 将所有图片保存
  _IMG_PATH_INFO['group'] = sourceInner

  // 将信息写入
  fs.writeFileSync(path.join(sourcePath, 'images.json'), JSON.stringify(_IMG_PATH_INFO))

  console.log(`文件信息获取成功...`)
  return _IMG_PATH_INFO
}


module.exports = f


if (require.main === module) {
  f()
}
