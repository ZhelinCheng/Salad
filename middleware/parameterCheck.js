/**
 * Created by ChengZheLin on 2019/3/21.
 * Features:
 */

'use strict'

function paramsCheck (sourceGroup, params) {
  // 分类
  let reqClass = params['class']
  // 尺寸
  let reqSize = params['size']
  // 文案
  let reqText = params['text']
  // 尺寸正则
  let re = /^(!?)(\d{2,4})x(\d{2,4})$/
  // reqSize = re.exec(reqSize)

  let isNext = 200

  if (sourceGroup.indexOf(reqClass) < 0 || reqClass !== 'random') {
    isNext = 403
  } else if (!re.test(reqSize) || reqText.length > 30) {
    isNext = 403
  }

  return isNext
}

module.exports = function (sourceGroup) {
  return async (req, res, next) => {
    paramsCheck(sourceGroup, req.params)
  }
}
